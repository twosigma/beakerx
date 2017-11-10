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

import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandResultItem;
import com.twosigma.beakerx.message.Message;

import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.errorResult;
import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.noResult;
import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.splitPath;

public class ClasspathAddMvnMagicCommand extends ClasspathMagicCommand {

  public static final String CLASSPATH_ADD_MVN = CLASSPATH + " add mvn";
  public static final String ADD_MVN_FORMAT_ERROR_MESSAGE = "Wrong command format, should be " + CLASSPATH_ADD_MVN + " group name version";
  private MavenJarResolver.ResolverParams commandParams;

  public ClasspathAddMvnMagicCommand(MavenJarResolver.ResolverParams commandParams, KernelFunctionality kernel) {
    super(kernel);
    this.commandParams = commandParams;
  }

  @Override
  public MagicCommandResultItem execute(MagicCommandExecutionParam param) {
    Code code = param.getCode();
    String command = param.getCommand();
    Message message = param.getMessage();
    int executionCount = param.getExecutionCount();
    String[] split = splitPath(command);
    if (split.length != 6) {
      return errorResult(message, ADD_MVN_FORMAT_ERROR_MESSAGE, executionCount);
    }
    MavenJarResolver classpathAddMvnCommand = new MavenJarResolver(commandParams);
    MavenJarResolver.AddMvnCommandResult result = classpathAddMvnCommand.retrieve(split[3], split[4], split[5]);
    if (result.isJarRetrieved()) {
      return noResult(addJars(classpathAddMvnCommand.getPathToMavenRepo() + "/*"), code, message, executionCount);
    }
    return errorResult(message, result.getErrorMessage(), executionCount);
  }

}
