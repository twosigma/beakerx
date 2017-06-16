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

import com.google.common.base.Joiner;
import com.twosigma.beakerx.jvm.object.OutputCell;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.jupyter.msg.MessageCreator;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.message.Message;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.twosigma.beakerx.jupyter.commands.MagicCommandFinder.find;
import static com.twosigma.beakerx.mimetype.MIMEContainer.HTML;
import static com.twosigma.beakerx.mimetype.MIMEContainer.JavaScript;
import static com.twosigma.beakerx.mimetype.MIMEContainer.Text;

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

  public MagicCommandResult process(Code code, Message message, int executionCount) {
    MagicCommandFinder finder = find(code, this.commands, message, executionCount, this.messageCreator);
    MagicCommandResult result = new MagicCommandResult();
    if (finder.hasErrors()) {
      finder.getErrors().forEach(result::addItem);
    } else {
      Map<String, MagicCommandFunctionality> functionalitiesToRun = finder.getFunctionalitiesToRun();
      functionalitiesToRun.keySet().
              forEach(item -> {
                MagicCommandResultItem magicCommandResultItem = functionalitiesToRun.get(item).process(code, item, message, executionCount);
                result.addItem(magicCommandResultItem);
              });
    }
    return result;
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

  private MagicCommandFunctionality classpathShow() {
    return (code, command, message, executionCount) -> {
      MIMEContainer result = Text(kernel.getClasspath());
      return new MagicCommandResultItem(
              messageCreator.buildMessage(message, result.getMime().getMime(), result.getCode(), executionCount),
              messageCreator.buildReplyWithoutStatus(message, executionCount)
      );
    };
  }

  private MagicCommandFunctionality classpathRemove() {
    return (code, command, message, executionCount) -> null;
  }

  private MagicCommandFunctionality classpathAddJar() {
    return (code, command, message, executionCount) -> {
      String[] split = command.split(" ");
      if (split.length != 4) {
        throw new RuntimeException("Wrong command format: " + CLASSPATH_ADD_JAR);
      }
      this.kernel.addJarToClasspath(new PathToJar(split[3]));
      return new MagicCommandResultItem(code.takeCodeWithoutCommand());
    };
  }

  private MagicCommandFunctionality javascript() {
    return (code, command, message, executionCount) -> {
      MIMEContainer result = JavaScript(code.takeCodeWithoutCommand().asString());
      return new MagicCommandResultItem(
              messageCreator.buildMessage(message, result.getMime().getMime(), result.getCode(), executionCount),
              messageCreator.buildReplyWithoutStatus(message, executionCount)
      );
    };
  }

  private MagicCommandFunctionality html() {
    return (code, command, message, executionCount) -> {
      MIMEContainer html = HTML("<html>" + code.takeCodeWithoutCommand().asString() + "</html>");
      return new MagicCommandResultItem(
              messageCreator.buildMessage(message, html.getMime().getMime(), html.getCode(), executionCount),
              messageCreator.buildReplyWithoutStatus(message, executionCount)
      );
    };
  }

  private MagicCommandFunctionality bash() {
    return (code, command, message, executionCount) -> {
      String result = executeBashCode(code.takeCodeWithoutCommand());
      return new MagicCommandResultItem(
              messageCreator.buildOutputMessage(message, result, false),
              messageCreator.buildReplyWithoutStatus(message, executionCount)
      );
    };
  }

  private MagicCommandFunctionality lsmagic() {
    return (code, command, message, executionCount) -> {
      String result = "Available magic commands:\n";
      result += commands.entrySet().stream()
              .filter(map -> map.getKey() != LSMAGIC)
              .map(Map.Entry::getKey)
              .collect(Collectors.joining(" "));
      return new MagicCommandResultItem(
              messageCreator.buildOutputMessage(message, result, false),
              messageCreator.buildReplyWithoutStatus(message, executionCount)
      );
    };
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
