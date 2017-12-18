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
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import static com.twosigma.beakerx.kernel.magic.command.functionality.AddImportMagicCommand.IMPORT;

public class BashMagicCommand implements MagicCommandFunctionality {

  public static final String BASH = "%%bash";

  public BashMagicCommand() {
  }

  @Override
  public String getMagicCommandName() {
    return BASH;
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    Code code = param.getCode();
    return code.getCodeBlock().map(codeWithoutCommand -> {
      ErrorData errorData = executeBashCode(codeWithoutCommand);
      if (errorData.hasError()) {
        return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, errorData.getMessage());
      }
      return new MagicCommandOutput(MagicCommandOutput.Status.OK, errorData.getMessage());
    }).orElse(new MagicCommandOutput(MagicCommandOutput.Status.ERROR, String.format(USAGE_ERROR_MSG, BASH)));
  }

  private ErrorData executeBashCode(String code) {
    String[] cmd = {"/bin/bash", "-c", code};
    ProcessBuilder pb = new ProcessBuilder(cmd);
    pb.redirectErrorStream(true);
    StringBuilder output = new StringBuilder();
    try {
      Process process = pb.start();
      process.waitFor();
      String line;
      BufferedReader reader = new BufferedReader(new InputStreamReader(
              process.getInputStream()));
      while ((line = reader.readLine()) != null) {
        output.append(line).append("\n");
      }
      process.destroy();
    } catch (IOException | InterruptedException e) {
      return new ErrorData(true, e.getMessage());
    }

    return new ErrorData(false, output.toString());
  }
}
