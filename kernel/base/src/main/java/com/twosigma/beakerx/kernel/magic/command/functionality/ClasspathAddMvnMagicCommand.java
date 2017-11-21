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
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.widgets.strings.Label;

import java.util.Collection;

import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.splitPath;

public class ClasspathAddMvnMagicCommand extends ClasspathMagicCommand {

  public static final String ADD = "add";
  public static final String MVN = "mvn";
  public static final String CLASSPATH_ADD_MVN = CLASSPATH + " " + ADD + " " + MVN;
  public static final String ADD_MVN_FORMAT_ERROR_MESSAGE = "Wrong command format, should be " + CLASSPATH_ADD_MVN + " group name version";
  private MavenJarResolver.ResolverParams commandParams;

  public ClasspathAddMvnMagicCommand(MavenJarResolver.ResolverParams commandParams, KernelFunctionality kernel) {
    super(kernel);
    this.commandParams = commandParams;
  }

  @Override
  public String getMagicCommandName() {
    return CLASSPATH_ADD_MVN;
  }

  @Override
  public boolean matchCommand(String command) {
    String[] commandParts = MagicCommandUtils.splitPath(command);
    return commandParts.length > 3 && commandParts[0].equals(CLASSPATH) && commandParts[1].equals(ADD) && commandParts[2].equals(MVN);
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    String command = param.getCommand();
    String[] split = splitPath(command);
    if (split.length != 6) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, ADD_MVN_FORMAT_ERROR_MESSAGE);
    }
    MavenJarResolver classpathAddMvnCommand = new MavenJarResolver(commandParams);
    Label intProgress = new Label(param.getCode().getMessage());
    MavenJarResolver.AddMvnCommandResult result = classpathAddMvnCommand.retrieve(split[3], split[4], split[5], intProgress);
    if (result.isJarRetrieved()) {
      Collection<String> newAddedJars = addJars(classpathAddMvnCommand.getPathToMavenRepo() + "/*");
      if (newAddedJars.isEmpty()) {
        return new MagicCommandOutput(MagicCommandOutput.Status.OK);
      }
      String textMessage = "Added jar" + (newAddedJars.size() > 1 ? "s: " : ": ") + newAddedJars + "\n";
      return new MagicCommandOutput(MagicCommandOutput.Status.OK, textMessage);
    }
    return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, result.getErrorMessage());
  }

}
