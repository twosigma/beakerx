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
import com.twosigma.beakerx.kernel.commands.type.PlainCode;
import com.twosigma.beakerx.kernel.commands.type.UnImportMagicCommand;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

public class CommandExecutorImpl implements CommandExecutor {

  private List<MagicCommand> availableCommands;
  private MessageCreator messageCreator;
  private KernelFunctionality kernel;

  public CommandExecutorImpl(KernelFunctionality kernel) {
    this.kernel = kernel;
    this.messageCreator = new MessageCreator(kernel);
    this.availableCommands = buildAvailableCommands();
    availableCommands.add(new LSMagicCommand(availableCommands, messageCreator));
  }

  private List<MagicCommand> buildAvailableCommands() {
    ArrayList<MagicCommand> magicCommands = Lists.newArrayList(new BashMagicCommand(messageCreator),
                                                               new HTMLMagicCommand(messageCreator),
                                                               new JavascriptMagicCommand(messageCreator),
                                                               new ClasspathAddJarMagicCommand(kernel, messageCreator),
                                                               new ClasspathAddMvnMagicCommand(kernel, messageCreator),
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
  public void execute(Message message, int executionCount) {
    try {
      Code code = takeCodeFrom(message);
      List<CommandItem> commandItems = buildCommandsMap(code).stream()
          .map(commandCode -> commandCode.getCommand().build().process(commandCode.getCode(), message, executionCount))
          .collect(Collectors.toList());


      commandItems.forEach(commandItem -> {
        if (commandItem.hasCodeToExecute() && !commandItem.hasResult()) {
          kernel.executeCode(commandItem.getCode().get().asString(), message, executionCount, (seo) -> kernel.sendIdleMessage(seo.getJupyterMessage()));
        } else if (commandItem.hasCodeToExecute() && commandItem.hasResult()) {
          kernel.publish(message);
        } else if (commandItem.hasResult()) {
          kernel.publish(commandItem.getResult().get());
          kernel.send(commandItem.getReply().get());
          kernel.sendIdleMessage(message);
        } else {
          kernel.send(commandItem.getReply().get());
          kernel.sendIdleMessage(message);
        }
      });
    } catch (IllegalStateException e) {
      CommandItemWithResult errorMessage = new CommandItemWithResult(
          messageCreator.buildOutputMessage(message, e.getMessage(), true),
          messageCreator.buildReplyWithoutStatus(message, executionCount)
      );

      kernel.publish(errorMessage.getResult().get());
      kernel.send(errorMessage.getReply().get());
      kernel.sendIdleMessage(message);
    }

  }

  private List<CommandCode> buildCommandsMap(Code code) {
    List<CommandCode> commandsToExecute = Lists.newArrayList();

    for (String lineOfCode: code.asString().split("\\r\\n|\\n|\\r")) {
      if (isThatMagic(lineOfCode)) {
        if (isThatMagicCell(lineOfCode)) {
          commandsToExecute.add(getMagicCommandCellAndCode(code));
          break;
        } else {
          commandsToExecute.add(getMagicCommandLineAndCode(lineOfCode));
        }

      } else {

        if (!commandsToExecute.isEmpty() && commandsToExecute.get(commandsToExecute.size() - 1).getCommand() instanceof PlainCode) {
          CommandCode commandCode = commandsToExecute.get(commandsToExecute.size() - 1);
          commandCode.setCode(commandCode.getCode() + "\n" + lineOfCode);
        } else {
          CommandCode commandCode = new CommandCode(new PlainCode(), lineOfCode);
          commandsToExecute.add(commandCode);
        }

      }
    }

    return commandsToExecute;
  }

  private CommandCode getMagicCommandCellAndCode(Code code) {
    return availableCommands.stream()
                            .filter(magicCommand -> code.asString().startsWith(magicCommand.getName()))
                            .map(magicCommand -> new CommandCode(magicCommand, code.asString().replace(magicCommand.getName(), "")))
                            .findFirst().orElseThrow(() -> new IllegalStateException("Cannot find magic cell command."));
  }

  private CommandCode getMagicCommandLineAndCode(String lineOfCode) {
    return availableCommands.stream()
                            .filter(magicCommand -> lineOfCode.startsWith(magicCommand.getName()))
                            .map(magicCommand -> new CommandCode(magicCommand, lineOfCode.replace(magicCommand.getName(), "")))
                            .findFirst().orElseThrow(() -> new IllegalStateException("Cannot find magic line command."));
  }

  private Boolean isThatMagic(String line) {
    return line.startsWith("%");
  }
  private Boolean isThatMagicCell(String line ) {
    return line.startsWith("%%");
  }

  private Code takeCodeFrom(Message message) {
    String code = "";
    if (null != message.getContent() && message.getContent().containsKey("code")) {
      code = ((String) message.getContent().get("code")).trim();
    }
    return new Code(code);
  }
}
