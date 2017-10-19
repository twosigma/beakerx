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

import com.google.common.collect.Lists;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.commands.item.CommandItem;
import com.twosigma.beakerx.kernel.commands.item.CommandItemWithResult;
import com.twosigma.beakerx.kernel.commands.type.AddImportMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.AddStaticImportMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.BashMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.CellTimeItMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.CellTimeMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.ClassPathRemoveJarMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.ClassPathShowMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.ClasspathAddJarMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.ClasspathAddMvnMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.DataSourceMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.DefaultDataSourcesMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.HTMLMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.JavascriptMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.LSMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.LineTimeItMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.LineTimeMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.MagicCommand;
import com.twosigma.beakerx.kernel.commands.type.UnImportMagicCommand;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import java.util.ArrayList;
import java.util.List;

public class CommandExecutorImpl implements CommandExecutor {
  private List<MagicCommand> availableCommands;
  private MessageCreator messageCreator;
  private KernelFunctionality kernel;
  private CommandProcessor commandProcessor;
  private CommandPublisher commandPublisher;

  public CommandExecutorImpl(KernelFunctionality kernel) {
    this.kernel = kernel;
    this.messageCreator = new MessageCreator(kernel);
    this.availableCommands = buildAvailableCommands();
    availableCommands.add(new LSMagicCommand(availableCommands, messageCreator));
    this.commandProcessor = new CommandProcessorImpl(availableCommands);
    this.commandPublisher = new CommandPublisherImpl(kernel);
  }

  private List<MagicCommand> buildAvailableCommands() {
    ArrayList<MagicCommand> magicCommands = Lists.newArrayList(new BashMagicCommand(messageCreator),
                                                               new HTMLMagicCommand(messageCreator),
                                                               new JavascriptMagicCommand(messageCreator),
                                                               new ClasspathAddJarMagicCommand(kernel, messageCreator),
                                                               new ClasspathAddMvnMagicCommand(kernel, messageCreator, kernel.getTempFolder().toString() + "/../beakerIvyCache"),
                                                               new ClassPathRemoveJarMagicCommand(kernel, messageCreator),
                                                               new ClassPathShowMagicCommand(kernel, messageCreator),
                                                               new AddStaticImportMagicCommand(kernel, messageCreator),
                                                               new AddImportMagicCommand(kernel, messageCreator),
                                                               new UnImportMagicCommand(kernel, messageCreator),
                                                               new LineTimeItMagicCommand(kernel, messageCreator),
                                                               new CellTimeItMagicCommand(kernel, messageCreator),
                                                               new LineTimeMagicCommand(kernel, messageCreator),
                                                               new CellTimeMagicCommand(kernel, messageCreator));

    if (kernel.getClass().getName().contains("SQL")) {
      magicCommands.add(new DefaultDataSourcesMagicCommand(kernel, messageCreator));
      magicCommands.add(new DataSourceMagicCommand(kernel, messageCreator));
    }

    return magicCommands;
  }

  @Override
  public List<MagicCommand> getCommands() {
    return availableCommands;
  }

  @Override
  public void execute(Message message, int executionCount) {
    List<CommandItem> commandItems;

    try {
      commandItems = commandProcessor.process(message, executionCount);
    } catch (IllegalStateException e) {
      commandItems = Lists.newArrayList();
      CommandItemWithResult errorMessage = new CommandItemWithResult(
          messageCreator.buildOutputMessage(message, e.getMessage(), true),
          messageCreator.buildReplyWithoutStatus(message, executionCount)
      );
      commandItems.add(errorMessage);
    }

    commandPublisher.publish(messageCreator, commandItems, message, executionCount);
  }
}
