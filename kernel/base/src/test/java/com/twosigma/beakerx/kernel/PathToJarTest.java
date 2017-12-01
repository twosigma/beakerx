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
package com.twosigma.beakerx.kernel;

import org.assertj.core.api.Assertions;
import org.junit.Test;

import static com.twosigma.beakerx.KernelExecutionTest.DEMO_JAR;
import static com.twosigma.beakerx.KernelExecutionTest.DEMO_JAR_NAME;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;

public class PathToJarTest {

  @Test
  public void create() throws Exception {
    //given
    //when
    PathToJar pathToJar = new PathToJar(DEMO_JAR);
    //then
    assertThat(pathToJar.getPath()).contains(DEMO_JAR_NAME);
  }

  @Test
  public void shouldThrowErrorIfPathDoesNotExist() throws Exception {
    //given
    //when
    try {
      new PathToJar("./invalidPath");
      fail("Should not create PathToJar with invalid path.");
    } catch (Exception e) {
      //then
      Assertions.assertThat(e.getMessage()).contains("Path does not exist");
    }
  }

  @Test
  public void shouldThrowErrorIfPathContainsWhitespace() throws Exception {
    //given
    //when
    try {
      new PathToJar("./pathWithWhitespace demo.jar");
      fail("Should not create PathToJar with whitespace.");
    } catch (Exception e) {
      //then
      Assertions.assertThat(e.getMessage()).contains("Can not create path with whitespace");
    }
  }
}