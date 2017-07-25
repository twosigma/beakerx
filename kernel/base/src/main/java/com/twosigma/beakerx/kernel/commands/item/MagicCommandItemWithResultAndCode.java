package com.twosigma.beakerx.kernel.commands.item;

import com.twosigma.beakerx.kernel.CodeWithoutCommand;
import com.twosigma.beakerx.message.Message;
import java.util.Optional;

public class MagicCommandItemWithResultAndCode implements MagicCommandItem {

  private Message resultMessage;
  private Message replyMessage;
  private CodeWithoutCommand code;

  public MagicCommandItemWithResultAndCode(Message resultMessage,
      Message replyMessage, CodeWithoutCommand code) {
    this.resultMessage = resultMessage;
    this.replyMessage = replyMessage;
    this.code = code;
  }

  @Override
  public boolean hasCodeToExecute() {
    return getCode().isPresent();
  }

  @Override
  public boolean hasResult() {
    return getResult().isPresent();
  }

  @Override
  public Optional<Message> getResult() {
    return Optional.ofNullable(resultMessage);
  }

  @Override
  public Optional<Message> getReply() {
    return Optional.ofNullable(replyMessage);
  }

  @Override
  public Optional<CodeWithoutCommand> getCode() {
    return Optional.ofNullable(code);
  }
}
