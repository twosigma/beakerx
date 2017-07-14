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

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.message.Message;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beakerx.kernel.commands.MagicCommand.DATASOURCES;
import static com.twosigma.beakerx.kernel.commands.MagicCommand.DEFAULT_DATASOURCE;
import static org.assertj.core.api.Assertions.assertThat;

public class SQLMagicCommandTest {

  private MagicCommand sut;
  private KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    this.kernel = new KernelTest("id2", new EvaluatorTest());
    this.sut = new MagicCommand(kernel);
  }

  @Test
  public void handleDefaultDatasourceMagicCommand() throws Exception {
    //given
    String codeAsString = DEFAULT_DATASOURCE + " jdbc:h2:mem:db1";
    Code code = new Code(codeAsString);
    //when
    sut.process(code, new Message(), 1);
    //then
    assertThat(kernel.getDefaultDatasource().get()).isEqualTo("jdbc:h2:mem:db1");
  }

  @Test
  public void handleDatasourceMagicCommand() throws Exception {
    //given
    String codeAsString = DATASOURCES + " jdbc:h2:mem:db2";
    Code code = new Code(codeAsString);
    //when
    sut.process(code, new Message(), 1);
    //then
    assertThat(kernel.getDatasource().get()).isEqualTo("jdbc:h2:mem:db2");
  }

}
