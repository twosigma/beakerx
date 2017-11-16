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

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandResultItem;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandType;
import com.twosigma.beakerx.message.Message;

import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.errorResult;
import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.resultWithCustomMessage;
import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.splitPath;

public class LoadMagicMagicCommand implements MagicCommandFunctionality {

  public static final String LOAD_MAGIC = "%load_magic";
  private KernelFunctionality kernel;

  public LoadMagicMagicCommand(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  @Override
  public String getMagicCommandName() {
    return LOAD_MAGIC;
  }

  @Override
  public MagicCommandResultItem execute(MagicCommandExecutionParam param) {
    String command = param.getCommand();
    Message message = param.getMessage();
    int executionCount = param.getExecutionCount();

    String[] split = splitPath(command);
    if (split.length != 2) {
      return errorResult(message, WRONG_FORMAT_MSG + LOAD_MAGIC, executionCount);
    }

    String clazzName = split[1];
    MagicCommandFunctionality commandFunctionality = null;
    try {
      Class<?> aClass = this.kernel.loadClass(clazzName);
      Object instance = aClass.newInstance();
      if (instance instanceof MagicCommandFunctionality) {
        commandFunctionality = (MagicCommandFunctionality) instance;
        kernel.getMagicCommandTypes().add(new MagicCommandType(commandFunctionality.getMagicCommandName(), "", commandFunctionality));
      } else {
        throw new RuntimeException("Magic command have to implement " + MagicCommandFunctionality.class + " interface.");
      }
    } catch (Exception e) {
      return errorResult(message, e.toString(), executionCount);
    }

    return resultWithCustomMessage(
            "Magic command " + commandFunctionality.getMagicCommandName() + " was successfully added.",
            message,
            executionCount);
  }
}
