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
package com.twosigma.beakerx.groovy;

import com.twosigma.beakerx.KernelSocketsServiceTest;
import com.twosigma.beakerx.groovy.evaluator.GroovyEvaluator;
import com.twosigma.beakerx.groovy.GroovyKernel;
import com.twosigma.jupyter.KernelRunner;
import com.twosigma.jupyter.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Map;
import java.util.Optional;

import static com.twosigma.MessageAssertions.verifyExecuteReplyMessage;
import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorManager.THE_KERNEL_IS_NOT_READY;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForErrorAndReturnIdleMessage;
import static com.twosigma.beakerx.jupyter.msg.MessageCreator.ERROR_MESSAGE;
import static org.assertj.core.api.Assertions.assertThat;

public class GroovyKernelNotReadyTest {

  private GroovyKernel kernel;
  private KernelSocketsServiceTest kernelSocketsService;

  @Before
  public void setUp() throws Exception {
    String sessionId = "sessionId2";
    GroovyEvaluator evaluator = new GroovyEvaluator(sessionId, sessionId);
    kernelSocketsService = new KernelSocketsServiceTest();
    kernel = new GroovyKernel(sessionId, evaluator, kernelSocketsService);
    // here we don't set up shell options 'kernel.setShellOptions(kernelParameters);'
    new Thread(() -> KernelRunner.run(() -> kernel)).start();
    kernelSocketsService.waitForSockets();
  }

  @After
  public void tearDown() throws Exception {
    kernelSocketsService.shutdown();
  }

  @Test
  public void evaluateWhenKernelNotReady() throws Exception {
    //given
    String code = "16/2";
    Message message = getExecuteRequestMessage(code);
    //when
    kernelSocketsService.handleMsg(message);
    Optional<Message> idleMessage = waitForErrorAndReturnIdleMessage(kernelSocketsService.getKernelSockets());
    //then
    assertThat(idleMessage).isPresent();
    verifyPublishedMsgs(kernelSocketsService);
    verifySentMsgs(kernelSocketsService);
    verifyResult(kernelSocketsService.getErrorMessage().get());
  }

  private void verifyPublishedMsgs(KernelSocketsServiceTest service) {
    assertThat(service.getBusyMessage()).isPresent();
    assertThat(service.getExecuteInputMessage()).isPresent();
    assertThat(service.getErrorMessage()).isPresent();
    assertThat(service.getIdleMessage()).isPresent();
  }

  private void verifySentMsgs(KernelSocketsServiceTest service) {
    verifyExecuteReplyMessage(service.getReplyMessage());
  }

  private void verifyResult(Message result) {
    Map content = result.getContent();
    String value = (String) content.get(ERROR_MESSAGE);
    assertThat(value).isEqualTo(THE_KERNEL_IS_NOT_READY);
  }
}