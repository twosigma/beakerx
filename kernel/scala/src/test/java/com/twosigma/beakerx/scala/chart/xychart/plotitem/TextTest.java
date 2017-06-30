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

package com.twosigma.beakerx.scala.chart.xychart.plotitem;

import org.assertj.core.api.Assertions;
import org.junit.Test;

public class TextTest {

  @Test
  public void createTextByEmptyConstructor_hasXYValuesEqualsZero() {
    //when
    Text text = new Text();
    //then
    Assertions.assertThat(text.getX()).isEqualTo(0.0);
    Assertions.assertThat(text.getY()).isEqualTo(0.0);
  }

  @Test
  public void createTextWithFourParams_hasXYTextAndAngleValues() {
    //when
    Text text = new Text(1, 2, "test", 0.5);
    //then
    Assertions.assertThat(text.getX()).isEqualTo(1);
    Assertions.assertThat(text.getY()).isEqualTo(2);
    Assertions.assertThat(text.getText()).isEqualTo("test");
    Assertions.assertThat(text.getPointerAngle()).isEqualTo(0.5);
  }
}
