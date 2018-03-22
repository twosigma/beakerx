/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *import static org.assertj.core.api.Assertions.assertThat;
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
import com.twosigma.beakerx.kernel.magic.command.MagicCommandTypesFactory;
import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver;
import com.twosigma.beakerx.kernel.magic.command.PomFactory;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ClassPathAddMvnCellMagicCommand extends ClasspathMagicCommand {

  public static final String ADD = "add";
  public static final String MVN = "mvn";
  public static final String CLASSPATH_ADD_MVN_CELL = "%" + CLASSPATH + " " + ADD + " " + MVN;
  public static final String MVN_CELL_FORMAT_ERROR_MESSAGE =
          "Wrong command format, should be " + CLASSPATH_ADD_MVN_CELL + "\n"
                  + " group name version or group:name:version" + "\n"
                  + " group name version or group:name:version";
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
    String commandCodeBlock = param.getCommandCodeBlock();
    if (commandCodeBlock != null) {
      command += "\n" + commandCodeBlock;
    }
    String[] commandLines = command.split(SPLIT_LINE_REGEX);
    unifyMvnLineFormat(commandLines);
    if (!validateCommandLines(commandLines)) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, MVN_CELL_FORMAT_ERROR_MESSAGE);
    }

    ClasspathAddMvnMagicCommand mvnMagicCommand = MagicCommandTypesFactory.getClasspathAddMvnMagicCommand(kernel);
    commandParams.setRepos(mvnMagicCommand.getRepos().get());

    List<MavenJarResolver.Dependency> dependencies =
            getDepsFromCommand(Arrays.copyOfRange(commandLines, 1, commandLines.length));
    MavenJarResolver mavenJarResolver = new MavenJarResolver(commandParams, pomFactory);
    MvnLoggerWidget mvnLoggerWidget = new MvnLoggerWidget(param.getCode().getMessage());
    MavenJarResolver.AddMvnCommandResult result = mavenJarResolver.retrieve(dependencies, mvnLoggerWidget);

    if (result.isJarRetrieved()) {
      return handleAddedJars(mavenJarResolver.getPathToMavenRepo() + "/*");
    }
    return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, result.getErrorMessage());
  }

  private List<MavenJarResolver.Dependency> getDepsFromCommand(String[] lines) {
    List<MavenJarResolver.Dependency> dependencies = new ArrayList<>();
    for (String line : lines) {
      String[] dependencyData = MagicCommandUtils.splitPath(line);
      dependencies.add(getDep(dependencyData));
    }
    return dependencies;
  }

  private MavenJarResolver.Dependency getDep(String[] split) {
    if (split.length == 4) {
      return new MavenJarResolver.Dependency(split[0], split[1], split[2], split[3]);
    } else {
      return new MavenJarResolver.Dependency(split[0], split[1], split[2]);
    }
  }

  private boolean validateCommandLines(String[] commandLines) {
    boolean isValid = false;
    for (int i = 1; i < commandLines.length; i++) {
      String[] strings = MagicCommandUtils.splitPath(commandLines[i]);
      if (strings.length == 3 || strings.length == 4) {
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
}
