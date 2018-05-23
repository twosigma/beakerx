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
import com.twosigma.beakerx.kernel.Repos;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver;
import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver.AddMvnCommandResult;
import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver.Dependency;
import com.twosigma.beakerx.kernel.magic.command.PomFactory;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;

import static java.util.Arrays.asList;

public class ClasspathAddMvnMagicCommand extends ClasspathMagicCommand {

  public static final String ADD = "add";
  public static final String MVN = "mvn";
  public static final String CLASSPATH_ADD_MVN = CLASSPATH + " " + ADD + " " + MVN;
  public static final String ADD_MVN_FORMAT_ERROR_MESSAGE = "Wrong command format, should be" + CLASSPATH_ADD_MVN + " group name version [type classifier] or " + CLASSPATH_ADD_MVN + " group:name:version[:type:classifier]";

  private MavenJarResolver.ResolverParams commandParams;
  private PomFactory pomFactory;
  private Repos repos;

  public ClasspathAddMvnMagicCommand(MavenJarResolver.ResolverParams commandParams, KernelFunctionality kernel) {
    super(kernel);
    this.commandParams = commandParams;
    this.pomFactory = new PomFactory();
    this.repos = new Repos();
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
    String[] split = MagicCommandUtils.splitPath(command);
    if (!(isGradleFormat(split) || isMavenFormat(split))) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, ADD_MVN_FORMAT_ERROR_MESSAGE);
    }
    commandParams.setRepos(getRepos().get());
    MavenJarResolver classpathAddMvnCommand = new MavenJarResolver(commandParams, pomFactory);
    MvnLoggerWidget progress = new MvnLoggerWidget(param.getCode().getMessage());
    AddMvnCommandResult result = retrieve(getDependency(split), classpathAddMvnCommand, progress);
    if (result.isJarRetrieved()) {
      return handleAddedJars(classpathAddMvnCommand.getPathToMavenRepo() + "/*");
    }
    return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, result.getErrorMessage());
  }

  private Dependency getDependency(String[] split) {
    if (isGradleFormat(split)) {
      String[] valuesFromGradlePattern = split[3].split(":");
      return Dependency.create((asList(valuesFromGradlePattern)));
    } else {
      return Dependency.create(asList(split).subList(3, split.length));
    }
  }

  private boolean isMavenFormat(String[] split) {
    return split.length > 5;
  }

  private boolean isGradleFormat(String[] split) {
    if (split.length == 4) {
      String[] valuesFromGradlePattern = split[3].split(":");
      return valuesFromGradlePattern.length > 2;
    }
    return false;
  }

  private AddMvnCommandResult retrieve(Dependency dependency, MavenJarResolver classpathAddMvnCommand, MvnLoggerWidget progress) {
    return classpathAddMvnCommand.retrieve(dependency, progress);
  }

  public MavenJarResolver.ResolverParams getCommandParams() {
    return commandParams;
  }

  public Repos getRepos() {
    return repos;
  }

  public String addRepo(String name, String url) {
    return repos.add(name, url);
  }

  public void resetRepo() {
    this.repos = new Repos();
  }
}
