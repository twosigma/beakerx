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
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandTypesFactory;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem.Status;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import org.apache.commons.io.FileUtils;

import java.io.File;

import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.splitPath;

public class ClasspathResetMagicCommand implements MagicCommandFunctionality {

  public static final String CLASSPATH_PREFIX = "%classpath";
  public static final String RESET = "reset";
  public static final String CLASSPATH_RESET = CLASSPATH_PREFIX + " " + RESET;

  private KernelFunctionality kernel;

  public ClasspathResetMagicCommand(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    String command = param.getCommand();
    String[] split = splitPath(command);
    if (split.length != 2) {
      return new MagicCommandOutput(Status.ERROR, WRONG_FORMAT_MSG + CLASSPATH_RESET);
    }
    ClasspathAddMvnMagicCommand mvnMagicCommand = MagicCommandTypesFactory.getClasspathAddMvnMagicCommand(kernel);
    mvnMagicCommand.resetRepo();
    try {
      FileUtils.deleteQuietly(new File(mvnMagicCommand.getCommandParams().getPathToCache()));
      FileUtils.deleteQuietly(new File(mvnMagicCommand.getCommandParams().getPathToNotebookJars()));
    } catch (Exception e) {
      return new MagicCommandOutput(Status.ERROR, e.getMessage());
    }
    return new MagicCommandOutput(Status.OK, "Reset done, please restart the kernel.");
  }

  @Override
  public String getMagicCommandName() {
    return CLASSPATH_RESET;
  }

  @Override
  public boolean matchCommand(String command) {
    String[] commandParts = MagicCommandUtils.splitPath(command);
    return commandParts.length == 2 &&
            commandParts[0].equals(CLASSPATH_PREFIX) &&
            commandParts[1].equals(RESET);
  }
}
