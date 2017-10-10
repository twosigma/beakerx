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
import com.twosigma.beakerx.kernel.CodeWithoutCommand;
import com.twosigma.beakerx.kernel.commands.ErrorData;
import com.twosigma.beakerx.kernel.commands.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.commands.item.CommandItemWithResult;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Set;

public class BashMagicCommand extends MagicCommand {

  public BashMagicCommand(MessageCreator messageCreator) {
    super(BASH, "", Sets.newHashSet(MagicCommandType.CELL), messageCreator);
  }

  @Override
  public MagicCommandFunctionality build() {
    return (code, message, executionCount) -> {

      ErrorData errorData = executeBashCode(new CodeWithoutCommand(code));

      if (errorData.hasError()) {
        return createErrorMessage(message, errorData.getMessage(), executionCount);
      }

      return new CommandItemWithResult(
          getMessageCreator().buildOutputMessage(message, errorData.getMessage(), false),
          getMessageCreator().buildReplyWithoutStatus(message, executionCount)
      );
    };
  }

  private ErrorData executeBashCode(CodeWithoutCommand code) {
    String[] cmd = {"/bin/bash", "-c", code.asString()};
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
