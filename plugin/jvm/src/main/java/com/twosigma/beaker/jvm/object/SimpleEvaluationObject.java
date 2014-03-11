/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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

import java.util.Observable;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * Abstraction around an evaluation, for communication of the state over REST to the plugin.
 */
public class SimpleEvaluationObject extends Observable {

  private EvaluationStatus status;
  private EvaluationResult result;
  private final String expression;

  public SimpleEvaluationObject(String expression) {
    this.expression = expression;
    this.status = EvaluationStatus.QUEUED;
  }

  public synchronized void started() {
    this.status = EvaluationStatus.RUNNING;
    setChanged();
    notifyObservers();
  }

  public synchronized void finished(Object result) {
    this.status = EvaluationStatus.FINISHED;
    this.result = new EvaluationResult(result);
    setChanged();
    notifyObservers();
  }

  public synchronized void error(Object result) {
    this.status = EvaluationStatus.ERROR;
    this.result = new EvaluationResult(result);
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
  public synchronized EvaluationResult getResult() {
    return this.result;
  }

  public static enum EvaluationStatus {
    QUEUED, RUNNING, FINISHED, ERROR
  }
}
