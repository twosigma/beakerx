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

import static org.assertj.core.api.Assertions.assertThat;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.CodeWithoutCommand;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import java.util.Map;
import org.junit.Before;
import org.junit.Test;

public class ClasspathMagicCommandTest {

  private static final String SRC_TEST_RESOURCES = "./src/test/resources/";
  private static final String CLASSPATH_TO_JAR = "../../doc/contents/demoResources/BeakerXClasspathTest.jar";
  private MagicCommand sut;
  private KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    this.kernel = new KernelTest("id2", new EvaluatorTest());
    this.sut = new MagicCommand(kernel);
  }

  @Test
  public void handleClasspathAddJarMagicCommand() throws Exception {
    //given
    String codeAsString = "" +
        "%classpath add jar" + " " + CLASSPATH_TO_JAR + "\n" +
        "code code code";
    Code code = new Code(codeAsString);
    //when
    MagicCommandResult result = sut.process(code, new Message(), 1);
    //then
    assertThat(result.getCode().get()).isEqualTo(new CodeWithoutCommand("code code code"));
    assertThat(kernel.getClasspath().get(0)).isEqualTo(CLASSPATH_TO_JAR);
  }

  @Test
  public void shouldCreateMsgWithWrongMagic() throws Exception {
    //given
    String jar = SRC_TEST_RESOURCES + "BeakerXClasspathTest.jar";
    Code code = new Code("%classpath2 add jar" + " " + jar);
    //when
    MagicCommandResult result = sut.process(code, new Message(), 1);
    //then
    assertThat(result.getResultMessage().get().getContent().get("text")).isEqualTo(
        "Cell magic %classpath2 add jar ./src/test/resources/BeakerXClasspathTest.jar not found");
    assertThat(kernel.getClasspath().size()).isEqualTo(0);
  }

  @Test
  public void showClasspath() throws Exception {
    //given
    kernel.addJarToClasspath(new PathToJar(CLASSPATH_TO_JAR));
    //when
    MagicCommandResult result = sut.process(new Code("%classpath"), new Message(), 1);
    //then
    assertThat(classpath(result)).isEqualTo(CLASSPATH_TO_JAR);
  }

  @Test
  public void showClasspathShouldNotContainDuplication() throws Exception {
    //given
    kernel.addJarToClasspath(new PathToJar(CLASSPATH_TO_JAR));
    //when
    kernel.addJarToClasspath(new PathToJar(CLASSPATH_TO_JAR));
    MagicCommandResult result = sut.process(new Code("%classpath"), new Message(), 1);
    //then
    assertThat(classpath(result)).isEqualTo(CLASSPATH_TO_JAR);
  }

  private String classpath(MagicCommandResult result) {
    Map data = (Map) result.getResultMessage().get().getContent().get("data");
    return (String) data.get(MIMEContainer.MIME.TEXT_PLAIN);
  }

}
