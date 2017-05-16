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
package com.twosigma;

import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import com.twosigma.jupyter.message.Message;

import static org.assertj.core.api.Assertions.assertThat;

public class MessageAssertions {

  public static void verifyExecuteReplyMessage(Message executeReply) {
    assertThat(executeReply.type()).isEqualTo(JupyterMessages.EXECUTE_REPLY);
  }

  public static boolean isIdleMessage(Message message) {
    return message.getContent() != null &&
            message.getContent().get("execution_state") != null &&
            message.getContent().get("execution_state").equals("idle");
  }

  public static boolean isBusyMessage(Message message) {
    return  message.getContent() != null &&
            message.getContent().get("execution_state") != null &&
            message.getContent().get("execution_state").equals("busy");
  }

  public static boolean isExecuteResultMessage(Message message) {
    return message.type().equals(JupyterMessages.EXECUTE_RESULT);
  }

  public static boolean isExecuteInputMessage(Message message) {
    return message.type().equals(JupyterMessages.EXECUTE_INPUT);
  }


  public static boolean isErrorMessage(Message message) {
    return message.type().equals(JupyterMessages.ERROR);
  }
}
