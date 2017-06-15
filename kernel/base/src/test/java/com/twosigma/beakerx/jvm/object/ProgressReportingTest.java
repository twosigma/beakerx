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

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.jupyter.KernelManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class ProgressReportingTest {

  private KernelTest groovyKernel;
  private ProgressReporting progress;

  @Before
  public void setUp() throws Exception {
    groovyKernel = new KernelTest();
    KernelManager.register(groovyKernel);
    progress = new ProgressReporting();
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void structuredUpdate_shouldPublishMessages() throws Exception {
    //when
    progress.structuredUpdate("msg", 5);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
  }

  @Test
  public void structuredUpdate_intProgressHasDescriptionAndValue() throws Exception {
    //when
    progress.structuredUpdate("msg", 5);
    //then
    Assertions.assertThat(progress.getIntProgress()).isNotNull();
    Assertions.assertThat(progress.getIntProgress().getDescription()).isEqualTo("msg");
    Assertions.assertThat(progress.getIntProgress().getValue()).isEqualTo(5);
  }

  @Test
  public void close_intProgressIsNull() throws Exception {
    //giiven
    progress.structuredUpdate("msg", 5);
    //when
    progress.close();
    //then
    Assertions.assertThat(progress.getIntProgress()).isNull();
  }

}
