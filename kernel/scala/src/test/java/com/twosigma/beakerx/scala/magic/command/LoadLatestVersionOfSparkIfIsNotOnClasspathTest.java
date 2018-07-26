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
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;


import static org.assertj.core.api.Assertions.assertThat;

public class LoadLatestVersionOfSparkIfIsNotOnClasspathTest {

  private LoadLatestVersionOfSparkIfIsNotOnClasspath sut;
  private KernelTest kernel;
  private LoadSparkFrom_SPARK_HOME_CommandTest.BeakerXClasspathMock classpath;
  private EnableSparkSupportOptionsTest.EnableSparkSupportActionMock sparkSupportActionOptions;

  @After
  public void tearDown() {
    kernel.exit();
  }

  @Before
  public void setUp() {
    this.kernel = new KernelTest();
    classpath = new LoadSparkFrom_SPARK_HOME_CommandTest.BeakerXClasspathMock();
    sparkSupportActionOptions = new EnableSparkSupportOptionsTest.EnableSparkSupportActionMock();
    sut = new LoadLatestVersionOfSparkIfIsNotOnClasspath(classpath, sparkSupportActionOptions, new Message(new Header(JupyterMessages.COMM_MSG, "id1")));
  }

  @Test
  public void shouldNotAddSparkJarWhenSparkOnClasspath() {
    //given
    classpath.isJarOnClasspath = true;
    //when
    sut.run();
    //then
    assertThat(sparkSupportActionOptions.sparkLoaded).isFalse();
  }

  @Test
  public void shouldAddSparkJarWhenIsNotSparkOnClasspath() {
    //given
    classpath.isJarOnClasspath = false;
    //when
    sut.run();
    //then
    assertThat(sparkSupportActionOptions.sparkLoaded).isTrue();
    assertThat(sparkSupportActionOptions.versionLoaded).isEqualTo(LoadLatestVersionOfSparkIfIsNotOnClasspath.VERSION);
  }
}