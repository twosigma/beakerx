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
package com.twosigma.beakerx.sql.magic.command;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandType;

import java.util.List;

import static com.twosigma.beakerx.sql.magic.command.DataSourcesMagicCommand.DATASOURCES;
import static com.twosigma.beakerx.sql.magic.command.DefaultDataSourcesMagicCommand.DEFAULT_DATASOURCE;

public class SQLKernelTest extends KernelTest {

  public SQLKernelTest(String id, Evaluator evaluator) {
    super(id, evaluator);
  }

  @Override
  public List<MagicCommandType> getMagicCommandTypes() {
    List<MagicCommandType> magicCommands = super.getMagicCommandTypes();
    DataSourceParamResolverImpl paramResolver = new DataSourceParamResolverImpl(new EvaluatorTest.BeakexClientTestImpl());
    magicCommands.add(new MagicCommandType(DATASOURCES, "<jdbc:[dbEngine]:[subsubprotocol:][databaseName]>", new DataSourcesMagicCommand(this, paramResolver)));
    magicCommands.add(new MagicCommandType(DEFAULT_DATASOURCE, "<sourceName=jdbc:[dbEngine]:[subsubprotocol:][databaseName]>", new DefaultDataSourcesMagicCommand(this, paramResolver)));

    return magicCommands;
  }
}
