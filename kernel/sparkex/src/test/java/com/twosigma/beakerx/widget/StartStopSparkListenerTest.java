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

import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.configuration.SparkConfiguration;
import org.apache.spark.scheduler.SparkListenerApplicationEnd;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.util.List;
import java.util.Map;

public class StartStopSparkListenerTest {

  SparkUIMock sparkUIMock;

  @Before
  public void setUp() throws Exception {
    sparkUIMock = new SparkUIMock();
    SparkVariable.putSparkUI(sparkUIMock);
  }

  @Test
  public void onApplicationEnd() {
    //given
    StartStopSparkListener listener = new StartStopSparkListener();
    //when
    listener.onApplicationEnd(new SparkListenerApplicationEnd(123));
    //then
    Assertions.assertThat(sparkUIMock.ended).isTrue();
  }

  static class SparkUIMock implements SparkUIApi {

    private boolean ended = false;

    @Override
    public List<SparkConfiguration.Configuration> getAdvancedOptions() {
      return null;
    }

    @Override
    public Text getMasterURL() {
      return null;
    }

    @Override
    public boolean getHiveSupport() {
      return false;
    }

    @Override
    public Text getExecutorMemory() {
      return null;
    }

    @Override
    public Text getExecutorCores() {
      return null;
    }

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
    public void startSpinner(Message message) {

    }

    @Override
    public void stopSpinner() {

    }

    @Override
    public void taskCancelled(int stageId, long taskId) {

    }

    @Override
    public Button getConnectButton() {
      return null;
    }

    @Override
    public void afterDisplay(Message message) {

    }
  }
}