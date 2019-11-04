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
package com.twosigma.beakerx.sql.magic.command;

import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;

import java.util.HashMap;

public class DataSourcesMagicCommand implements MagicCommandFunctionality {

  public static final String DATASOURCES = "%datasources";

  private KernelFunctionality kernel;
  private DataSourceParamResolver paramResolver;

  public DataSourcesMagicCommand(KernelFunctionality kernel, DataSourceParamResolver paramResolver) {
    this.kernel = kernel;
    this.paramResolver = paramResolver;
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    return dataSource(DATASOURCES, param.getCommand());
  }

  @Override
  public boolean matchCommand(String command) {
    String[] commandParts = MagicCommandUtils.splitPath(command);
    return commandParts.length > 0 && commandParts[0].equals(DATASOURCES);
  }

  @Override
  public String getMagicCommandName() {
    return DATASOURCES;
  }

  protected MagicCommandOutcomeItem dataSource(String source, String command) {
    String[] parts = command.split(" ");
    if (parts.length != 2) {
      return new MagicCommandOutput(MagicCommandOutcomeItem.Status.ERROR, WRONG_FORMAT_MSG);
    } else if (!parts[1].contains("jdbc:")) {
      return new MagicCommandOutput(MagicCommandOutcomeItem.Status.ERROR, "Incorrect jdbc url.");
    }
    String jdbc = paramResolver.resolve(parts[1]);
    HashMap<String, Object> params = new HashMap<>();
    params.put(source, jdbc);
    kernel.updateEvaluatorParameters(new EvaluatorParameters(params));
    return new MagicCommandOutput(MagicCommandOutcomeItem.Status.OK);
  }

}
