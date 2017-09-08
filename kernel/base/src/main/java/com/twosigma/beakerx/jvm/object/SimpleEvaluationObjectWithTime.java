/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

import com.twosigma.beakerx.kernel.KernelFunctionality;

public class SimpleEvaluationObjectWithTime extends SimpleEvaluationObject {

  private final KernelFunctionality.ExecuteCodeCallbackWithTime executeCodeCallbackWithTime;

  private Long startOfEvaluationInNanoseconds;
  private Long endOfEvaluationInNanoseconds;
  private Long periodOfEvaluationInNanoseconds;

  public SimpleEvaluationObjectWithTime(String e,
      KernelFunctionality.ExecuteCodeCallbackWithTime executeCodeCallbackWithTime) {
    super(e);
    this.executeCodeCallbackWithTime = executeCodeCallbackWithTime;
  }

  @Override
  public synchronized void started() {
    super.started();
    this.startOfEvaluationInNanoseconds = System.nanoTime();
  }

  @Override
  public synchronized void finished(Object r) {
    super.finished(r);
    this.endOfEvaluationInNanoseconds = System.nanoTime();
    this.periodOfEvaluationInNanoseconds = endOfEvaluationInNanoseconds - startOfEvaluationInNanoseconds;
  }

  @Override
  public void executeCodeCallback() {
    this.executeCodeCallbackWithTime.execute(this);
  }

  public Long getPeriodOfEvaluationInNanoseconds() {
    return periodOfEvaluationInNanoseconds;
  }

  public void setPeriodOfEvaluationInNanoseconds(Long periodOfEvaluationInNanoseconds) {
    this.periodOfEvaluationInNanoseconds = periodOfEvaluationInNanoseconds;
  }
}
