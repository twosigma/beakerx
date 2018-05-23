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

package com.twosigma.beakerx.kernel.magic.command;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.CodeFrame;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.message.Message;

import java.util.Optional;

public class MagicCommand extends CodeFrame {

  private MagicCommandFunctionality magicCommandFunctionality;
  private String command;
  private String commandCodeBlock;

  public MagicCommand(MagicCommandFunctionality magicCommandFunctionality, String command, String commandCodeBlock) {
    this.magicCommandFunctionality = magicCommandFunctionality;
    this.command = command;
    this.commandCodeBlock = commandCodeBlock;
  }

  public MagicCommand(MagicCommandFunctionality magicCommandFunctionality, String command) {
    this.magicCommandFunctionality = magicCommandFunctionality;
    this.command = command;
  }

  private MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    return this.magicCommandFunctionality.execute(param);
  }

  public String getCommand() {
    return command;
  }

  public String getCommandCodeBlock() {
    return commandCodeBlock;
  }

  @Override
  public void executeFrame(Code code, KernelFunctionality kernel, Message message, int executionCount) {
    MagicCommandOutcomeItem execute = execute(code, executionCount, false);
    execute.sendMagicCommandOutcome(kernel, message, executionCount);
    TryResult result = execute.getResult();
    SimpleEvaluationObject seo = execute.getSimpleEvaluationObject();
    handleResult(seo, result);
  }

  @Override
  public void executeLastFrame(Code code, KernelFunctionality kernel, Message message, int executionCount) {
    MagicCommandOutcomeItem execute = execute(code, executionCount, true);
    execute.sendRepliesWithStatus(kernel, message, executionCount);
    TryResult result = execute.getResult();
    SimpleEvaluationObject seo = execute.getSimpleEvaluationObject();
    handleResult(seo, result);
  }

  @Override
  public Optional<MagicCommandOutcomeItem> getError() {
    return Optional.empty();
  }

  private MagicCommandOutcomeItem execute(Code code, int executionCount, boolean showResult) {
    MagicCommandExecutionParam param = new MagicCommandExecutionParam(
            getCommand(),
            getCommandCodeBlock(),
            executionCount,
            code,
            showResult);
    return execute(param);
  }
}
