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
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandType;

import java.lang.reflect.Constructor;

import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.splitPath;
import static com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem.Status.ERROR;
import static com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem.Status.OK;

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
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    String command = param.getCommand();

    String[] split = splitPath(command);
    if (split.length != 2) {
      return new MagicCommandOutput(ERROR, WRONG_FORMAT_MSG + LOAD_MAGIC);
    }

    String clazzName = split[1];
    return load(clazzName);
  }

  public MagicCommandOutcomeItem load(String clazzName) {
    try {
      Class<?> aClass = this.kernel.loadClass(clazzName);
      Constructor constructor = null;
      try {
        constructor = aClass.getConstructor(new Class[]{KernelFunctionality.class});
      } catch (Exception e) {
      }
      Object instance = null;
      if (constructor != null) {
        instance = constructor.newInstance(this.kernel);
      } else {
        instance = aClass.newInstance();
      }

      if (instance instanceof MagicCommandFunctionality) {
        MagicCommandFunctionality commandFunctionality = (MagicCommandFunctionality) instance;
        kernel.registerMagicCommandType(new MagicCommandType(commandFunctionality.getMagicCommandName(), "", commandFunctionality));
        return new MagicCommandOutput(OK, "Magic command " + commandFunctionality.getMagicCommandName() + " was successfully added.");
      } else {
        return new MagicCommandOutput(ERROR, "Magic command have to implement " + MagicCommandFunctionality.class + " interface.");
      }
    } catch (Exception e) {
      return new MagicCommandOutput(ERROR, e.toString());
    }
  }
}
