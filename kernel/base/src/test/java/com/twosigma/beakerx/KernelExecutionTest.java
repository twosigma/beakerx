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
package com.twosigma.beakerx;

import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandResult;
import com.twosigma.beakerx.message.Message;
import org.junit.Test;

import java.util.Map;
import java.util.Optional;

import static com.twosigma.MessageAssertions.verifyExecuteReplyMessage;
import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForSentMessage;
import static com.twosigma.beakerx.kernel.handler.MagicCommandExecutor.executeMagicCommands;
import static com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddJarMagicCommand.CLASSPATH_ADD_JAR;
import static com.twosigma.beakerx.kernel.magic.command.functionality.LoadMagicMagicCommand.LOAD_MAGIC;
import static com.twosigma.beakerx.kernel.msg.MessageCreator.TEXT;
import static org.assertj.core.api.Assertions.assertThat;

public abstract class KernelExecutionTest extends KernelSetUpFixtureTest {

  @Test
  public void evaluate16Divide2() throws Exception {
    //given
    String code = codeFor16Divide2();
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

  protected String codeFor16Divide2() {
    return "16/2";
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
    assertThat(value).isEqualTo("8");
  }

  @Test
  public void loadMagicCommand() throws Exception {
    //given
    addJarWithCustomMagicCommand();
    //when
    loadMagicCommandByClass();
    //then
    verifyLoadedMagicCommand();
  }

  private void verifyLoadedMagicCommand() {
    String allCode = "%showEnvs";
    Code code = CodeFactory.create(allCode, new Message(), 3, kernel);
    MagicCommandResult result = executeMagicCommands(code, 3, kernel);
    Optional<Message> message = result.getItems().get(0).getResult();
    assertThat(getText(message.get())).startsWith("{PATH");
  }

  private String getText(Message message) {
    return (String) message.getContent().get(TEXT);
  }

  private void loadMagicCommandByClass() {
    String allCode = LOAD_MAGIC + "   com.twosigma.beakerx.custom.magic.command.ShowEvnsCustomMagicCommand";
    Code code = CodeFactory.create(allCode, new Message(), 2, kernel);
    MagicCommandResult result = executeMagicCommands(code, 2, kernel);
    Optional<Message> message = result.getItems().get(0).getResult();
    assertThat(getText(message.get())).contains("Magic command %showEnvs was successfully added.");
  }

  private void addJarWithCustomMagicCommand() throws InterruptedException {
    String allCode = CLASSPATH_ADD_JAR + " " + "../../doc/contents/resources/jar/loadMagicJarDemo.jar";
    Code code = CodeFactory.create(allCode, new Message(), 1, kernel);
    MagicCommandResult result = executeMagicCommands(code, 1, kernel);
    Optional<Message> message = result.getItems().get(0).getResult();
    assertThat(getText(message.get())).contains("Added jar: [loadMagicJarDemo.jar]");
  }
}
