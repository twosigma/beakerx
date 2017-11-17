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
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandResultItem;
import com.twosigma.beakerx.message.Message;

import static com.twosigma.beakerx.kernel.magic.command.functionality.AddImportMagicCommand.IMPORT;
import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.errorResult;
import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.noResult;

public class AddStaticImportMagicCommand implements MagicCommandFunctionality {

  public static final String ADD_STATIC_IMPORT = IMPORT + " static";
  private KernelFunctionality kernel;

  public AddStaticImportMagicCommand(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  @Override
  public MagicCommandResultItem execute(MagicCommandExecutionParam param) {
    Code code = param.getCode();
    String command = param.getCommand();
    Message message = param.getMessage();
    int executionCount = param.getExecutionCount();
    String[] parts = command.split(" ");
    if (parts.length != 3) {
      return errorResult(message, WRONG_FORMAT_MSG, executionCount);
    }
    this.kernel.addImport(new ImportPath(parts[1] + " " + parts[2]));
    return noResult(code, message, executionCount);
  }
}
