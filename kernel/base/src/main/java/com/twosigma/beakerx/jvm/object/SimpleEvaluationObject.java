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
package com.twosigma.beakerx.jvm.object;

import com.twosigma.beakerx.jvm.threads.BeakerOutputHandler;
import com.twosigma.beakerx.jvm.threads.BeakerStdOutErrHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.Observable;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Abstraction around an evaluation, for communication of the state over REST to the plugin.
 */
public class SimpleEvaluationObject extends Observable {

  private final static Logger logger = LoggerFactory.getLogger(SimpleEvaluationObject.class.getName());
  private final KernelFunctionality.ExecuteCodeCallback executeCodeCallback;

  private Message jupyterMessage;
  private int executionCount;
  private EvaluationStatus status;
  private final String expression;
  private Object payload;
  private BeakerOutputHandler stdout;
  private BeakerOutputHandler stderr;
  private Queue<ConsoleOutput> consoleOutput = new ConcurrentLinkedQueue<ConsoleOutput>();
  private ProgressReporting progressReporting;


  public SimpleEvaluationObject(String e, final KernelFunctionality.ExecuteCodeCallback executeCodeCallback) {
    expression = e;
    status = EvaluationStatus.QUEUED;
    this.executeCodeCallback = checkNotNull(executeCodeCallback);
  }

  public void executeCodeCallback() {
    this.executeCodeCallback.execute(this);
  }

  public synchronized void started() {
    setOutputHandler();
    this.status = EvaluationStatus.RUNNING;
    setChanged();
    notifyObservers();
  }

  public synchronized void finished(Object r) {
    clrOutputHandler();
    this.status = EvaluationStatus.FINISHED;
    payload = r;
    setChanged();
    notifyObservers();
  }


  public synchronized void error(Object r) {
    clrOutputHandler();
    this.status = EvaluationStatus.ERROR;
    payload = r;
    setChanged();
    notifyObservers();
  }

  public synchronized void update(Object r) {
    this.status = EvaluationStatus.RUNNING;
    payload = r;
    setChanged();
    notifyObservers();
  }

  public String getExpression() {
    return expression;
  }

  public synchronized EvaluationStatus getStatus() {
    return status;
  }

  public synchronized Object getPayload() {
    return payload;
  }

  public void structuredUpdate(String message, int progress) {
    if(progressReporting ==null){
      progressReporting = new ProgressReporting();
    }
    progressReporting.structuredUpdate(message,progress);
  }

  public static enum EvaluationStatus {
    QUEUED, RUNNING, FINISHED, ERROR
  }

  public class SimpleOutputHandler implements BeakerOutputHandler {

    private boolean error;

    public SimpleOutputHandler(boolean error){
      this.error = error;
    }

    @Override
    public void write(int b) {
      byte [] ba = new byte[1];
      ba[0] = (byte) b;
      consoleOutput.add(new ConsoleOutput(error, new String(ba)));
      setChanged();
      notifyObservers();
    }

    @Override
    public void write(byte[] b) {
      consoleOutput.add(new ConsoleOutput(error, new String(b)));
      setChanged();
      notifyObservers();
    }

    @Override
    public void write(byte[] b, int off, int len) {
      consoleOutput.add(new ConsoleOutput(error, new String(b,off,len)));
      setChanged();
      notifyObservers();
    }

  }

  public synchronized BeakerOutputHandler getStdOutputHandler() {
    if (stdout == null)
      stdout = new SimpleOutputHandler(false);
    return stdout;
  }

  public synchronized BeakerOutputHandler getStdErrorHandler() {
    if (stderr == null)
      stderr = new SimpleOutputHandler(true);
    return stderr;
  }

  public void setOutputHandler() {
    BeakerStdOutErrHandler.setOutputHandler(getStdOutputHandler(), getStdErrorHandler());
  }

  public void clrOutputHandler() {
    closeProgressUpdater();
    BeakerStdOutErrHandler.clrOutputHandler();
  }

  private void closeProgressUpdater() {
    if (progressReporting != null) {
      progressReporting.close();
      progressReporting = null;
    }
  }

  public Message getJupyterMessage() {
    return jupyterMessage;
  }

  public void setJupyterMessage(Message jupyterMessage) {
    this.jupyterMessage = jupyterMessage;
  }

  public int getExecutionCount() {
    return executionCount;
  }

  public void setExecutionCount(int executionCount) {
    this.executionCount = executionCount;
  }

  public Queue<ConsoleOutput> getConsoleOutput() {
    return consoleOutput;
  }

  @Override
  public String toString() {
    return status.toString() + " Console messages size = " + consoleOutput.size();
  }

  private static final int OUTPUT_QUEUE_SIZE = 20;
  private static final int MAX_LINE_LENGTH = 240;
  private int outputdataCount= 0;
  private String buildingout= "";
  private List<Object> outputdata= new ArrayList<Object>();
  private String buildingerr= "";

  public List<Object> getOutputdata() {
    return outputdata;
  }

  public void appendOutput(String s) {
    if (getSize() > OUTPUT_QUEUE_SIZE) {
      try { Thread.sleep(500); } catch (InterruptedException e) { }
    }
    if (getSize() > OUTPUT_QUEUE_SIZE) {
      try { Thread.sleep(500); } catch (InterruptedException e) { }
    }
    doAppendOutput(s);
  }

  private synchronized int getSize() {
    return outputdataCount;
  }

  private synchronized void doAppendOutput(String s) {
    buildingout += s;
    String add = null;
    if (s.contains("\n")) {
      if (s.endsWith("\n")) {
        add = buildingout;
        buildingout = "";
      } else {
        add = buildingout.substring(0, buildingout.lastIndexOf('\n')+1);
        buildingout = buildingout.substring(buildingout.lastIndexOf('\n')+1);
      }
    }
    if ( buildingout.length() > MAX_LINE_LENGTH) {
      add = buildingout;
      buildingout = "";
    }
    if (add != null) {
      String [] v = add.split("\n");
      for (String sv : v) {
        while (sv.length()>MAX_LINE_LENGTH) {
          String t = sv.substring(0, MAX_LINE_LENGTH);
          sv = sv.substring(MAX_LINE_LENGTH);
          if (outputdata.size() == 0 || !(outputdata.get(outputdata.size()-1) instanceof EvaluationStdOutput)) {
            outputdata.add(new EvaluationStdOutput(t+"\n"));
          } else {
            EvaluationStdOutput st = (EvaluationStdOutput) outputdata.get(outputdata.size()-1);
            st.payload += t+"\n";
          }
          outputdataCount ++;
        }
        if (outputdata.size() == 0 || !(outputdata.get(outputdata.size()-1) instanceof EvaluationStdOutput)) {
          outputdata.add(new EvaluationStdOutput(sv+"\n"));
        } else {
          EvaluationStdOutput st = (EvaluationStdOutput) outputdata.get(outputdata.size()-1);
          st.payload += sv+"\n";
        }
        outputdataCount ++;
      }
      setChanged();
      notifyObservers();
    }
  }

  public void appendError(String s) {
    if (getSize() > OUTPUT_QUEUE_SIZE) {
      try { Thread.sleep(500); } catch (InterruptedException e) { }
    }
    if (getSize() > OUTPUT_QUEUE_SIZE) {
      try { Thread.sleep(500); } catch (InterruptedException e) { }
    }
    doAppendError(s);
  }

  private synchronized void doAppendError(String s) {
    buildingerr += s;
    String add = null;
    if (s.contains("\n")) {
      if (s.endsWith("\n")) {
        add = buildingerr;
        buildingerr = "";
      } else {
        add = buildingerr.substring(0, buildingerr.lastIndexOf('\n')+1);
        buildingerr = buildingerr.substring(buildingerr.lastIndexOf('\n')+1);
      }
    }
    if ( buildingerr.length() > MAX_LINE_LENGTH) {
      add = buildingerr;
      buildingerr = "";
    }
    if (add != null) {
      /*
      * HACK to remove annoying stderr messages from third party libraries
      */
      if ((add.contains("org.antlr.v4.runtime.misc.NullUsageProcessor") && add.contains("'RELEASE_6'")) ||
              (add.contains("JavaSourceCompilerImpl compile"))) {
        String [] v = add.split("\n");
        add = "";
        for(String s2 : v) {
          if (!s2.contains("org.antlr.v4.runtime.misc.NullUsageProcessor") && !s2.contains("JavaSourceCompilerImpl compile"))
            add += s2 + "\n";
        }
      }
      String [] v = add.split("\n");
      for (String sv : v) {
        while (sv.length()>MAX_LINE_LENGTH) {
          String t = sv.substring(0, MAX_LINE_LENGTH);
          sv = sv.substring(MAX_LINE_LENGTH);
          if (outputdata.size() == 0 || !(outputdata.get(outputdata.size()-1) instanceof EvaluationStdError)) {
            outputdata.add(new EvaluationStdError(t+"\n"));
          } else {
            EvaluationStdError st = (EvaluationStdError) outputdata.get(outputdata.size()-1);
            st.payload += t+"\n";
          }
          outputdataCount ++;
        }
        if (outputdata.size() == 0 || !(outputdata.get(outputdata.size()-1) instanceof EvaluationStdError)) {
          outputdata.add(new EvaluationStdError(sv+"\n"));
        } else {
          EvaluationStdError st = (EvaluationStdError) outputdata.get(outputdata.size()-1);
          st.payload += sv+"\n";
        }
        outputdataCount ++;
      }
      setChanged();
      notifyObservers();
    }
  }

  public class EvaluationStdOutput {
    public String payload;
    public EvaluationStdOutput(String s) { payload = s; }
  }

  public class EvaluationStdError {
    public String payload;
    public EvaluationStdError(String s) { payload = s; }
  }

}
