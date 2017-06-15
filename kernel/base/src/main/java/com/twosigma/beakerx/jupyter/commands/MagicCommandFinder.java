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
package com.twosigma.beakerx.jupyter.commands;

import com.twosigma.beakerx.jupyter.msg.MessageCreator;
import com.twosigma.jupyter.Code;
import com.twosigma.jupyter.message.Message;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class MagicCommandFinder {

  private List<MagicCommandResultItem> errors = new ArrayList<>();
  private Map<String, MagicCommandFunctionality> functionalitiesToRun = new HashMap<>();

  public MagicCommandFinder(Map<String, MagicCommandFunctionality> functionalityToRun, List<MagicCommandResultItem> errors) {
    this.errors = errors;
    this.functionalitiesToRun = functionalityToRun;
  }

  public static MagicCommandFinder find(Code code, Map<String, MagicCommandFunctionality> commands, Message message, int executionCount, MessageCreator messageCreator) {
    List<MagicCommandResultItem> errors = new ArrayList<>();
    Map<String, MagicCommandFunctionality> functionalityToRun = new HashMap<>();
    code.getCommands().forEach(command -> {
      Optional<MagicCommandFunctionality> functionality = findFunctionality(commands, command);
      if (functionality.isPresent()) {
        functionalityToRun.put(command, functionality.get());
      } else {
        errors.add(processUnknownCommand(command, message, executionCount, messageCreator));
      }
    });
    return new MagicCommandFinder(functionalityToRun, errors);
  }

  private static Optional<MagicCommandFunctionality> findFunctionality(final Map<String, MagicCommandFunctionality> commands, final String command) {
    return commands.keySet().stream().
            filter(c -> command.matches(c + " .*?") || command.matches(c)).
            findFirst().map(s -> commands.get(s));
  }

  private static MagicCommandResultItem processUnknownCommand(String command, Message message, int executionCount, MessageCreator messageCreator) {
    String result = "Cell magic " + command + " not found";
    return new MagicCommandResultItem(
            messageCreator.buildOutputMessage(message, result, true),
            messageCreator.buildReplyWithoutStatus(message, executionCount)
    );
  }

  public boolean hasErrors() {
    return !errors.isEmpty();
  }

  public List<MagicCommandResultItem> getErrors() {
    return errors;
  }

  public Map<String, MagicCommandFunctionality> getFunctionalitiesToRun() {
    return functionalitiesToRun;
  }
}
