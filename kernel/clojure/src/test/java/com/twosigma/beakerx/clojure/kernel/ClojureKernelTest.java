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
package com.twosigma.beakerx.clojure.kernel;

import com.twosigma.beakerx.KernelSocketsServiceTest;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.KernelRunner;
import com.twosigma.beakerx.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Map;
import java.util.Optional;

import static com.twosigma.MessageAssertions.verifyExecuteReplyMessage;
import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForSentMessage;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static org.assertj.core.api.Assertions.assertThat;

public class ClojureKernelTest {

  private Clojure kernel;

  private KernelSocketsServiceTest kernelSocketsService;

  @Before
  public void setUp() throws Exception {
    String sessionId = "sessionId1";
    ClojureEvaluator evaluator = new ClojureEvaluator(sessionId, sessionId, cellExecutor());
    kernelSocketsService = new KernelSocketsServiceTest();
    kernel = new Clojure(sessionId, evaluator, kernelSocketsService);
    new Thread(() -> KernelRunner.run(() -> kernel)).start();
    kernelSocketsService.waitForSockets();
  }

  @After
  public void tearDown() throws Exception {
    kernelSocketsService.shutdown();
  }

  @Test
  public void evaluate() throws Exception {
    //given
    String code = "" +
            "(def fib-seq-lazy \n" +
            "  ((fn rfib [a b] \n" +
            "     (lazy-seq (cons a (rfib b (+ a b)))))\n" +
            "   0 1))\n" +
            "(take 20 fib-seq-lazy)";
    Message message = getExecuteRequestMessage(code);
    //when
    kernelSocketsService.handleMsg(message);
    //then
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    waitForResult(kernelSocketsService.getKernelSockets());
    verifyPublishedMsgs(kernelSocketsService);
    verifyResult(kernelSocketsService.getExecuteResultMessage().get());
    waitForSentMessage(kernelSocketsService.getKernelSockets());
    verifySentMsgs(kernelSocketsService);
  }

  private void verifyPublishedMsgs(KernelSocketsServiceTest service) {
    assertThat(service.getBusyMessage()).isPresent();
    assertThat(service.getExecuteInputMessage()).isPresent();
    assertThat(service.getExecuteResultMessage()).isPresent();
    assertThat(service.getIdleMessage()).isPresent();
  }

  private void verifySentMsgs(KernelSocketsServiceTest service) {
    verifyExecuteReplyMessage(service.getReplyMessage());
  }

  private void verifyResult(Message result) {
    Map actual = ((Map) result.getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).isNotEmpty();
    //assertThat(value).contains("[0,1,1,2,3,5"); ->  https://github.com/twosigma/beakerx/issues/5147
  }
}