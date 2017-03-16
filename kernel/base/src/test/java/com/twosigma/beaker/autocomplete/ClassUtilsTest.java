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

package com.twosigma.beaker.autocomplete;

import org.assertj.core.api.Assertions;
import org.junit.Test;

public class ClassUtilsTest {

  @Test
  public void getClass_returnClass() throws ClassNotFoundException {
    //when
    ClassUtils classUtils = new ClassUtils();
    //then
    Assertions.assertThat(classUtils.getClass("java.lang.Boolean")).isNotNull();
  }

  @Test
  public void getClassByLoader_returnClass() throws ClassNotFoundException {
    //given
    ClassLoader classLoader = getClass().getClassLoader();
    //when
    ClassUtils classUtils = new ClassUtils(classLoader);
    //then
    Assertions.assertThat(classUtils.getClass("java.lang.Boolean")).isNotNull();
  }

  @Test
  public void defineVariable_hasVariable() throws ClassNotFoundException {
    //
    ClassUtils classUtils = new ClassUtils();
    //when
    classUtils.defineVariable("beaker", "com.twosigma.beaker.NamespaceClient");
    //then
    Assertions.assertThat(classUtils.getVariableType("beaker")).isNotNull();
  }

}
