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
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.message.Message;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;
import java.util.regex.Pattern;

import static java.lang.System.lineSeparator;
import static org.apache.commons.lang3.StringUtils.join;

public class CodeFactory {

  public static final String CELL_COMMAND_MAGIC = "%%";
  public static final ArrayList<MagicCommand> NO_MAGIC_COMMANDS = new ArrayList<>();
  private static List<MagicCommandOutcomeItem> NO_ERRORS = new ArrayList<>();

  private CodeFactory() {
  }

  public static Code create(String allCode, Message message, KernelFunctionality kernel) {
    Scanner scanner = new Scanner(allCode);
    List<String> commandsList = takeCommands(scanner);
    Optional<String> codeWithoutCommands = codeWithoutCommands(scanner);
    if (!commandsList.isEmpty()) {
      return createCodeWithCommands(allCode, message, kernel, commandsList, codeWithoutCommands);
    } else {
      return createCodeWithoutCommands(allCode, message, codeWithoutCommands);
    }
  }

  private static Code createCodeWithCommands(String allCode, Message message, KernelFunctionality kernel, List<String> commandsList, Optional<String> codeWithoutCommands) {
    String firstCommand = commandsList.get(0);
    if (isCellCommand(firstCommand)) {
      return createCodeWithCellCommand(allCode, message, kernel, commandsList, codeWithoutCommands, firstCommand);
    } else {
      return createCodeWithLineMagicCommands(allCode, message, kernel, commandsList, codeWithoutCommands);
    }
  }

  private static Code createCodeWithoutCommands(String allCode, Message message, Optional<String> codeWithoutCommands) {
    if (!codeWithoutCommands.isPresent()) {
      throw new RuntimeException("No code");
    }
    return Code.createCode(allCode, codeWithoutCommands.get(), NO_MAGIC_COMMANDS, NO_ERRORS, message);
  }

  private static Code createCodeWithLineMagicCommands(String allCode, Message message, KernelFunctionality kernel, List<String> commandsList, Optional<String> codeWithoutCommands) {
    List<MagicCommand> magicCommands = new ArrayList<>();
    List<MagicCommandOutcomeItem> errors = new ArrayList<>();
    commandsList.forEach(command -> {
      Optional<MagicCommandFunctionality> mcOption = findMagicCommandFunctionality(kernel.getMagicCommandTypes(), command);
      if (mcOption.isPresent()) {
        magicCommands.add(new MagicCommand(mcOption.get(), command));
      } else {
        errors.add(processIllegalCommand("Cell magic " + command + " not found"));
      }
    });
    if (codeWithoutCommands.isPresent()) {
      return Code.createCode(allCode, codeWithoutCommands.get(), magicCommands, errors, message);
    } else {
      return Code.createCodeWithoutCodeBlock(allCode, magicCommands, errors, message);
    }
  }

  private static Code createCodeWithCellCommand(String allCode, Message message, KernelFunctionality kernel, List<String> commandsList, Optional<String> codeWithoutCommands, String firstCommand) {
    List<MagicCommandOutcomeItem> errors = new ArrayList<>();
    List<MagicCommand> magicCommands = new ArrayList<>();

    StringBuilder restOfTheCode = new StringBuilder();
    restOfTheCode.append(String.join(lineSeparator(), commandsList.subList(1, commandsList.size())));
    codeWithoutCommands.ifPresent(code -> restOfTheCode.append(code));
    Optional<MagicCommandFunctionality> mcOption = findMagicCommandFunctionality(kernel.getMagicCommandTypes(), firstCommand);
    if (mcOption.isPresent()) {
      magicCommands.add(new MagicCommand(mcOption.get(), firstCommand, restOfTheCode.toString()));
    } else {
      errors.add(processIllegalCommand("Cell magic " + firstCommand + " not found"));
    }
    return Code.createCodeWithoutCodeBlock(allCode, magicCommands, errors, message);
  }

  private static boolean isCellCommand(String command) {
    return command.startsWith(CELL_COMMAND_MAGIC);
  }

  private static Optional<String> codeWithoutCommands(Scanner scanner) {
    List<String> codeWithoutCommands = new ArrayList<>();
    while (scanner.hasNext()) {
      codeWithoutCommands.add(scanner.nextLine());
    }
    if (codeWithoutCommands.isEmpty()) {
      return Optional.empty();
    }
    return Optional.of(join(codeWithoutCommands, lineSeparator()));
  }

  private static List<String> takeCommands(Scanner scanner) {
    List<String> result = new ArrayList<>();
    Pattern p = Pattern.compile("^%.*", Pattern.MULTILINE);
    while (scanner.hasNext(p)) {
      result.add(removeExtraWhitespaces(scanner.nextLine()));
    }
    return result;
  }

  private static String removeExtraWhitespaces(String command) {
    return command.replaceAll("\\s+", " ");
  }

  private static Optional<MagicCommandFunctionality> findMagicCommandFunctionality(final List<MagicCommandType> commands, final String command) {
    return commands.stream()
            .filter(c -> command.matches(c.getCommand() + " .*?") || command.matches(c.getCommand()))
            .map(MagicCommandType::getMagicCommandFunctionality)
            .findFirst();
  }

  private static MagicCommandOutcomeItem processIllegalCommand(String errorMessage) {
    return new MagicCommandOutput(MagicCommandOutcomeItem.Status.ERROR, errorMessage);
  }

}
