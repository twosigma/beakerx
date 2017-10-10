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

import static com.twosigma.beakerx.mimetype.MIMEContainer.JavaScript;
import static java.util.Collections.singletonList;

import com.google.common.collect.Sets;
import com.twosigma.beakerx.kernel.commands.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.commands.item.CommandItemWithResult;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import java.util.Set;

public class JavascriptMagicCommand extends MagicCommand {

  public JavascriptMagicCommand(MessageCreator messageCreator) {
    super(JAVASCRIPT, "", Sets.newHashSet(MagicCommandType.CELL), messageCreator);
  }

  @Override
  public MagicCommandFunctionality build() {
    return (code, message, executionCount) -> {
      MIMEContainer result = JavaScript(code);
      return new CommandItemWithResult(
          getMessageCreator()
              .buildMessage(message, singletonList(result), executionCount),
          getMessageCreator().buildReplyWithoutStatus(message, executionCount)
      );
    };
  }
}
