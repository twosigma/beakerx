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
package com.twosigma.beakerx.kernel.handler;

import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandResult;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandResultItem;
import com.twosigma.beakerx.message.Message;

public class MagicCommandExecutor {

  public static MagicCommandResult executeMagicCommands(Code code, int executionCount, KernelFunctionality kernel) {
    MagicCommandResult result = new MagicCommandResult();
    if (code.hasErrors()) {
      code.getErrors().forEach(result::addItem);
    } else {
      code.getMagicCommands().
              forEach(magicCommand -> {
                MagicCommandResultItem magicCommandResultItem = magicCommand.execute(code, magicCommand.getCommand(), code.getMessage(), executionCount);
                result.addItem(magicCommandResultItem);
              });

    }
    sendMagicCommandsResult(result, kernel);
    return result;
  }

  private static void sendMagicCommandsResult(MagicCommandResult magicCommandResult, KernelFunctionality kernel) {
    magicCommandResult.getItems().forEach(item -> {
      if (item.hasResult()) {
        sendMagicCommandReplyAndResult(item.getReply().get(), item.getResult().get(), kernel);
      } else {
        sendMagicCommandReply(item.getReply().get(), kernel);
      }
    });
  }

  private static void sendMagicCommandReply(Message replyMessage, KernelFunctionality kernel) {
    kernel.send(replyMessage);
  }

  private static void sendMagicCommandReplyAndResult(Message replyMessage, Message resultMessage, KernelFunctionality kernel) {
    kernel.publish(resultMessage);
    sendMagicCommandReply(replyMessage, kernel);
  }
}
