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
package com.twosigma.beaker.clojure;

import com.twosigma.beaker.KernelSocketsFactoryTest;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.jupyter.KernelParameters;
import com.twosigma.jupyter.KernelRunner;
import com.twosigma.jupyter.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beaker.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beaker.jvm.object.SimpleEvaluationObject.EvaluationStatus.FINISHED;
import static org.assertj.core.api.Assertions.assertThat;

public class ClojureKernelTest {

  private ClojureKernel sqlKernel;

  private KernelSocketsFactoryTest kernelSocketsFactory;

  @Before
  public void setUp() throws Exception {
    String sessionId = "sessionId1";
    ClojureEvaluator evaluator = new ClojureEvaluator(sessionId, sessionId);
    evaluator.setShellOptions(kernelParameters());
    kernelSocketsFactory = new KernelSocketsFactoryTest();
    sqlKernel = new ClojureKernel(sessionId, evaluator, kernelSocketsFactory);
    new Thread(() -> KernelRunner.run(() -> sqlKernel)).start();
    kernelSocketsFactory.waitForSockets();
  }

  @After
  public void tearDown() throws Exception {
    kernelSocketsFactory.shutdown();
  }

  @Test
  public void evaluateSql() throws Exception {
    //given
    String code = "" +
            "(def fib-seq-lazy \n" +
            "  ((fn rfib [a b] \n" +
            "     (lazy-seq (cons a (rfib b (+ a b)))))\n" +
            "   0 1))\n" +
            "(take 20 fib-seq-lazy)";
    //when
    SimpleEvaluationObject seo = sqlKernel.getEvaluatorManager().executeCode(code, new Message(), 1);
    waitForResult(seo);
    //then
    verifyResult(seo);
  }

  private void verifyResult(SimpleEvaluationObject seo) {
    assertThat(seo.getStatus()).isEqualTo(FINISHED);
    assertThat(seo.getPayload() instanceof List);
    assertThat(((List)seo.getPayload()).size()).isEqualTo(20);
  }

  private KernelParameters kernelParameters() {
    Map<String, Object> params = new HashMap<>();
    return new KernelParameters(params);
  }
}