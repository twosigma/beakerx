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
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.widget.SparkEngine;
import com.twosigma.beakerx.widget.SparkEngineConf;
import com.twosigma.beakerx.widget.SparkUiDefaults;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;
import org.junit.Before;
import org.junit.Test;

import java.util.Map;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class YarnSparkOptionCommandTest {

  private YarnSparkOptionCommand sut;
  private SparkEngineMock sparkEngineMock;

  @Before
  public void setUp() throws Exception {
    sparkEngineMock = new SparkEngineMock();
    sut = new YarnSparkOptionCommand();
    KernelManager.register(new KernelTest());
  }

  @Test
  public void yarnMaster() {
    //given

    //when
    sut.run(sparkEngineMock, commMsg());
    //then
    assertThat(sparkEngineMock.conf.getMaster().get()).isEqualTo("yarn");
  }

  @Test
  public void yarnJobLink() {
    //given
    sut.run(sparkEngineMock, commMsg());
    //when
    String job = sparkEngineMock.jobLinkFactory.create(1);
    //then
    assertThat(job).contains("1");
  }

  @Test
  public void yarnStageLink() {
    //given
    sut.run(sparkEngineMock, commMsg());
    //when
    String stage = sparkEngineMock.stageLinkFactory.create(1);
    //then
    assertThat(stage).contains("1");
  }

  @Test
  public void yarnSparkUiWebUrl() {
    //given
    sut.run(sparkEngineMock, commMsg());
    //when
    String url = sparkEngineMock.sparkUiWebUrlFactory.create();
    //then
    assertThat(url).isNotNull();
  }

  class SparkEngineMock implements SparkEngine {

    private JobLinkFactory jobLinkFactory;
    private StageLinkFactory stageLinkFactory;
    private SparkUiWebUrlFactory sparkUiWebUrlFactory;
    private SparkEngineConf conf;

    @Override
    public SparkSession getOrCreate() {
      return null;
    }

    @Override
    public SparkConf getSparkConf() {
      return null;
    }

    @Override
    public String getSparkAppId() {
      return null;
    }

    @Override
    public Map<String, String> getAdvanceSettings(SparkUiDefaults defaults) {
      return null;
    }

    @Override
    public String getSparkUiWebUrl() {
      return null;
    }

    @Override
    public String getSparkMasterUrl() {
      return null;
    }

    @Override
    public String sparkVersion() {
      return null;
    }

    @Override
    public void additionalConf(SparkEngineConf conf) {
      this.conf = conf;
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
    public void jobLinkFactory(JobLinkFactory factory) {
      this.jobLinkFactory = factory;
    }

    @Override
    public void stageLinkFactory(StageLinkFactory factory) {
      this.stageLinkFactory = factory;
    }

    @Override
    public void sparkUiWebUrlFactory(SparkUiWebUrlFactory factory) {
      this.sparkUiWebUrlFactory = factory;
    }
  }

}