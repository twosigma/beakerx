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

import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.scala.magic.command.SparkInitCommandFactory.Command;

import java.util.ArrayList;
import java.util.List;

class EnableSparkSupportMagicInitConfiguration implements EnableSparkSupportMagicCommand.EnableSparkSupportMagicConfiguration {

  private SparkInitCommandFactory initCommandFactory;

  public EnableSparkSupportMagicInitConfiguration(SparkInitCommandFactory initCommandFactory) {
    this.initCommandFactory = initCommandFactory;
  }

  @Override
  public MagicCommandOutcomeItem run(MagicCommandExecutionParam param) {
    return enableSparkMagicCommand(param);
  }

  @Override
  public boolean isInit() {
    return true;
  }

  private MagicCommandOutcomeItem enableSparkMagicCommand(MagicCommandExecutionParam param) {
    List<Command> commands = createCommands(param);
    for (Command command : commands) {
      MagicCommandOutcomeItem item = command.run();
      if (!item.getStatus().equals(MagicCommandOutcomeItem.Status.OK)) {
        return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, command.getErrorMessage());
      }
    }
    return new MagicCommandOutput(MagicCommandOutput.Status.OK, "Spark support enabled");
  }

  private List<Command> createCommands(MagicCommandExecutionParam param) {
    List<Command> commands = new ArrayList<>();
    commands.add(initCommandFactory.addSparkexJar());
    commands.add(initCommandFactory.loadSparkSupportMagicClass());
    commands.add(initCommandFactory.runOptions(param));
    commands.add(initCommandFactory.loadSparkFrom_SPARK_HOME_IfIsNotOnClasspath());
    commands.add(initCommandFactory.loadLatestVersionOfSparkIfIsNotOnClasspath(param));
    commands.add(initCommandFactory.loadSparkSupportMagic(param));
    return commands;
  }
}
