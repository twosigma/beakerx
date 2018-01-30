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

import com.twosigma.beakerx.kernel.Code;

public class MagicCommandExecutionParam {

  private final boolean showResult;
  private String command;
  private String commandCodeBlock;
  private int executionCount;
  private Code code;

  public MagicCommandExecutionParam(String command, String commandCodeBlock, int executionCount, Code code, boolean showResult) {
    this.command = command;
    this.commandCodeBlock = commandCodeBlock;
    this.executionCount = executionCount;
    this.code = code;
    this.showResult = showResult;
  }

  public String getCommand() {
    return command;
  }

  public String getCommandCodeBlock() {
    return commandCodeBlock;
  }

  public int getExecutionCount() {
    return executionCount;
  }

  public Code getCode() {
    return code;
  }

  public boolean isShowResult() {
    return showResult;
  }
}
