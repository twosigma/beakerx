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
import com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.kernel.PlainCode;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.TestWidgetUtils;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;
import java.util.Optional;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddJarMagicCommand.CLASSPATH_ADD_JAR;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;

public class ClasspathMagicCommandTest {

  private static final String SRC_TEST_RESOURCES = "./src/test/resources/";
  public static final String FOO_JAR = "foo.jar";
  private static final String CLASSPATH_TO_JAR_PATH = SRC_TEST_RESOURCES + "dirWithTwoJars/" + FOO_JAR;

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
  public void handleClasspathAddJarMagicCommand() {
    //given
    String allCode = "" +
            CLASSPATH_ADD_JAR + " " + CLASSPATH_TO_JAR_PATH + "\n" +
            "code code code";
    Code code = CodeFactory.create(allCode, commMsg(), kernel);
    //when
    code.execute(kernel, 1);
    //then
    PlainCode actual = (PlainCode) code.getCodeFrames().get(1);
    Assertions.assertThat(actual.getPlainCode()).isEqualTo("code code code");
    assertThat(kernel.getClasspath().get(0)).contains(FOO_JAR);
  }

  @Test
  public void handleClasspathAddJarWildcardMagicCommand() throws InterruptedException {
    //given
    String allCode = "" +
            CLASSPATH_ADD_JAR + " " + SRC_TEST_RESOURCES + "dirWithTwoJars/*";
    Code code = CodeFactory.create(allCode, commMsg(), kernel);
    //when
    code.execute(kernel, 1);
    //then
    Optional<Message> updateMessage = EvaluatorResultTestWatcher.waitForUpdateMessage(kernel);
    String text =  (String) TestWidgetUtils.getState(updateMessage.get()).get("value");
    assertThat(text).contains(FOO_JAR, "bar.jar");
    assertThat(evaluator.getResetEnvironmentCounter()).isEqualTo(0);
  }

  @Test
  public void shouldCreateMsgWithWrongMagic() {
    //given
    String jar = SRC_TEST_RESOURCES + "BeakerXClasspathTest.jar";
    Code code = CodeFactory.create("%classpath2 add jar" + " " + jar, commMsg(), kernel);
    //when
    code.execute(kernel, 1);
    //then
    List<Message> std = EvaluatorResultTestWatcher.getStderr(kernel.getPublishedMessages());
    String text = (String) std.get(0).getContent().get("text");
    assertThat(text).contains("Inline magic %classpath2 add jar ./src/test/resources/BeakerXClasspathTest.jar not found\n");
    assertThat(kernel.getClasspath().size()).isEqualTo(0);
  }

  @Test
  public void showClasspath() {
    //given
    kernel.addJarsToClasspath(asList(new PathToJar(CLASSPATH_TO_JAR_PATH)));
    Code code = CodeFactory.create("%classpath", commMsg(), kernel);
    //when
    code.execute(kernel, 1);
    //then
    List<Message> std = EvaluatorResultTestWatcher.getStdouts(kernel.getPublishedMessages());
    String text = (String) std.get(0).getContent().get("text");
    assertThat(text).contains(FOO_JAR);
  }

  @Test
  public void showClasspathShouldNotContainDuplication() throws Exception {
    //given
    kernel.addJarsToClasspath(asList(new PathToJar(CLASSPATH_TO_JAR_PATH)));
    kernel.clearMessages();
    //when
    kernel.addJarsToClasspath(asList(new PathToJar(CLASSPATH_TO_JAR_PATH)));
    Code code = CodeFactory.create("%classpath", commMsg(), kernel);
    code.execute(kernel, 1);
    //then
    List<Message> std = EvaluatorResultTestWatcher.getStdouts(kernel.getPublishedMessages());
    String text = (String) std.get(0).getContent().get("text");
    assertThat(text).contains(FOO_JAR);
  }

  @Test
  public void allowExtraWhitespaces() throws InterruptedException {
    Code code = CodeFactory.create("%classpath  add  jar          " + CLASSPATH_TO_JAR_PATH, commMsg(), kernel);
    code.execute(kernel, 1);
    Optional<Message> updateMessage = EvaluatorResultTestWatcher.waitForUpdateMessage(kernel);
    String text =  (String)TestWidgetUtils.getState(updateMessage.get()).get("value");
    assertThat(text).contains(FOO_JAR);
  }

  @Test
  public void allowSpacesInJarPath() throws InterruptedException {
    Code code = CodeFactory.create("%classpath add jar \"./src/test/resources/jars/ with space.jar\"", commMsg(), kernel);
    code.execute(kernel, 1);
    Optional<Message> updateMessage = EvaluatorResultTestWatcher.waitForUpdateMessage(kernel);
    String text =  (String)TestWidgetUtils.getState(updateMessage.get()).get("value");
    assertThat(text).contains("with space.jar");
  }

}
