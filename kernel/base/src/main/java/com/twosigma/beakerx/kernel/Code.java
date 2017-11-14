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

import com.twosigma.beakerx.kernel.magic.command.MagicCommand;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandItemWithResult;
import com.twosigma.beakerx.message.Message;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.apache.commons.lang3.builder.EqualsBuilder.reflectionEquals;
import static org.apache.commons.lang3.builder.HashCodeBuilder.reflectionHashCode;
import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;

import java.util.List;
import java.util.Optional;

public class Code {

  private final String allCode;
  private final List<MagicCommand> magicCommands;
  private Optional<String> codeBlock;
  private final List<MagicCommandItemWithResult> errors;
  private final Message message;

  private Code(String allCode, Optional<String> codeBlock, List<MagicCommand> magicCommands, List<MagicCommandItemWithResult> errors, Message message) {
    this.allCode = allCode;
    this.magicCommands = checkNotNull(magicCommands);
    this.errors = checkNotNull(errors);
    this.message = message;
    this.codeBlock = codeBlock;
  }

  public static Code createCode(String allCode, String codeBlock, List<MagicCommand> magicCommands, List<MagicCommandItemWithResult> errors, Message message) {
    return new Code(allCode, Optional.of(codeBlock), magicCommands, errors, message);
  }

  public static Code createCodeWithoutCodeBlock(String allCode, List<MagicCommand> magicCommands, List<MagicCommandItemWithResult> errors, Message message) {
    return new Code(allCode, Optional.empty(), magicCommands, errors, message);
  }

  public Optional<String> getCodeBlock() {
    return codeBlock;
  }

  public String asString() {
    return this.allCode;
  }

  public List<MagicCommand> getMagicCommands() {
    return magicCommands;
  }

  public boolean hasErrors() {
    return !errors.isEmpty();
  }

  public List<MagicCommandItemWithResult> getErrors() {
    return errors;
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

  public Message getMessage() {
    return message;
  }
}
