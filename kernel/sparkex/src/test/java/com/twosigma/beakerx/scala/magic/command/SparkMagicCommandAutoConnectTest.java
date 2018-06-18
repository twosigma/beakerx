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
import com.twosigma.beakerx.widget.SingleSparkSession;
import com.twosigma.beakerx.widget.SparkEngine;
import com.twosigma.beakerx.widget.SparkUI;
import com.twosigma.beakerx.widget.SparkUiDefaults;
import org.apache.spark.sql.SparkSession;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkMagicCommandAutoConnectTest {

  private SparkMagicCommand sparkMagicCommand;
  public SparkUI sparkUI;
  private SingleSparkSession singleSparkSession;

  @Before
  public void setUp() {
    singleSparkSession = new SparkMagicCommand.SingleSparkSessionImpl();
    SparkUI.SparkUIFactory sparkUIFactory = createSparkUIFactory(new SparkMagicCommandTest.SparkManagerFactoryTest(), singleSparkSession);
    sparkMagicCommand = new SparkMagicCommand(new KernelTest(), sparkUIFactory);
  }

  @Test
  public void unknownOption() {
    //given
    //when
    MagicCommandOutcomeItem execute = createSparkUi("--unknownOption");
    //then
    assertThat(execute.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.ERROR);
    assertThat((String) execute.getMIMEContainer().get().getData()).contains("Unknown option --unknownOption");
  }

  @Test
  public void autoConnectToSpark_by_connect_option() {
    //given
    //when
    MagicCommandOutcomeItem execute = createSparkUi("--connect");
    //then
    assertThat(execute.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.OK);
    assertThat(singleSparkSession.isActive()).isTrue();
  }

  @Test
  public void autoConnectToSpark_by_c_option() {
    //given
    //when
    MagicCommandOutcomeItem execute = createSparkUi("-c");
    //then
    assertThat(execute.getStatus()).isEqualTo(MagicCommandOutcomeItem.Status.OK);
    assertThat(singleSparkSession.isActive()).isTrue();
  }

  private MagicCommandOutcomeItem createSparkUi(String option) {
    Code code = Code.createCode("%%spark " + option, new ArrayList<>(), new ArrayList<>(), commMsg());
    MagicCommandExecutionParam param = new MagicCommandExecutionParam("%%spark " + option, "", 1, code, true);
    MagicCommandOutcomeItem execute = sparkMagicCommand.execute(param);
    return execute;
  }

  private SparkUI.SparkUIFactory createSparkUIFactory(SparkEngine.SparkEngineFactory sparkManagerFactory, SingleSparkSession singleSparkSession) {
    return new SparkUI.SparkUIFactory() {
      private SparkUI.SparkUIFactoryImpl factory = new SparkUI.SparkUIFactoryImpl(sparkManagerFactory, new SparkUiDefaults() {

        @Override
        public void saveSparkConf(List<Map<String, Object>> sparkConf) {

        }

        @Override
        public void loadDefaults(SparkSession.Builder builder) {

        }

        @Override
        public List<Map<String, Object>> getProfiles() {
          return null;
        }

        @Override
        public Map<String, Object> getProfileByName(String name) {
          return null;
        }

        @Override
        public void removeSparkConf(String profileName) {

        }

        @Override
        public void loadProfiles() {

        }

        @Override
        public void saveProfile(Map<String, Object> profile) {

        }

        @Override
        public List<String> getProfileNames() {
          return null;
        }

        @Override
        public void saveProfileName(String profileName) {

        }

        @Override
        public String getCurrentProfileName() {
          return null;
        }

      }, singleSparkSession);

      @Override
      public SparkUI create(SparkSession.Builder builder) {
        sparkUI = factory.create(builder);
        return sparkUI;
      }
    };
  }

}