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

package com.twosigma.beakerx.chart.actions;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

public class CombinedPlotActionObjectTest {

  private CombinedPlotActionObject actionObject;

  @Before
  public void setUp() throws Exception {
    actionObject = new CombinedPlotActionObject();
  }

  @Test
  public void setSubplotIndex_hasSubplotIndex() {
    //when
    actionObject.setSubplotIndex(10);
    //then
    Assertions.assertThat(actionObject.getSubplotIndex()).isEqualTo(10);
  }
}
