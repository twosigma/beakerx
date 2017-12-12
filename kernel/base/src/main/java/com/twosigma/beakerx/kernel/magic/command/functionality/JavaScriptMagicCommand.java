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
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandResult;
import com.twosigma.beakerx.mimetype.MIMEContainer;

import java.util.Arrays;
import java.util.List;

import static com.twosigma.beakerx.mimetype.MIMEContainer.JavaScript;

public class JavaScriptMagicCommand implements MagicCommandFunctionality {

  public static final String JAVASCRIPT = "%%javascript";
  public static final String JAVASCRIPT_ALIAS = "%%js";

  public JavaScriptMagicCommand() {
  }

  @Override
  public String getMagicCommandName() {
    return JAVASCRIPT;
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    String commandCodeBlock = param.getCommandCodeBlock();
    MIMEContainer result = JavaScript(commandCodeBlock);
    return new MagicCommandResult(MagicCommandOutcomeItem.Status.OK, result);
  }

  @Override
  public List<String> getMagicCommandAliases(){
    return Arrays.asList(JAVASCRIPT, JAVASCRIPT_ALIAS);
  }

}
