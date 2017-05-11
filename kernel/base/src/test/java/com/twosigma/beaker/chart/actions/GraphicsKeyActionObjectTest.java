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

package com.twosigma.beaker.chart.actions;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

public class GraphicsKeyActionObjectTest {

  private GraphicsKeyActionObject actionObject;

  @Before
  public void setUp() throws Exception {
    actionObject = new GraphicsKeyActionObject();
  }

  @Test
  public void setActionObject_hasThatObject() {
    CategoryGraphicsActionObject aObject = new CategoryGraphicsActionObject();
    //when
    actionObject.setActionObject(aObject);
    //then
    Assertions.assertThat(actionObject.getActionObject()).isEqualTo(aObject);
  }

  @Test
  public void setKey_hasThatKey() {
    CategoryGraphicsActionObject aObject = new CategoryGraphicsActionObject();
    //when
    actionObject.setKey("test key");
    //then
    Assertions.assertThat(actionObject.getKey()).isEqualTo("test key");
  }

}
