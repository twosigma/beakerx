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
package com.twosigma.beakerx.kernel;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.kernel.magic.command.MagicCommand;
import com.twosigma.beakerx.message.Message;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddJarMagicCommand.CLASSPATH_ADD_JAR;
import static com.twosigma.beakerx.kernel.magic.command.functionality.JavaScriptMagicCommand.JAVASCRIPT;
import static org.assertj.core.api.Assertions.assertThat;

public class CodeTest {

  private static KernelTest kernel;
  private static EvaluatorTest evaluator;

  @BeforeClass
  public static void setUp() {
    evaluator = new EvaluatorTest();
    kernel = new KernelTest("id2", evaluator);
  }

  @AfterClass
  public static void tearDown() {
    evaluator.exit();
  }

  @Test
  public void shouldReadJavaScriptCommand() {
    //give
    String jsCode = "require.config({\n" +
            "  paths: {\n" +
            "      d3: '//cdnjs.cloudflare.com/ajax/libs/d3/3.4.8/d3.min'\n" +
            "  }});";
    //when
    Code code = CodeFactory.create(JAVASCRIPT + "\n" + jsCode, commMsg(), kernel);
    //then
    assertThat(code.getCodeFrames().size()).isEqualTo(1);
    MagicCommand magicCommand = (MagicCommand) code.getCodeFrames().get(0);
    assertThat(magicCommand.getCommand()).isEqualTo(JAVASCRIPT);
    String toCompare = magicCommand.getCommandCodeBlock().replaceAll("\\s+", "");
    jsCode = jsCode.replaceAll("\\s+", "");
    assertThat(toCompare).isEqualTo(jsCode);
    //assertThat(result.takeCodeWithoutCommand()).isEqualTo(new Code(jsCode));
  }

  @Test
  public void shouldReadAllMagicCommands() throws Exception {
    //give
    String allCode = "" +
            CLASSPATH_ADD_JAR + " lib1.jar\n" +
            CLASSPATH_ADD_JAR + " lib2.jar\n" +
            CLASSPATH_ADD_JAR + " lib3.jar\n" +
            "code code code";
    //when
    Code code = CodeFactory.create(allCode, commMsg(), kernel);
    //then
    assertThat(code.getCodeFrames().size()).isEqualTo(4);
    assertThat(((MagicCommand) code.getCodeFrames().get(0)).getCommand()).isEqualTo("%classpath add jar lib1.jar");
    assertThat(((MagicCommand) code.getCodeFrames().get(1)).getCommand()).isEqualTo("%classpath add jar lib2.jar");
    assertThat(((MagicCommand) code.getCodeFrames().get(2)).getCommand()).isEqualTo("%classpath add jar lib3.jar");
    assertThat(((PlainCode) code.getCodeFrames().get(3)).getPlainCode()).isEqualTo("code code code");
  }
}