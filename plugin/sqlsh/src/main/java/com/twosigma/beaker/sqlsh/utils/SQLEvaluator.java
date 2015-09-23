/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.twosigma.beaker.sqlsh.utils;

import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.autocomplete.ClasspathScanner;
import com.twosigma.beaker.jvm.classloader.DynamicClassLoader;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.threads.BeakerCellExecutor;
import com.twosigma.beaker.sqlsh.autocomplete.SqlAutocomplete;

import javax.management.QueryEval;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.nio.file.FileSystems;
import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SQLEvaluator {

    protected final String shellId;
    protected final String sessionId;
    protected final String packageId;

    protected List<String> classPath = new ArrayList<>();
    protected String currentClassPath = "";
    private Map<String, String> namedConnectionString = new HashMap<>();

    protected final BeakerCellExecutor executor;
    volatile protected boolean exit;

    protected ClasspathScanner cps;
    protected SqlAutocomplete sac;

    protected final Semaphore syncObject = new Semaphore(0, true);
    protected final ConcurrentLinkedQueue<JobDescriptor> jobQueue = new ConcurrentLinkedQueue<>();
    protected final QueryExecutor queryExecutor;
    protected final JDBCClient jdbcClient;

    public SQLEvaluator(String id, String sId) {
        shellId = id;
        sessionId = sId;
        packageId = "com.twosigma.beaker.sqlsh.bkr" + shellId.split("-")[0];
        jdbcClient = new JDBCClient();
        cps = new ClasspathScanner();
        sac = createSqlAutocomplete(cps);
        executor = new BeakerCellExecutor("sqlsh");
        queryExecutor = new QueryExecutor(jdbcClient);
        new WorkerThread().start();
    }

    public void evaluate(SimpleEvaluationObject seo, String code) {

        jobQueue.add(new JobDescriptor(code, seo));
        syncObject.release();
    }

    public void exit() {
        exit = true;
        executor.cancelExecution();
        syncObject.release();
    }

    public void cancelExecution() {
        executor.cancelExecution();
    }

    public void killAllThreads() {
        executor.killAllThreads();
    }

    public void resetEnvironment() {
        jdbcClient.loadDrivers(classPath);
        executor.killAllThreads();
    }

    protected SqlAutocomplete createSqlAutocomplete(ClasspathScanner c) {
        return new SqlAutocomplete(c, jdbcClient, sessionId, namedConnectionString);
    }

    public List<String> autocomplete(String code, int caretPosition) {
        return sac.doAutocomplete(code, caretPosition);
    }

    private class JobDescriptor {
        private String code;

        private SimpleEvaluationObject simpleEvaluationObject;

        public JobDescriptor(String code, SimpleEvaluationObject seo) {
            code = code;
            simpleEvaluationObject = seo;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public SimpleEvaluationObject getSimpleEvaluationObject() {
            return simpleEvaluationObject;
        }

        public void setSimpleEvaluationObject(SimpleEvaluationObject simpleEvaluationObject) {
            this.simpleEvaluationObject = simpleEvaluationObject;
        }
    }

    private class WorkerThread extends Thread {

        public WorkerThread() {
            super("sqlsh worker");
        }


        /*
     * This thread performs all the evaluation
     */

        public void run() {
            JobDescriptor job;
            NamespaceClient namespaceClient;

            while (!exit) {
                try {
                    syncObject.acquire();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                if (exit) {
                    break;
                }

                job = jobQueue.poll();
                job.getSimpleEvaluationObject().started();

                job.getSimpleEvaluationObject().setOutputHandler();
                namespaceClient = NamespaceClient.getBeaker(sessionId);
                namespaceClient.setOutputObj(job.getSimpleEvaluationObject());

                executor.executeTask(new MyRunnable(job.getSimpleEvaluationObject(), namespaceClient));

                job.getSimpleEvaluationObject().clrOutputHandler();

                namespaceClient.setOutputObj(null);
                namespaceClient = null;

            }
        }
    }

    protected class MyRunnable implements Runnable {

        protected final SimpleEvaluationObject simpleEvaluationObject;
        protected final NamespaceClient namespaceClient;

        public MyRunnable(SimpleEvaluationObject seo, NamespaceClient namespaceClient) {
            this.simpleEvaluationObject = seo;
            this.namespaceClient = namespaceClient;
        }

        @Override
        public void run() {
            try {
                simpleEvaluationObject.finished(queryExecutor.executeQuery(simpleEvaluationObject.getExpression(), namespaceClient, namedConnectionString));
            } catch (SQLException e) {
                simpleEvaluationObject.error(e.getMessage());
            } catch (ThreadDeath e) {
                simpleEvaluationObject.error("... cancelled!");
            } catch (Throwable e) {
                Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, null, e);
                simpleEvaluationObject.error(e.getMessage());
            }

        }
    }

    public void setShellOptions(String cp, String datasorces) throws IOException {
        currentClassPath = cp;
        if (cp.isEmpty())
            classPath = new ArrayList<String>();
        else
            classPath = Arrays.asList(cp.split("[\\s" + File.pathSeparatorChar + "]+"));

        namedConnectionString = new HashMap<>();
        Scanner sc = new Scanner(datasorces);
        while (sc.hasNext()) {
            String line = sc.nextLine();
            int i = line.indexOf('=');
            if (i < 1 || i == line.length() - 1) {
                Logger.getLogger(this.getClass().getName()).log(Level.WARNING, "Error in datasource line, this line will be ignored: {0}.", line);
                continue;
            }
            String name = line.substring(0, i).trim();
            String value = line.substring(i + 1).trim();
            if (value.startsWith("\"") && value.endsWith("\"")) {
                value = value.substring(1, value.length() - 1);
            }
            namedConnectionString.put(name, value);
        }

        resetEnvironment();
    }

}

