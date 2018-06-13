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
package com.twosigma.beakerx.widget;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.scala.magic.command.SparkMagicCommand;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkUITest {

  SparkUI sparkUI;
  SparkUiDefaultsImplMock sparkUiDefaults;
  KernelTest kernel;
  SingleSparkSession singleSparkSession;

  @Before
  public void setUp() throws Exception {
    singleSparkSession = new SparkMagicCommand.SingleSparkSessionImpl();
    kernel = new KernelTest();
    KernelManager.register(kernel);
    sparkUiDefaults = new SparkUiDefaultsImplMock();
    sparkUI = new SparkUI(SparkSession.builder(), sparkSessionBuilder -> new SparkManagerImplTest(), sparkUiDefaults, singleSparkSession);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void loadDefaultsWhenCreateSparkUI() {
    //given
    SparkUiDefaultsImplMock sparkUiDefaults = new SparkUiDefaultsImplMock();
    //when
    new SparkUI(SparkSession.builder(), sparkSessionBuilder -> new SparkManagerImplTest(), sparkUiDefaults, singleSparkSession);
    //then
    assertThat(sparkUiDefaults.loaded).isTrue();
  }

  static class SparkUiDefaultsImplMock implements SparkUiDefaults {

    public boolean saved = false;
    public boolean loaded = false;

    @Override
    public void saveSparkConf(HashMap sparkConf, String profileName) {
      saved = true;
    }

    @Override
    public void loadDefaults(SparkSession.Builder builder) {
      loaded = true;
    }

    @Override
    public Set<String> getProfiles() {
      return null;
    }

    @Override
    public void removeSparkConf(String profileName) {

    }

    @Override
    public Map<String, Object> loadProfile(String profileName) {
      return null;
    }
  }

  static class SparkManagerImplTest implements SparkEngine {

    public static final String SPARK_APP_ID_MOCK = "SparkAppId1";

    @Override
    public TryResult configure(KernelFunctionality kernel, SparkUIApi sparkContextManager, Message parentMessage) {
      return TryResult.createResult("ok");
    }

    @Override
    public SparkSession getOrCreate() {
      return SparkSession.builder().config(getSparkConf()).getOrCreate();
    }

    @Override
    public SparkConf getSparkConf() {
      SparkConf sparkConf = new SparkConf();
      sparkConf.setMaster("local[1]");
      sparkConf.setAppName("appName1");
      return sparkConf;
    }

    @Override
    public String getSparkAppId() {
      return SPARK_APP_ID_MOCK;
    }

    @Override
    public Map<String, String> getAdvanceSettings() {
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
  }

}