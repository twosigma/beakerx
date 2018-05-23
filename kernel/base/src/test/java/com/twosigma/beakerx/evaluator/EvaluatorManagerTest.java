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

package com.twosigma.beakerx.evaluator;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.PlainCode;
import com.twosigma.beakerx.message.Message;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.HashMap;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;

public class EvaluatorManagerTest {

  private EvaluatorTest evaluator;
  private EvaluatorManager evaluatorManager;
  private static KernelTest kernel;

  @BeforeClass
  public static void setUpClass() throws Exception {
    kernel = new KernelTest();
  }

  @Before
  public void setUp() throws Exception {
    evaluator = new EvaluatorTest();
    evaluatorManager = new EvaluatorManager(kernel, evaluator);
    evaluatorManager.setShellOptions(new EvaluatorParameters(new HashMap()));
  }

  @After
  public void tearDown() throws Exception {
    this.evaluator.exit();
  }

  @Test
  public void killAllThreads_callEvaluatorToKillAllThreads() throws Exception {
    //when
    evaluatorManager.killAllThreads();
    //then
    Assertions.assertThat(evaluator.isCallKillAllThreads()).isTrue();
  }

  @Test
  public void cancelExecution() throws Exception {
    //when
    evaluatorManager.cancelExecution();
    //then
    Assertions.assertThat(evaluator.isCallCancelExecution()).isTrue();
  }

  @Test
  public void exit_callEvaluatorToExit() throws Exception {
    //when
    evaluatorManager.exit();
    //then
    Assertions.assertThat(evaluator.isCallExit()).isTrue();
  }

  @Test
  public void executeCode_callEvaluatorToEvaluate() {
    String code = "test code";
    SimpleEvaluationObject seo = PlainCode.createSimpleEvaluationObject(code, kernel, commMsg(), 5);
    //when
    evaluatorManager.executeCode(code, seo);
    //then
    Assertions.assertThat(evaluator.getCode()).isEqualTo(code);
  }

}