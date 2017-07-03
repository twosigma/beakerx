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
package com.twosigma.beakerx.kernel;

import com.google.common.base.Preconditions;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;
import java.util.regex.Pattern;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Preconditions.checkState;
import static java.lang.System.lineSeparator;
import static java.util.Optional.empty;
import static java.util.Optional.of;
import static org.apache.commons.lang3.StringUtils.isNotBlank;
import static org.apache.commons.lang3.StringUtils.join;
import static org.apache.commons.lang3.builder.EqualsBuilder.reflectionEquals;
import static org.apache.commons.lang3.builder.HashCodeBuilder.reflectionHashCode;
import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;

public class Code {

  public static final String MAGIC_COMMAND_PREFIX = "%";

  private String code;
  private List<String> commands = new ArrayList<>();
  private String codeWithoutCommands = null;

  public Code(final String code) {
    checkState(isNotBlank(checkNotNull(code)));
    this.code = code;
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

  public Optional<CodeWithoutCommand> takeCodeWithoutCommand() {
    if (this.codeWithoutCommands != null) {
      return of(new CodeWithoutCommand(this.codeWithoutCommands));
    }
    return empty();
  }

  private void setupCommandsAndCode() {
    Scanner scanner = new Scanner(this.code);
    this.commands = commands(scanner);
    String codeToExecute = join(restOfTheCode(scanner), lineSeparator());
    if (!codeToExecute.isEmpty()) {
      this.codeWithoutCommands = codeToExecute;
    }
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
    Pattern p = Pattern.compile("^%.*", Pattern.MULTILINE);
    while (scanner.hasNext(p)) {
      result.add(scanner.nextLine());
    }
    return result;
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
