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
package com.twosigma.beakerx.kernel.commands;

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.commands.item.CommandItem;
import com.twosigma.beakerx.kernel.commands.item.CommandItemWithResult;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import java.util.List;
import org.apache.commons.lang3.StringUtils;

public class CommandPublisherImpl implements CommandPublisher {

  private KernelFunctionality kernel;

  public CommandPublisherImpl(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  @Override
  public void publish(MessageCreator messageCreator,
      List<CommandItem> commandItems, Message message, Integer executionCount) {
    try {

      commandItems.forEach(commandItem -> {
        if (commandItem.hasCodeToExecute() && !commandItem.hasResult()) {
          kernel.executeCode(commandItem.getCode().get().asString(), message, executionCount, (seo) -> kernel.sendIdleMessage(seo.getJupyterMessage()));
        } else if (commandItem.hasCodeToExecute() && commandItem.hasResult()) {
          kernel.publish(message);
        } else if (commandItem.hasResult()) {
          sendCommandReplyAndResult(message, commandItem.getReply().get(), commandItem.getResult().get());
        } else {
          sendCommandReply(message, commandItem.getReply().get());
        }
      });

    } catch (IllegalStateException e) {
      CommandItemWithResult errorMessage = new CommandItemWithResult(
          messageCreator.buildOutputMessage(message, e.getMessage(), true),
          messageCreator.buildReplyWithoutStatus(message, executionCount)
      );

      sendCommandReplyAndResult(message, errorMessage.getReply().get(), errorMessage.getResult().get());
    }
  }

  private void sendCommandReply(Message message, Message replyMessage) {
    kernel.send(replyMessage);
    kernel.sendIdleMessage(message);
  }

  private void sendCommandReplyAndResult(Message message, Message replyMessage, Message resultMessage) {
    if (resultMessage.getContent().containsKey("data") || !StringUtils.isEmpty((String) resultMessage.getContent().get("text"))) {
      kernel.publish(resultMessage);
    }
    sendCommandReply(message, replyMessage);
  }
}
