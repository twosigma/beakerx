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

import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandType;

import java.util.List;
import java.util.stream.Collectors;

public class LsMagicCommand implements MagicCommandFunctionality {

  public static final String LSMAGIC = "%lsmagic";
  private List<MagicCommandType> magicCommandTypes;

  public LsMagicCommand(List<MagicCommandType> magicCommandTypes) {
    this.magicCommandTypes = magicCommandTypes;
  }

  @Override
  public String getMagicCommandName() {
    return LSMAGIC;
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    String result = "Available magic commands:\n";

    result += magicCommandTypes.stream()
            .map(commandType -> commandType.getCommand() + " " + commandType.getParameters())
            .collect(Collectors.joining("\n"));

    return new MagicCommandOutput(MagicCommandOutput.Status.OK, result);
  }
}
