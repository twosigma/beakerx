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
package com.twosigma.beaker.jupyter.commands;

import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.jupyter.comm.Comm;
import com.twosigma.beaker.mimetype.MIMEContainer;
import com.twosigma.jupyter.Code;
import com.twosigma.jupyter.message.Message;
import org.junit.Before;
import org.junit.Test;

import java.util.Map;

import static com.twosigma.beaker.jupyter.commands.MagicCommandAssertions.getErrorMsg;
import static com.twosigma.beaker.jupyter.commands.MagicCommandAssertions.getExecuteResultMessage;
import static org.assertj.core.api.Assertions.assertThat;

public class JavaScriptMagicCommandTest {

  private MagicCommand sut;
  private KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    this.kernel = new KernelTest();
    this.sut = new MagicCommand(kernel);
  }

  @Test
  public void handleJavaScriptMagicCommand() throws Exception {
    //given
    Message message = new Message();
    String jsCode = System.lineSeparator() + "alert()";
    Code code = new Code(MagicCommand.JAVASCRIPT + jsCode);
    //when
    sut.process(code, message, 1);
    //then
    Message actual = getExecuteResultMessage(kernel.getPublishedMessages()).get();
    Map data = (Map) actual.getContent().get(Comm.DATA);
    assertThat(data.get(MIMEContainer.MIME.APPLICATION_JAVASCRIPT.getMime())).isEqualTo(jsCode);
  }

  @Test
  public void shouldCreateMsgWithWrongMagic() throws Exception {
    //given
    Message message = new Message();
    String jsCode = System.lineSeparator() + "alert()";
    Code code = new Code(MagicCommand.JAVASCRIPT + "wrong" + jsCode);
    //when
    sut.process(code, message, 1);
    //then
    Message actual = getErrorMsg(kernel.getPublishedMessages()).get();
    assertThat(actual.getContent().get("text")).isEqualTo("Cell magic "+MagicCommand.JAVASCRIPT + "wrong"+" not found");
  }

}
