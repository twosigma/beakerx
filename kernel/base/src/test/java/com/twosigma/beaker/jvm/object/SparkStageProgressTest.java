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

public class SparkStageProgressTest {

  private SparkProgressService.StageProgress stageProgress;

  @Before
  public void setUp() throws Exception {
    stageProgress = new SparkProgressService.StageProgress();
  }

  @Test
  public void stageProgressSetStageId_hasStageId() throws Exception {
    int stageId = 5;
    //when
    stageProgress.setStageId(stageId);
    //then
    Assertions.assertThat(stageProgress.getStageId()).isEqualTo(stageId);
  }

  @Test
  public void stageProgressSetFailureReason_hasFailureReason() throws Exception {
    String failureReason = "test";
    //when
    stageProgress.setFailureReason(failureReason);
    //then
    Assertions.assertThat(stageProgress.getFailureReason()).isEqualTo(failureReason);
  }

  @Test
  public void stageProgressSetFailureReason_hasFailedIsTrue() throws Exception {
    //when
    stageProgress.setFailureReason("test");
    //then
    Assertions.assertThat(stageProgress.hasFailed()).isTrue();
  }

  @Test
  public void stageProgressSetTotalTasks_hasTotalTasks() throws Exception {
    int totalTasks = 7;
    //when
    stageProgress.setTotalTasks(totalTasks);
    //then
    Assertions.assertThat(stageProgress.getTotalTasks()).isEqualTo(totalTasks);
  }

  @Test
  public void stageProgressSetSucceededTasks_hasSucceededTasks() throws Exception {
    int succeededTasks = 4;
    //when
    stageProgress.setSucceededTasks(succeededTasks);
    //then
    Assertions.assertThat(stageProgress.getSucceededTasks()).isEqualTo(succeededTasks);
  }

  @Test
  public void stageProgressSetFailedTasks_hasFailedTasks() throws Exception {
    int failedTasks = 2;
    //when
    stageProgress.setFailedTasks(failedTasks);
    //then
    Assertions.assertThat(stageProgress.getFailedTasks()).isEqualTo(failedTasks);
  }

  @Test
  public void stageProgressSetActiveTasks_hasActiveTasks() throws Exception {
    int activeTasks = 1;
    //when
    stageProgress.setActiveTasks(activeTasks);
    //then
    Assertions.assertThat(stageProgress.getActiveTasks()).isEqualTo(activeTasks);
  }

  @Test
  public void stageProgressSetRunningFlag_hasRunningFlag() throws Exception {
    boolean running = true;
    //when
    stageProgress.setRunning(running);
    //then
    Assertions.assertThat(stageProgress.isRunning()).isEqualTo(running);
  }

  @Test
  public void createStageProgressWithSevenParams_hasAllFields() throws Exception {
    //when
    SparkProgressService.StageProgress stgp =
        new SparkProgressService.StageProgress("falureReason", 1, 2, 3, 4, 5, false);
    //then
    Assertions.assertThat(stgp.getFailureReason()).isEqualTo("falureReason");
    Assertions.assertThat(stgp.getStageId()).isEqualTo(1);
    Assertions.assertThat(stgp.getTotalTasks()).isEqualTo(2);
    Assertions.assertThat(stgp.getSucceededTasks()).isEqualTo(3);
    Assertions.assertThat(stgp.getFailedTasks()).isEqualTo(4);
    Assertions.assertThat(stgp.getActiveTasks()).isEqualTo(5);
    Assertions.assertThat(stgp.isRunning()).isEqualTo(false);
  }

}
