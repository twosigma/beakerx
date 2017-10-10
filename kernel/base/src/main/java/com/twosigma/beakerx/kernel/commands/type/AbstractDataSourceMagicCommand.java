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

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.commands.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import java.util.Set;

public abstract class AbstractDataSourceMagicCommand extends MagicCommand {

  protected KernelFunctionality kernel;

  public AbstractDataSourceMagicCommand(String name, String parameters,
      Set<MagicCommandType> magicCommandTypes,
      MessageCreator messageCreator, KernelFunctionality kernel) {
    super(name, parameters, magicCommandTypes, messageCreator);
    this.kernel = kernel;
  }

  protected MagicCommandFunctionality dataSource(String source) {
    return (code, message, executionCount) -> {
      /*String[] parts = command.split(" ");
      if (parts.length != 2) {
        return createErrorMessage(message, WRONG_FORMAT_MSG, executionCount);
      } else if (!parts[1].contains("jdbc:")) {
        return createErrorMessage(message, "Incorrect jdbc url.", executionCount);
      }

      HashMap<String, Object> params = new HashMap<>();
      params.put(source, parts[1]);
      this.kernel.setShellOptions(new KernelParameters(params));
      return getMagicCommandItem(code.asString());*/
      return null;
      //TODO
    };
  }
}
