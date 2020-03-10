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

import com.twosigma.beakerx.CommMock;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.SingleSparkSession;
import com.twosigma.beakerx.widget.SparkEngineWithUI;
import com.twosigma.beakerx.widget.SparkEngineWithUIMock;
import com.twosigma.beakerx.widget.SparkUI;
import com.twosigma.beakerx.widget.SparkUIFactory;
import com.twosigma.beakerx.widget.SparkUiDefaults;
import com.twosigma.beakerx.widget.TestWidgetUtils;
import org.apache.spark.sql.SparkSession;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Map;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkMagicCommandAutoConnectTest {

  private SparkMagicCommand sparkMagicCommand;
  public SparkUI sparkUI;
  private SingleSparkSession singleSparkSession;
  private KernelTest kernel;
  private SparkEngineWithUIMock sparkEngineWithUIMock;

  @Before
  public void setUp() {
    singleSparkSession = new SparkMagicCommand.SingleSparkSessionImpl();
    SparkUIFactory sparkUIFactory = createSparkUIFactory(singleSparkSession);
    kernel = new KernelTest();
    sparkEngineWithUIMock = new SparkEngineWithUIMock();
    sparkMagicCommand = new SparkMagicCommand(
            kernel,
            new SparkFactoryImpl(
                    kernel,
                    new SparkMagicCommandTest.SparkManagerNoUIFactoryMock(),
                    sparkSessionBuilder -> {
                      return sparkEngineWithUIMock;
                    },
                    sparkUIFactory,
                    new SparkUiDefaultsImplMock()));
  }

  @Test
  public void unknownOption() {
    //given
    //when
    MagicCommandOutcomeItem execute = createSparkUi("--unknownOption");
    //then
    assertThat(execute.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.ERROR);
  }

  @Test
  public void autoConnectToSpark_by_start_option() {
    //given
    //when
    MagicCommandOutcomeItem execute = createSparkUi("--start");
    //then
    assertThat(execute.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.OK);
    assertThat(sparkEngineWithUIMock.isAutoStart()).isTrue();
    Message openMessages = TestWidgetUtils.getOpenMessages(kernel.getPublishedMessages()).get(1);
    Map state = TestWidgetUtils.getState(openMessages);
    assertThat((Boolean) state.get("is_auto_start")).isTrue();
    Map data = TestWidgetUtils.getData(kernel.getPublishedMessages().get(3));
    Map event = (Map)data.get("event");
    assertThat((String) event.get("auto_start")).isEqualTo("done");
  }

  @Test
  public void autoConnectToSpark_by_s_option() {
    //given
    //when
    MagicCommandOutcomeItem execute = createSparkUi("-s");
    //then
    assertThat(execute.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.OK);
    assertThat(sparkEngineWithUIMock.isAutoStart()).isTrue();
  }

  private MagicCommandOutcomeItem createSparkUi(String option) {
    Code code = Code.createCode("%%spark " + option, new ArrayList<>(), new ArrayList<>(), commMsg());
    MagicCommandExecutionParam param = new MagicCommandExecutionParam("%%spark " + option, "", 1, code, true);
    MagicCommandOutcomeItem execute = sparkMagicCommand.execute(param);
    return execute;
  }

  private SparkUIFactory createSparkUIFactory(SingleSparkSession singleSparkSession) {
    return new SparkUIFactory() {
      @Override
      public SparkUI create(SparkSession.Builder builder, SparkEngineWithUI sparkEngineWithUI, SparkUiDefaults sparkUiDefaults) {
        CommMock commMock = new CommMock("id1", JupyterMessages.COMM_MSG.getName(), kernel);
        sparkUI = new SparkUI(commMock, sparkEngineWithUI, sparkUiDefaults, singleSparkSession, kernel);
        return sparkUI;
      }
    };
  }

}