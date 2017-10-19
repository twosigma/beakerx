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
import com.twosigma.beakerx.kernel.commands.item.CommandItem;
import com.twosigma.beakerx.kernel.commands.type.MagicCommand;
import com.twosigma.beakerx.kernel.commands.type.PlainCode;
import com.twosigma.beakerx.message.Message;
import java.util.List;
import java.util.stream.Collectors;

public class CommandProcessorImpl implements CommandProcessor {

  private List<MagicCommand> availableCommands;

  public CommandProcessorImpl(
      List<MagicCommand> availableCommands) {
    this.availableCommands = availableCommands;
  }

  @Override
  public List<CommandItem> process(Message message, Integer executionCount) {
    Code code = takeCodeFrom(message);

    return buildCommandsMap(code).stream()
                                 .map(commandCode -> commandCode.getCommand().build().process(commandCode.getCode(), message, executionCount))
                                 .collect(Collectors.toList());
  }

  private List<CommandCode> buildCommandsMap(Code code) {
    List<CommandCode> commandsToExecute = Lists.newArrayList();

    for (String lineOfCode: code.asString().split("\\r\\n|\\n|\\r")) {
      lineOfCode = lineOfCode.replaceAll("\\s+", " ");
      if (isThatMagic(lineOfCode)) {
        MagicCommand magicCommandAndCode = getMagicCommandAndCode(lineOfCode);
        if (isThatMagicCell(lineOfCode)) {
          commandsToExecute.add(new CommandCode(magicCommandAndCode, code.asString().replace(magicCommandAndCode.getName(), "").trim()));
          break;
        } else {
          commandsToExecute.add(new CommandCode(magicCommandAndCode, lineOfCode.replace(magicCommandAndCode.getName(), "").trim()));
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

  private MagicCommand getMagicCommandAndCode(String code) {
    for (MagicCommand currentMagicCommand : availableCommands) {

      String[] elementsOfCommand = currentMagicCommand.getName().split("\\s");
      String[] elementsOfCode = code.split("\\s");
      if (elementsOfCommand.length > elementsOfCode.length) {
        continue;
      }

      boolean isThatCorrect = true;
      for (int i=0; i < elementsOfCommand.length; i++) {
        isThatCorrect = elementsOfCommand[i].equals(elementsOfCode[i]) && isThatCorrect;
      }

      if (isThatCorrect) {
        return currentMagicCommand;
      }
    }

    throw new IllegalStateException("Cell magic " + code + " not found");
  }

  private Boolean isThatMagic(String line) {
    return line.startsWith("%");
  }

  private Boolean isThatMagicCell(String line) {
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
