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
package com.twosigma.beakerx.kernel.commands.type;

import com.google.common.collect.Sets;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.commands.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import java.util.Set;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;
import org.apache.commons.cli.PosixParser;
import org.apache.commons.text.StrTokenizer;

public class LineTimeItMagicCommand extends AbstractTimeMagicCommand {

  public LineTimeItMagicCommand(KernelFunctionality kernel, MessageCreator messageCreator) {
    super(TIMEIT_LINE, "", Sets.newHashSet(MagicCommandType.LINE), messageCreator, kernel);
  }

  @Override
  public MagicCommandFunctionality build() {
    return (code, message, executionCount) -> {
      String codeToExecute = code.replace(TIMEIT_LINE, "");
      codeToExecute = codeToExecute.replaceAll("(-.)(\\d*\\s)", "");
      try {
        return timeIt(buildTimeItOption(code), codeToExecute, message, executionCount);
      } catch (IllegalArgumentException e) {
        return createErrorMessage(message, e.getMessage(), executionCount);
      }
    };
  }
}
