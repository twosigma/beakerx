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
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import java.util.Map;
import org.junit.Before;
import org.junit.Test;

public class MagicCommandResultOrderTest {

  public static final String DOC_CONTENTS_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR = "../../doc/contents/demoResources/beakerxTestLibrary.jar";
  private MagicCommand sut;
  private KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    this.kernel = new KernelTest("id2", new EvaluatorTest());
    this.sut = new MagicCommand(kernel);
  }

  @Test
  public void codeResultShouldBeLast() throws Exception {
    //given
    String codeAsString = "" +
            "%classpath add jar " + DOC_CONTENTS_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR +"\n"+
        "%classpath\n" +
        "code code code";
    Code code = new Code(codeAsString);
    //when
    MagicCommandResult result = sut.process(code, new Message(), 1);
    //then
    assertThat(result.getItems().get(0).getCode().get())
        .isEqualTo(new CodeWithoutCommand("code code code"));
    assertThat(result.getItems().get(1).getCode().get())
        .isEqualTo(new CodeWithoutCommand("code code code"));
  }

  @Test
  public void classpathAddJarShouldBeLast() throws Exception {
    //given
    String codeAsString = "" +
        "%classpath\n" +
        "%classpath add jar " +DOC_CONTENTS_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR+"\n";
    Code code = new Code(codeAsString);
    //when
    MagicCommandResult result = sut.process(code, new Message(), 1);
    //then
    assertThat(result.getResultMessage().isPresent()).isFalse();
  }

  @Test
  public void classpathShouldBeLast() throws Exception {
    //given
    String codeAsString = "" +
        "%classpath add jar "+DOC_CONTENTS_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR +"\n"+
        "%classpath";
    Code code = new Code(codeAsString);
    //when
    MagicCommandResult result = sut.process(code, new Message(), 1);
    //then
    assertThat(classpath(result)).isEqualTo(DOC_CONTENTS_DEMO_RESOURCES_BEAKERX_TEST_LIBRARY_JAR);
  }

  private String classpath(MagicCommandResult result) {
    Map data = (Map) result.getResultMessage().get().getContent().get("data");
    return (String) data.get(MIMEContainer.MIME.TEXT_PLAIN);
  }

}