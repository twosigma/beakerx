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
package com.twosigma.beakerx.kernel.commands.type;

import com.google.common.collect.Sets;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.commands.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.commands.MavenJarResolver;
import com.twosigma.beakerx.kernel.commands.MavenJarResolver.ResolverParams;
import com.twosigma.beakerx.kernel.msg.MessageCreator;

public class ClasspathAddMvnMagicCommand extends ClassPathMagicCommand {

  private String pathToCache;

  public ClasspathAddMvnMagicCommand(KernelFunctionality kernel, MessageCreator messageCreator, String pathToCache) {
    super(CLASSPATH_ADD_MVN, "<group name version>", Sets.newHashSet(MagicCommandType.LINE), messageCreator, kernel);
    this.pathToCache = pathToCache;
  }

  @Override
  public MagicCommandFunctionality build() {
    return (code, message, executionCount) -> {

      String[] split = splitPath(code);

      if (split.length != 3) {
        return createErrorMessage(message, ADD_MVN_FORMAT_ERROR_MESSAGE, executionCount);
      }

      MavenJarResolver classpathAddMvnCommand = new MavenJarResolver(new ResolverParams(pathToCache,
                                                                                        kernel.getTempFolder().toString() + MavenJarResolver.MVN_DIR));
      MavenJarResolver.AddMvnCommandResult result = classpathAddMvnCommand.retrieve(split[0], split[1], split[2]);
      if (result.isJarRetrieved()) {
        return getMagicCommandItem(addJars(classpathAddMvnCommand.getPathToMavenRepo() + "/*"), code, message, executionCount);
      }
      return createErrorMessage(message, result.getErrorMessage(), executionCount);
    };
  }


}
