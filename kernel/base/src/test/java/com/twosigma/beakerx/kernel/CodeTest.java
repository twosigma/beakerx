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

import com.twosigma.beakerx.kernel.commands.MagicCommand;
import org.junit.Test;

import static com.twosigma.beakerx.kernel.commands.MagicCommand.CLASSPATH_ADD_JAR;
import static org.assertj.core.api.Assertions.assertThat;

public class CodeTest {

  @Test
  public void shouldReadJavaScriptCommand() throws Exception {
    //give
    String jsCode = "require.config({\n" +
            "  paths: {\n" +
            "      d3: '//cdnjs.cloudflare.com/ajax/libs/d3/3.4.8/d3.min'\n" +
            "  }});";
    //when
    Code result = new Code(MagicCommand.JAVASCRIPT + "\n" + jsCode);
    
    String toCompare = result.takeCodeWithoutCommand().get().asString().replaceAll("\\s+","");
    jsCode = jsCode.replaceAll("\\s+","");

    //then
    assertThat(result.getCommands().size()).isEqualTo(1);
    assertThat(result.getCommands().get(0)).isEqualTo(MagicCommand.JAVASCRIPT);
    assertThat(toCompare).isEqualTo(jsCode);
    //assertThat(result.takeCodeWithoutCommand()).isEqualTo(new Code(jsCode));
  }

  @Test
  public void shouldReadAllMagicCommands() throws Exception {
    //give
    String code = "" +
            CLASSPATH_ADD_JAR + " lib1.jar\n" +
            CLASSPATH_ADD_JAR + " lib2.jar\n" +
            CLASSPATH_ADD_JAR + " lib3.jar\n" +
            "code code code";
    //when
    Code result = new Code(code);
    //then
    assertThat(result.getCommands().size()).isEqualTo(3);
    assertThat(result.getCommands().get(0)).isEqualTo("%classpath add jar lib1.jar");
    assertThat(result.getCommands().get(1)).isEqualTo("%classpath add jar lib2.jar");
    assertThat(result.getCommands().get(2)).isEqualTo("%classpath add jar lib3.jar");
    assertThat(result.takeCodeWithoutCommand().get()).isEqualTo(new CodeWithoutCommand("code code code"));
  }

}