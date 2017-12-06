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
package com.twosigma.beakerx.groovy.kernel;

import com.twosigma.beakerx.KernelCloseKernelAction;
import com.twosigma.beakerx.KernelExecutionTest;
import com.twosigma.beakerx.KernelSocketsServiceTest;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelRunner;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Map;
import java.util.Optional;

import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.groovy.TestGroovyEvaluator.groovyEvaluator;
import static org.assertj.core.api.Assertions.assertThat;

public class GroovyKernelTest extends KernelExecutionTest {

  protected static KernelSocketsServiceTest kernelSocketsService;
  protected static Kernel kernel;
  private static Thread kernelThread;

  @BeforeClass
  public static void setUp() throws Exception {
    String sessionId = "sessionId2";
    kernelSocketsService = new KernelSocketsServiceTest();
    kernel = createKernel(sessionId, kernelSocketsService, KernelCloseKernelAction.NO_ACTION);
    kernelThread = new Thread(() -> KernelRunner.run(() -> kernel));
    kernelThread.start();
    kernelSocketsService.waitForSockets();
  }

  @AfterClass
  public static void tearDown() throws Exception {
    kernelSocketsService.shutdown();
    kernelThread.join();
  }

  public KernelSocketsServiceTest getKernelSocketsService() {
    return kernelSocketsService;
  }

  public Kernel getKernel() {
    return kernel;
  }

  static protected Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    return new Groovy(sessionId, groovyEvaluator(), kernelSocketsFactory, closeKernelAction);
  }

  @Test
  public void evaluateBooleanArray() throws Exception {
    //given
    String code = "new boolean[3];";
    Message message = getExecuteRequestMessage(code);
    //when
    kernelSocketsService.handleMsg(message);
    //then
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    Optional<Message> result = waitForResult(kernelSocketsService.getKernelSockets());
    assertThat(result).isPresent();
    verifyResult(result.get());
  }

  private void verifyResult(Message result) {
    Map actual = ((Map) result.getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).isEqualTo("[false, false, false]");
  }

}