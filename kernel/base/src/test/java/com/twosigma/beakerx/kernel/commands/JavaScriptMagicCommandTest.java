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

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.jupyter.handler.JupyterHandlerTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.commands.item.CommandItem;
import com.twosigma.beakerx.kernel.commands.type.JavascriptMagicCommand;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import com.twosigma.beakerx.message.Message;
import org.junit.Before;
import org.junit.Test;

import java.util.Map;

import static com.twosigma.beakerx.kernel.commands.type.Command.JAVASCRIPT;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class JavaScriptMagicCommandTest {

  private MessageCreator messageCreator;
  private JavascriptMagicCommand javascriptMagicCommand;
  private KernelTest kernel;
  private CommandExecutor commandExecutor;
  private CommandProcessor commandProcessor;

  @Before
  public void setUp() throws Exception {
    this.kernel = new KernelTest();
    this.messageCreator = new MessageCreator(kernel);
    this.javascriptMagicCommand = new JavascriptMagicCommand(messageCreator);
    this.commandExecutor = new CommandExecutorImpl(kernel);
    this.commandProcessor = new CommandProcessorImpl(commandExecutor.getCommands());
  }

  @Test
  public void handleJavaScriptMagicCommand() throws Exception {
    //given
    Message message = new Message();
    String jsCode =
            "require.config({\n" +
                    "  paths: {\n" +
                    "      d3: '//cdnjs.cloudflare.com/ajax/libs/d3/3.4.8/d3.min'\n" +
                    "  }});";
    //when
    CommandItem commandItem = javascriptMagicCommand.build().process(jsCode, message, 1);
    //then
    Map data = (Map) commandItem.getResult().get().getContent().get(Comm.DATA);
    String toCompare = (String)data.get(MIMEContainer.MIME.APPLICATION_JAVASCRIPT);
    
    toCompare = toCompare.replaceAll("\\s+","");
    jsCode = jsCode.replaceAll("\\s+","");
    
    assertThat(toCompare.trim()).isEqualTo(jsCode);
  }
  
  
  @Test
  public void shouldCreateMsgWithWrongMagic() throws Exception {
    //given
    String jsCode = System.lineSeparator() + "alert()";
    String finalCode = JAVASCRIPT + "wrong" + jsCode;

    //when
    Message message = JupyterHandlerTest.createExecuteRequestMessage(new Code(finalCode));

    //then
    assertThatThrownBy(() -> commandProcessor.process(message, 1))
                                             .isInstanceOf(RuntimeException.class)
                                             .hasMessage("Cell magic %%javascriptwrong not found");
  }

}
