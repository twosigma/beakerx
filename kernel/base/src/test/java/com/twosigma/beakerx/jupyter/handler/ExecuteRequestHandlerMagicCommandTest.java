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

import static org.assertj.core.api.Assertions.assertThat;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.commands.MagicCommand;
import com.twosigma.beakerx.kernel.handler.ExecuteRequestHandler;
import com.twosigma.beakerx.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class ExecuteRequestHandlerMagicCommandTest {

  public static final String DEMO_FILES_DEMO_RESOURCES_BEAKER_XCLASSPATH_TEST_JAR = "../../doc/contents/demoResources/BeakerXClasspathTest.jar";
  public static final String DEMO_FILES_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR = "../../doc/contents/demoResources/beakerxTestLibrary.jar";
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
  }

  @Test
  public void handleMagicClasspathAddJarAndExecuteTheCode() throws Exception {
    //given
    String code = "" +
            "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKER_XCLASSPATH_TEST_JAR + "\n" +
        "import com.beakerx.BeakerxObject;\n" +
        "BeakerxObject beakerxObject = new BeakerxObject();\n" +
        "beakerxObject.getObjectTest()\n";

    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(new Code(code));
    //when

    executeRequestHandler.handle(magicMessage);
    //then
    assertThat(kernel.getPublishedMessages().size()).isEqualTo(3);
  }

  @Test
  public void handleMagicClasspathAddJar() throws Exception {
    System.out.println("SIEMA " + System.getProperty("user.dir"));

    //when
    String code = "" +
            "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKER_XCLASSPATH_TEST_JAR;
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(new Code(code));
    executeRequestHandler.handle(magicMessage);
    //then
    assertThat(kernel.getPublishedMessages().size()).isEqualTo(3);
  }

  @Test
  public void noResetEnvironmentForDuplicatedPath() throws Exception {
    //when
    String code = "" +
            "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKER_XCLASSPATH_TEST_JAR + "\n" +
            "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKER_XCLASSPATH_TEST_JAR + "\n" +
            "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKER_XCLASSPATH_TEST_JAR + "\n";
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(new Code(code));
    executeRequestHandler.handle(magicMessage);
    //then
    assertThat(evaluator.getResetEnvironmentCounter()).isEqualTo(1);
  }

  @Test
  public void handleMagicJavaScriptCommand() throws Exception {
    //given
    String jsCode = System.lineSeparator() + "alert()";
    Code code = new Code(MagicCommand.JAVASCRIPT + jsCode);
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(code);
    //when
    executeRequestHandler.handle(magicMessage);
    //then
    assertThat(kernel.getPublishedMessages().size()).isEqualTo(4);
  }

  @Test
  public void handleImportMagicCommandAndExecuteTheCode() throws Exception {
    //given
    String code = "" +
        "%import com.twosigma.beakerx.widgets.integers.IntSlider\n" +
        "w = new IntSlider()";
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(new Code(code));
    //when
    executeRequestHandler.handle(magicMessage);
    //then
    assertThat(kernel.getPublishedMessages().size()).isEqualTo(3);
  }

  @Test
  public void noResetEnvironmentForDuplicatedImportPath() throws Exception {
    //when
    String code = "" +
        "%import com.twosigma.beakerx.widgets.integers.IntSlider\n" +
        "%import com.twosigma.beakerx.widgets.integers.IntSlider\n" +
        "%import com.twosigma.beakerx.widgets.integers.IntSlider\n";
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(new Code(code));
    executeRequestHandler.handle(magicMessage);
    //then
    assertThat(evaluator.getResetEnvironmentCounter()).isEqualTo(1);
  }

  @Test
  public void noCodeToExecute() throws Exception {
    //given
    String code = "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR;
    noCode(code);
  }

  @Test
  public void noCodeToExecuteWithWhiteSpaces() throws Exception {
    //given
    String code = "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR + "\n" +
        " \n" +
        " \n" +
        "    ";
    noCode(code);
  }

  private void noCode(String code) {
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(new Code(code));
    //when
    executeRequestHandler.handle(magicMessage);
    //then
    assertThat(kernel.getPublishedMessages().size()).isEqualTo(3);
    assertThat(kernel.getSentMessages().size()).isEqualTo(1);
    assertThat(kernel.getCode()).isNull();
  }

  @Test
  public void codeToExecute() throws Exception {
    //given
    String code = "%classpath add jar " + DEMO_FILES_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR + "\n" +
        "code code code";
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(new Code(code));
    //when
    executeRequestHandler.handle(magicMessage);
    //then
    assertThat(kernel.getPublishedMessages().size()).isEqualTo(3);
    assertThat(kernel.getCode()).isEqualTo("code code code");
  }

}
