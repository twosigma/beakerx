package com.twosigma.beakerx.kernel.commands;

import com.twosigma.beakerx.kernel.commands.item.CommandItem;
import com.twosigma.beakerx.message.Message;
import java.util.List;

public interface CommandProcessor {
  List<CommandItem> process(Message message, Integer executionCount);
}
