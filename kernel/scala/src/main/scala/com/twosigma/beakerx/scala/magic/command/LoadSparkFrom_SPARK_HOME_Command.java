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

import com.twosigma.beakerx.kernel.BeakerXClasspath;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddJarMagic;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.util.BeakerXSystem;

import java.io.File;

class LoadSparkFrom_SPARK_HOME_Command implements SparkInitCommandFactory.Command {
  private String error = "";
  private BeakerXClasspath classpath;
  private BeakerXSystem beakerXSystem;
  private ClasspathAddJarMagic command;

  public LoadSparkFrom_SPARK_HOME_Command(ClasspathAddJarMagic command, BeakerXClasspath classpath, BeakerXSystem beakerXSystem) {
    this.command = command;
    this.classpath = classpath;
    this.beakerXSystem = beakerXSystem;
  }

  @Override
  public MagicCommandOutcomeItem run() {
    String spark_home = beakerXSystem.getenv("SPARK_HOME");
    if (!classpath.isJarOnClasspath(EnableSparkSupportActionOptions.SPARK_SQL) && spark_home != null) {
      String sparkJarsPath = spark_home + File.separator + "jars" + File.separator + "*";
      MagicCommandOutcomeItem classpath = command.addJar(sparkJarsPath);
      if (!classpath.getStatus().equals(MagicCommandOutcomeItem.Status.OK)) {
        error = classpath.getMIMEContainer().get().getData().toString();
        return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, error);
      }
      return classpath;
    }
    return new MagicCommandOutput(MagicCommandOutcomeItem.Status.OK);
  }

  @Override
  public String getErrorMessage() {
    return error;
  }
}
