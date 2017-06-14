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

package com.twosigma.beaker.jupyter.handler;

import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.evaluator.EvaluatorTest;
import com.twosigma.beaker.jupyter.commands.MagicCommand;
import com.twosigma.jupyter.Code;
import com.twosigma.jupyter.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class ExecuteRequestHandlerMagicCommandTest {

  private static KernelTest kernel;
  private ExecuteRequestHandler executeRequestHandler;


  @BeforeClass
  public static void setUpClass(){
    kernel = new KernelTest("sid", new EvaluatorTest());
  }

  @Before
  public void setUp() {
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
            "%classpath add jar BeakerXClasspathTest.jar\n" +
            "import com.beakerx.BeakerxObject;\n" +
            "BeakerxObject beakerxObject = new BeakerxObject();\n" +
            "beakerxObject.getObjectTest()\n";

    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(new Code(code));
    //when

    executeRequestHandler.handle(magicMessage);
    //then
    final List<Message> publishedMessages = kernel.getPublishedMessages();
    assertThat(publishedMessages.size()).isEqualTo(3);
  }

  @Test
  public void handleMagicClasspathAddJar() throws Exception {
    //when
    String code = "" +
            "%classpath add jar BeakerXClasspathTest.jar";
    Message magicMessage = JupyterHandlerTest.createExecuteRequestMessage(new Code(code));
    executeRequestHandler.handle(magicMessage);
    //then
    final List<Message> publishedMessages = kernel.getPublishedMessages();
    assertThat(publishedMessages.size()).isEqualTo(3);
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
    final List<Message> publishedMessages = kernel.getPublishedMessages();
    assertThat(publishedMessages.size()).isEqualTo(4);
  }

}
