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
package com.twosigma.jupyter;

import com.twosigma.jupyter.message.Message;

import java.util.Scanner;

import static com.google.common.base.Preconditions.checkNotNull;

public class Code {

  public static final String MAGIC_COMMAND_PREFIX = "%";

  private String code;

  public Code(final String code) {
    this.code = checkNotNull(code);
  }

  public String asString() {
    return this.code;
  }

  public boolean isaMagicCommand() {
    return this.code.startsWith(MAGIC_COMMAND_PREFIX);
  }

  public String getCommand() {
    if(isaMagicCommand()){
      return new Scanner(this.code).nextLine();
    }
    throw new RuntimeException("The code does not have magic command.");
  }

  public Code takeCodeWithoutCommand() {
    return new Code(this.code.replace(getCommand(), ""));
  }

  public static Code takeCodeFrom(Message message) {
    String code = "";
    if (message.getContent() != null && message.getContent().containsKey("code")) {
      code = ((String) message.getContent().get("code")).trim();
    }
    return new Code(code);
  }
}
