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

package com.twosigma.beaker.jupyter.commands;

import com.twosigma.beaker.jupyter.msg.MessageCreator;
import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.message.Message;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * executes magic commands and sends message
 *
 * @author lasha
 */
public class MagicCommand {
  public Map<String, MagicCommandFunctionality> commands = new HashMap<String, MagicCommandFunctionality>();
  private MessageCreator messageCreator;

  public MagicCommand(KernelFunctionality kernel) {
    messageCreator = new MessageCreator(kernel);
    buildCommands();
  }


  public void processUnknownCommand(String command, Message message, int executionCount) {
    String result = "Cell magic " + command + " not found";
    messageCreator.createMagicMessage(messageCreator.buildOutputMessage(message, result, true), executionCount, message);
  }

  private void buildCommands() {
    commands.put("%%javascript", (code, message, executionCount) -> {
      code = "<html><script>" + code.replace("%%javascript", "") + "</script></html>";
      messageCreator.createMagicMessage(messageCreator.buildMessage(message, code, executionCount), executionCount, message);
    });
    commands.put("%%html", (code, message, executionCount) -> {
      code = "<html>" + code.replace("%%html", "") + "</html>";
      messageCreator.createMagicMessage(messageCreator.buildMessage(message, code, executionCount), executionCount, message);
    });
    commands.put("%%bash", (code, message, executionCount) -> {
      String result = executeBashCode(code.replace("%%bash", ""));
      messageCreator.createMagicMessage(messageCreator.buildOutputMessage(message, result, false), executionCount, message);
    });
    commands.put("%lsmagic", (code, message, executionCount) -> {
      String result = "Available magic commands:\n";
      result += commands.entrySet().stream()
          .filter(map -> map.getKey() != "%lsmagic")
          .map(Map.Entry::getKey)
          .collect(Collectors.joining(" "));
      messageCreator.createMagicMessage(messageCreator.buildOutputMessage(message, result, false), executionCount, message);
    });
  }

  private String executeBashCode(String code) {
    String[] cmd = {"/bin/bash", "-c", code};
    ProcessBuilder pb = new ProcessBuilder(cmd);
    pb.redirectErrorStream(true);
    StringBuilder output = new StringBuilder();
    try {
      Process process = pb.start();
      process.waitFor();
      String line;
      BufferedReader reader = new BufferedReader(new InputStreamReader(
          process.getInputStream()));
      while ((line = reader.readLine()) != null) {
        output.append(line).append("\n");
      }
      process.destroy();
    } catch (IOException | InterruptedException e) {
      e.printStackTrace();
    }

    return output.toString();
  }

}
