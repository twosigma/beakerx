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
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcome;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.message.Message;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beakerx.kernel.handler.MagicCommandExecutor.executeMagicCommands;
import static com.twosigma.beakerx.kernel.magic.command.functionality.JavaScriptMagicCommand.JAVASCRIPT;
import static org.assertj.core.api.Assertions.assertThat;

public class JavaScriptMagicCommandTest {

  private KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    this.kernel = new KernelTest();
  }

  @Test
  public void handleJavaScriptMagicCommand() throws Exception {
    //given
    String jsCode =
            "require.config({\n" +
                    "  paths: {\n" +
                    "      d3: '//cdnjs.cloudflare.com/ajax/libs/d3/3.4.8/d3.min'\n" +
                    "  }});";

    Code code = CodeFactory.create(JAVASCRIPT + System.lineSeparator() + jsCode, new Message(), kernel);
    //when
    MagicCommandOutcome result = executeMagicCommands(code, 1, kernel);
    //then
    String toCompare = (String) result.getItems().get(0).getMIMEContainer().get().getData();

    toCompare = toCompare.replaceAll("\\s+", "");
    jsCode = jsCode.replaceAll("\\s+", "");

    assertThat(toCompare.trim()).isEqualTo(jsCode);
  }

  @Test
  public void shouldCreateMsgWithWrongMagic() throws Exception {
    //given
    String jsCode = System.lineSeparator() + "alert()";
    Code code = CodeFactory.create(JAVASCRIPT + "wrong" + jsCode, new Message(), kernel);
    //when
    MagicCommandOutcome result = executeMagicCommands(code, 1, kernel);
    //then
    assertThat(result.getItems().get(0).getMIMEContainer().get().getData()).isEqualTo("Cell magic " + JAVASCRIPT + "wrong" + " not found\n");
  }

}
