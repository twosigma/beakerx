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

package com.twosigma.beaker.jvm.object;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;

public class SparkJobProgressTest {

  private SparkProgressService.JobProgress jobProgress;

  @Before
  public void setUp() throws Exception {
    jobProgress = new SparkProgressService.JobProgress();
  }

  @Test
  public void jobProgressSetId_hasId() throws Exception {
    int id = 5;
    //when
    jobProgress.setId(id);
    //then
    Assertions.assertThat(jobProgress.getId()).isEqualTo(id);
  }

  @Test
  public void jobProgressSetRunningFlag_hasRunningFlag() throws Exception {
    boolean running = true;
    //when
    jobProgress.setRunning(running);
    //then
    Assertions.assertThat(jobProgress.isRunning()).isEqualTo(running);
  }

  @Test
  public void jobProgressSetStages_hasStages() throws Exception {
    ArrayList<SparkProgressService.StageProgress> stages = new ArrayList<>();
    //when
    jobProgress.setStages(stages);
    //then
    Assertions.assertThat(jobProgress.getStages()).isEqualTo(stages);
  }

  @Test
  public void jobProgressSetExecutorIds_hasExecutorIds() throws Exception {
    ArrayList<String> executorIds = new ArrayList<>();
    //when
    jobProgress.setExecutorIds(executorIds);
    //then
    Assertions.assertThat(jobProgress.getExecutorIds()).isEqualTo(executorIds);
  }

  @Test
  public void createJobProgressWithTwoParams_hasIdAndRunningFlag() throws Exception {
    //when
    SparkProgressService.JobProgress jp = new SparkProgressService.JobProgress(5, false);
    //then
    Assertions.assertThat(jp.getId()).isEqualTo(5);
    Assertions.assertThat(jp.isRunning()).isEqualTo(false);
  }

}
