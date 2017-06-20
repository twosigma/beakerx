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

import com.twosigma.MessageAssertions;
import com.twosigma.beakerx.message.Message;

import java.util.List;
import java.util.Optional;

public class MagicCommandAssertions {

  public static Optional<Message> getExecuteResultMessage(List<Message> messages) {
    return messages.stream().filter(MessageAssertions::isExecuteResultMessage).findFirst();
  }

  private static boolean isStderr(Message message) {
    return message.getContent() != null &&
            message.getContent().get("name") != null && message.getContent().get("name").equals("stderr") &&
            message.getContent().get("text") != null;
  }

  public static Optional<Message> getErrorMsg(List<Message> messages) {
    return messages.stream().filter(m -> isStderr(m)).findFirst();
  }

  public static Optional<Message> getIdleMessage(List<Message> messages) {
    return messages.stream().filter(MessageAssertions::isIdleMessage).findFirst();
  }

  public static Optional<Message> getBusyMessage(List<Message> messages) {
    return messages.stream().filter(MessageAssertions::isBusyMessage).findFirst();
  }
}
