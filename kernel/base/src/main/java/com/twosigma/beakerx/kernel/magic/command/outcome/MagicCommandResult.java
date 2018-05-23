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
package com.twosigma.beakerx.kernel.magic.command.outcome;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;

import java.util.Collections;
import java.util.Optional;

import static com.twosigma.beakerx.util.Preconditions.checkNotNull;
import static java.util.Collections.singletonList;

public class MagicCommandResult implements MagicCommandOutcomeItem {

  private Status status;
  private Optional<MIMEContainer> mimeContainer;

  public MagicCommandResult(Status status, MIMEContainer mimeContainer) {
    this.status = status;
    this.mimeContainer = Optional.of(checkNotNull(mimeContainer));
  }

  @Override
  public Optional<MIMEContainer> getMIMEContainer() {
    return mimeContainer;
  }

  @Override
  public Status getStatus() {
    return status;
  }

  @Override
  public TryResult getResult() {
    return null;
  }

  @Override
  public SimpleEvaluationObject getSimpleEvaluationObject() {
    return null;
  }

  @Override
  public void sendRepliesWithStatus(KernelFunctionality kernel, Message message, int executionCount) {
    if (getStatus().equals(MagicCommandOutcomeItem.Status.OK)) {
      publishMessage(kernel, message, executionCount);
      kernel.send(MessageCreator.buildReplyWithOkStatus(message, executionCount));
    } else {
      publishMessage(kernel, message, executionCount);
      kernel.send(MessageCreator.buildReplyWithErrorStatus(message, executionCount));
    }
  }

  @Override
  public void sendMagicCommandOutcome(KernelFunctionality kernel, Message message, int executionCount) {
    publishMessage(kernel, message, executionCount);
  }

  private void publishMessage(KernelFunctionality kernel, Message message, int executionCount) {
    MIMEContainer mimeContainer = getMIMEContainer().get();
    kernel.publish(Collections.singletonList(MessageCreator.buildMessage(message, singletonList(mimeContainer), executionCount)));
  }

}
