package com.twosigma.beakerx.kernel.commands;

import com.twosigma.beakerx.kernel.commands.item.CommandItem;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import java.util.List;

public interface CommandPublisher {
  void publish(MessageCreator messageCreator,
      List<CommandItem> commandItems, Message message, Integer executionCount);
}
