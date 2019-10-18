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
package com.twosigma.beakerx.sql.magic.command;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.sql.magic.command.DefaultDataSourcesMagicCommand.DEFAULT_DATASOURCE;
import static org.assertj.core.api.Assertions.assertThat;

public class DefaultDataSourcesMagicCommandTest {


  private KernelTest kernel;
  private EvaluatorTest evaluator;
  private DefaultDataSourcesMagicCommand sut;
  private DataSourceParamResolverMock dataSourceParamResolverMock;

  @Before
  public void setUp() throws Exception {
    this.evaluator = new EvaluatorTest();
    this.kernel = new KernelTest("id2", evaluator);
    this.dataSourceParamResolverMock = new DataSourceParamResolverMock();
    this.sut = new DefaultDataSourcesMagicCommand(kernel, dataSourceParamResolverMock);
  }

  @After
  public void tearDown() throws Exception {
    kernel.exit();
  }

  @Test
  public void test() {
    //given
    String command = DEFAULT_DATASOURCE + " jdbc:postgresql://localhost:5432/postgres?user={$beakerx.dbuser}&password={$beakerx.dbpassword}";
    Code code = CodeFactory.create(command, commMsg(), kernel);
    MagicCommandExecutionParam param = new MagicCommandExecutionParam(command, null, 1, code, false);
    //when
    this.sut.execute(param);
    //then
    assertThat(this.dataSourceParamResolverMock.resolvedCounter).isEqualTo(1);
  }


  class DataSourceParamResolverMock implements DataSourceParamResolver {
    int resolvedCounter = 0;

    @Override
    public String resolve(String jdbcTemplate) {
      resolvedCounter++;
      return jdbcTemplate;
    }
  }

}