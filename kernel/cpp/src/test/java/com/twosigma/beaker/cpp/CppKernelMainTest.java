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
package com.twosigma.beaker.cpp;

import com.twosigma.beaker.KernelSocketsServiceTest;
import com.twosigma.beaker.jupyter.comm.Comm;
import com.twosigma.jupyter.KernelParameters;
import com.twosigma.jupyter.KernelRunner;
import com.twosigma.jupyter.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.twosigma.MessageAssertions.verifyBusyMessage;
import static com.twosigma.MessageAssertions.verifyExecuteInputMessage;
import static com.twosigma.MessageAssertions.verifyExecuteReplyMessage;
import static com.twosigma.MessageAssertions.verifyExecuteResultMessage;
import static com.twosigma.MessageAssertions.verifyIdleMessage;
import static com.twosigma.beaker.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beaker.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static org.assertj.core.api.Assertions.assertThat;

public class CppKernelMainTest {

  private CppKernelMain kernel;

  private KernelSocketsServiceTest kernelSocketsService;

  @Before
  public void setUp() throws Exception {
    String sessionId = "sessionId1";
    CppEvaluator evaluator = new CppEvaluator(sessionId, sessionId);
    evaluator.setShellOptions(kernelParameters());
    kernelSocketsService = new KernelSocketsServiceTest();
    kernel = new CppKernelMain(sessionId, evaluator, kernelSocketsService);
    new Thread(() -> KernelRunner.run(() -> kernel)).start();
    kernelSocketsService.waitForSockets();
  }

  @After
  public void tearDown() throws Exception {
    kernelSocketsService.shutdown();
  }

  //@Test //disabled because of problem on jenkins
  public void evaluate() throws Exception {
    //given
    String code = "" +
            "// A basic C++ cell\n" +
            "// define a beaker_main function with an optional parameter for the return value\n" +
            "#include <iostream>\n" +
            "void beaker_main(){\n" +
            "  std::cout << \"Hello world!\" << std::endl;\n" +
            "  return;\n" +
            "}";

    Message message = getExecuteRequestMessage(code);
    //when
    kernelSocketsService.handleMsg(message);
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    //then
    assertThat(idleMessage).isPresent();
    verifyPublishedMsgs(kernelSocketsService.getPublishedMessages());
    verifySentMsgs(kernelSocketsService.getSentMessages());
    verifyResult(kernelSocketsService.getPublishedMessages().get(2));
  }

  private void verifyPublishedMsgs(List<Message> messages) {
    verifyBusyMessage(messages.get(0));
    verifyExecuteInputMessage(messages.get(1));
    verifyExecuteResultMessage(messages.get(2));
    verifyIdleMessage(messages.get(3));
  }

  private void verifySentMsgs(List<Message> messages) {
    verifyExecuteReplyMessage(messages.get(0));
  }

  private void verifyResult(Message result) {
    Map actual = ((Map) result.getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).isEqualTo("null\nHello world!\n");
  }

  private KernelParameters kernelParameters() {
    Map<String, Object> params = new HashMap<>();
    return new KernelParameters(params);
  }

}