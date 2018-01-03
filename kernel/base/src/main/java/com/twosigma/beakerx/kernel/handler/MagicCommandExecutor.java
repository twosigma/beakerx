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
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcome;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;

import static java.util.Collections.singletonList;

public class MagicCommandExecutor {

  public static MagicCommandOutcome executeMagicCommands(Code code, int executionCount, KernelFunctionality kernel) {
    MagicCommandOutcome result = new MagicCommandOutcome();
    if (code.hasErrors()) {
      code.getErrors().forEach(result::addItem);
      sendMagicCommandsResult(result, kernel, code.getMessage(), executionCount);
    } else {
      code.getMagicCommands().
              forEach(magicCommand -> {
                MagicCommandExecutionParam param = new MagicCommandExecutionParam(
                        code,
                        magicCommand.getCommand(),
                        magicCommand.getCommandCodeBlock(),
                        executionCount);
                MagicCommandOutcomeItem item = magicCommand.execute(param);
                result.addItem(item);
                sendMagicCommandOutcome(item, kernel, code.getMessage(), executionCount);
              });
      sendRepliesWithStatus(result, kernel, code.getMessage(), executionCount);
    }
    return result;
  }

  private static void sendMagicCommandsResult(MagicCommandOutcome magicCommandResult, KernelFunctionality kernel, Message message, int executionCount) {
    magicCommandResult.getItems().forEach(item -> {
      if (item.getStatus().equals(MagicCommandOutcomeItem.Status.OK)) {
        handleOkStatus(kernel, message, executionCount, item);
      } else {
        handleErrorStatus(kernel, message, executionCount, item);
      }
    });
  }

  private static void sendMagicCommandOutcome(MagicCommandOutcomeItem item, KernelFunctionality kernel, Message message, int executionCount) {
        boolean hasError =   item.getStatus().equals(MagicCommandOutcomeItem.Status.ERROR);
        publishOutcome(kernel, message, executionCount, item, hasError);
  }

  private static void sendRepliesWithStatus(MagicCommandOutcome magicCommandResult, KernelFunctionality kernel, Message message, int executionCount) {
    magicCommandResult.getItems().forEach(item -> {
      if (item.getStatus().equals(MagicCommandOutcomeItem.Status.OK)) {
        kernel.send(MessageCreator.buildReplyWithOkStatus(message, executionCount));
      } else {
        kernel.send(MessageCreator.buildReplyWithErrorStatus(message, executionCount));
      }
    });
  }

  private static void handleErrorStatus(KernelFunctionality kernel, Message message, int executionCount, MagicCommandOutcomeItem item) {
    publishOutcome(kernel, message, executionCount, item, true);
    kernel.send(MessageCreator.buildReplyWithErrorStatus(message, executionCount));
  }

  private static void handleOkStatus(KernelFunctionality kernel, Message message, int executionCount, MagicCommandOutcomeItem item) {
    publishOutcome(kernel, message, executionCount, item, false);
    kernel.send(MessageCreator.buildReplyWithOkStatus(message, executionCount));
  }

  private static void publishOutcome(KernelFunctionality kernel, Message message, int executionCount, MagicCommandOutcomeItem item, boolean hasError) {
    if (item.getMIMEContainer().isPresent()) {
      if (item.getOutcome().equals(MagicCommandOutcomeItem.Outcome.OUTPUT)) {
        kernel.publish(MessageCreator.buildOutputMessage(message, (String) item.getMIMEContainer().get().getData(), hasError));
      } else {
        MIMEContainer mimeContainer = item.getMIMEContainer().get();
        kernel.publish(MessageCreator.buildMessage(message, singletonList(mimeContainer), executionCount));
      }
    }
  }
}
