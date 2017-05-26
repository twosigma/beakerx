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
import java.util.List;

public class SparkProgressTest {

  SparkProgressService.SparkProgress sparkProgress;
  List<SparkProgressService.JobProgress> jobs;
  ArrayList<String> executorIds;

  @Before
  public void setUp() throws Exception {
    sparkProgress = new SparkProgressService.SparkProgress();
    jobs = new ArrayList<>();
    executorIds = new ArrayList<>();
  }

  @Test
  public void sparkProgressSetJobsList_hasJobsList() throws Exception {
    //when
    sparkProgress.setJobs(jobs);
    //then
    Assertions.assertThat(sparkProgress.getJobs()).isEqualTo(jobs);
  }

  @Test
  public void sparkProgressSetExecutorIds_hasExecutorIds() throws Exception {
    //when
    sparkProgress.setExecutorIds(executorIds);
    //then
    Assertions.assertThat(sparkProgress.getExecutorIds()).isEqualTo(executorIds);
  }

  @Test
  public void createSparkProgressWithTwoParams_hasJobsAndExecutorIds() throws Exception {
    //when
    SparkProgressService.SparkProgress sp = new SparkProgressService.SparkProgress(jobs, executorIds);
    //then
    Assertions.assertThat(sp.getJobs()).isEqualTo(jobs);
    Assertions.assertThat(sp.getExecutorIds()).isEqualTo(executorIds);
  }

  @Test
  public void sparkProgressClear_jobsListIsEmptyAndExecutorIdsListHasOneItem() throws Exception {
    jobs.add(new SparkProgressService.JobProgress());
    sparkProgress.setJobs(jobs);
    executorIds.add("test1");
    executorIds.add("test2");
    sparkProgress.setExecutorIds(executorIds);
    //when
    sparkProgress.clear();
    //then
    Assertions.assertThat(sparkProgress.getJobs()).isEmpty();
    Assertions.assertThat(sparkProgress.getExecutorIds().size()).isEqualTo(1);
    Assertions.assertThat(sparkProgress.getExecutorIds().get(0)).isEqualTo("Cleared progress");
  }

}
