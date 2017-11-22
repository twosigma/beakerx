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
package com.twosigma.beakerx.kernel.magic.command;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcome;
import com.twosigma.beakerx.message.Message;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beakerx.kernel.handler.MagicCommandExecutor.executeMagicCommands;
import static org.assertj.core.api.Assertions.assertThat;

public class ClasspathMagicCommandTest {

  private static final String SRC_TEST_RESOURCES = "./src/test/resources/";
  private static final String CLASSPATH_TO_JAR = SRC_TEST_RESOURCES + "dirWithTwoJars/foo.jar";
  private KernelTest kernel;
  private EvaluatorTest evaluator;

  @Before
  public void setUp() throws Exception {
    this.evaluator = new EvaluatorTest();
    this.kernel = new KernelTest("id2", evaluator);
  }

  @After
  public void tearDown() throws Exception {
    kernel.exit();
  }

  @Test
  public void handleClasspathAddJarMagicCommand() throws Exception {
    //given
    String allCode = "" +
            "%classpath add jar" + " " + CLASSPATH_TO_JAR + "\n" +
            "code code code";
    Code code = CodeFactory.create(allCode, new Message(), kernel);
    //when
    MagicCommandOutcome result = executeMagicCommands(code, 1, kernel);
    //then
    Assertions.assertThat(code.getCodeBlock().get()).isEqualTo("code code code");
    assertThat(kernel.getClasspath().get(0)).isEqualTo(CLASSPATH_TO_JAR);
  }

  @Test
  public void handleClasspathAddJarWildcardMagicCommand() throws Exception {
    //given
    String allCode = "" +
            "%classpath add jar " + SRC_TEST_RESOURCES + "dirWithTwoJars/*";
    Code code = CodeFactory.create(allCode, new Message(), kernel);
    //when
    MagicCommandOutcome result = executeMagicCommands(code, 1, kernel);
    //then
    assertThat(classpath(result)).contains("foo.jar", "bar.jar");
    assertThat(evaluator.getResetEnvironmentCounter()).isEqualTo(1);
  }

  @Test
  public void shouldCreateMsgWithWrongMagic() throws Exception {
    //given
    String jar = SRC_TEST_RESOURCES + "BeakerXClasspathTest.jar";
    Code code = CodeFactory.create("%classpath2 add jar" + " " + jar, new Message(), kernel);
    //when
    MagicCommandOutcome result = executeMagicCommands(code, 1, kernel);
    //then
    Assertions.assertThat(result.getItems().get(0).getMIMEContainer().get().getData()).isEqualTo(
            "Cell magic %classpath2 add jar ./src/test/resources/BeakerXClasspathTest.jar not found");
    assertThat(kernel.getClasspath().size()).isEqualTo(0);
  }

  @Test
  public void showClasspath() throws Exception {
    //given
    kernel.addJarToClasspath(new PathToJar(CLASSPATH_TO_JAR));
    Code code = CodeFactory.create("%classpath", new Message(), kernel);
    //when
    MagicCommandOutcome result = executeMagicCommands(code, 1, kernel);
    //then
    assertThat(classpath(result)).isEqualTo(CLASSPATH_TO_JAR);
  }

  @Test
  public void showClasspathShouldNotContainDuplication() throws Exception {
    //given
    kernel.addJarToClasspath(new PathToJar(CLASSPATH_TO_JAR));
    //when
    kernel.addJarToClasspath(new PathToJar(CLASSPATH_TO_JAR));
    Code code = CodeFactory.create("%classpath", new Message(), kernel);
    MagicCommandOutcome result = executeMagicCommands(code, 1, kernel);
    //then
    assertThat(classpath(result)).isEqualTo(CLASSPATH_TO_JAR);
  }

  @Test
  public void allowExtraWhitespaces() {
    Code code = CodeFactory.create("%classpath  add  jar          " + CLASSPATH_TO_JAR, new Message(), kernel);
    MagicCommandOutcome result = executeMagicCommands(code, 1, kernel);
    assertThat(classpath(result)).isEqualTo("Added jar: [foo.jar]\n");
  }

  private String classpath(MagicCommandOutcome result) {
    return result.getItems().get(0).getMIMEContainer().get().getData().toString();
  }

}
