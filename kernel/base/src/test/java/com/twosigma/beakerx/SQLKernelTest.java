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
package com.twosigma.beakerx;

import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.kernel.commands.MagicCommand;
import com.twosigma.beakerx.kernel.commands.item.MagicCommandType;
import java.util.List;

public class SQLKernelTest extends KernelTest {

  public SQLKernelTest(String id, Evaluator evaluator) {
    super(id, evaluator);
  }

  @Override
  public List<MagicCommandType> getMagicCommands() {
    List<MagicCommandType> magicCommands = super.getMagicCommands();
    magicCommands.add(new MagicCommandType(MagicCommand.DATASOURCES, "<jdbc:[dbEngine]:[subsubprotocol:][databaseName]>", getMagicCommand().dataSources()));
    magicCommands.add(new MagicCommandType(MagicCommand.DEFAULT_DATASOURCE, "<sourceName=jdbc:[dbEngine]:[subsubprotocol:][databaseName]>", getMagicCommand().defaultDataSources()));

    return magicCommands;
  }
}
