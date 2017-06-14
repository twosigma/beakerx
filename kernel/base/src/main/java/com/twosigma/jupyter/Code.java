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

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.regex.Pattern;

import static com.google.common.base.Preconditions.checkNotNull;
import static java.lang.System.lineSeparator;
import static org.apache.commons.lang3.StringUtils.join;
import static org.apache.commons.lang3.builder.EqualsBuilder.reflectionEquals;
import static org.apache.commons.lang3.builder.HashCodeBuilder.reflectionHashCode;
import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;

public class Code {

  public static final String MAGIC_COMMAND_PREFIX = "%";

  private String code;
  private List<String> commands = new ArrayList<>();
  private String codeWithoutCommands = "";

  public Code(final String code) {
    this.code = checkNotNull(code);
    if (isaMagicCommand()) {
      setupCommandsAndCode();
    } else {
      this.codeWithoutCommands = this.code;
    }
  }

  public String asString() {
    return this.code;
  }

  public boolean isaMagicCommand() {
    return this.code.startsWith(MAGIC_COMMAND_PREFIX);
  }

  public List<String> getCommands() {
    if (!commands.isEmpty()) {
      return commands;
    }
    throw new RuntimeException("The code does not have magic command.");
  }

  public Code takeCodeWithoutCommand() {
    return new Code(this.codeWithoutCommands);
  }

  private void setupCommandsAndCode() {
    Scanner scanner = new Scanner(this.code);
    this.commands = commands(scanner);
    this.codeWithoutCommands = join(restOfTheCode(scanner), lineSeparator());
  }

  private List<String> restOfTheCode(Scanner scanner) {
    List<String> codeWithoutCommands = new ArrayList<>();
    while (scanner.hasNext()) {
      codeWithoutCommands.add(scanner.nextLine());
    }
    return codeWithoutCommands;
  }

  private List<String> commands(Scanner scanner) {
    List<String> result = new ArrayList<>();
    Pattern p = Pattern.compile("^%.*",Pattern.MULTILINE);
    while (scanner.hasNext(p)) {
      result.add(scanner.nextLine());
    }
    return result;
  }

  public static Code takeCodeFrom(Message message) {
    String code = "";
    if (message.getContent() != null && message.getContent().containsKey("code")) {
      code = ((String) message.getContent().get("code")).trim();
    }
    return new Code(code);
  }

  @Override
  public boolean equals(Object o) {
    return reflectionEquals(this, o);
  }

  @Override
  public int hashCode() {
    return reflectionHashCode(this);
  }

  @Override
  public String toString() {
    return reflectionToString(this);
  }
}
