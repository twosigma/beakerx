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
package com.twosigma.beakerx.kernel.commands;

import static com.twosigma.beakerx.kernel.commands.type.Command.DATASOURCES;
import static com.twosigma.beakerx.kernel.commands.type.Command.DEFAULT_DATASOURCE;
import static org.assertj.core.api.Assertions.assertThat;

import com.twosigma.beakerx.SQLKernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.commands.type.DataSourceMagicCommand;
import com.twosigma.beakerx.kernel.commands.type.DefaultDataSourcesMagicCommand;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class SQLMagicCommandTest {

  private DefaultDataSourcesMagicCommand defaultDataSourcesMagicCommand;
  private DataSourceMagicCommand dataSourceMagicCommand;
  private MessageCreator messageCreator;
  private SQLKernelTest kernel;

  @Before
  public void setUp() throws Exception {
    this.kernel = new SQLKernelTest("id2", new EvaluatorTest());
    this.messageCreator = new MessageCreator(kernel);
    this.defaultDataSourcesMagicCommand = new DefaultDataSourcesMagicCommand(kernel, messageCreator);
    this.dataSourceMagicCommand = new DataSourceMagicCommand(kernel, messageCreator);
  }

  @After
  public void tearDown() throws Exception {
    kernel.exit();
  }

  @Test
  public void handleDefaultDatasourceMagicCommand() throws Exception {
    //given
    String codeAsString = DEFAULT_DATASOURCE + " jdbc:h2:mem:db1";
    //when
    defaultDataSourcesMagicCommand.build().process(codeAsString, new Message(), 1);
    //then
    //TODO
    //kernel.getSetShellOptions().getParam("codeAsString").get()
    //assertThat(kernel.getSetShellOptions()..get()).isEqualTo("jdbc:h2:mem:db1");
  }

  @Test
  public void handleDatasourceMagicCommand() throws Exception {
    //given
    String codeAsString = DATASOURCES + " jdbc:h2:mem:db2";

    //when
    dataSourceMagicCommand.build().process(codeAsString, new Message(), 1);
    //then
    //TODO
    //assertThat(kernel.getDatasource().get()).isEqualTo("jdbc:h2:mem:db2");
  }

}
