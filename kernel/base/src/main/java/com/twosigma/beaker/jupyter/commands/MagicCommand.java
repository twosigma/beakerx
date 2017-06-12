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

import com.twosigma.jupyter.Code;
import com.twosigma.beaker.jupyter.msg.MessageCreator;
import com.twosigma.beaker.mimetype.MIMEContainer;
import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.PathToJar;
import com.twosigma.jupyter.handler.KernelHandlerWrapper;
import com.twosigma.jupyter.message.Message;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.twosigma.beaker.mimetype.MIMEContainer.HTML;
import static com.twosigma.beaker.mimetype.MIMEContainer.JavaScript;
import static com.twosigma.jupyter.handler.KernelHandlerWrapper.wrapBusyIdle;

/**
 * executes magic commands and sends message
 *
 * @author lasha
 */
public class MagicCommand {

  public static final String JAVASCRIPT = "%%javascript";
  public static final String HTML = "%%html";
  public static final String BASH = "%%bash";
  public static final String LSMAGIC = "%lsmagic";
  public static final String CLASSPATH = "%classpath";
  public static final String CLASSPATH_ADD_JAR = CLASSPATH + " add jar";
  public static final String CLASSPATH_REMOVE = CLASSPATH + " remove";
  public static final String CLASSPATH_SHOW = CLASSPATH;

  private Map<String, MagicCommandFunctionality> commands = new LinkedHashMap<>();
  private MessageCreator messageCreator;
  private KernelFunctionality kernel;

  public MagicCommand(KernelFunctionality kernel) {
    this.kernel = checkNotNull(kernel);
    messageCreator = new MessageCreator(this.kernel);
    buildCommands();
  }

  public void process(Code code, Message message, int executionCount) {
    Optional<MagicCommandFunctionality> functionality = getFuntionality(code);
    if (functionality.isPresent()) {
      functionality.get().process(code, message, executionCount);
    } else {
      processUnknownCommand(code.getCommand(), message, executionCount);
    }
  }

  private void processUnknownCommand(String command, Message message, int executionCount) {
    String result = "Cell magic " + command + " not found";
    messageCreator.createMagicMessage(messageCreator.buildOutputMessage(message, result, true), executionCount, message);
  }

  private void buildCommands() {
    commands.put(JAVASCRIPT, javascript());
    commands.put(HTML, html());
    commands.put(BASH, bash());
    commands.put(LSMAGIC, lsmagic());
    commands.put(CLASSPATH_ADD_JAR, classpathAddJar());
    commands.put(CLASSPATH_REMOVE, classpathRemove());
    commands.put(CLASSPATH_SHOW, classpathShow());
  }

  private Optional<MagicCommandFunctionality> getFuntionality(Code code) {
    final String command = code.getCommand();
    Optional<String> first = commands.keySet().stream().
            filter(c -> command.matches(c + " .*?") || command.matches(c)).
            findFirst();
    return first.map(s -> this.commands.get(s));
  }

  private MagicCommandFunctionality classpathShow() {
    return (code, message, executionCount) -> {
    };
  }

  private MagicCommandFunctionality classpathRemove() {
    return (code, message, executionCount) -> {
    };
  }

  private MagicCommandFunctionality classpathAddJar() {
    return (code, message, executionCount) -> {
      wrapBusyIdle(kernel, message, () -> {
        String[] split = code.getCommand().split(" ");
        if (split.length != 4) {
          throw new RuntimeException("Wrong command format: " + CLASSPATH_ADD_JAR);
        }
        this.kernel.addJarToClasspath(new PathToJar(split[3]));
      });
    };
  }

  private MagicCommandFunctionality javascript() {
    return (code, message, executionCount) -> {
      MIMEContainer result = JavaScript(code.takeCodeWithoutCommand().asString());
      publishResults(result, message, executionCount);
    };
  }

  private MagicCommandFunctionality html() {
    return (code, message, executionCount) -> {
      MIMEContainer html = HTML("<html>" + code.takeCodeWithoutCommand().asString() + "</html>");
      publishResults(html, message, executionCount);
    };
  }

  private MagicCommandFunctionality bash() {
    return (code, message, executionCount) -> {
      String result = executeBashCode(code.takeCodeWithoutCommand());
      messageCreator.createMagicMessage(messageCreator.buildOutputMessage(message, result, false), executionCount, message);
    };
  }

  private MagicCommandFunctionality lsmagic() {
    return (code, message, executionCount) -> {
      String result = "Available magic commands:\n";
      result += commands.entrySet().stream()
              .filter(map -> map.getKey() != LSMAGIC)
              .map(Map.Entry::getKey)
              .collect(Collectors.joining(" "));
      messageCreator.createMagicMessage(messageCreator.buildOutputMessage(message, result, false), executionCount, message);
    };
  }

  private void publishResults(MIMEContainer result, Message message, int executionCount) {
    messageCreator.createMagicMessage(messageCreator.buildMessage(message, result.getMime().getMime(), result.getCode(), executionCount), executionCount, message);
  }

  private String executeBashCode(Code code) {
    String[] cmd = {"/bin/bash", "-c", code.asString()};
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
