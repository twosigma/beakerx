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

package com.twosigma.beakerx.jupyter.handler;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.handler.ExecuteRequestHandler;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.TestWidgetUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Optional;

import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForStreamMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForUpdateMessage;
import static com.twosigma.beakerx.kernel.magic.command.functionality.JavaScriptMagicCommand.JAVASCRIPT;
import static com.twosigma.beakerx.mimetype.MIMEContainer.MIME.APPLICATION_JAVASCRIPT;
import static com.twosigma.beakerx.mimetype.MIMEContainer.MIME.TEXT_PLAIN;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getValueForProperty;
import static org.assertj.core.api.Assertions.assertThat;

public class ExecuteRequestHandlerMagicCommandTest {

  public static final String BEAKERX_CLASSPATH_TEST_JAR = "BeakerXClasspathTest.jar";
  public static final String DEMO_FILES_DEMO_RESOURCES_BEAKER_XCLASSPATH_TEST_JAR = "../../doc/resources/jar/" + BEAKERX_CLASSPATH_TEST_JAR;
  public static final String DEMO_JAR = "demo.jar";
  public static final String DEMO_FILES_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR = "../../doc/resources/jar/" + DEMO_JAR;
  public static final String COM_TWOSIGMA_BEAKERX_WIDGET_INT_SLIDER = "com.twosigma.beakerx.widget.IntSlider";
  public static final String CODE_CODE_CODE = "code code code";

  private KernelTest kernel;
  private EvaluatorTest evaluator;
  private ExecuteRequestHandler executeRequestHandler;

  @Before
  public void setUp() {
    evaluator = new EvaluatorTest();
    kernel = new KernelTest("sid", evaluator);
    executeRequestHandler = new ExecuteRequestHandler(kernel);
  }

  @After
  public void tearDown() throws Exception {
    kernel.clearMessages();
    evaluator.exit();
  }

  @Test
  public void handleMagicClasspathAddJarAndExecuteTheCode() throws InterruptedException {
    //given
    String code = "" +
            "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKER_XCLASSPATH_TEST_JAR + "\n" +
            "import com.example.Demo;\n" +
            "Demo demo = new Demo();\n" +
            "demo.getObjectTest()\n";

    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(code);
    //when
    executeRequestHandler.handle(magicMessage);
    //then
    Optional<Message> addedJar = waitForUpdateMessage(kernel);
    assertThat(getValueForProperty(addedJar.get(), "value", String.class)).isEqualTo(BEAKERX_CLASSPATH_TEST_JAR);
    Optional<Message> result = waitForResult(kernel);
    assertThat((String) TestWidgetUtils.getData(result.get()).get(TEXT_PLAIN)).contains("import com.example.Demo");
  }

  @Test
  public void handleMagicClasspathAddJar() throws InterruptedException {
    //when
    String code = "" +
            "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKER_XCLASSPATH_TEST_JAR;
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(code);
    executeRequestHandler.handle(magicMessage);
    //then
    Optional<Message> addedJar = waitForUpdateMessage(kernel);
    assertThat(getValueForProperty(addedJar.get(), "value", String.class)).isEqualTo(BEAKERX_CLASSPATH_TEST_JAR);
  }

  @Test
  public void handleMagicClasspathAddJarWithCode() throws InterruptedException {
    //when
    String code = "" +
            "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKER_XCLASSPATH_TEST_JAR + "\n" +
            "1+1";
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(code);
    executeRequestHandler.handle(magicMessage);
    //then
    Optional<Message> addedJar = waitForUpdateMessage(kernel);
    assertThat(getValueForProperty(addedJar.get(), "value", String.class)).isEqualTo(BEAKERX_CLASSPATH_TEST_JAR);
    Optional<Message> result = waitForResult(kernel);
    assertThat((String) TestWidgetUtils.getData(result.get()).get(TEXT_PLAIN)).contains("1+1");
  }

  @Test
  public void noResetEnvironmentForDuplicatedPath() {
    //when
    String code = "" +
            "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKER_XCLASSPATH_TEST_JAR + "\n" +
            "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKER_XCLASSPATH_TEST_JAR + "\n" +
            "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKER_XCLASSPATH_TEST_JAR + "\n";
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(code);
    executeRequestHandler.handle(magicMessage);
    //then
    assertThat(evaluator.getResetEnvironmentCounter()).isEqualTo(0);
  }

  @Test
  public void handleMagicJavaScriptCommand() throws Exception {
    //given
    String jsCode = System.lineSeparator() + "alert()";
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(JAVASCRIPT + jsCode);
    //when
    executeRequestHandler.handle(magicMessage);
    //then
    Optional<Message> result = waitForResult(kernel);
    assertThat((String) TestWidgetUtils.getData(result.get()).get(APPLICATION_JAVASCRIPT)).contains("alert()");
  }

  @Test
  public void handleImportMagicCommandAndExecuteTheCode() throws Exception {
    //given
    String code = "" +
            "%import " + COM_TWOSIGMA_BEAKERX_WIDGET_INT_SLIDER + "\n" +
            "w = new IntSlider()";
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(code);
    //when
    executeRequestHandler.handle(magicMessage);
    //then
    Optional<Message> result = waitForResult(kernel);
    assertThat((String) TestWidgetUtils.getData(result.get()).get(TEXT_PLAIN)).contains("new IntSlider()");
    assertThat(kernel.getImports().getImportPaths()).contains(new ImportPath(COM_TWOSIGMA_BEAKERX_WIDGET_INT_SLIDER));
  }

  @Test
  public void noResetEnvironmentForDuplicatedImportPath() throws Exception {
    //when
    String code = "" +
            "%import " + COM_TWOSIGMA_BEAKERX_WIDGET_INT_SLIDER + "\n" +
            "%import " + COM_TWOSIGMA_BEAKERX_WIDGET_INT_SLIDER + "\n" +
            "%import " + COM_TWOSIGMA_BEAKERX_WIDGET_INT_SLIDER + "\n";
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(code);
    executeRequestHandler.handle(magicMessage);
    waitForIdleMessage(kernel);
    //then
    assertThat(evaluator.getResetEnvironmentCounter()).isEqualTo(0);
  }

  @Test
  public void noCodeToExecute() throws InterruptedException {
    //given
    String code = "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR;
    noCode(code);
  }

  @Test
  public void noCodeToExecuteWithWhiteSpaces() throws InterruptedException {
    //given
    String code = "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR + "\n" +
            " \n" +
            " \n" +
            "    ";
    noCode(code);
  }

  private void noCode(String code) throws InterruptedException {
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(code);
    //when
    executeRequestHandler.handle(magicMessage);
    waitForIdleMessage(kernel);
    //then
    assertThat(kernel.getCode()).isNull();
  }

  @Test
  public void codeToExecute() throws InterruptedException {
    //given
    String code = "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR + "\n" +
            CODE_CODE_CODE;
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(code);
    //when
    executeRequestHandler.handle(magicMessage);
    //then
    Optional<Message> result = waitForResult(kernel);
    assertThat((String) TestWidgetUtils.getData(result.get()).get(TEXT_PLAIN)).contains(CODE_CODE_CODE);
    assertThat(kernel.getCode()).isEqualTo(CODE_CODE_CODE);
  }

  @Test
  public void handleMagicClasspathAddJarAndShowClasspath() throws Exception {
    //given
    String code = "" +
            "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR + "\n" +
            "%classpath";
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(code);
    //when
    executeRequestHandler.handle(magicMessage);
    //then
    Optional<Message> message = waitForStreamMessage(kernel);
    assertThat((String) message.get().getContent().get(MessageCreator.TEXT)).contains(DEMO_JAR);
  }

  @Test
  public void handleMagicClasspathAddJarAndShowClasspathWithCode() throws Exception {
    //given
    String codeToExecute = "5+5";
    String code = "" +
            "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR + "\n" +
            "%classpath" + "\n" +
            codeToExecute;
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(code);
    //when
    executeRequestHandler.handle(magicMessage);
    waitForIdleMessage(kernel);
    //then
    Optional<Message> message = waitForStreamMessage(kernel);
    assertThat((String) message.get().getContent().get(MessageCreator.TEXT)).contains(DEMO_JAR);
    Optional<Message> result = waitForResult(kernel);
    assertThat((String) TestWidgetUtils.getData(result.get()).get(TEXT_PLAIN)).contains(codeToExecute);
  }
}
