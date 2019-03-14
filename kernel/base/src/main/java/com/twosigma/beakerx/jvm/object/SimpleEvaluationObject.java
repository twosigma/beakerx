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

import com.twosigma.beakerx.jvm.threads.BeakerInputHandler;
import com.twosigma.beakerx.jvm.threads.BeakerOutputHandler;
import com.twosigma.beakerx.jvm.threads.BeakerStdInOutErrHandler;
import com.twosigma.beakerx.kernel.threads.ResultSender;
import com.twosigma.beakerx.message.Message;

import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

/**
 * Abstraction around an evaluation, for communication of the state over REST to the plugin.
 */
public class SimpleEvaluationObject {

  private Message jupyterMessage;
  private int executionCount;
  private EvaluationStatus status;
  private final String expression;
  private Object payload;
  private ResultSender resultSender;
  private BeakerOutputHandler stdout;
  private BeakerOutputHandler stderr;
  private BeakerInputHandler stdin;
  private Queue<ConsoleOutput> consoleOutput = new ConcurrentLinkedQueue<>();
  private ProgressReporting progressReporting;
  private boolean showResult = true;

  public SimpleEvaluationObject(String e, ConfigurationFactory factory) {
    expression = e;
    status = EvaluationStatus.QUEUED;
    Configuration config = factory.create(this);
    this.stdout = config.getStdout();
    this.stderr = config.getStderr();
    this.resultSender = config.getResultSender();
    this.stdin = config.getStdin();
    this.jupyterMessage = config.getMessage();
    this.executionCount = config.getExecutionCount();
  }

  public boolean isShowResult() {
    return showResult;
  }

  public void started() {
    this.status = EvaluationStatus.RUNNING;
    resultSender.update(this);
  }

  public void finished(Object r) {
    clrOutputHandler();
    this.status = EvaluationStatus.FINISHED;
    payload = r;
    resultSender.update(this);
  }

  public void error(Object r) {
    clrOutputHandler();
    this.status = EvaluationStatus.ERROR;
    payload = r;
    resultSender.update(this);
  }

  public void update(Object r) {
    this.status = EvaluationStatus.RUNNING;
    payload = r;
    resultSender.update(this);
  }

  public String getExpression() {
    return expression;
  }

  public EvaluationStatus getStatus() {
    return status;
  }

  public Object getPayload() {
    return payload;
  }

  public void structuredUpdate(String message, int progress) {
    if (progressReporting == null) {
      progressReporting = new ProgressReporting();
    }
    progressReporting.structuredUpdate(message, progress);
  }

  public void noResult() {
    this.showResult = false;
  }

  public enum EvaluationStatus {
    QUEUED, RUNNING, FINISHED, ERROR
  }

  public static class SimpleOutputHandler implements BeakerOutputHandler {
    private boolean error;
    private ResultSender executionResultSender;
    private SimpleEvaluationObject seo;

    public SimpleOutputHandler(boolean error, ResultSender executionResultSender, SimpleEvaluationObject seo) {
      this.error = error;
      this.executionResultSender = executionResultSender;
      this.seo = seo;
    }

    @Override
    public void write(String b) {
      seo.consoleOutput.add(new ConsoleOutput(error, b));
      executionResultSender.update(seo);
    }
  }

  public BeakerOutputHandler getStdOutputHandler() {
    return stdout;
  }

  public BeakerOutputHandler getStdErrorHandler() {
    return stderr;
  }

  public void setOutputHandler() {
    BeakerStdInOutErrHandler.setOutputHandler(getStdOutputHandler(), getStdErrorHandler(), getStdinHandler());
  }

  private BeakerInputHandler getStdinHandler() {
    return stdin;
  }

  public void clrOutputHandler() {
    closeProgressUpdater();
    BeakerStdInOutErrHandler.clrOutputHandler();
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

  public int getExecutionCount() {
    return executionCount;
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
  private int outputdataCount = 0;
  private String buildingout = "";
  private List<Object> outputdata = new ArrayList<Object>();
  private String buildingerr = "";

  public List<Object> getOutputdata() {
    return outputdata;
  }

  public void appendOutput(String s) {
    if (getSize() > OUTPUT_QUEUE_SIZE) {
      try {
        Thread.sleep(500);
      } catch (InterruptedException e) {
      }
    }
    if (getSize() > OUTPUT_QUEUE_SIZE) {
      try {
        Thread.sleep(500);
      } catch (InterruptedException e) {
      }
    }
    doAppendOutput(s);
  }

  private int getSize() {
    return outputdataCount;
  }

  private void doAppendOutput(String s) {
    buildingout += s;
    String add = null;
    if (s.contains("\n")) {
      if (s.endsWith("\n")) {
        add = buildingout;
        buildingout = "";
      } else {
        add = buildingout.substring(0, buildingout.lastIndexOf('\n') + 1);
        buildingout = buildingout.substring(buildingout.lastIndexOf('\n') + 1);
      }
    }
    if (buildingout.length() > MAX_LINE_LENGTH) {
      add = buildingout;
      buildingout = "";
    }
    if (add != null) {
      String[] v = add.split("\n");
      for (String sv : v) {
        while (sv.length() > MAX_LINE_LENGTH) {
          String t = sv.substring(0, MAX_LINE_LENGTH);
          sv = sv.substring(MAX_LINE_LENGTH);
          if (outputdata.size() == 0 || !(outputdata.get(outputdata.size() - 1) instanceof EvaluationStdOutput)) {
            outputdata.add(new EvaluationStdOutput(t + "\n"));
          } else {
            EvaluationStdOutput st = (EvaluationStdOutput) outputdata.get(outputdata.size() - 1);
            st.payload += t + "\n";
          }
          outputdataCount++;
        }
        if (outputdata.size() == 0 || !(outputdata.get(outputdata.size() - 1) instanceof EvaluationStdOutput)) {
          outputdata.add(new EvaluationStdOutput(sv + "\n"));
        } else {
          EvaluationStdOutput st = (EvaluationStdOutput) outputdata.get(outputdata.size() - 1);
          st.payload += sv + "\n";
        }
        outputdataCount++;
      }
      resultSender.update(this);
    }
  }

  public void appendError(String s) {
    if (getSize() > OUTPUT_QUEUE_SIZE) {
      try {
        Thread.sleep(500);
      } catch (InterruptedException e) {
      }
    }
    if (getSize() > OUTPUT_QUEUE_SIZE) {
      try {
        Thread.sleep(500);
      } catch (InterruptedException e) {
      }
    }
    doAppendError(s);
  }

  private void doAppendError(String s) {
    buildingerr += s;
    String add = null;
    if (s.contains("\n")) {
      if (s.endsWith("\n")) {
        add = buildingerr;
        buildingerr = "";
      } else {
        add = buildingerr.substring(0, buildingerr.lastIndexOf('\n') + 1);
        buildingerr = buildingerr.substring(buildingerr.lastIndexOf('\n') + 1);
      }
    }
    if (buildingerr.length() > MAX_LINE_LENGTH) {
      add = buildingerr;
      buildingerr = "";
    }
    if (add != null) {
      /*
       * HACK to remove annoying stderr messages from third party libraries
       */
      if ((add.contains("org.antlr.v4.runtime.misc.NullUsageProcessor") && add.contains("'RELEASE_6'")) ||
              (add.contains("JavaSourceCompilerImpl compile"))) {
        String[] v = add.split("\n");
        add = "";
        for (String s2 : v) {
          if (!s2.contains("org.antlr.v4.runtime.misc.NullUsageProcessor") && !s2.contains("JavaSourceCompilerImpl compile"))
            add += s2 + "\n";
        }
      }
      String[] v = add.split("\n");
      for (String sv : v) {
        while (sv.length() > MAX_LINE_LENGTH) {
          String t = sv.substring(0, MAX_LINE_LENGTH);
          sv = sv.substring(MAX_LINE_LENGTH);
          if (outputdata.size() == 0 || !(outputdata.get(outputdata.size() - 1) instanceof EvaluationStdError)) {
            outputdata.add(new EvaluationStdError(t + "\n"));
          } else {
            EvaluationStdError st = (EvaluationStdError) outputdata.get(outputdata.size() - 1);
            st.payload += t + "\n";
          }
          outputdataCount++;
        }
        if (outputdata.size() == 0 || !(outputdata.get(outputdata.size() - 1) instanceof EvaluationStdError)) {
          outputdata.add(new EvaluationStdError(sv + "\n"));
        } else {
          EvaluationStdError st = (EvaluationStdError) outputdata.get(outputdata.size() - 1);
          st.payload += sv + "\n";
        }
        outputdataCount++;
      }
      resultSender.update(this);
    }
  }

  public class EvaluationStdOutput {
    public String payload;

    public EvaluationStdOutput(String s) {
      payload = s;
    }
  }

  public class EvaluationStdError {
    public String payload;

    public EvaluationStdError(String s) {
      payload = s;
    }
  }
}
