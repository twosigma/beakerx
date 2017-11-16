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

import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandResultItem;
import com.twosigma.beakerx.message.Message;

import java.util.HashMap;

import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.errorResult;

public class DataSourcesMagicCommand implements MagicCommandFunctionality {

  public static final String DATASOURCES = "%datasources";

  private KernelFunctionality kernel;

  public DataSourcesMagicCommand(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  @Override
  public MagicCommandResultItem execute(MagicCommandExecutionParam param) {
    return dataSource(DATASOURCES, param.getCode(), param.getCommand(), param.getMessage(), param.getExecutionCount());
  }

  @Override
  public String getMagicCommandName() {
    return DATASOURCES;
  }

  protected MagicCommandResultItem dataSource(String source, Code code, String command, Message message, int executionCount) {
    String[] parts = command.split(" ");
    if (parts.length != 2) {
      return errorResult(message, WRONG_FORMAT_MSG, executionCount);
    } else if (!parts[1].contains("jdbc:")) {
      return errorResult(message, "Incorrect jdbc url.", executionCount);
    }

    HashMap<String, Object> params = new HashMap<>();
    params.put(source, parts[1]);
    this.kernel.setShellOptions(new EvaluatorParameters(params));
    return MagicCommandUtils.noResult(code, message, executionCount);

  }
}
