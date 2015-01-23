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

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beaker.BeakerProgressUpdate;
import com.twosigma.beaker.jvm.threads.BeakerOutputHandler;
import com.twosigma.beaker.jvm.threads.BeakerStdOutErrHandler;
import com.twosigma.beaker.jvm.updater.UpdateManager;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Observable;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

/**
 * Abstraction around an evaluation, for communication of the state over REST to the plugin.
 */
public class SimpleEvaluationObject extends Observable {

  public class EvaluationStdOutput {
    public String payload;
    public EvaluationStdOutput(String s) { payload = s; }
  }

  public class EvaluationStdError {
    public String payload;
    public EvaluationStdError(String s) { payload = s; }
  }
  
  private EvaluationStatus status;
  private List<Object> outputdata;
  private final String expression;
  private EvaluationResult payload;
  private boolean payload_changed;
  private String message;
  private int progressBar;
  private BeakerOutputHandler stdout;
  private BeakerOutputHandler stderr;

  public SimpleEvaluationObject(String e) {
    expression = e;
    status = EvaluationStatus.QUEUED;
    outputdata = new ArrayList<Object>();
    payload_changed = true;
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
    payload = new EvaluationResult(r);
    payload_changed = true;
    setChanged();
    notifyObservers();
  }

  public synchronized void error(Object r) {
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

  public synchronized void structuredUpdate(BeakerProgressUpdate upd) {
    this.status = EvaluationStatus.RUNNING;
    this.message = upd.message;
    this.progressBar = upd.progressBar;
    if (upd.payload != null) {
      payload = new EvaluationResult(upd.payload);
      payload_changed = true;
    }
    setChanged();
    notifyObservers();
  }

  @JsonProperty("expression")
  public String getExpression() {
    return expression;
  }

  @JsonProperty("status")
  public synchronized EvaluationStatus getStatus() {
    return status;
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

  public static class Serializer extends JsonSerializer<SimpleEvaluationObject> {

    private final Provider<UpdateManager> updateManagerProvider;

    @Inject
    private Serializer(Provider<UpdateManager> ump) {
      this.updateManagerProvider = ump;
    }

    private UpdateManager getUpdateManager() {
      return this.updateManagerProvider.get();
    }

    @Override
    public void serialize(SimpleEvaluationObject value,
        JsonGenerator jgen,
        SerializerProvider provider)
        throws IOException, JsonProcessingException {

      synchronized (value) {
        String id = getUpdateManager().register(value);
        jgen.writeStartObject();
        jgen.writeObjectField("update_id", id);
        jgen.writeObjectField("expression", value.getExpression());
        jgen.writeObjectField("status", value.getStatus());
        if (value.getMessage() != null)
          jgen.writeStringField("message", value.getMessage());
        if ( value.getProgressBar() > 0 )
          jgen.writeNumberField("progressBar", value.getProgressBar());
        if (value.getPayloadChanged()) {
          EvaluationResult o = value.getPayload();
          if (o != null)
            jgen.writeObjectField("payload", o);
        }
        
        jgen.writeArrayFieldStart("outputdata");
        for (Object o : value.getOutputdata()) {
          if (o instanceof EvaluationStdOutput) {
            jgen.writeStartObject();
            jgen.writeStringField("type", "BeakerStandardOutput");
            jgen.writeStringField("value", ((EvaluationStdOutput)o).payload );
            jgen.writeEndObject();
          }
          else if (o instanceof EvaluationStdError) {
            jgen.writeStartObject();
            jgen.writeStringField("type", "BeakerStandardError");
            jgen.writeStringField("value", ((EvaluationStdError)o).payload );
            jgen.writeEndObject();
          }
        }        
        jgen.writeEndArray();
        jgen.writeEndObject();
      }

    }
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
  
  public synchronized void appendOutput(String s) {
    if (outputdata.size() == 0 || !(outputdata.get(outputdata.size()-1) instanceof EvaluationStdOutput)) {
      outputdata.add(new EvaluationStdOutput(s));
    } else {
      EvaluationStdOutput st = (EvaluationStdOutput) outputdata.get(outputdata.size()-1);
      st.payload += s;
    }
  }

  public synchronized void appendError(String s) {
    if (outputdata.size() == 0 || !(outputdata.get(outputdata.size()-1) instanceof EvaluationStdError)) {
      outputdata.add(new EvaluationStdError(s));
    } else {
      EvaluationStdError st = (EvaluationStdError) outputdata.get(outputdata.size()-1);
      st.payload += s;
    }
  }

  public void setOutputHandler() {
    BeakerStdOutErrHandler.setOutputHandler(getStdOutputHandler(), getStdErrorHandler());
  }

  public void clrOutputHandler() {
    BeakerStdOutErrHandler.clrOutputHandler();
  }

}
