/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
import com.twosigma.beakerx.message.Message;

import java.util.Optional;

public abstract class CodeFrame {

  private Optional<MagicCommandOutcomeItem> error;

  public abstract void executeFrame(Code code, KernelFunctionality kernel, Message message, int executionCount, KernelFunctionality.ExecuteCodeCallback executeCodeCallback);

  public abstract void executeLastFrame(Code code, KernelFunctionality kernel, Message message, int executionCount, KernelFunctionality.ExecuteCodeCallback executeCodeCallback);

  public CodeFrame() {
    this.error = Optional.empty();
  }


  public CodeFrame(MagicCommandOutcomeItem error) {
    this.error = Optional.of(error);
  }

  public Optional<MagicCommandOutcomeItem> getError() {
    return error;
  }
}
