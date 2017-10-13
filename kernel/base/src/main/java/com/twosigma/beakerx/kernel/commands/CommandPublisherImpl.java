package com.twosigma.beakerx.kernel.commands;

import static com.google.common.base.Preconditions.checkNotNull;

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
    if (!StringUtils.isEmpty((String) resultMessage.getContent().get("text"))) {
      kernel.publish(resultMessage);
    }
    sendCommandReply(message, replyMessage);
  }
}
