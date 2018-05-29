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

import com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.TestWidgetUtils;
import org.junit.Test;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.twosigma.MessageAssertions.verifyExecuteReplyMessage;
import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForErrorMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForSentMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForStderr;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForStdouts;
import static com.twosigma.beakerx.kernel.magic.command.functionality.AddImportMagicCommand.IMPORT;
import static com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddJarMagicCommand.CLASSPATH_ADD_JAR;
import static com.twosigma.beakerx.kernel.magic.command.functionality.LoadMagicMagicCommand.LOAD_MAGIC;
import static com.twosigma.beakerx.kernel.magic.command.functionality.UnImportMagicCommand.UNIMPORT;
import static org.assertj.core.api.Assertions.assertThat;

public abstract class KernelExecutionTest extends KernelSetUpFixtureTest {

  public static final String DEMO_RESOURCES_JAR = "../../doc/resources/jar";
  public static final String DEMO_JAR_NAME = "demo.jar";
  public static final String DEMO_JAR = DEMO_RESOURCES_JAR + "/" + DEMO_JAR_NAME;
  public static final String LOAD_MAGIC_JAR_DEMO_JAR_NAME = "loadMagicJarDemo.jar";
  public static final String LOAD_MAGIC_DEMO_JAR = DEMO_RESOURCES_JAR + "/" + LOAD_MAGIC_JAR_DEMO_JAR_NAME;

  @Test
  public void evaluate16Divide2() throws Exception {
    //given
    String code = codeFor16Divide2();
    Message message = getExecuteRequestMessage(code);
    //when
    getKernelSocketsService().handleMsg(message);
    //then
    Optional<Message> idleMessage = waitForIdleMessage(getKernelSocketsService().getKernelSockets());
    assertThat(idleMessage).isPresent();
    Optional<Message> result = waitForResult(getKernelSocketsService().getKernelSockets());
    checkResultForErrors(result, code);
    assertThat(result).isPresent();
    verifyResult(result.get());
    verifyPublishedMsgs(getKernelSocketsService());
    waitForSentMessage(getKernelSocketsService().getKernelSockets());
    verifySentMsgs(getKernelSocketsService());
  }

  protected void checkResultForErrors(Optional<Message> result, String code) throws InterruptedException {
    if (!result.isPresent()) {
      Optional<Message> error = waitForErrorMessage(getKernelSocketsService().getKernelSockets());
      String errorMsg;
      if (error.isPresent()) {
        errorMsg = "Error message received instead of result:\n"
                + "Code: " + code + "\n"
                + error.get().getContent().toString() + "\n";
      } else {
        errorMsg = "Result nor error messages found:\n" +
                String.join(",",
                        getKernelSocketsService().getPublishedMessages().stream()
                                .map(m -> m.getHeader().getType())
                                .collect(Collectors.toList())) + "\n";
      }
      throw new AssertionError(errorMsg);
    }
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

  private void verifyLoadedMagicCommand() throws InterruptedException {
    String allCode = "%showEnvs";
    Code code = CodeFactory.create(allCode, commMsg(), getKernel());
    code.execute(getKernel(), 3);
    List<Message> std = waitForStdouts(getKernelSocketsService().getKernelSockets());
    String text = (String) std.get(1).getContent().get("text");
    assertThat(text).contains("PATH");
  }

  private void loadMagicCommandByClass() throws InterruptedException {
    String allCode = LOAD_MAGIC + "   com.twosigma.beakerx.custom.magic.command.ShowEnvsCustomMagicCommand";
    Code code = CodeFactory.create(allCode, commMsg(), getKernel());
    code.execute(getKernel(), 2);
    List<Message> std = waitForStdouts(getKernelSocketsService().getKernelSockets());
    String text = (String) std.get(0).getContent().get("text");
    assertThat(text).contains("Magic command %showEnvs was successfully added.");
  }

  private void addJarWithCustomMagicCommand() throws InterruptedException {
    String allCode = CLASSPATH_ADD_JAR + " " + LOAD_MAGIC_DEMO_JAR;
    Code code = CodeFactory.create(allCode, commMsg(), getKernel());
    code.execute(getKernel(), 1);
    Optional<Message> updateMessage = EvaluatorResultTestWatcher.waitForUpdateMessage(getKernelSocketsService().getKernelSockets());
    String text =  (String) TestWidgetUtils.getState(updateMessage.get()).get("value");
    assertThat(text).contains("loadMagicJarDemo.jar");
  }

  @Test
  public void shouldImportFromAddedDemoJar() throws Exception {
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
    getKernelSocketsService().handleMsg(message);
    //then
    Optional<Message> idleMessage = waitForIdleMessage(getKernelSocketsService().getKernelSockets());
    assertThat(idleMessage).isPresent();
    Optional<Message> result = waitForResult(getKernelSocketsService().getKernelSockets());
    checkResultForErrors(result, code);
    verifyResultOfAddedJar(result.get());
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

  protected void addDemoJar() throws InterruptedException {
    String allCode = CLASSPATH_ADD_JAR + " " + DEMO_JAR;
    Code code = CodeFactory.create(allCode, commMsg(), getKernel());
    code.execute(getKernel(), 1);
    Optional<Message> updateMessage = EvaluatorResultTestWatcher.waitForUpdateMessage(getKernelSocketsService().getKernelSockets());
    String text =  (String) TestWidgetUtils.getState(updateMessage.get()).get("value");
    assertThat(text).contains("demo.jar");
  }

  @Test
  public void shouldImportDemoClassByMagicCommand() throws Exception {
    //given
    addDemoJar();
    String path = pathToDemoClassFromAddedDemoJar();
    //when
    Code code = CodeFactory.create(IMPORT + " " + path, commMsg(), getKernel());
    code.execute(kernel,1);
    //then
    verifyImportedDemoClassByMagicCommand();
  }
  private void verifyImportedDemoClassByMagicCommand() throws InterruptedException {
    String allCode = getObjectTestMethodFromAddedDemoJar();
    Message message = getExecuteRequestMessage(allCode);
    getKernelSocketsService().handleMsg(message);
    Optional<Message> idleMessage = waitForIdleMessage(getKernelSocketsService().getKernelSockets());
    assertThat(idleMessage).isPresent();
    Optional<Message> result = waitForResult(getKernelSocketsService().getKernelSockets());
    checkResultForErrors(result, allCode);
    assertThat(result).isPresent();
    Map actual = ((Map) result.get().getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).isEqualTo("Demo_test_123");
  }

  protected String pathToDemoClassFromAddedDemoJar() {
    return "com.example.Demo";
  }

  protected String getObjectTestMethodFromAddedDemoJar() {
    return "new Demo().getObjectTest()";
  }

  @Test
  public void shouldImportDemoClassWithWildcardByMagicCommand() throws Exception {
    //given
    addDemoJar();
    String path = pathToDemoClassFromAddedDemoJar();
    String allCode = IMPORT + " " + path.substring(0, path.lastIndexOf(".")) + ".*";
    //when
    Code code = CodeFactory.create(allCode, commMsg(), getKernel());
    code.execute(kernel,1);
    //then
    verifyImportedDemoClassByMagicCommand();
  }

  @Test
  public void shouldNotImportClassesFromUnknownPackageWithWildcardByMagicCommand() throws Exception {
    //given
    String path = pathToDemoClassFromAddedDemoJar();
    String allCode = IMPORT + " " + (path.substring(0, path.lastIndexOf(".")) + "Unknown.*");
    addDemoJar();
    //when
    Code code = CodeFactory.create(allCode, commMsg(), getKernel());
    code.execute(kernel,1);
    //then
    List<Message> std = waitForStderr(getKernelSocketsService().getKernelSockets());
    String text = (String) std.get(0).getContent().get("text");
    assertThat(text).contains("Could not import");
  }

  @Test
  public void shouldNotImportUnknownClassByMagicCommand() throws Exception {
    //given
    String allCode = IMPORT + " " + pathToDemoClassFromAddedDemoJar() + "UnknownClass";
    //when
    Code code = CodeFactory.create(allCode, commMsg(), getKernel());
    code.execute(kernel,1);
    //then
    List<Message> std = waitForStderr(getKernelSocketsService().getKernelSockets());
    String text = (String) std.get(0).getContent().get("text");
    assertThat(text).contains("Could not import");
  }

  @Test
  public void shouldUnimportDemoClassByMagicCommand() throws Exception {
    //given
    addDemoJar();
    String path = pathToDemoClassFromAddedDemoJar();
    Code code = CodeFactory.create(IMPORT + " " + path, commMsg(), getKernel());
    code.execute(kernel,1);
    //when
    Code code2 = CodeFactory.create(UNIMPORT + " " + path, commMsg(), getKernel());
    code2.execute(kernel,2);
    //then
    //assertThat(status).isEqualTo(MagicCommandOutcomeItem.Status.OK);
    verifyUnImportedDemoClassByMagicCommand();
  }

  protected void verifyUnImportedDemoClassByMagicCommand() throws InterruptedException {
    String allCode = getObjectTestMethodFromAddedDemoJar();
    Message message = getExecuteRequestMessage(allCode);
    getKernelSocketsService().handleMsg(message);
    Optional<Message> idleMessage = waitForIdleMessage(getKernelSocketsService().getKernelSockets());
    assertThat(idleMessage).isPresent();
    Optional<Message> errorMessage = waitForErrorMessage(getKernelSocketsService().getKernelSockets());
    Object actual = ((Map) errorMessage.get().getContent()).get("text");
    String value = (String) actual;
    assertThat(value).contains(unimportErrorMessage());
  }

  protected String unimportErrorMessage() {
    return "unable";
  }

}
