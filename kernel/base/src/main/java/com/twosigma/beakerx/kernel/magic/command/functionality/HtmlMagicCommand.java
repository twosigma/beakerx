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

import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandItemWithResult;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandResultItem;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;

import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.errorResult;
import static com.twosigma.beakerx.mimetype.MIMEContainer.HTML;
import static java.util.Collections.singletonList;

public class HtmlMagicCommand implements MagicCommandFunctionality {

  public static final String HTML = "%%html";

  public HtmlMagicCommand() {

  }

  @Override
  public MagicCommandResultItem execute(MagicCommandExecutionParam param) {
    Message message = param.getMessage();
    int executionCount = param.getExecutionCount();
    String commandCodeBlock = param.getCommandCodeBlock();
    if (commandCodeBlock==null){
      return errorResult(message, String.format(USAGE_ERROR_MSG, HTML), executionCount);
    }
    MIMEContainer html = HTML("<html>" + commandCodeBlock + "</html>");
    return new MagicCommandItemWithResult(
            MessageCreator.buildMessage(message, singletonList(html), executionCount),
            MessageCreator.buildReplyWithOkStatus(message, executionCount)
    );
  }
}
