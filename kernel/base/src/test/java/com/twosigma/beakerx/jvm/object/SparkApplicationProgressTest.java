/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beakerx.jvm.object;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

public class SparkApplicationProgressTest {

  private SparkProgressService.ApplicationProgress appProgress;

  @Before
  public void setUp() throws Exception {
    appProgress = new SparkProgressService.ApplicationProgress();
  }

  @Test
  public void applicationProgressSetId_hasId() throws Exception {
    String appName = "test";
    //when
    appProgress.setAppName(appName);
    //then
    Assertions.assertThat(appProgress.getAppName()).isEqualTo(appName);
  }

  @Test
  public void applicationProgressSetRunning_hasRunning() throws Exception {
    boolean running = true;
    //when
    appProgress.setRunnning(running);
    //then
    Assertions.assertThat(appProgress.isRunning()).isEqualTo(running);
  }

  @Test
  public void createApplicationProgressWithTwoParams_hasAppNameAndRunningFlag() throws Exception {
    //when
    SparkProgressService.ApplicationProgress app =
        new SparkProgressService.ApplicationProgress("appName", false);
    //then
    Assertions.assertThat(app.getAppName()).isEqualTo("appName");
    Assertions.assertThat(app.isRunning()).isEqualTo(false);
  }

}
