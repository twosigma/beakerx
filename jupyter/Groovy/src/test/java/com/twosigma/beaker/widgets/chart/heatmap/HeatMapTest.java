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
package com.twosigma.beaker.widgets.chart.heatmap;

import com.twosigma.beaker.chart.heatmap.HeatMap;
import com.twosigma.beaker.widgets.internal.InternalWidget;
import com.twosigma.beaker.widgets.internal.InternalWidgetTest;

import java.security.NoSuchAlgorithmException;

public class HeatMapTest extends InternalWidgetTest {

  @Override
  public InternalWidget create() throws NoSuchAlgorithmException {
    return new HeatMap();
  }

  @Override
  public String getModelNameValue() {
    return HeatMap.MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return HeatMap.VIEW_NAME_VALUE;
  }

}