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
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcome;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;
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
    Code code = CodeFactory.create(allCode, new Message(), kernel);
    MagicCommandOutcome result = executeMagicCommands(code, 3, kernel);
    MIMEContainer message = result.getItems().get(0).getMIMEContainer().get();
    assertThat(getText(message)).startsWith("PATH");
  }

  private String getText(MIMEContainer message) {
    return (String) message.getData();
  }

  private void loadMagicCommandByClass() {
    String allCode = LOAD_MAGIC + "   com.twosigma.beakerx.custom.magic.command.ShowEvnsCustomMagicCommand";
    Code code = CodeFactory.create(allCode, new Message(), kernel);
    MagicCommandOutcome result = executeMagicCommands(code, 2, kernel);
    MIMEContainer message = result.getItems().get(0).getMIMEContainer().get();
    assertThat(getText(message)).contains("Magic command %showEnvs was successfully added.");
  }

  private void addJarWithCustomMagicCommand() throws InterruptedException {
    String allCode = CLASSPATH_ADD_JAR + " " + "../../doc/resources/jar/loadMagicJarDemo.jar";
    Code code = CodeFactory.create(allCode, new Message(), kernel);
    MagicCommandOutcome result = executeMagicCommands(code, 1, kernel);
    MIMEContainer message = result.getItems().get(0).getMIMEContainer().get();
    assertThat(getText(message)).contains("Added jar: [loadMagicJarDemo.jar]");
  }

  @Test
  public void addImportFromDemoJar() throws Exception {
    //given
    //when
    addDemoJar();
    //then
    verifyAddedDemoJar();
  }

  private void verifyAddedDemoJar() throws InterruptedException {
    String code = codeForVerifyingAddedDemoJar();
    Message message = getExecuteRequestMessage(code);
    //when
    kernelSocketsService.handleMsg(message);
    //then
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    waitForResult(kernelSocketsService.getKernelSockets());
    verifyResultOfAddedJar(kernelSocketsService.getExecuteResultMessage().get());
  }

  protected String codeForVerifyingAddedDemoJar() {
    return "import com.example.Demo\n" +
            "new Demo().getObjectTest()";
  }

  private void verifyResultOfAddedJar(Message message) {
    Map actual = ((Map) message.getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).contains("Demo_test_123");
  }

  private void addDemoJar() {
    String allCode = CLASSPATH_ADD_JAR + " " + "../../doc/resources/jar/demo.jar";
    Code code = CodeFactory.create(allCode, new Message(), kernel);
    MagicCommandOutcome result = executeMagicCommands(code, 1, kernel);
    MIMEContainer message = result.getItems().get(0).getMIMEContainer().get();
    assertThat(getText(message)).contains("Added jar: [demo.jar]");
  }


}
