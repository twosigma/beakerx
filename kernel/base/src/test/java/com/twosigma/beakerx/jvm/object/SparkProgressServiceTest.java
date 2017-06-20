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
import org.junit.BeforeClass;
import org.junit.Test;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class SparkProgressServiceTest {

  private SparkProgressService service;
  private int stageId = 1;
  private long taskId = 2;
  private int jobId = 3;
  private static Field activeTasksField;
  private static Field failedTasksField;
  private static Field succeededTasksField;
  private static Field stagesField;
  private static Field jobsField;
  private static Field stagesPerJobField;
  private static Field executorIdsField;

  @BeforeClass
  public static void setUpClass() throws Exception {
    activeTasksField = SparkProgressService.class.getDeclaredField("activeTasks");
    activeTasksField.setAccessible(true);
    failedTasksField = SparkProgressService.class.getDeclaredField("failedTasks");
    failedTasksField.setAccessible(true);
    succeededTasksField = SparkProgressService.class.getDeclaredField("succeededTasks");
    succeededTasksField.setAccessible(true);
    stagesField = SparkProgressService.class.getDeclaredField("stages");
    stagesField.setAccessible(true);
    jobsField = SparkProgressService.class.getDeclaredField("jobs");
    jobsField.setAccessible(true);
    stagesPerJobField = SparkProgressService.class.getDeclaredField("stagesPerJob");
    stagesPerJobField.setAccessible(true);
    executorIdsField = SparkProgressService.class.getDeclaredField("executorIds");
    executorIdsField.setAccessible(true);
  }

  @Before
  public void setUp() throws Exception {
    service = new SparkProgressService();
  }

  @Test
  public void createByEmptyConstructor_progressIsNotNull() throws Exception {
    //then
    Assertions.assertThat(service.getProgress()).isNotNull();
  }

  @Test
  public void stageStart_shouldAddStageToTaskLists() throws Exception {
    //when
    service.stageStart(stageId, 1);
    //then
    Assertions.assertThat(getActiveTasks(service).get(stageId)).isNotNull();
    Assertions.assertThat(getFailedTasks(service).get(stageId)).isNotNull();
    Assertions.assertThat(getSucceededTasks(service).get(stageId)).isNotNull();
  }

  @Test
  public void stageStart_stageHasRunningFlagEqualsTrue() throws Exception {
    //when
    service.stageStart(stageId, 1);
    //then
    Assertions.assertThat(getStages(service).get(stageId).isRunning()).isTrue();
  }

  @Test
  public void stageEnd_stageHasRunningFlagEqualsFalse() throws Exception {
    //given
    service.stageStart(stageId, 1);
    //when
    service.stageEnd(stageId, "falureReason");
    //then
    Assertions.assertThat(getStages(service).get(stageId).isRunning()).isFalse();
  }

  @Test
  public void stageEnd_stageHasFailureReason() throws Exception {
    String failureReason = "test";
    //given
    service.stageStart(stageId, 1);
    //when
    service.stageEnd(stageId, failureReason);
    //then
    Assertions.assertThat(getStages(service).get(stageId).getFailureReason()).isEqualTo(failureReason);
  }

  @Test
  public void jobStart_jobsListContainsJobId() throws Exception {
    //when
    service.jobStart(jobId, Arrays.asList("execId1", "execId2"));
    //then
    Assertions.assertThat(getJobs(service)).contains(jobId);
  }

  @Test
  public void jobEndWithExecutorIds_hasThoseExecutorIds() throws Exception {
    //given
    service.jobStart(jobId, Arrays.asList("execId1", "execId2"));
    //when
    service.jobEnd(jobId, Arrays.asList("str1", "str2"));
    //then
    Assertions.assertThat(getexecutorIds(service)).contains("str1");
    Assertions.assertThat(getexecutorIds(service)).contains("str2");
  }

  @Test
  public void taskStart_activeTaskIsNotEmpty() throws Exception {
    //given
    service.stageStart(stageId, 1);
    //when
    service.taskStart(stageId, taskId);
    //then
    Assertions.assertThat(getActiveTasks(service).get(stageId)).isNotEmpty();
  }

  @Test
  public void taskEnd_activeTaskIsEmpty() throws Exception {
    //given
    service.stageStart(stageId, 1);
    service.taskStart(stageId, taskId);
    //when
    service.taskEnd(stageId, taskId, true);
    //then
    Assertions.assertThat(getActiveTasks(service).get(stageId)).isEmpty();
  }

  @Test
  public void taskEndWithTrue_failedTaskIsNotEmpty() throws Exception {
    //given
    service.stageStart(stageId, 1);
    service.taskStart(stageId, taskId);
    //when
    service.taskEnd(stageId, taskId, true);
    //then
    Assertions.assertThat(getFailedTasks(service).get(stageId)).isNotEmpty();
  }

  @Test
  public void taskEndWithFalse_succeededTaskIsNotEmpty() throws Exception {
    //given
    service.stageStart(stageId, 1);
    service.taskStart(stageId, taskId);
    //when
    service.taskEnd(stageId, taskId, false);
    //then
    Assertions.assertThat(getSucceededTasks(service).get(stageId)).isNotEmpty();
  }

  @Test
  public void clear_shouldClearAllLists() throws Exception {
    //given
    service.stageStart(stageId, 1);
    service.taskStart(stageId, taskId);
    service.jobStart(jobId, Arrays.asList("execId1", "execId2"));
    //when
    service.clear();
    //then
    Assertions.assertThat(getJobs(service)).isEmpty();
    Assertions.assertThat(getStagesPerJob(service)).isEmpty();
    Assertions.assertThat(getActiveTasks(service)).isEmpty();
    Assertions.assertThat(getFailedTasks(service)).isEmpty();
    Assertions.assertThat(getSucceededTasks(service)).isEmpty();
    Assertions.assertThat(getStages(service)).isEmpty();
  }

  private Map<Integer, List<Long>> getActiveTasks(SparkProgressService service) throws Exception {
    return (Map<Integer, List<Long>>) activeTasksField.get(service);
  }

  private Map<Integer, List<Long>> getFailedTasks(SparkProgressService service) throws Exception {
    return (Map<Integer, List<Long>>) failedTasksField.get(service);
  }

  private Map<Integer, List<Long>> getSucceededTasks(SparkProgressService service) throws Exception {
    return (Map<Integer, List<Long>>) succeededTasksField.get(service);
  }

  private Map<Integer, SparkProgressService.StageProgress> getStages(
      SparkProgressService service) throws Exception {
    return (Map<Integer, SparkProgressService.StageProgress>) stagesField.get(service);
  }

  private List<Integer> getJobs(SparkProgressService service) throws Exception {
    return (List<Integer>) jobsField.get(service);
  }

  private Map<Integer, List<Integer>> getStagesPerJob(SparkProgressService service) throws Exception {
    return (Map<Integer, List<Integer>>) stagesPerJobField.get(service);
  }

  private List<String> getexecutorIds(SparkProgressService service) throws Exception {
    return (List<String>) executorIdsField.get(service);
  }

}
