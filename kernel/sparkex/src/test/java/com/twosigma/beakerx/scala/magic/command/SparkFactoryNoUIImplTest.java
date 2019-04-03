package com.twosigma.beakerx.scala.magic.command;

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

import com.google.common.collect.ImmutableList;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.SparkEngineNoUI;
import com.twosigma.beakerx.widget.SparkEngineNoUIImpl;
import com.twosigma.beakerx.widget.SparkEngineWithUI;
import com.twosigma.beakerx.widget.SparkUI;
import com.twosigma.beakerx.widget.SparkUiDefaults;
import org.apache.spark.sql.SparkSession;
import org.jetbrains.annotations.NotNull;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.scala.magic.command.SparkFactoryImpl.CONFIGURATION_MUST_BE_PROVIDED;
import static com.twosigma.beakerx.scala.magic.command.SparkFactoryImpl.SPARK_SESSION_AVAILABLE_BY_SPARK;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkFactoryNoUIImplTest {

  private SparkFactoryImpl sparkFactory;
  private SparkEngineNoUIFactoryMock sparkEngineNoUIFactory;
  private KernelFunctionalityMock kernel;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelFunctionalityMock();
    sparkEngineNoUIFactory = new SparkEngineNoUIFactoryMock();
    sparkFactory = new SparkFactoryImpl(kernel, sparkEngineNoUIFactory, new SparkUIFactoryMock(), new SparkFactoryWithUIImplTest.SparkUiDefaultsImplMock());
  }

  @Test
  public void createSparkWithNoUI() {
    //given
    sparkEngineNoUIFactory.goodConfiguration();
    //when
    MagicCommandOutcomeItem sparkWithoutUI = sparkFactory.createSpark(sparkNoUIParam(), ImmutableList.of(new NoUISparkOptionCommand()));
    //then
    assertThat(sparkWithoutUI.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.OK);
    Object data = sparkWithoutUI.getMIMEContainer().get().getData();
    assertThat((String) data).contains(SPARK_SESSION_AVAILABLE_BY_SPARK);
  }

  @Test
  public void shouldNotCreateSparkWithNoUIWhenConfigurationError() {
    //given
    sparkEngineNoUIFactory.wrongConfiguration();
    //when
    MagicCommandOutcomeItem sparkWithoutUI = sparkFactory.createSpark(sparkNoUIParam(), ImmutableList.of(new NoUISparkOptionCommand()));
    //then
    assertThat(sparkWithoutUI.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.ERROR);
  }

  @Test
  public void shouldInformUserAboutProvidingConfiguration() {
    //given
    kernel.result = TryResult.createResult(null);
    //when
    MagicCommandOutcomeItem sparkWithoutUI = sparkFactory.createSpark(sparkNoUIParam(), ImmutableList.of(new NoUISparkOptionCommand()));
    //then
    assertThat(sparkWithoutUI.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.ERROR);
    Object data = sparkWithoutUI.getMIMEContainer().get().getData();
    assertThat((String) data).contains(CONFIGURATION_MUST_BE_PROVIDED);
  }


  @NotNull
  private MagicCommandExecutionParam sparkNoUIParam() {
    String command = "%%spark --noUI";
    String codeBlock = "";
    String allCode = command + "\n" + codeBlock;
    Code code = Code.createCode(allCode, new ArrayList<>(), new ArrayList<>(), commMsg());
    return new MagicCommandExecutionParam(command, codeBlock, 1, code, true);
  }

  class SparkEngineNoUIFactoryMock implements SparkEngineNoUIImpl.SparkEngineNoUIFactory {

    private boolean configuration;

    @Override
    public SparkEngineNoUI create(SparkSession.Builder sparkSessionBuilder) {
      return new SparkEngineNoUIEmptyMock() {
        @Override
        public TryResult configure(KernelFunctionality kernel, Message parentMessage) {
          if (configuration) {
            return TryResult.createResult(true);
          }
          return TryResult.createError("false");
        }
      };
    }

    public void goodConfiguration() {
      this.configuration = true;
    }

    public void wrongConfiguration() {
      this.configuration = false;
    }
  }

  class SparkUIFactoryMock implements SparkUI.SparkUIFactory {

    @Override
    public SparkUI create(SparkSession.Builder builder, SparkEngineWithUI sparkEngineWithUI, SparkUiDefaults sparkUiDefaults) {
      return null;
    }
  }

  class KernelFunctionalityMock extends KernelFunctionalityEmptyMock {

    TryResult.CellResult result = TryResult.createResult(new SparkSession.Builder());

    @Override
    public TryResult executeCode(String code, SimpleEvaluationObject seo) {
      return result;
    }
  }
}