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
import com.twosigma.beakerx.kernel.commands.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.commands.item.CommandItemWithResult;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class LSMagicCommand extends MagicCommand {

  private List<MagicCommand> list;

  public LSMagicCommand(List<MagicCommand> magicList, MessageCreator messageCreator) {
    super(LSMAGIC, "", Sets.newHashSet(MagicCommandType.LINE), messageCreator);
    this.list = magicList;
  }

  @Override
  public MagicCommandFunctionality build() {
    return (code, message, executionCount) -> {
      StringBuilder result = new StringBuilder("Available magic commands:\n");
      list.forEach(item -> {
        result.append(item.getName())
              .append(" ")
              .append(item.getParameters()).append("\n");
      });

      return new CommandItemWithResult(
          getMessageCreator().buildOutputMessage(message, result.toString(), false),
          getMessageCreator().buildReplyWithoutStatus(message, executionCount)
      );
    };
  }
}
