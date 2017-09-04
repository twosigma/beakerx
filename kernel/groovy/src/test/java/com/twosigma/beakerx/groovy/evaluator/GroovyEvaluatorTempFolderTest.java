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
package com.twosigma.beakerx.groovy.evaluator;

import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import org.junit.Test;

import java.nio.file.Files;

import static org.assertj.core.api.Assertions.assertThat;

public class GroovyEvaluatorTempFolderTest {

  @Test
  public void shouldCreateTempFolder() throws Exception {
    //given
    //when
    GroovyEvaluator groovyEvaluator = TestGroovyEvaluator.groovyEvaluator();
    //then
    assertThat(Files.exists(groovyEvaluator.getTempFolder())).isTrue();
    groovyEvaluator.exit();
  }

  @Test
  public void shouldRemoveTempFolder() throws Exception {
    //given
    GroovyEvaluator groovyEvaluator = TestGroovyEvaluator.groovyEvaluator();
    //when
    groovyEvaluator.exit();
    //then
    assertThat(Files.exists(groovyEvaluator.getTempFolder())).isFalse();
  }
}
