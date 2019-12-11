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
package com.twosigma.beakerx.scala.magic.command;

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClassPathAddMvnCellMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.message.Message;

import java.util.Optional;

class EnableSparkSupportActionOptionsImpl implements EnableSparkSupportActionOptions {

  public static final String COMMAND = ClassPathAddMvnCellMagicCommand.CLASSPATH_ADD_MVN_CELL;

  private final KernelFunctionality kernel;

  public EnableSparkSupportActionOptionsImpl(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  @Override
  public MagicCommandOutcomeItem loadSpark(Message parent, String version) {
    String sparkDeps = SPARK_SQL_2_12 + version + System.lineSeparator() + SPARK_MLLIB_2_12 + version;
    Optional<MagicCommandFunctionality> magicOption = getMagicCommand(COMMAND);
    ClassPathAddMvnCellMagicCommand magic = ((ClassPathAddMvnCellMagicCommand) magicOption.get());
    return magic.execute(COMMAND, sparkDeps, parent);
  }

  private Optional<MagicCommandFunctionality> getMagicCommand(String sparkCommand) {
    return CodeFactory.findMagicCommandFunctionality(kernel.getMagicCommandTypes(), sparkCommand);
  }

}
