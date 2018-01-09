/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.kernel.magic.command.functionality;

import com.twosigma.beakerx.KernelExecutionTest;
import com.twosigma.beakerx.KernelSetUpFixtureTest;
import com.twosigma.beakerx.jupyter.handler.JupyterHandlerTest;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;
import org.assertj.core.api.Assertions;
import org.junit.Test;

import java.util.Map;
import java.util.Optional;

import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static org.assertj.core.api.Assertions.assertThat;

public abstract class ClasspathAddDynamicMagicCommandTest extends KernelSetUpFixtureTest {

  public void handleDynamicMagics() throws InterruptedException {
    //given
    String code = "" +
            "a = true" + "\n" +
            "b = \"" + KernelExecutionTest.DEMO_JAR + "\"" + "\n" +
            "c = \"/tmp/dictC\"" + "\n";
    runCode(code);
    //when
    String magicCode = "%classpath add dynamic a ? b : c" + "\n";
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(magicCode);
    kernelSocketsService.handleMsg(magicMessage);
    //then
    Optional<Message> resultMagic = waitForResult(kernelSocketsService.getKernelSockets());
    Assertions.assertThat(resultMagic).isPresent();
    verifyResult(resultMagic.get());
  }

  private void runCode(String code) throws InterruptedException {
    Message message = JupyterHandlerTest.createExecuteRequestMessage(code);
    kernelSocketsService.handleMsg(message);
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    kernelSocketsService.clear();
  }

  private void verifyResult(Message result) {
    Map actual = ((Map) result.getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).contains("demo.jar");
  }
}
