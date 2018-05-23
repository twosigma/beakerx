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
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.SparkUIManager;
import com.twosigma.beakerx.widget.SparkManager;
import com.twosigma.beakerx.widget.SparkUI;
import org.apache.spark.SparkConf;
import org.apache.spark.SparkContext;
import org.apache.spark.sql.SparkSession;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkMagicCommandTest {

  private SparkMagicCommand sparkMagicCommand;
  public SparkUI sparkUI;

  @Before
  public void setUp() {
    SparkManager.SparkManagerFactory sparkManagerFactory = createSparkManagerFactory();
    SparkUI.SparkUIFactory sparkUIFactory = createSparkUIFactory();
    sparkMagicCommand = new SparkMagicCommand(new KernelTest(), sparkUIFactory, sparkManagerFactory);
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
    //when
    MagicCommandOutcomeItem execute2 = connectToSparkSecondTime();
    //then
    assertThat(execute2.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.ERROR);
  }

  private MagicCommandOutcomeItem connectToSparkSecondTime() {
    Code code2 = Code.createCode("", new ArrayList<>(), new ArrayList<>(),commMsg());
    MagicCommandExecutionParam param2 = new MagicCommandExecutionParam("", "", 2, code2, true);
    return sparkMagicCommand.execute(param2);
  }

  private MagicCommandOutcomeItem createSparkUiAndConnectToSession() {
    Code code = Code.createCode("%%spark", new ArrayList<>(), new ArrayList<>(),commMsg());
    MagicCommandExecutionParam param = new MagicCommandExecutionParam("%%spark", "", 1, code, true);
    MagicCommandOutcomeItem execute = sparkMagicCommand.execute(param);
    assertThat(execute.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.OK);
    assertThat(sparkUI.isSparkSessionIsActive()).isFalse();
    sparkUI.getConnectButton().onClick(new HashMap(), commMsg());
    return execute;
  }

  private SparkUI.SparkUIFactory createSparkUIFactory() {
    return new SparkUI.SparkUIFactory() {
      private SparkUI.SparkUIFactoryImpl factory = new SparkUI.SparkUIFactoryImpl();

      @Override
      public SparkUI create(SparkManager sparkManager) {
        sparkUI = factory.create(sparkManager);
        return sparkUI;
      }
    };
  }

  public static SparkManager.SparkManagerFactory createSparkManagerFactory() {
    return sparkSessionBuilder -> new SparkManager() {
      SparkConf sparkConf = new SparkConf();
      SparkSession.Builder builder = SparkSession.builder().config(sparkConf);

      @Override
      public TryResult configure(KernelFunctionality kernel, SparkUIManager sparkContextManager, Message parent) {
        return TryResult.createResult("ok");
      }

      @Override
      public SparkSession getOrCreate() {
        return null;
      }

      @Override
      public SparkConf getSparkConf() {
        return sparkConf;
      }

      @Override
      public SparkContext sparkContext() {
        return null;
      }

      @Override
      public SparkSession.Builder getBuilder() {
        return builder;
      }
    };
  }

}