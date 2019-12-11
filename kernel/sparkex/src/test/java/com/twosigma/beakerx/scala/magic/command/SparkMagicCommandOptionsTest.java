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

import com.twosigma.beakerx.widget.SparkEngine;
import com.twosigma.beakerx.widget.SparkEngineConf;
import com.twosigma.beakerx.widget.SparkUiDefaults;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;
import org.junit.Before;
import org.junit.Test;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

public class SparkMagicCommandOptionsTest {

  private SparkMagicCommandOptions sut;
  private SparkEngineMock engineMock;

  @Before
  public void setUp() {
    engineMock = new SparkEngineMock();
    sut = new SparkMagicCommandOptions();
  }

  @Test
  public void parseLongStartOption() {
    //given
    String options = "--start -v 2.2.1";
    //when
    runOptions(options);
    //then
    assertThat(engineMock.sparkConnected).isTrue();
  }

  @Test
  public void parseShortStartOption() {
    //given
    String options = "-s";
    //when
    runOptions(options);
    //then
    assertThat(engineMock.sparkConnected).isTrue();
  }

  @Test
  public void unknownOption() {
    //given
    String options = "--unknownOption";
    //when
    SparkMagicCommandOptions.OptionsResult optionsResult = sut.parseOptions(args(options));
    //then
    assertThat(optionsResult.hasError()).isTrue();
  }

  private void runOptions(String options) {
    SparkMagicCommandOptions.OptionsResult optionsResult = sut.parseOptions(args(options));
    //then
    assertThat(optionsResult.hasError()).isFalse();
    optionsResult.options().forEach(x -> x.run(engineMock, null));
  }

  private String[] args(String options) {
    return options.split(" ");
  }


  class SparkEngineMock implements SparkEngine {

    boolean sparkConnected = false;

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

    }

    @Override
    public SparkEngineConf getSparkEngineConf() {
      return null;
    }

    @Override
    public void configAutoStart() {
      this.sparkConnected = true;
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
  }

}