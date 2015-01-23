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

  private EvaluationStatus status;
  private List<Object> result;
  private EvaluationResult lastres;
  private final String expression;
  private int outputstatus;

  public SimpleEvaluationObject(String expression) {
    this.expression = expression;
    this.status = EvaluationStatus.QUEUED;
    this.outputstatus = 0;
    this.result = new ArrayList<Object>();
  }

  public synchronized void started() {
    BeakerStdOutErrHandler.setOutputHandler(getStdOutputHandler(), getStdErrorHandler());
    this.outputstatus = 1;
    this.status = EvaluationStatus.RUNNING;
    setChanged();
    notifyObservers();
  }

  public synchronized void finished(Object result) {
    BeakerStdOutErrHandler.clrOutputHandler();
    this.status = EvaluationStatus.FINISHED;
    this.outputstatus = 2;
    if (lastres == null) {
      this.lastres = new EvaluationResult(result);
      this.result.add(lastres);
    } else {
      for (int i=0; i<this.result.size(); i++) {
        if (this.result.get(i) instanceof EvaluationResult) {
          this.lastres = new EvaluationResult(result);
          this.result.set(i,lastres);          
          break;
        }
      }
    }
    setChanged();
    notifyObservers();
  }

  public synchronized void error(Object result) {
    BeakerStdOutErrHandler.clrOutputHandler();
    this.status = EvaluationStatus.ERROR;
    this.outputstatus = 2;
    if (lastres == null) {
      this.lastres = new EvaluationResult(result);
      this.result.add(lastres);
    } else {
      for (int i=0; i<this.result.size(); i++) {
        if (this.result.get(i) instanceof EvaluationResult) {
          this.lastres = new EvaluationResult(result);
          this.result.set(i,lastres);          
          break;
        }
      }
    }
    setChanged();
    notifyObservers();
  }

  public synchronized void update(Object upd) {
    this.status = EvaluationStatus.RUNNING;
    this.outputstatus = 2;
    if (lastres == null) {
      this.lastres = new EvaluationResult(result);
      this.result.add(lastres);
    } else {
      for (int i=0; i<this.result.size(); i++) {
        if (this.result.get(i) instanceof EvaluationResult) {
          this.lastres = new EvaluationResult(result);
          this.result.set(i,lastres);          
          break;
        }
      }
    }
    setChanged();
    notifyObservers();
  }

  @JsonProperty("expression")
  public String getExpression() {
    return this.expression;
  }

  @JsonProperty("status")
  public synchronized EvaluationStatus getStatus() {
    return this.status;
  }

  @JsonProperty("result")
  public synchronized List<Object> getResult() {
    return this.result;
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
        jgen.writeObjectField("result", value.getResult());
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

  public BeakerOutputHandler getStdOutputHandler() {
    return new SimpleOutputHandler();
  }

  public BeakerOutputHandler getStdErrorHandler() {
    return new SimpleErrorHandler();
  }
  
  public void appendOutput(String s) {
    if (this.outputstatus!=3) {
      this.outputstatus=3;
      this.result.add(s);
    } else {
      String st = (String) this.result.get(this.result.size()-1) + s;
      this.result.set(this.result.size()-1, st);
    }
  }

  public void appendError(String s) {
    BeakerStdOutErrHandler.out().println("ERROR: '"+s+"'");
  }


}
