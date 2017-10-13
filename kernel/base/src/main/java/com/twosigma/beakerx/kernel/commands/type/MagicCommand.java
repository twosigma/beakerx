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

import com.twosigma.beakerx.kernel.CodeWithoutCommand;
import com.twosigma.beakerx.kernel.commands.item.CommandItem;
import com.twosigma.beakerx.kernel.commands.item.CommandItemWithCode;
import com.twosigma.beakerx.kernel.commands.item.CommandItemWithResult;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import java.util.Set;

public abstract class MagicCommand implements Command {

  private String name;
  private String parameters;
  private Set<MagicCommandType> magicCommandTypes;
  private MessageCreator messageCreator;

  public MagicCommand(String name, String parameters, Set<MagicCommandType> magicCommandTypes, MessageCreator messageCreator) {
    this.name = name;
    this.parameters = parameters;
    this.magicCommandTypes = magicCommandTypes;
    this.messageCreator = messageCreator;
  }

  public Set<MagicCommandType> getMagicCommandTypes() {
    return magicCommandTypes;
  }

  public String getName() {
    return name;
  }

  public String getParameters() {
    return parameters;
  }

  public MessageCreator getMessageCreator() {
    return messageCreator;
  }

  protected CommandItemWithResult createErrorMessage(Message message, String messageText, int executionCount) {
    return new CommandItemWithResult(
        messageCreator.buildOutputMessage(message, messageText, true),
        messageCreator.buildReplyWithoutStatus(message, executionCount)
    );
  }

  protected CommandItem createResultWithCustomMessage(String customMessage, Message message, int executionCount) {
    return new CommandItemWithResult(
        messageCreator
            .buildOutputMessage(message, customMessage, false),
        messageCreator.buildReplyWithoutStatus(message, executionCount));
  }

  protected CommandItem getMagicCommandItem(String code) {
    return new CommandItemWithCode(new CodeWithoutCommand(code));
  }
}
