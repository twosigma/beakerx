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
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.SingleSparkSession;
import com.twosigma.beakerx.widget.SparkEngineConf;
import com.twosigma.beakerx.widget.SparkEngineNoUI;
import com.twosigma.beakerx.widget.SparkEngineNoUIImpl;
import com.twosigma.beakerx.widget.SparkEngineWithUIFactory;
import com.twosigma.beakerx.widget.SparkEngineWithUIMock;
import com.twosigma.beakerx.widget.SparkUI;
import com.twosigma.beakerx.widget.SparkUIFactory;
import com.twosigma.beakerx.widget.SparkUITest;
import com.twosigma.beakerx.widget.SparkUiDefaults;
import com.twosigma.beakerx.widget.TestWidgetUtils;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.widget.SparkUI.ONE_SPARK_SESSION_MSG_ERROR;
import static com.twosigma.beakerx.widget.SparkUITest.startContent;
import static com.twosigma.beakerx.widget.TestWidgetUtils.dataContains;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkMagicCommandTest {

  private SparkMagicCommand sparkMagicCommand;
  public SparkUI sparkUI;
  private KernelTest kernel;
  private SingleSparkSession singleSparkSession;
  SparkUiDefaultsImplMock sparkUiDefaults;
  private SparkEngineWithUIFactory sparkEngineWithUIFactoryMock;

  @Before
  public void setUp() {
    singleSparkSession = new SparkMagicCommand.SingleSparkSessionImpl();
    sparkEngineWithUIFactoryMock = sparkSessionBuilder -> new SparkEngineWithUIMock();
    sparkUiDefaults = new SparkUiDefaultsImplMock();
    kernel = new KernelTest();
    SparkUIFactory sparkUIFactory = createSparkUIFactory(singleSparkSession);
    sparkMagicCommand = new SparkMagicCommand(kernel,
            new SparkFactoryImpl(kernel,
                    new SparkManagerNoUIFactoryMock(),
                    sparkEngineWithUIFactoryMock,
                    sparkUIFactory,
                    sparkUiDefaults));
  }

  @Test
  public void connectToSpark() {
    //given
    //when
    MagicCommandOutcomeItem execute = createSparkUiAndConnectToSession();
    //then
    assertThat(execute.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.OK);
  }

  @Test
  public void returnErrorWhenConnectToExistingSparkSession() {
    //given
    createSparkUiAndConnectToSession();
    kernel.clearMessages();
    //when
    connectToSparkSecondTime();
    //then
    List<Message> messages = dataContains(kernel.getPublishedMessages(), "error");
    assertThat(messages.size()).isEqualTo(1);
    Map data = TestWidgetUtils.getData(messages.get(0));
    Map error = (Map)data.get("error");
    assertThat(error.get("message")).isEqualTo(ONE_SPARK_SESSION_MSG_ERROR);
  }

  private MagicCommandOutcomeItem connectToSparkSecondTime() {
    Code code2 = Code.createCode("", new ArrayList<>(), new ArrayList<>(), commMsg());
    MagicCommandExecutionParam param2 = new MagicCommandExecutionParam("", "", 2, code2, true);
    MagicCommandOutcomeItem execute = sparkMagicCommand.execute(param2);
    sparkUI.getComm().handleMsg(SparkUITest.commMsg(startContent()));
    return execute;
  }

  private MagicCommandOutcomeItem createSparkUiAndConnectToSession() {
    Code code = Code.createCode("%%spark", new ArrayList<>(), new ArrayList<>(), commMsg());
    MagicCommandExecutionParam param = new MagicCommandExecutionParam("%%spark", "", 1, code, true);
    MagicCommandOutcomeItem execute = sparkMagicCommand.execute(param);
    assertThat(execute.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.OK);
    assertThat(singleSparkSession.isActive()).isFalse();
    sparkUI.getComm().handleMsg(SparkUITest.commMsg(startContent()));
    assertThat(singleSparkSession.isActive()).isTrue();
    return execute;
  }

  private SparkUIFactory createSparkUIFactory(SingleSparkSession singleSparkSession) {
    return (builder, sparkEngineWithUI, sparkUiDefaults) -> {
      CommMock commMock = new CommMock("id1", JupyterMessages.COMM_MSG.getName(), kernel);
      sparkUI = new SparkUI(commMock, sparkEngineWithUI, sparkUiDefaults, singleSparkSession, kernel);
      return sparkUI;
    };
  }

  public static class SparkManagerNoUIFactoryMock implements SparkEngineNoUIImpl.SparkEngineNoUIFactory {

    @Override
    public SparkEngineNoUI create(SparkSession.Builder sparkSessionBuilder) {
      return new SparkEngineNoUI() {
        @Override
        public TryResult configure(KernelFunctionality kernel, Message parentMessage) {
          return null;
        }

        @Override
        public SparkSession getOrCreate() {
          return null;
        }

        @Override
        public SparkConf getSparkConf() {
          return new SparkConf();
        }

        @Override
        public String getSparkAppId() {
          return "sparkAppId1";
        }

        @Override
        public Map<String, String> getAdvanceSettings(SparkUiDefaults defaults) {
          return new HashMap<>();
        }

        @Override
        public String getSparkUiWebUrl() {
          return "";
        }

        @Override
        public String getSparkMasterUrl() {
          return "";
        }

        @Override
        public String sparkVersion() {
          return null;
        }

        @Override
        public void additionalConf(SparkEngineConf conf) {

        }

        @Override
        public SparkEngineConf getSparkEngineConf() {
          return null;
        }

        @Override
        public void configAutoStart() {

        }

        @Override
        public String stageLink(int stageId) {
          return null;
        }

        @Override
        public String jobLink(int jobId) {
          return null;
        }

        @Override
        public void jobLinkFactory(JobLinkFactory jobLinkFactory) {

        }

        @Override
        public void stageLinkFactory(StageLinkFactory stageLinkFactory) {

        }

        @Override
        public void sparkUiWebUrlFactory(SparkUiWebUrlFactory factory) {

        }

        @Override
        public void stop() {

        }

        @Override
        public void cancelAllJobs() {

        }

        @Override
        public void cancelStage(int stageid) {

        }

      };
    }
  }
}