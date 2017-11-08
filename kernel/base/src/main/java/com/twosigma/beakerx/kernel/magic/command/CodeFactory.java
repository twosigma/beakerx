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

import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandItemWithResult;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandType;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;
import java.util.regex.Pattern;

import org.apache.commons.text.StrTokenizer;

import static java.lang.System.lineSeparator;
import static org.apache.commons.lang3.StringUtils.join;

public class CodeFactory {

  private CodeFactory() {
  }

  public static Code create(String allCode, Message message, int executionCount, KernelFunctionality kernel) {

    Scanner scanner = new Scanner(allCode);
    List<String> commandsList = takeCommands(scanner);
    String codeWithoutCommands = join(restOfTheCode(scanner), lineSeparator());

    List<MagicCommandItemWithResult> errors = new ArrayList<>();
    List<MagicCommand> magicCommands = new ArrayList<>();
    commandsList.forEach(command -> {
      if (command.startsWith("%%") && isCellmagicHeadNonEmpty(command)) {
        errors.add(processIllegalCommand("Cell magic head contains data, move it to body.", message, executionCount, kernel));
        return;
      }

      if (command.contains("\"")) {
        int indexOfFirstQuote = command.indexOf("\"");
        command = command.substring(0, indexOfFirstQuote)
                .replaceAll("\\s+", " ")
                .concat(command.substring(indexOfFirstQuote, command.length()));
      } else {
        command = command.replaceAll("\\s+", " ");
      }

      Optional<MagicCommandFunctionality> mcOption = findMagicCommandFunctionality(kernel.getMagicCommandTypes(), command);
      if (mcOption.isPresent()) {
        magicCommands.add(new MagicCommand(mcOption.get(), command));
      } else {
        errors.add(processIllegalCommand("Cell magic " + command + " not found", message, executionCount, kernel));
      }
    });
    if (codeWithoutCommands.isEmpty()) {
      return Code.createCodeWithoutCodeBlock(allCode, magicCommands, errors, message);
    }
    return Code.createCode(allCode, codeWithoutCommands, magicCommands, errors, message);
  }

  private static List<String> restOfTheCode(Scanner scanner) {
    List<String> codeWithoutCommands = new ArrayList<>();
    while (scanner.hasNext()) {
      codeWithoutCommands.add(scanner.nextLine());
    }
    return codeWithoutCommands;
  }

  private static List<String> takeCommands(Scanner scanner) {
    List<String> result = new ArrayList<>();
    Pattern p = Pattern.compile("^%.*", Pattern.MULTILINE);
    while (scanner.hasNext(p)) {
      result.add(scanner.nextLine());
    }
    return result;
  }

  private static boolean isCellmagicHeadNonEmpty(String command) {
    List<String> commands = new StrTokenizer(command).getTokenList();

    String commandWithoutOptions = removeOptionsFromHead(commands);

    return !(commandWithoutOptions.replace(commands.get(0), "")
            .replace(" ", "").length() < 1);
  }

  private static String removeOptionsFromHead(List<String> commands) {
    StringBuilder stringBuilder = new StringBuilder();
    for (String command : commands) {
      if (!(command.startsWith("-r") || command.startsWith("-n") || command.startsWith("-q"))) {
        stringBuilder.append(command);
      }
    }

    return stringBuilder.toString();
  }

  private static Optional<MagicCommandFunctionality> findMagicCommandFunctionality(final List<MagicCommandType> commands, final String command) {
    return commands.stream()
            .filter(c -> command.matches(c.getCommand() + " .*?") || command.matches(c.getCommand()))
            .map(MagicCommandType::getMagicCommandFunctionality)
            .findFirst();
  }

  private static MagicCommandItemWithResult processIllegalCommand(String errorMessage, Message message, int executionCount, KernelFunctionality kernel) {
    return new MagicCommandItemWithResult(
            MessageCreator.buildOutputMessage(message, errorMessage, true),
            MessageCreator.buildReplyWithErrorStatus(message, executionCount, kernel)
    );
  }

}
