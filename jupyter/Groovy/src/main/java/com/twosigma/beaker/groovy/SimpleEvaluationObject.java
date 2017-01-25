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
package com.twosigma.beaker.groovy;

import java.util.ArrayList;
import java.util.List;
import java.util.Observable;

import org.codehaus.jackson.annotate.JsonProperty;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beaker.groovy.threads.BeakerOutputHandler;
import com.twosigma.beaker.groovy.threads.BeakerStdOutErrHandler;

/**
 * Abstraction around an evaluation, for communication of the state over REST to the plugin.
 */
public class SimpleEvaluationObject extends Observable {
  private final static Logger logger = LoggerFactory.getLogger(SimpleEvaluationObject.class.getName());
  private static final int OUTPUT_QUEUE_SIZE = 20;
  private static final int MAX_LINE_LENGTH = 240;

  public class EvaluationStdOutput {
    public String payload;
    public EvaluationStdOutput(String s) { payload = s; }
  }

  public class EvaluationStdError {
    public String payload;
    public EvaluationStdError(String s) { payload = s; }
  }

  private Message jupyterMessage;
  private int executionCount;
  private EvaluationStatus status;
  private List<Object> outputdata;
  private int outputdataCount;
  private final String expression;
  private EvaluationResult payload;
  private boolean payload_changed;
  private String jsonres;
  private String message;
  private int progressBar;
  private BeakerOutputHandler stdout;
  private BeakerOutputHandler stderr;
  private String buildingout;
  private String buildingerr;

  public SimpleEvaluationObject(String e) {
    expression = e;
    status = EvaluationStatus.QUEUED;
    outputdata = new ArrayList<Object>();
    outputdataCount = 0;
    payload_changed = true;
    buildingout = "";
    buildingerr = "";
  }

  public synchronized void started() {
    setOutputHandler();
    this.status = EvaluationStatus.RUNNING;
    setChanged();
    notifyObservers();
  }

  public synchronized void finished(Object r) {
    doFlush();
    clrOutputHandler();
    this.status = EvaluationStatus.FINISHED;
    payload = new EvaluationResult(r);
    payload_changed = true;
    setChanged();
    notifyObservers();
  }

  public synchronized void finished(Object r, String json) {
    doFlush();
    clrOutputHandler();
    this.jsonres = json;
    this.status = EvaluationStatus.FINISHED;
    payload = new EvaluationResult(r);
    payload_changed = true;
    setChanged();
    notifyObservers();
  }

  public synchronized void error(Object r) {
    doFlush();
    clrOutputHandler();
    this.status = EvaluationStatus.ERROR;
    payload = new EvaluationResult(r);
    payload_changed = true;
    setChanged();
    notifyObservers();
  }

  public synchronized void update(Object r) {
    this.status = EvaluationStatus.RUNNING;
    payload = new EvaluationResult(r);
    payload_changed = true;
    setChanged();
    notifyObservers();
  }

  public static SimpleEvaluationObject createError(String error) {
    SimpleEvaluationObject simpleEvaluationObject = new SimpleEvaluationObject("Error");
    simpleEvaluationObject.status = EvaluationStatus.ERROR;
    simpleEvaluationObject.payload = new EvaluationResult(error);
    return simpleEvaluationObject;
  }

  @JsonProperty("expression")
  public String getExpression() {
    return expression;
  }

  @JsonProperty("status")
  public synchronized EvaluationStatus getStatus() {
    return status;
  }

  @JsonProperty("jsonres")
  public synchronized String getJsonRes() {
    return jsonres;
  }

  @JsonProperty("payload")
  public synchronized EvaluationResult getPayload() {
    payload_changed = false;
    return payload;
  }

  public synchronized boolean getPayloadChanged() {
    return payload_changed;
  }

  @JsonProperty("outputdata")
  public synchronized List<Object> getOutputdata() {
    List<Object> o = new ArrayList<Object>(outputdata);
    outputdata.clear();
    outputdataCount = 0;
    return o;
  }

  @JsonProperty("message")
  public synchronized String getMessage() {
    return message;
  }

  @JsonProperty("progressBar")
  public synchronized int getProgressBar() {
    return progressBar;
  }

  public static enum EvaluationStatus {
    QUEUED, RUNNING, FINISHED, ERROR
  }
  
  public class SimpleOutputHandler implements BeakerOutputHandler {
    
    @Override
    public void write(int b) {
      byte [] ba = new byte[1];
      ba[0] = (byte) b;
      appendOutput(new String(ba));
    }

    @Override
    public void write(byte[] b) {
      appendOutput(new String(b));
    }

    @Override
    public void write(byte[] b, int off, int len) {
      appendOutput(new String(b,off,len));
    }
  }
  
  public class SimpleErrorHandler implements BeakerOutputHandler {
    
    @Override
    public void write(int b) {
      byte [] ba = new byte[1];
      ba[0] = (byte) b;
      appendError(new String(ba));
    }

    @Override
    public void write(byte[] b) {
      appendError(new String(b));
    }

    @Override
    public void write(byte[] b, int off, int len) {
      appendError(new String(b,off,len));
    }

  }

  public synchronized BeakerOutputHandler getStdOutputHandler() {
    if (stdout == null)
      stdout = new SimpleOutputHandler();
    return stdout;
  }

  public synchronized BeakerOutputHandler getStdErrorHandler() {
    if (stderr == null)
      stderr = new SimpleErrorHandler();
    return stderr;
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
    } if ( buildingout.length() > MAX_LINE_LENGTH) {
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
    } else if ( buildingerr.length() > MAX_LINE_LENGTH) {
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

  private synchronized void doFlush() {
    if (! buildingout.isEmpty()) {
      if (outputdata.size() == 0 || !(outputdata.get(outputdata.size()-1) instanceof EvaluationStdOutput)) {
        outputdata.add(new EvaluationStdOutput(buildingout+"\n"));
      } else {
        EvaluationStdOutput st = (EvaluationStdOutput) outputdata.get(outputdata.size()-1);
        st.payload += buildingout+"\n";
      }
      buildingout = "";
      outputdataCount ++;
    }
    if (! buildingerr.isEmpty()) {
      if (outputdata.size() == 0 || !(outputdata.get(outputdata.size()-1) instanceof EvaluationStdError)) {
        outputdata.add(new EvaluationStdError(buildingerr+"\n"));
      } else {
        EvaluationStdError st = (EvaluationStdError) outputdata.get(outputdata.size()-1);
        st.payload += buildingerr+"\n";
      }
      buildingerr = "";
      outputdataCount ++;
    }
  }
  
  public void setOutputHandler() {
    BeakerStdOutErrHandler.setOutputHandler(getStdOutputHandler(), getStdErrorHandler());
  }

  public void clrOutputHandler() {
    BeakerStdOutErrHandler.clrOutputHandler();
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

}