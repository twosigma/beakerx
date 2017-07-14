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
package com.twosigma.beakerx.kernel.commands.item;

import com.twosigma.beakerx.kernel.CodeWithoutCommand;
import com.twosigma.beakerx.message.Message;

import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;
import static java.util.Optional.ofNullable;

public class MagicCommandItemWithResult implements MagicCommandItem{

  private Message resultMessage;
  private Message replyWithoutStatus;

  public MagicCommandItemWithResult(Message resultMessage, Message replyWithoutStatus) {
    this.resultMessage = checkNotNull(resultMessage);
    this.replyWithoutStatus = checkNotNull(replyWithoutStatus);
  }

  public boolean hasCodeToExecute() {
    return false;
  }

  public boolean hasResult() {
    return getResult().isPresent();
  }

  @Override
  public Optional<Message> getResult() {
    return ofNullable(resultMessage);
  }

  @Override
  public Optional<Message> getReply() {
    return ofNullable(replyWithoutStatus);
  }

  @Override
  public Optional<CodeWithoutCommand> getCode() {
    return Optional.empty();
  }
}
