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
import com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher;
import com.twosigma.beakerx.jupyter.handler.JupyterHandlerTest;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.TestWidgetUtils;
import org.junit.Test;

import java.util.Optional;

import static com.twosigma.beakerx.KernelExecutionTest.DEMO_JAR_NAME;
import static com.twosigma.beakerx.KernelExecutionTest.LOAD_MAGIC_JAR_DEMO_JAR_NAME;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;

public abstract class ClasspathAddDynamicMagicCommandTest extends KernelSetUpFixtureTest {

  @Test
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
    verifyResult();
  }

  private void verifyResult() throws InterruptedException {
    Optional<Message> updateMessage = EvaluatorResultTestWatcher.waitForUpdateMessage(kernelSocketsService.getKernelSockets());
    String text =  (String) TestWidgetUtils.getState(updateMessage.get()).get("value");
    assertThat(text).contains("Added jar");
    assertTrue("No jar added", text.contains(DEMO_JAR_NAME));
  }

  @Test
  public void shouldSupportList() throws InterruptedException {
    //given
    String code = "" +
            "location1 = \"" + KernelExecutionTest.DEMO_JAR + "\"" + "\n" +
            "location2 = \"" + KernelExecutionTest.LOAD_MAGIC_DEMO_JAR + "\"" + "\n";
    runCode(code);
    //when
    String magicCode = "%classpath add dynamic [location1, location2]" + "\n";
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(magicCode);
    kernelSocketsService.handleMsg(magicMessage);
    //then
    verifyList();
  }

  private void verifyList() throws InterruptedException {
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    Optional<Message> updateMessage = EvaluatorResultTestWatcher.waitForUpdateMessage(kernelSocketsService.getKernelSockets());
    String text =  (String) TestWidgetUtils.getState(updateMessage.get()).get("value");
    assertThat(text).contains("Added jars");
    assertTrue("Should be two added jars", text.contains(DEMO_JAR_NAME) && text.contains(LOAD_MAGIC_JAR_DEMO_JAR_NAME));
  }

  private void runCode(String code) throws InterruptedException {
    Message message = JupyterHandlerTest.createExecuteRequestMessage(code);
    kernelSocketsService.handleMsg(message);
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    kernelSocketsService.clear();
  }
}
