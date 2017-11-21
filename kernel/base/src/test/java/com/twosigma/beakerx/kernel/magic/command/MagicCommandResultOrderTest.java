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

import static com.twosigma.beakerx.kernel.handler.MagicCommandExecutor.executeMagicCommands;
import static org.assertj.core.api.Assertions.assertThat;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.message.Message;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class MagicCommandResultOrderTest {

  public static final String DOC_CONTENTS_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR = "../../doc/resources/jar/demo.jar";
  private KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    this.kernel = new KernelTest("id2", new EvaluatorTest());
  }

  @After
  public void tearDown() throws Exception {
    kernel.exit();
  }

  @Test
  public void codeResultShouldBeLast() throws Exception {
    //given
    String allCode = "" +
            "%classpath add jar " + DOC_CONTENTS_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR + "\n" +
            "%classpath\n" +
            "code code code";
    //when
    Code code = CodeFactory.create(allCode, new Message(), 1, kernel);
    //then
    assertThat(code.getCodeBlock().get()).isEqualTo("code code code");
  }

  @Test
  public void classpathAddJarShouldBeLast() throws Exception {
    //given
    String allCode = "" +
            "%classpath\n" +
            "%classpath add jar " + DOC_CONTENTS_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR + "\n";
    Code code = CodeFactory.create(allCode, new Message(), 1, kernel);
    //when
    MagicCommandResult result = executeMagicCommands(code, 1, kernel);
    //then
    assertThat(result.getItems().get(0).getResult().isPresent()).isTrue();
  }

  @Test
  public void classpathShouldBeLast() throws Exception {
    //given
    String allCode = "" +
            "%classpath add jar " + DOC_CONTENTS_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR + "\n" +
            "%classpath";
    Code code = CodeFactory.create(allCode, new Message(), 1, kernel);
    //when
    MagicCommandResult result = executeMagicCommands(code, 1, kernel);
    //then
    assertThat(classpath(result)).isEqualTo(DOC_CONTENTS_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR);
  }

  private String classpath(MagicCommandResult result) {
    return result.getItems().get(1).getResult().get().getContent().get("text").toString();
  }

}
