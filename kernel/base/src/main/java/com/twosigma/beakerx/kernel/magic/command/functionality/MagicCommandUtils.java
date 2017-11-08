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
package com.twosigma.beakerx.kernel.magic.command.functionality;

import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandItemWithResult;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandItemWithoutResult;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandResultItem;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import org.apache.commons.text.StrMatcher;
import org.apache.commons.text.StrTokenizer;

import java.util.Collection;

public class MagicCommandUtils {

  public static String[] splitPath(String command) {
    StrTokenizer tokenizer = new StrTokenizer(command, StrMatcher.spaceMatcher(), StrMatcher.quoteMatcher());
    return tokenizer.getTokenArray();
  }

  public static MagicCommandItemWithResult errorResult(Message message, String messageText, int executionCount, KernelFunctionality kernel) {
    return new MagicCommandItemWithResult(
            MessageCreator.buildOutputMessage(message, messageText, true),
            MessageCreator.buildReplyWithErrorStatus(message, executionCount, kernel)
    );
  }

  public static MagicCommandResultItem resultWithCustomMessage(String customMessage, Message message, int executionCount, KernelFunctionality kernel) {
    return new MagicCommandItemWithResult(
            MessageCreator.buildOutputMessage(message, customMessage, false),
            MessageCreator.buildReplyWithOkStatus(message, executionCount, kernel));
  }

  public static MagicCommandResultItem noResult(Collection<String> newAddedJars, Code code, Message message, int executionCount, KernelFunctionality kernel) {
    if (newAddedJars.isEmpty()) {
      return noResult(code, message, executionCount, kernel);
    }
    String textMessage = "Added jar" + (newAddedJars.size() > 1 ? "s: " : ": ") + newAddedJars + "\n";
    return new MagicCommandItemWithResult(
            MessageCreator
                    .buildOutputMessage(message, textMessage, false),
            MessageCreator.buildReplyWithOkStatus(message, executionCount, kernel));
  }

  public static MagicCommandResultItem noResult(Code code, Message message, int executionCount, KernelFunctionality kernel) {
    return new MagicCommandItemWithoutResult(MessageCreator.buildReplyWithOkStatus(message, executionCount, kernel));
  }


}
