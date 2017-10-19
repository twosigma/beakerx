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
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.commands.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.commands.item.CommandItemWithReply;
import com.twosigma.beakerx.kernel.commands.item.CommandItemWithResult;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import java.util.Set;

public class AddImportMagicCommand extends ImportMagicCommand {

  public AddImportMagicCommand(KernelFunctionality kernel, MessageCreator messageCreator) {
    super(IMPORT, "<classpath>", Sets.newHashSet(MagicCommandType.LINE), messageCreator, kernel);
  }

  @Override
  public MagicCommandFunctionality build() {
    return (code, message, executionCount) -> {

      ImportPath importPath = new ImportPath(code);
      this.kernel.addImport(importPath);

      if (isValidImport(code, 0)) {
        return new CommandItemWithReply(getMessageCreator().buildReplyWithoutStatus(message, executionCount));
      }

      kernel.removeImport(importPath);
      return new CommandItemWithResult(
          getMessageCreator()
              .buildOutputMessage(message, "Could not import " + code + ", class not found.", true),
          getMessageCreator().buildReplyWithoutStatus(message, executionCount)
      );
    };
  }
}
