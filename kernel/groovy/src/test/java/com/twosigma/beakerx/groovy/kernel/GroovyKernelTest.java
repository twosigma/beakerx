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

import com.twosigma.beakerx.BeakerXCommRepositoryMock;
import com.twosigma.beakerx.BeakerXServerMock;
import com.twosigma.beakerx.KernelExecutionTest;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.MagicCommandConfigurationMock;
import com.twosigma.beakerx.RuntimetoolsMock;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.Configuration;
import com.twosigma.beakerx.kernel.CustomMagicCommandsEmptyImpl;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kernel.Utils;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.OutputManager;
import org.junit.Test;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.MessageFactorTest.msg;
import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForStderr;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForUpdateMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getCacheFolderFactory;
import static com.twosigma.beakerx.groovy.TestGroovyEvaluator.groovyEvaluator;
import static com.twosigma.beakerx.kernel.magic.command.functionality.AddStaticImportMagicCommand.ADD_STATIC_IMPORT;
import static org.assertj.core.api.Assertions.assertThat;

public class GroovyKernelTest extends KernelExecutionTest {

  @Override
  protected Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    return new Groovy(sessionId,
            groovyEvaluator(),
            new Configuration(
                    kernelSocketsFactory,
                    closeKernelAction,
                    getCacheFolderFactory(),
                    new CustomMagicCommandsEmptyImpl(),
                    new BeakerXCommRepositoryMock(),
                    BeakerXServerMock.create(),
                    new MagicCommandConfigurationMock(),
                    new KernelTest.BeakerXJsonMock(),
                    new RuntimetoolsMock()));
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
    verifyResult(result.get());
  }

  private void verifyResult(Message result) {
    Map actual = ((Map) result.getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).isEqualTo("[false, false, false]");
  }

  @Test
  public void outputWidget() throws Exception {
    //given
    String outputCommId = "outputCommId";
    addOutputWidget(outputCommId);
    //when
    String println = "" +
            "println(\"Hello 1\")\n" +
            "2+5";
    evaluateCode(println);
    simulateSendingUpdateMessageFromUI(outputCommId + "1");
    //then
    verifyOutputWidgetResult();
    verifyIfStreamMsgIsEarlierThanResult();
    OutputManager.setOutput(null);
  }

  private void simulateSendingUpdateMessageFromUI(String outputCommId) {
    kernelSocketsService.handleMsg(outputWidgetUpdateMessage(outputCommId));
  }

  private void verifyIfStreamMsgIsEarlierThanResult() {
    List<Message> publishedMessages = kernelSocketsService.getKernelSockets().getPublishedMessages();
    List<Message> collect = publishedMessages.stream()
            .filter(x -> (x.type().equals(JupyterMessages.STREAM) || x.type().equals(JupyterMessages.EXECUTE_RESULT)))
            .collect(Collectors.toList());
    assertThat(collect.get(0).type()).isEqualTo(JupyterMessages.STREAM);
    assertThat(collect.get(1).type()).isEqualTo(JupyterMessages.STREAM);
    assertThat(collect.get(2).type()).isEqualTo(JupyterMessages.EXECUTE_RESULT);
  }

  private void verifyOutputWidgetResult() throws InterruptedException {
    Optional<Message> result = waitForResult(kernelSocketsService.getKernelSockets());
    assertThat(result).isPresent();
    Map actual = ((Map) result.get().getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).isEqualTo("7");
  }

  private void evaluateCode(String println) throws InterruptedException {
    Message printlnMessage = getExecuteRequestMessage(println);
    kernelSocketsService.handleMsg(printlnMessage);
    Optional<Message> updateMessage = waitForUpdateMessage(kernelSocketsService.getKernelSockets());
    assertThat(updateMessage).isPresent();
  }

  private void addOutputWidget(String outputCommId) throws InterruptedException {
    Utils.setFixedCommUUID(outputCommId);
    String addWidget = "" +
            "import com.twosigma.beakerx.widget.Output\n" +
            "out2 = new Output()\n" +
            "OutputManager.setOutput(out2)\n" +
            "out2";
    Message addWidgetMessage = getExecuteRequestMessage(addWidget);
    kernelSocketsService.handleMsg(addWidgetMessage);
    Optional<Message> idleAddWidget = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleAddWidget).isPresent();
    kernelSocketsService.clear();
    Utils.setDefaultCommUUID();
  }

  private Message outputWidgetUpdateMessage(String outputCommId) {
    Message message = msg(JupyterMessages.COMM_MSG);
    HashMap<String, Serializable> content = new HashMap<>();
    HashMap<String, Serializable> data = new HashMap<>();
    data.put("method", "update");
    HashMap<String, Serializable> state = new HashMap<>();
    state.put("outputs", new ArrayList<>());
    data.put("state", state);
    content.put("comm_id", outputCommId);
    content.put("data", data);
    message.setContent(content);
    return message;
  }

  @Test
  public void shouldImportStaticWildcardDemoClassByMagicCommand() throws Exception {
    //given
    addDemoJar();
    String path = pathToDemoClassFromAddedDemoJar() + ".*";
    //when
    Code code = CodeFactory.create(ADD_STATIC_IMPORT + " " + path, commMsg(), getKernel());
    code.execute(kernel, 1);
    //then
    verifyStaticImportedDemoClassByMagicCommand(pathToDemoClassFromAddedDemoJar() + ".staticTest()");
    verifyStaticImportedDemoClassByMagicCommand(pathToDemoClassFromAddedDemoJar() + ".STATIC_TEST_123");
  }

  @Test
  public void shouldImportStaticMethodDemoClassByMagicCommand() throws Exception {
    //given
    addDemoJar();
    String path = pathToDemoClassFromAddedDemoJar() + ".staticTest";
    //when
    Code code = CodeFactory.create(ADD_STATIC_IMPORT + " " + path, commMsg(), getKernel());
    code.execute(kernel, 1);
    //then
    verifyStaticImportedDemoClassByMagicCommand(pathToDemoClassFromAddedDemoJar() + ".staticTest()");
  }

  @Test
  public void shouldImportStaticFieldDemoClassByMagicCommand() throws Exception {
    //given
    addDemoJar();
    String path = pathToDemoClassFromAddedDemoJar() + ".STATIC_TEST_123";
    //when
    Code code = CodeFactory.create(ADD_STATIC_IMPORT + " " + path, commMsg(), getKernel());
    code.execute(kernel, 1);
    //then
    verifyStaticImportedDemoClassByMagicCommand(pathToDemoClassFromAddedDemoJar() + ".STATIC_TEST_123");
  }

  protected void verifyStaticImportedDemoClassByMagicCommand(String path) throws InterruptedException {
    Message message = getExecuteRequestMessage(path);
    getKernelSocketsService().handleMsg(message);
    Optional<Message> idleMessage = waitForIdleMessage(getKernelSocketsService().getKernelSockets());
    assertThat(idleMessage).isPresent();
    Optional<Message> result = waitForResult(getKernelSocketsService().getKernelSockets());
    Map actual = ((Map) result.get().getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).isEqualTo("Demo_static_test_123");
  }

  @Test
  public void shouldNotImportStaticUnknownClassByMagicCommand() throws Exception {
    //given
    String allCode = ADD_STATIC_IMPORT + " " + pathToDemoClassFromAddedDemoJar() + "UnknownClass";
    //when
    Code code = CodeFactory.create(allCode, commMsg(), getKernel());
    code.execute(kernel, 1);
    //then
    verifyNotImportedStaticMagicCommand();
  }

  @Test
  public void shouldNotImportStaticUnknownFieldDemoClassByMagicCommand() throws Exception {
    //given
    addDemoJar();
    String path = pathToDemoClassFromAddedDemoJar() + ".STATIC_TEST_123_unknown";
    //when
    Code code = CodeFactory.create(ADD_STATIC_IMPORT + " " + path, commMsg(), getKernel());
    code.execute(kernel, 1);
    //then
    verifyNotImportedStaticMagicCommand();
  }

  @Test
  public void shouldNotImportStaticUnknownMethodDemoClassByMagicCommand() throws Exception {
    //given
    addDemoJar();
    String path = pathToDemoClassFromAddedDemoJar() + ".staticTest_unknown";
    //when
    Code code = CodeFactory.create(ADD_STATIC_IMPORT + " " + path, commMsg(), getKernel());
    code.execute(kernel, 1);
    //then
    verifyNotImportedStaticMagicCommand();
  }

  @Test
  public void shouldNotImportStaticNotStaticPathByMagicCommand() throws Exception {
    //given
    addDemoJar();
    String path = "garbage";
    //when
    Code code = CodeFactory.create(ADD_STATIC_IMPORT + " " + path, commMsg(), getKernel());
    code.execute(kernel, 1);
    //then
    verifyNotImportedStaticMagicCommand();
  }

  private void verifyNotImportedStaticMagicCommand() throws InterruptedException {
    List<Message> std = waitForStderr(getKernelSocketsService().getKernelSockets());
    String text = (String) std.get(0).getContent().get("text");
    assertThat(text).contains("Could not import static");
  }

}