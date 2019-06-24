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
package com.twosigma.beakerx.kernel.magic.command.functionality;

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver;
import com.twosigma.beakerx.kernel.magic.command.PomFactory;
import com.twosigma.beakerx.kernel.magic.command.PomStyleDependencies;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.message.Message;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ClassPathAddMvnCellMagicCommand extends ClasspathMagicCommand {

  public static final String ADD = "add";
  public static final String MVN = "mvn";
  public static final String CLASSPATH_CELL = "%" + CLASSPATH + "";
  public static final String CLASSPATH_ADD_MVN_CELL = CLASSPATH_CELL + " " + ADD + " " + MVN;
  public static final String MVN_CELL_FORMAT_ERROR_MESSAGE =
          "Wrong command format, should be " + CLASSPATH_ADD_MVN_CELL + "\n"
                  + " group name version [type classifier] or group:name:version[:type:classifier]" + "\n"
                  + " group name version [type classifier] or group:name:version[:type:classifier]";
  private static final String SPLIT_LINE_REGEX = "\\r?\\n";

  private MavenJarResolver.ResolverParams commandParams;
  private PomFactory pomFactory;

  public ClassPathAddMvnCellMagicCommand(MavenJarResolver.ResolverParams commandParams, KernelFunctionality kernel) {
    super(kernel);
    this.commandParams = commandParams;
    this.pomFactory = new PomFactory();
  }

  @Override
  public String getMagicCommandName() {
    return CLASSPATH_ADD_MVN_CELL;
  }

  @Override
  public boolean matchCommand(String command) {
    String[] commandParts = MagicCommandUtils.splitPath(command);
    return commandParts.length >= 3
            && commandParts[0].equals("%" + CLASSPATH)
            && commandParts[1].equals(ADD)
            && commandParts[2].equals(MVN);
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    String command = param.getCommand();
    Message message = param.getCode().getMessage();
    String commandCodeBlock = param.getCommandCodeBlock();
    return execute(command, commandCodeBlock, message);
  }

  public MagicCommandOutcomeItem execute(String command, String commandCodeBlock, Message message) {
    if (isPomXmlStyle(commandCodeBlock)) {
      return pomXmlStyle(commandCodeBlock, message);
    } else {
      return simpleStyle(command, commandCodeBlock, message);
    }
  }

  private MagicCommandOutcomeItem pomXmlStyle(String commandCodeBlock, Message message) {
    return retrieve(mavenJarResolver -> mavenJarResolver.retrieve(new PomStyleDependencies(commandCodeBlock), message));
  }

  private MagicCommandOutcomeItem simpleStyle(String command, String commandCodeBlock, Message message) {
    if (commandCodeBlock != null) {
      command += "\n" + commandCodeBlock;
    }
    String[] commandLines = command.split(SPLIT_LINE_REGEX);
    unifyMvnLineFormat(commandLines);
    if (!validateCommandLines(commandLines)) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, MVN_CELL_FORMAT_ERROR_MESSAGE);
    }
    List<MavenJarResolver.Dependency> dependencies =
            getDepsFromCommand(Arrays.copyOfRange(commandLines, 1, commandLines.length));

    return retrieve(mavenJarResolver -> mavenJarResolver.retrieve(dependencies, message));
  }

  private MagicCommandOutcomeItem retrieve(MavenJarResolver.RetriveDeps retriveDeps) {
    ClasspathAddMvnMagicCommand mvnMagicCommand = kernel.magicCommandConfiguration().getClasspathAddMvnMagicCommand(kernel);
    commandParams.setRepos(mvnMagicCommand.getRepos().get());
    MavenJarResolver mavenJarResolver = new MavenJarResolver(commandParams, pomFactory);
    MavenJarResolver.AddMvnCommandResult result = retriveDeps.getDeps(mavenJarResolver);
    if (result.isJarRetrieved()) {
      return handleAddedJars(result.getAddedJarPaths());
    }
    return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, result.getErrorMessage());
  }

  private List<MavenJarResolver.Dependency> getDepsFromCommand(String[] lines) {
    List<MavenJarResolver.Dependency> dependencies = new ArrayList<>();
    for (String line : lines) {
      String[] dependencyData = MagicCommandUtils.splitPath(line);
      dependencies.add(MavenJarResolver.Dependency.create(Arrays.asList(dependencyData)));
    }
    return dependencies;
  }

  private boolean validateCommandLines(String[] commandLines) {
    boolean isValid = false;
    for (int i = 1; i < commandLines.length; i++) {
      String[] strings = MagicCommandUtils.splitPath(commandLines[i]);
      if (strings.length > 2) {
        isValid = true;
      } else {
        isValid = false;
        break;
      }
    }
    return isValid;
  }

  private void unifyMvnLineFormat(String[] mvnLines) {
    for (int i = 0; i < mvnLines.length; i++) {
      mvnLines[i] = mvnLines[i].replace(":", " ");
    }
  }

  private boolean isPomXmlStyle(String commandCodeBlock) {
    return commandCodeBlock != null && commandCodeBlock.startsWith("<dependencies>");
  }
}
