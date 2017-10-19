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
package com.twosigma.beakerx.kernel.commands;

import static com.twosigma.beakerx.kernel.commands.type.Command.CLASSPATH;
import static com.twosigma.beakerx.kernel.commands.type.Command.CLASSPATH_ADD_JAR;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.jupyter.handler.JupyterHandlerTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.CodeWithoutCommand;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.kernel.commands.item.CommandItem;
import com.twosigma.beakerx.kernel.commands.type.ClassPathMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.ClassPathRemoveJarMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.ClassPathShowMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.ClasspathAddJarMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.ClasspathAddMvnMagicCommand;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;

import java.util.List;
import java.util.Map;

import org.assertj.core.util.Maps;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class ClasspathMagicCommandTest {

  private static final String SRC_TEST_RESOURCES = "./src/test/resources/";
  private static final String CLASSPATH_TO_JAR = SRC_TEST_RESOURCES + "dirWithTwoJars/foo.jar";
  private ClassPathMagicCommand classpathAddJarMagicCommand;
  private ClassPathMagicCommand classpathShowJarMagicCommand;
  private CommandProcessor commandProcessor;
  private CommandExecutor commandExecutor;
  private MessageCreator messageCreator;
  private KernelTest kernel;
  private EvaluatorTest evaluator;

  @Before
  public void setUp() throws Exception {
    this.evaluator = new EvaluatorTest();
    this.kernel = new KernelTest("id2", evaluator);
    this.messageCreator = new MessageCreator(kernel);
    this.classpathAddJarMagicCommand = new ClasspathAddJarMagicCommand(kernel, messageCreator);
    this.classpathShowJarMagicCommand = new ClassPathShowMagicCommand(kernel, messageCreator);
    this.commandExecutor = new CommandExecutorImpl(kernel);
    this.commandProcessor = new CommandProcessorImpl(commandExecutor.getCommands());
  }

  @After
  public void tearDown() throws Exception {
    kernel.exit();
  }

  @Test
  public void handleClasspathAddJarMagicCommand() throws Exception {
    //given
    String codeAsString = "" +
            "%classpath add jar" + " " + CLASSPATH_TO_JAR + "\n" +
            "code code code";

    Message message = JupyterHandlerTest.createExecuteRequestMessage(new Code(codeAsString));

    //when
    List<CommandItem> commandItems = commandProcessor.process(message, 1);

    //then
    assertThat(commandItems.get(1).getCode().get()).isEqualTo(new CodeWithoutCommand("code code code"));
    assertThat(kernel.getClasspath().get(0)).isEqualTo(CLASSPATH_TO_JAR);
  }

  @Test
  public void handleClasspathAddJarWildcardMagicCommand() throws Exception {
    //given
    String codeAsString = SRC_TEST_RESOURCES + "dirWithTwoJars/*";
    //when
    CommandItem commandItem = classpathAddJarMagicCommand.build()
        .process(codeAsString, new Message(), 1);
    //then
    assertThat(classpath(commandItem)).contains("foo.jar", "bar.jar");
    assertThat(evaluator.getResetEnvironmentCounter()).isEqualTo(1);
  }

  @Test
  public void shouldCreateMsgWithWrongMagic() throws Exception {
    //given
    String jar = SRC_TEST_RESOURCES + "BeakerXClasspathTest.jar";
    Message message = JupyterHandlerTest.createExecuteRequestMessage(new Code("%classpath2 add jar" + " " + jar));

    //when
    //then
    assertThatThrownBy(() -> commandProcessor.process(message, 1))
                                             .isInstanceOf(RuntimeException.class)
                                             .hasMessage("Cell magic %classpath2 add jar ./src/test/resources/BeakerXClasspathTest.jar not found");


    assertThat(kernel.getClasspath().size()).isEqualTo(0);
  }

  @Test
  public void showClasspath() throws Exception {
    //given
    kernel.addJarToClasspath(new PathToJar(CLASSPATH_TO_JAR));
    //when
    CommandItem commandItem = classpathShowJarMagicCommand.build().process(CLASSPATH, new Message(), 1);
    //then
    assertThat(classpath(commandItem)).isEqualTo(CLASSPATH_TO_JAR);
  }

  @Test
  public void showClasspathShouldNotContainDuplication() throws Exception {
    //given
    kernel.addJarToClasspath(new PathToJar(CLASSPATH_TO_JAR));
    //when
    kernel.addJarToClasspath(new PathToJar(CLASSPATH_TO_JAR));
    CommandItem process = classpathShowJarMagicCommand.build().process(CLASSPATH, new Message(), 1);
    //then
    assertThat(classpath(process)).isEqualTo(CLASSPATH_TO_JAR);
  }

  @Test
  public void allowExtraWhitespaces() {
    //given
    String code = CLASSPATH_ADD_JAR + "          " + CLASSPATH_TO_JAR;
    Message message = JupyterHandlerTest.createExecuteRequestMessage(new Code(code));

    //when
    List<CommandItem> commandItems = commandProcessor.process(message, 1);
    //then
    assertThat(classpath(commandItems.get(0))).isEqualTo("Added jar: [foo.jar]\n");
  }

  private String classpath(CommandItem commandItem) {
    return commandItem.getResult().get().getContent().get("text").toString();
  }

}
