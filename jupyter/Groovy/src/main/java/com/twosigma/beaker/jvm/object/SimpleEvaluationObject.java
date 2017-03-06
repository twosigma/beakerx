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
package com.twosigma.beaker.jvm.object;

import com.twosigma.beaker.jvm.threads.BeakerOutputHandler;
import com.twosigma.beaker.jvm.threads.BeakerStdOutErrHandler;

import java.util.Observable;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Abstraction around an evaluation, for communication of the state over REST to the plugin.
 */
public class SimpleEvaluationObject extends Observable {

  private final static Logger logger = LoggerFactory.getLogger(SimpleEvaluationObject.class.getName());

  //TODO put Message back
  private Object jupyterMessage;
  private int executionCount;
  private EvaluationStatus status;
  private final String expression;
  private Object payload;
  private BeakerOutputHandler stdout;
  private BeakerOutputHandler stderr;
  private Queue<ConsoleOutput> consoleOutput = new ConcurrentLinkedQueue<ConsoleOutput>();
  private ProgressReporting progressReporting;


  public SimpleEvaluationObject(String e) {
    expression = e;
    status = EvaluationStatus.QUEUED;
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

  //TODO put Message back
  public Object getJupyterMessage() {
    return jupyterMessage;
  }

  //TODO put Message back
  public void setJupyterMessage(Object jupyterMessage) {
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

}
