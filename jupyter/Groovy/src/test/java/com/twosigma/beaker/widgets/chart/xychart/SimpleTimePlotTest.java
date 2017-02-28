
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
package com.twosigma.beaker.widgets.chart.xychart;

import com.twosigma.beaker.chart.xychart.SimpleTimePlot;
import com.twosigma.beaker.widgets.internal.InternalWidget;
import com.twosigma.beaker.widgets.internal.InternalWidgetTest;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SimpleTimePlotTest extends InternalWidgetTest {

  @Override
  public InternalWidget create() throws NoSuchAlgorithmException {
    List<Map<String, Object>> data = new ArrayList<>();
    List<String> columns = new ArrayList<>();
    //when
    return new SimpleTimePlot(data, columns);
  }

  @Override
  public String getModelNameValue() {
    return SimpleTimePlot.MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return SimpleTimePlot.VIEW_NAME_VALUE;
  }
}