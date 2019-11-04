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
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.message.Message;

class LoadLatestVersionOfSparkIfIsNotOnClasspath implements SparkInitCommandFactory.Command {

  public static final String VERSION = "[2.4.4,)";
  private final Message message;
  private String error;
  private BeakerXClasspath classpath;
  private EnableSparkSupportActionOptions supportActionOptions;

  public LoadLatestVersionOfSparkIfIsNotOnClasspath(BeakerXClasspath classpath, EnableSparkSupportActionOptions supportActionOptions, Message message) {
    this.classpath = classpath;
    this.supportActionOptions = supportActionOptions;
    this.message = message;
    error = "";
  }

  @Override
  public MagicCommandOutcomeItem run() {
    if (!classpath.isJarOnClasspath(EnableSparkSupportActionOptions.SPARK_SQL)) {
      MagicCommandOutcomeItem latestVersion = supportActionOptions.loadSpark(message, VERSION);
      if (!latestVersion.getStatus().equals(MagicCommandOutcomeItem.Status.OK)) {
        error = latestVersion.getMIMEContainer().get().getData().toString();
        return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, error);
      }
    }
    return new MagicCommandOutput(MagicCommandOutcomeItem.Status.OK);
  }

  @Override
  public String getErrorMessage() {
    return error;
  }
}
