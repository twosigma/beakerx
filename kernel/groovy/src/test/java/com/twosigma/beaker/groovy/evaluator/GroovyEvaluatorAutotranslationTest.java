/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.groovy.evaluator;

import org.assertj.core.api.Assertions;
import org.junit.Test;

public class GroovyEvaluatorAutotranslationTest extends GroovyEvaluatorTest {

  @Test
  public void parseSetBeakerObjectScript_returnBeakerObjectValue() {
    //when
    Object result = parseClassFromScript("beaker.x = 10 ");
    //then
    Assertions.assertThat(result instanceof Number).isTrue();
  }

  //TODO : After NamespaceClient.get() will be implemented - remove expected exception
  @Test(expected = java.lang.RuntimeException.class)
  public void parseGetBeakerObjectScript_returnBeakerObjectValue() {
    //when
    parseClassFromScript("beaker.x = 10 ");
    Object result = parseClassFromScript("beaker.x");
    //then
    Assertions.assertThat(result instanceof Number).isTrue();
  }
}
