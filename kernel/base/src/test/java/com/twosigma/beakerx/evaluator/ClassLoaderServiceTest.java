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
package com.twosigma.beakerx.evaluator;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

public class ClassLoaderServiceTest {

  private ClassLoaderService sut;

  @Before
  public void setUp() throws Exception {
    this.sut = new ClassLoaderService();
  }

  @Test
  public void shouldReturnTrueIfClassExists() {
    //given
    //when
    boolean exists = sut.checkIfClassExistsInClassloader("java.lang.Integer", ClassLoaderServiceTest.class.getClassLoader());
    //then
    Assertions.assertThat(exists).isTrue();
  }

  @Test
  public void shouldReturnFalseIfClassNotExists() {
    //given
    //when
    boolean exists = sut.checkIfClassExistsInClassloader("java.lang.MyInteger", ClassLoaderServiceTest.class.getClassLoader());
    //then
    Assertions.assertThat(exists).isFalse();
  }

}