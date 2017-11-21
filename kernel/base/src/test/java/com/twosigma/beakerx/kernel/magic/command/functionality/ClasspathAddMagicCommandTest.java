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
package com.twosigma.beakerx.kernel.magic.command.functionality;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcome;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beakerx.kernel.handler.MagicCommandExecutor.executeMagicCommands;
import static org.assertj.core.api.Assertions.assertThat;

public class ClasspathAddMagicCommandTest {

  private KernelTest kernel;
  private EvaluatorTest evaluator;

  @Before
  public void setUp() throws Exception {
    this.evaluator = new EvaluatorTest();
    this.kernel = new KernelTest("id2", evaluator);
  }

  @After
  public void tearDown() throws Exception {
    kernel.exit();
  }

  @Test
  public void errorWhenUnknownMagicCommand() throws Exception {
    //given
    String allCode = "%unknownClasspath params";
    Code code = CodeFactory.create(allCode, new Message(), kernel);
    //when
    MagicCommandOutcome result = executeMagicCommands(code, 1, kernel);
    //then
    MagicCommandOutcomeItem actual = result.getItems().get(0);
    assertThat(actual.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.ERROR);
    assertThat((String) actual.getMIMEContainer().get().getData()).contains("Cell magic " + allCode + " not found");
  }


  @Test
  public void errorWhenIncompleteMagicCommand() throws Exception {
    //given
    String allCode = ClasspathAddJarMagicCommand.CLASSPATH + " add garbage";
    Code code = CodeFactory.create(allCode, new Message(), kernel);
    //when
    MagicCommandOutcome result = executeMagicCommands(code, 1, kernel);
    //then
    MagicCommandOutcomeItem actual = result.getItems().get(0);
    assertThat(actual.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.ERROR);
  }

}