/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
import com.twosigma.beakerx.widget.BxHTML;
import com.twosigma.beakerx.widget.Foldout;
import com.twosigma.beakerx.widget.Label;

import java.util.Optional;

import static com.twosigma.beakerx.util.Preconditions.checkNotNull;

public class MagicCommandOutputFoldout implements MagicCommandOutcomeItem {

  private final MIMEContainer mineContainer;
  private MagicCommandOutput.Status status;
  private String header;

  public MagicCommandOutputFoldout(MagicCommandOutput.Status status, String text, String header) {
    this.mineContainer = MIMEContainer.HTML(checkNotNull(text));
    this.status = checkNotNull(status);
    this.header = header;
  }

  @Override
  public Optional<MIMEContainer> getMIMEContainer() {
    return Optional.of(this.mineContainer);
  }

  @Override
  public Status getStatus() {
    return this.status;
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
      sendHTML(message);
      kernel.send(MessageCreator.buildReplyWithOkStatus(message, executionCount));
    } else {
      sendHTML(message);
      kernel.send(MessageCreator.buildReplyWithErrorStatus(message, executionCount));
    }
  }

  private void sendHTML(Message message) {
    Foldout value = new Foldout(message);
    Label label = new Label(message);
    BxHTML content = new BxHTML(message);

    content.setValue(getMIMEContainer().get().getData());
    label.setValue(this.header);
    value.add(label);
    value.add(content);
    value.display();
  }

  @Override
  public void sendMagicCommandOutcome(KernelFunctionality kernel, Message message, int executionCount) {
    sendHTML(message);
  }
}
