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

import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.commands.item.MagicCommandItemWithResult;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.apache.commons.text.StrTokenizer;

public class MagicCommandFinder {

  private List<MagicCommandItemWithResult> errors = new ArrayList<>();
  private LinkedHashMap<String, MagicCommandFunctionality> functionalitiesToRun = new LinkedHashMap<>();

  private MagicCommandFinder(LinkedHashMap<String, MagicCommandFunctionality> functionalityToRun, List<MagicCommandItemWithResult> errors) {
    this.errors = errors;
    this.functionalitiesToRun = new LinkedHashMap<>(functionalityToRun);
  }

  public static MagicCommandFinder find(Code code, Map<String, MagicCommandFunctionality> commands, Message message, int executionCount, MessageCreator messageCreator) {
    List<MagicCommandItemWithResult> errors = new ArrayList<>();
    LinkedHashMap<String, MagicCommandFunctionality> functionalityToRun = new LinkedHashMap<>();
    code.getCommands().forEach(command -> {
      if (command.startsWith("%%") && isCellmagicHeadNonEmpty(command)) {
        errors.add(processIllegalCommand( "Cell magic head contains data move it to body.", message, executionCount, messageCreator));
        return;
      }

      if (command.contains("\"")) {
        int indexOfFirstQuote = command.indexOf("\"");
        command = command.substring(0, indexOfFirstQuote)
                         .replaceAll("\\s+"," ")
                         .concat(command.substring(indexOfFirstQuote, command.length()));
      } else {
        command = command.replaceAll("\\s+"," ");
      }

      Optional<MagicCommandFunctionality> functionality = findFunctionality(commands, command);
      if (functionality.isPresent()) {
        functionalityToRun.put(command, functionality.get());
      } else {
        errors.add(processIllegalCommand("Cell magic " + command + " not found", message, executionCount, messageCreator));
      }
    });
    return new MagicCommandFinder(functionalityToRun, errors);
  }

  private static boolean isCellmagicHeadNonEmpty(String command) {
    List<String> tokens = new StrTokenizer(command).getTokenList();

    return !(command.replace(tokens.get(0), "").replace(" ", "").length() < 1);
  }

  private static Optional<MagicCommandFunctionality> findFunctionality(final Map<String, MagicCommandFunctionality> commands, final String command) {
    return commands.keySet().stream().
            filter(c -> command.matches(c + " .*?") || command.matches(c)).
            findFirst().map(s -> commands.get(s));
  }

  private static MagicCommandItemWithResult processIllegalCommand(String errorMessage, Message message, int executionCount, MessageCreator messageCreator) {
    return new MagicCommandItemWithResult(
            messageCreator.buildOutputMessage(message, errorMessage, true),
            messageCreator.buildReplyWithoutStatus(message, executionCount)
    );
  }

  public boolean hasErrors() {
    return !errors.isEmpty();
  }

  public List<MagicCommandItemWithResult> getErrors() {
    return errors;
  }

  public List<String> getCommands() {
    return new ArrayList<>(functionalitiesToRun.keySet());
  }

  public MagicCommandFunctionality get(String command) {
    return functionalitiesToRun.get(command);
  }
}
