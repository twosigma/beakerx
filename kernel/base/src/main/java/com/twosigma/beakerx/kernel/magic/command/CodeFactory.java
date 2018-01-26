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
import com.twosigma.beakerx.kernel.CodeFrame;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.PlainCode;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.message.Message;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class CodeFactory {

  public static final String CELL_COMMAND_MAGIC = "%%";
  public static final String LINE_COMMAND_MAGIC = "%";

  private CodeFactory() {
  }

  public static Code create(String allCode, Message message, KernelFunctionality kernel) {
    List<CodeFrame> frames = takeCodeFrames(allCode, kernel);
    List<MagicCommandOutcomeItem> errors = frames.stream()
            .filter(x -> x.getError().isPresent())
            .map(y -> y.getError().get())
            .collect(Collectors.toList());
    return Code.createCode(allCode, frames, errors, message);
  }

  private static List<CodeFrame> takeCodeFrames(String allCode, KernelFunctionality kernel) {
    Scanner scanner = new Scanner(allCode);
    List<CodeFrame> result = new ArrayList<>();
    while (scanner.hasNextLine()) {
      String line = scanner.nextLine().trim();
      if (line.startsWith(CELL_COMMAND_MAGIC)) {
        result.add(createFrameForCellMagic(line, scanner, kernel));
      } else if (line.startsWith(LINE_COMMAND_MAGIC)) {
        result.add(createFrameForLineMagic(line, kernel));
      } else {
        result.add(createFrameForPlainCode(line, scanner));
      }
    }
    return result;
  }

  private static CodeFrame createFrameForPlainCode(String line, Scanner scanner) {
    List<String> result = new ArrayList<>();
    result.add(line);
    Pattern p = Pattern.compile("\\s*%.*");
    while (scanner.hasNext() && !scanner.hasNext(p)) {
      String str = scanner.nextLine().trim();
      result.add(str);
    }
    return new PlainCode(String.join(System.lineSeparator(), result));
  }

  private static CodeFrame createFrameForLineMagic(String line, KernelFunctionality kernel) {
    Optional<MagicCommandFunctionality> mcOption = findMagicCommandFunctionality(kernel.getMagicCommandTypes(), line);
    return mcOption
            .<CodeFrame>map(magicCommandFunctionality -> new MagicCommand(magicCommandFunctionality, line))
            .orElseGet(() -> new ErrorCodeFrame(processIllegalCommand("Inline magic " + line + " not found")));
  }

  private static CodeFrame createFrameForCellMagic(String line, Scanner scanner, KernelFunctionality kernel) {
    Optional<MagicCommandFunctionality> mcOption = findMagicCommandFunctionality(kernel.getMagicCommandTypes(), line);
    return mcOption
            .<CodeFrame>map(magicCommandFunctionality -> new MagicCommand(magicCommandFunctionality, line, takeRestOfTheCode(scanner)))
            .orElseGet(() -> new ErrorCodeFrame(processIllegalCommand("Cell magic " + line + " not found")));
  }

  private static String takeRestOfTheCode(Scanner scanner) {
    List<String> result = new ArrayList<>();
    while (scanner.hasNextLine()) {
      result.add(scanner.nextLine().trim());
    }
    return String.join(System.lineSeparator(), result);
  }

  private static Optional<MagicCommandFunctionality> findMagicCommandFunctionality(final List<MagicCommandType> commands, final String command) {
    return commands.stream()
            .filter(c -> c.getMagicCommandFunctionality().matchCommand(command))
            .map(MagicCommandType::getMagicCommandFunctionality)
            .findFirst();
  }

  private static MagicCommandOutcomeItem processIllegalCommand(String errorMessage) {
    return new MagicCommandOutput(MagicCommandOutcomeItem.Status.ERROR, errorMessage);
  }


}
