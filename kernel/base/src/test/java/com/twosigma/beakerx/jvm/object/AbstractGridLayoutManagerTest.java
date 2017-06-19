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
import org.junit.Test;

public class AbstractGridLayoutManagerTest {

  @Test
  public void createManagerWithParam_columnsEqualsParam() throws Exception {
    int columns = 5;
    //when
    AbstractGridLayoutManager manager = new GridOutputContainerLayoutManager(columns);
    //then
    Assertions.assertThat(manager.getColumns()).isEqualTo(columns);
  }

  @Test
  public void createManagerWithParam_hasPropertiesNotNull() throws Exception {
    //when
    AbstractGridLayoutManager manager = new GridOutputContainerLayoutManager(0);
    //then
    Assertions.assertThat(manager.getPaddingBottom()).isEqualTo(0);
    Assertions.assertThat(manager.getPaddingTop()).isEqualTo(0);
    Assertions.assertThat(manager.getPaddingLeft()).isNotZero();
    Assertions.assertThat(manager.getPaddingRight()).isNotZero();
  }
}
