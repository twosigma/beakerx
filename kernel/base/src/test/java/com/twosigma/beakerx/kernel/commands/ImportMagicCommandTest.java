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
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.jupyter.handler.JupyterHandlerTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.CodeWithoutCommand;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.commands.item.CommandItem;
import com.twosigma.beakerx.kernel.commands.type.AddImportMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.ImportMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.UnImportMagicCommand;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class ImportMagicCommandTest {

  private KernelTest kernel;
  private ImportMagicCommand addImportMagicCommand;
  private ImportMagicCommand removeImportMagicCommand;
  private MessageCreator messageCreator;
  private CommandExecutor commandExecutor;
  private CommandProcessor commandProcessor;

  @Before
  public void setUp() throws Exception {
    this.kernel = new KernelTest("id2", new EvaluatorTest());
    this.messageCreator = new MessageCreator(kernel);
    this.addImportMagicCommand = new AddImportMagicCommand(kernel, messageCreator);
    this.removeImportMagicCommand = new UnImportMagicCommand(kernel, messageCreator);
    this.commandExecutor = new CommandExecutorImpl(kernel);
    this.commandProcessor = new CommandProcessorImpl(commandExecutor.getCommands());
  }

  @After
  public void tearDown() throws Exception {
    kernel.exit();
  }

  @Test
  public void addImport() throws Exception {
    //given
    String code = "" +
            "%import com.twosigma.beakerx.widgets.integers.IntSlider\n" +
            "w = new IntSlider()";
    Message message = JupyterHandlerTest.createExecuteRequestMessage(new Code(code));

    //when
    List<CommandItem> commandItems = commandProcessor.process(message, 1);

    //then
    assertThat(commandItems.get(1).getCode().get()).isEqualTo(new CodeWithoutCommand("w = new IntSlider()"));
    assertThat(kernel.getImports().getImportPaths()).contains(new ImportPath("com.twosigma.beakerx.widgets.integers.IntSlider"));
  }

  @Test
  public void removeImport() throws Exception {
    //given
    String addImport = "com.twosigma.beakerx.widgets.integers.IntSlider";
    addImportMagicCommand.build().process(addImport, new Message(), 1);
    assertThat(kernel.getImports().getImportPaths()).contains(new ImportPath("com.twosigma.beakerx.widgets.integers.IntSlider"));
    //when
    String removeImport = "com.twosigma.beakerx.widgets.integers.IntSlider";
    removeImportMagicCommand.build().process(removeImport, new Message(), 1);
    //then
    assertThat(kernel.getImports().getImportPaths()).doesNotContain(new ImportPath("com.twosigma.beakerx.widgets.integers.IntSlider"));
  }

  @Test
  public void allowExtraWhitespaces() {
    Message message = JupyterHandlerTest.createExecuteRequestMessage(
        new Code("%import       com.twosigma.beakerx.widgets.integers.IntSlider"));

    commandExecutor.execute(message, 1);

    assertThat(kernel.getImports().getImportPaths()).contains(new ImportPath("com.twosigma.beakerx.widgets.integers.IntSlider"));
  }

  @Test
  public void wrongImportFormat() {
    String wrongFormatImport = "%import ";
    Message message = JupyterHandlerTest.createExecuteRequestMessage(new Code(wrongFormatImport));

    assertThatThrownBy(() -> commandProcessor.process(message, 1))
                     .isInstanceOf(IllegalStateException.class);
  }

}
