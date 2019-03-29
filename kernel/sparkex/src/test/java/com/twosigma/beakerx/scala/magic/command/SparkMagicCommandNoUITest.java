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

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkMagicCommandNoUITest {

  private SparkMagicCommand sparkMagicCommand;
  private KernelTest kernel;

  @Before
  public void setUp() {
    kernel = new KernelTest();
    sparkMagicCommand = new SparkMagicCommand(kernel, new SparkFactoryNoUIMock());
  }

  @Test
  public void createSparkWithoutUI() {
    //given
    //when
    MagicCommandOutcomeItem execute = createSparkNoUi();
    //then
    assertThat(execute.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.OK);
  }

  private MagicCommandOutcomeItem createSparkNoUi() {
    String command = "%%spark --noUI";
    String codeBlock = "SparkSession.builder()\n" +
            "      .appName(\"Simple Application\")\n" +
            "      .master(\"local[4]\")";
    String allCode = command + "\n" + codeBlock;
    Code code = Code.createCode(allCode, new ArrayList<>(), new ArrayList<>(), commMsg());
    MagicCommandExecutionParam param = new MagicCommandExecutionParam(command, codeBlock, 1, code, true);
    MagicCommandOutcomeItem execute = sparkMagicCommand.execute(param);
    assertThat(execute.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.OK);
    return execute;
  }

  static class SparkFactoryNoUIMock implements SparkFactory {

    @Override
    public MagicCommandOutcomeItem createSpark(MagicCommandExecutionParam param, List<SparkMagicCommandOptions.SparkOptionCommand> options) {
      return new MagicCommandOutput(MagicCommandOutcomeItem.Status.OK);
    }
  }

}