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

import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.splitPath;

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandTypesFactory;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem.Status;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ClasspathAddRepoMagicCommand implements MagicCommandFunctionality {

  public static final String CLASSPATH_PREFIX = "%classpath";
  public static final String CONFIG = "config";
  public static final String RESOLVER = "resolver";
  public static final String CLASSPATH_CONFIG_RESOLVER = CLASSPATH_PREFIX + " " + CONFIG + " " + RESOLVER;
  public static final String MVN_LOCAL = "mvnLocal";
  public static final String ADDED_NEW_REPO = "Added new repo: ";

  private KernelFunctionality kernel;

  public ClasspathAddRepoMagicCommand(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    String command = param.getCommand();
    String[] split = splitPath(command);
    if (split.length == 4 && split[3].equals(MVN_LOCAL)) {
      return handleMvnLocal();
    }
    return handleNewRepo(split);
  }

  private MagicCommandOutcomeItem handleNewRepo(String[] split) {
    if (split.length != 5) {
      return new MagicCommandOutput(Status.ERROR, WRONG_FORMAT_MSG + CLASSPATH_CONFIG_RESOLVER);
    }
    String repoName = split[3];
    String urlName = split[4];
    ClasspathAddMvnMagicCommand mvnMagicCommand = MagicCommandTypesFactory.getClasspathAddMvnMagicCommand(kernel);
    String result = mvnMagicCommand.addRepo(repoName, urlName);
    return createResult(result);
  }

  private MagicCommandOutcomeItem handleMvnLocal() {
    String localRepo = BeakerxSystemProperty.getHomeUser() + "/.m2/repository";
    if (Files.exists(Paths.get(localRepo))) {
      ClasspathAddMvnMagicCommand mvnMagicCommand = MagicCommandTypesFactory.getClasspathAddMvnMagicCommand(kernel);
      try {
        String result = mvnMagicCommand.addRepo(MVN_LOCAL, new File(localRepo).toURI().toURL().toString());
        return createResult(result);
      } catch (MalformedURLException e) {
        return new MagicCommandOutput(Status.ERROR, e.toString());
      }
    }
    return new MagicCommandOutput(Status.OK, String.format("Warning: directory %s not found", localRepo));
  }

  private MagicCommandOutcomeItem createResult(String result) {
    if (result.isEmpty()) {
      return new MagicCommandOutput(Status.OK);
    } else {
      return new MagicCommandOutput(Status.OK, ADDED_NEW_REPO + result);
    }
  }

  @Override
  public String getMagicCommandName() {
    return CLASSPATH_CONFIG_RESOLVER;
  }

  @Override
  public boolean matchCommand(String command) {
    String[] commandParts = MagicCommandUtils.splitPath(command);
    return commandParts.length > 2 && commandParts[0].equals(CLASSPATH_PREFIX) &&
            commandParts[1].equals(CONFIG) && commandParts[2].equals(RESOLVER);
  }
}
