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
package com.twosigma.beakerx.kernel;

import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;

import java.util.List;

import static com.twosigma.beakerx.util.Preconditions.checkNotNull;
import static org.apache.commons.lang3.builder.EqualsBuilder.reflectionEquals;
import static org.apache.commons.lang3.builder.HashCodeBuilder.reflectionHashCode;
import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;

public class Code {

  private final String allCode;
  private final List<MagicCommandOutcomeItem> errors;
  private final Message message;
  private List<CodeFrame> codeFrames;

  private Code(String allCode, List<CodeFrame> codeFrames, List<MagicCommandOutcomeItem> errors, Message message) {
    this.allCode = allCode;
    this.codeFrames = checkNotNull(codeFrames);
    this.errors = checkNotNull(errors);
    this.message = message;
  }

  public static Code createCode(String allCode, List<CodeFrame> codeFrames, List<MagicCommandOutcomeItem> errors, Message message) {
    return new Code(allCode, codeFrames, errors, message);
  }

  public List<CodeFrame> getCodeFrames() {
    return codeFrames;
  }

  public String asString() {
    return this.allCode;
  }

  public boolean hasErrors() {
    return !errors.isEmpty();
  }

  public List<MagicCommandOutcomeItem> getErrors() {
    return errors;
  }

  @Override
  public boolean equals(Object o) {
    return reflectionEquals(this, o);
  }

  @Override
  public int hashCode() {
    return reflectionHashCode(this);
  }

  @Override
  public String toString() {
    return reflectionToString(this);
  }

  public Message getMessage() {
    return message;
  }

  public void execute(KernelFunctionality kernel, int executionCount) {
    if (hasErrors()) {
      errors.forEach(item -> {
        item.sendMagicCommandOutcome(kernel, message, executionCount);
        kernel.send(MessageCreator.buildReplyWithErrorStatus(message, executionCount));
      });
    } else {
      try {
        kernel.startEvaluation();
        takeCodeFramesWithoutLast().forEach(frame -> frame.executeFrame(this, kernel, message, executionCount));
        takeLastCodeFrame().executeLastFrame(this, kernel, message, executionCount);
      } finally {
        kernel.endEvaluation();
      }
    }
  }

  private CodeFrame takeLastCodeFrame() {
    return getCodeFrames().get(getCodeFrames().size() - 1);
  }

  private List<CodeFrame> takeCodeFramesWithoutLast() {
    return getCodeFrames().subList(0, getCodeFrames().size() - 1);
  }
}
