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

import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.message.Message;

import static java.util.Arrays.copyOfRange;

class RunOptionsCommand implements SparkInitCommandFactory.Command {

  private EnableSparkSupportOptions enableSparkSupportOptions;
  private String command;
  private final Message message;
  private String error;

  public RunOptionsCommand(EnableSparkSupportOptions enableSparkSupportOptions, String command, Message message) {
    this.enableSparkSupportOptions = enableSparkSupportOptions;
    this.command = command;
    this.message = message;
    error = "";
  }

  @Override
  public MagicCommandOutcomeItem run() {
    EnableSparkSupportOptions.OptionsResult optionsResult = enableSparkSupportOptions.parseOptions(getOptions(command));
    if (optionsResult.hasError()) {
      error = optionsResult.errorMsg();
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, error);
    }

    for (EnableSparkSupportOptions.EnableSparkSupportCommand x : optionsResult.options()) {
      MagicCommandOutcomeItem item = x.run(message);
      if (!item.getStatus().equals(MagicCommandOutcomeItem.Status.OK)) {
        error = item.getMIMEContainer().get().getData().toString();
        return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, error);
      }
    }
    return new MagicCommandOutput(MagicCommandOutcomeItem.Status.OK);
  }

  @Override
  public String getErrorMessage() {
    return error;
  }

  private String[] getOptions(String command) {
    String[] parts = command.split(" ");
    if (parts.length == 1) {
      return new String[0];
    }
    return copyOfRange(parts, 1, parts.length);
  }

}
