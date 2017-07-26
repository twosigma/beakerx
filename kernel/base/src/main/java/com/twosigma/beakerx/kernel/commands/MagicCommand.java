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

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Preconditions.checkState;
import static com.twosigma.beakerx.kernel.commands.MagicCommandFinder.find;
import static com.twosigma.beakerx.mimetype.MIMEContainer.HTML;
import static com.twosigma.beakerx.mimetype.MIMEContainer.JavaScript;
import static com.twosigma.beakerx.mimetype.MIMEContainer.Text;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Maps;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.CodeWithoutCommand;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.kernel.commands.item.MagicCommandItem;
import com.twosigma.beakerx.kernel.commands.item.MagicCommandItemWithCode;
import com.twosigma.beakerx.kernel.commands.item.MagicCommandItemWithReply;
import com.twosigma.beakerx.kernel.commands.item.MagicCommandItemWithResult;
import com.twosigma.beakerx.kernel.commands.item.MagicCommandItemWithResultAndCode;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * executes magic commands and sends message
 *
 * @author lasha
 */
public class MagicCommand {

  public static final String DEFAULT_DATASOURCE = "%defaultDatasource";
  public static final String DATASOURCES = "%datasources";

  public static final String JAVASCRIPT = "%%javascript";
  public static final String HTML = "%%html";
  public static final String BASH = "%%bash";
  public static final String LSMAGIC = "%lsmagic";
  public static final String CLASSPATH = "%classpath";
  public static final String CLASSPATH_ADD_JAR = CLASSPATH + " add jar";
  public static final String CLASSPATH_REMOVE = CLASSPATH + " remove";
  public static final String CLASSPATH_SHOW = CLASSPATH;
  public static final String ADD_IMPORT = "%import";
  public static final String UNIMPORT = "%unimport";

  private Map<String, MagicCommandFunctionality> commands = new LinkedHashMap<>();
  private MessageCreator messageCreator;
  private KernelFunctionality kernel;

  public MagicCommand(KernelFunctionality kernel) {
    this.kernel = checkNotNull(kernel);
    messageCreator = new MessageCreator(this.kernel);
    buildCommands();
  }

  public MagicCommandResult process(Code code, Message message, int executionCount) {
    MagicCommandFinder finder = find(code, this.commands, message, executionCount,
            this.messageCreator);
    MagicCommandResult result = new MagicCommandResult();
    if (finder.hasErrors()) {
      finder.getErrors().forEach(result::addItem);
    } else {
      List<String> functionalitiesToRun = finder.getCommands();
      functionalitiesToRun.
              forEach(item -> {
                MagicCommandItem magicCommandResultItem = finder.get(item)
                        .process(code, item, message, executionCount);
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
    commands.put(ADD_IMPORT, addImport());
    commands.put(UNIMPORT, unimport());
    commands.put(DATASOURCES, dataSources());
    commands.put(DEFAULT_DATASOURCE, defaultDataSources());
  }

  private MagicCommandFunctionality defaultDataSources() {
    return dataSource(DEFAULT_DATASOURCE);
  }

  private MagicCommandFunctionality dataSources() {
    return dataSource(DATASOURCES);
  }

  private MagicCommandFunctionality dataSource(String source) {
    return (code, command, message, executionCount) -> {
      String[] parts = command.split(" ");
      if (parts.length != 2) {
        throw new RuntimeException("Wrong format.");
      }
      HashMap<String, Object> params = new HashMap<>();
      params.put(source, parts[1]);
      this.kernel.setShellOptions(new KernelParameters(params));
      return getMagicCommandItem(code, message, executionCount);
    };
  }

  private MagicCommandFunctionality addImport() {
    return (code, command, message, executionCount) -> {
      String[] parts = command.split(" ");
      if (parts.length != 2) {
        throw new RuntimeException("Wrong import format.");
      }
      this.kernel.addImport(new ImportPath(parts[1]));
      return getMagicCommandItem(code, message, executionCount);
    };
  }

  private MagicCommandFunctionality unimport() {
    return (code, command, message, executionCount) -> {
      String[] parts = command.split(" ");
      if (parts.length != 2) {
        throw new RuntimeException("Wrong import format.");
      }
      this.kernel.removeImport(new ImportPath(parts[1]));
      return getMagicCommandItem(code, message, executionCount);
    };
  }

  private MagicCommandFunctionality classpathShow() {
    return (code, command, message, executionCount) -> {
      MIMEContainer result = Text(kernel.getClasspath());

      if (code.takeCodeWithoutCommand().isPresent()) {
        return new MagicCommandItemWithResultAndCode(
                messageCreator.buildOutputMessage(message, result.getCode(), false),
                messageCreator.buildReplyWithoutStatus(message, executionCount),
                code.takeCodeWithoutCommand().get());
      }

      return new MagicCommandItemWithResult(
              messageCreator.buildOutputMessage(message, result.getCode(), false),
              messageCreator.buildReplyWithoutStatus(message, executionCount));
    };
  }

  private MagicCommandFunctionality classpathRemove() {
    return (code, command, message, executionCount) -> null;
  }

  private MagicCommandFunctionality classpathAddJar() {
      return (code, command, message, executionCount) -> {
          String[] split = command.split(" ");
          if (split.length != 4) {
            return sendErrorMessage(message, "Wrong command format: " + CLASSPATH_ADD_JAR, executionCount);
          }

          String path = split[3];
          if (isValidPath(path)) {
            return getMagicCommandItem(addJars(path), code, message, executionCount);
          } else {
            return sendErrorMessage(message, "Provided path is incorrect.", executionCount);
          }
      };
  }

  private MagicCommandItem sendErrorMessage(Message message, String messageText, int executionCount) {
    return new MagicCommandItemWithResult(
        messageCreator
            .buildOutputMessage(message, messageText, true),
        messageCreator.buildReplyWithoutStatus(message, executionCount)
    );
  }

  private Collection<String> addJars(String path) {
    Map<Path, String> addedJars = Maps.newHashMap();
    if (doesPathContainsWildCards(path)) {
      Map<Path, String> collect = getPaths(path).keySet().stream()
              .filter(
                      currentPath -> kernel.addJarToClasspath(new PathToJar(currentPath.toString())))
              .collect(Collectors.toMap(o -> o, Path::toString));
      addedJars.putAll(collect);
    } else {
      Path currentPath = Paths.get(path);
      if (this.kernel.addJarToClasspath(new PathToJar(path))) {
        addedJars.put(currentPath, currentPath.getFileName().toString());
      }
    }
    return addedJars.values();
  }

  private Boolean containsSingleWildcardSymbol(String path) {
    return path.length() - path.replace("*", "").length() == 1;
  }

  private Map<Path, String> getPaths(String pathWithWildcard) {
    String pathWithoutWildcards = pathWithWildcard.replace("*", "");
    try {

      Map<Path, String> paths = Files.list(Paths.get(pathWithoutWildcards))
              .filter(path -> path.toString().toLowerCase().endsWith(".jar"))
              .collect(Collectors.toMap(p -> p, o -> o.getFileName().toString()));

      if (paths == null || paths.isEmpty()) {
        throw new IllegalStateException("Cannot find any jars files in selected path");
      }

      return paths;

    } catch (IOException e) {
      throw new IllegalStateException("Cannot find any jars files in selected path");
    }
  }

  private Boolean doesPathContainsWildCards(String path) {
    return path.contains("*");
  }

  private MagicCommandItem getMagicCommandItem(Collection<String> newAddedJars, Code code, Message message, int executionCount) {
    if (newAddedJars.isEmpty()) {
      return getMagicCommandItem(code, message, executionCount);
    }

    String textMessage = "Added jar" + (newAddedJars.size() > 1 ? "s: " : ": ") + newAddedJars + "\n";

    if (code.takeCodeWithoutCommand().isPresent()) {
      return new MagicCommandItemWithResultAndCode(
              messageCreator.buildOutputMessage(message, textMessage, false),
              messageCreator.buildReplyWithoutStatus(message, executionCount),
              code.takeCodeWithoutCommand().get());
    }

    return new MagicCommandItemWithResult(
            messageCreator
                    .buildOutputMessage(message, textMessage, false),
            messageCreator.buildReplyWithoutStatus(message, executionCount));
  }

  private MagicCommandItem getMagicCommandItem(Code code, Message message, int executionCount) {
    if (code.takeCodeWithoutCommand().isPresent()) {
      return new MagicCommandItemWithCode(code.takeCodeWithoutCommand().get());
    }

    return new MagicCommandItemWithReply(
            messageCreator.buildReplyWithoutStatus(message, executionCount));
  }

  private MagicCommandFunctionality javascript() {
    return (code, command, message, executionCount) -> {
      MIMEContainer result = JavaScript(code.takeCodeWithoutCommand().get().asString());
      return new MagicCommandItemWithResult(
              messageCreator
                      .buildMessage(message, result.getMime().asString(), result.getCode(), executionCount),
              messageCreator.buildReplyWithoutStatus(message, executionCount)
      );
    };
  }

  private MagicCommandFunctionality html() {
    return (code, command, message, executionCount) -> {
      MIMEContainer html = HTML(
              "<html>" + code.takeCodeWithoutCommand().get().asString() + "</html>");
      return new MagicCommandItemWithResult(
              messageCreator
                      .buildMessage(message, html.getMime().asString(), html.getCode(), executionCount),
              messageCreator.buildReplyWithoutStatus(message, executionCount)
      );
    };
  }

  private MagicCommandFunctionality bash() {
    return (code, command, message, executionCount) -> {
      String result = executeBashCode(code.takeCodeWithoutCommand().get());
      return new MagicCommandItemWithResult(
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
      return new MagicCommandItemWithResult(
              messageCreator.buildOutputMessage(message, result, false),
              messageCreator.buildReplyWithoutStatus(message, executionCount)
      );
    };
  }

  private String executeBashCode(CodeWithoutCommand code) {
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

  private Boolean isValidPath(String path) {
    boolean isNonEmpty = !checkNotNull(path).isEmpty();

    if (path.contains("*")) {
      return containsSingleWildcardSymbol(path) && path.endsWith("*") && isNonEmpty;
    } else {
      return Paths.get(path).toFile().exists() && isNonEmpty;
    }
  }

}
