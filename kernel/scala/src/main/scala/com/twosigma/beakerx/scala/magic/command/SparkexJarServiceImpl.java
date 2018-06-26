/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.scala.magic.command;

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddJarMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;

import java.io.File;
import java.net.URLDecoder;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

public class SparkexJarServiceImpl implements SparkexJarService {

  @Override
  public MagicCommandOutcomeItem addSparkexJar(KernelFunctionality kernel) {
    Optional<MagicCommandFunctionality> magic = CodeFactory.findMagicCommandFunctionality(kernel.getMagicCommandTypes(), ClasspathAddJarMagicCommand.CLASSPATH_ADD_JAR);
    String sparkexJar = getSparkexJar();
    MagicCommandOutcomeItem magicCommandOutcomeItem = ((ClasspathAddJarMagicCommand) magic.get()).addJar(sparkexJar);
    return magicCommandOutcomeItem;
  }

  private String getSparkexJar() {
    try {
      Path path = Paths.get(EnableSparkSupportMagicCommand.class.getProtectionDomain().getCodeSource().getLocation().toURI());
      return path.getParent().getParent().getParent().resolve("sparkex").resolve("lib").resolve("sparkex.jar").toString();
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}
