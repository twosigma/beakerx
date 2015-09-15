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
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.threads.BeakerCellExecutor;
import com.twosigma.beaker.sqlsh.autocomplete.SqlAutocomplete;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;

public class SQLEvaluator {

    protected final String shellId;

    protected final String sessionId;

    protected final String packageId;

    protected final BeakerCellExecutor executor;

    volatile protected boolean exit;
    
    protected ClasspathScanner cps;
    protected SqlAutocomplete sac;
    

    protected final Semaphore syncObject = new Semaphore(0, true);

    protected final ConcurrentLinkedQueue<JobDescriptor> jobQueue = new ConcurrentLinkedQueue<>();

    protected QueryExecutor queryExecutor;

    public SQLEvaluator(String id, String sId) {
        shellId = id;
        sessionId = sId;
        cps = new ClasspathScanner();
        sac = createSqlAutocomplete(cps);
        packageId = "com.twosigma.beaker.sqlsh.bkr" + shellId.split("-")[0];
        executor = new BeakerCellExecutor("sqlsh");
        queryExecutor = new QueryExecutor();
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

	protected SqlAutocomplete createSqlAutocomplete(ClasspathScanner c) {
		return new SqlAutocomplete(c);
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

                namespaceClient = NamespaceClient.getBeaker(sessionId);
                namespaceClient.setOutputObj(job.getSimpleEvaluationObject());

                executor.executeTask(new MyRunnable(job.getSimpleEvaluationObject(), namespaceClient));

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
                simpleEvaluationObject.finished(queryExecutor.executeQuery(simpleEvaluationObject.getExpression(), namespaceClient));
            } catch (SQLException e) {
                simpleEvaluationObject.error(e.getMessage());
            } catch (Exception e) {
                e.printStackTrace();
                simpleEvaluationObject.error(e.getMessage());
            }
        }
    }

}
