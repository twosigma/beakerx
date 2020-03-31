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

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.scala.magic.command.KernelFunctionalityEmptyMock;
import com.twosigma.beakerx.scala.magic.command.SparkListenerServiceMock;
import com.twosigma.beakerx.scala.magic.command.SparkSessionBuilderFactoryMock;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.widget.SparkEngineBase.STOP;
import static com.twosigma.beakerx.widget.SparkEngineWithUIImpl.STOP_FROM_SPARK_UI_FORM_BUTTON;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_CONTEXT_NAME;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_SESSION_NAME;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkEngineWithUIImplTest {

  SparkListenerServiceMock sparkListenerService;
  SparkEngineWithUIImpl sut;
  KernelFunctionalityEmptyMock kernel;
  HashMap<String, Object> sparkOptions;
  SparkUIMock sparkUI;
  SparkSessionBuilderFactoryMock sparkSessionBuilderFactory;
  SparkSessionBuilderMock userSparkSessionBuilder;

  @Before
  public void setUp() throws Exception {
    sparkListenerService = new SparkListenerServiceMock();
    sparkSessionBuilderFactory = new SparkSessionBuilderFactoryMock();
    userSparkSessionBuilder = new SparkSessionBuilderMock();
    sut = new SparkEngineWithUIImpl(userSparkSessionBuilder, sparkSessionBuilderFactory, sparkListenerService);
    kernel = new KernelFunctionalityEmptyMock();
    sparkOptions = new HashMap<>();
    sparkUI = new SparkUIMock();
  }

  @Test
  public void shouldCreateNewInstanceOfSparkSessionBuilder() {
    //given
    //when
    sut.createSparkContext(kernel, sparkUI, commMsg(), sparkOptions);
    //then
    assertThat(sparkSessionBuilderFactory.newInstanceCreated).isTrue();
  }

  @Test
  public void sparkListenerShouldBeConfigured() {
    //given
    //when
    sut.createSparkContext(kernel, sparkUI, commMsg(), sparkOptions);
    //then
    assertThat(sparkListenerService.configured).isTrue();
  }

  @Test
  public void shouldInitSparkVariable() {
    //given
    //when
    TryResult sparkContext = sut.createSparkContext(kernel, sparkUI, commMsg(), sparkOptions);
    //then
    assertThat((String) sparkContext.result()).contains(SPARK_SESSION_NAME);
    assertThat((String) sparkContext.result()).contains(SPARK_CONTEXT_NAME);
  }

  @Test
  public void shouldSetStopContextWhenStopFromButton() {
    //given
    sut.createSparkContext(kernel, sparkUI, commMsg(), sparkOptions);
    //when
    sut.stop();
    //then
    assertThat(sut.getStopContext()).isEqualTo(STOP_FROM_SPARK_UI_FORM_BUTTON);
  }

  @Test
  public void shouldStopSparkSession() {
    //given
    sut.createSparkContext(kernel, sparkUI, commMsg(), sparkOptions);
    //when
    sut.stop();
    //then
    assertThat(sparkSessionBuilderFactory.stopped).isTrue();
  }


  @Test
  public void shouldResetEngine() {
    //given
    sut.createSparkContext(kernel, sparkUI, commMsg(), sparkOptions);
    sut.stop();
    //when
    sut.createSparkContext(kernel, sparkUI, commMsg(), sparkOptions);
    //then
    assertThat(sut.getStopContext()).isEqualTo(STOP);
  }

  static class SparkUIMock implements SparkUIApi {

    private boolean ended = false;

    @Override
    public void startStage(int stageId, int numTasks) {

    }

    @Override
    public void endStage(int stageId) {

    }

    @Override
    public void taskStart(int stageId, long taskId) {

    }

    @Override
    public void taskEnd(int stageId, long taskId) {

    }

    @Override
    public void applicationEnd() {
      ended = true;
    }

    @Override
    public void cancelAllJobs() {

    }

    @Override
    public void taskCancelled(int stageId, long taskId) {

    }

    @Override
    public void afterDisplay(Message message) {

    }
  }

  static class SparkSessionBuilderMock implements SparkSessionBuilder {

    private Map<String, Object> configs = new HashMap<>();
    private SparkConf sparkConf = new SparkConf();
    public boolean stopped;

    @Override
    public SparkSession getOrCreate() {
      return null;
    }

    @Override
    public void config(String key, String value) {
      configs.put(key, value);
      sparkConf.set(key, value);
    }

    @Override
    public void enableHiveSupport() {

    }

    @Override
    public Map<String, Object> getSparkConfAsMap() {
      return configs;
    }

    @Override
    public SparkConf getSparkConf() {
      return sparkConf;
    }

    @Override
    public void stop() {
      stopped = true;
    }

    @Override
    public void cancelAllJobs() {

    }

    @Override
    public void cancelStage(int stageid) {

    }

  }
}