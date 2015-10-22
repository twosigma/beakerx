/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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

package com.twosigma.beaker.chart.serializer;

import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryGraphics;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;

import java.io.IOException;

public abstract class CategoryGraphicsSerializer<T extends CategoryGraphics> extends JsonSerializer<T> {

  protected void serialize(T graphics, JsonGenerator jgen) throws IOException {

    jgen.writeObjectField("type", graphics.getClass().getSimpleName());

    jgen.writeObjectField("visible", graphics.getVisible());
    jgen.writeObjectField("yAxis", graphics.getYAxis());
    jgen.writeObjectField("showItemLabel", graphics.getShowItemLabel());
    jgen.writeObjectField("center_series", graphics.getCenterSeries());
    jgen.writeObjectField("use_tool_tip", graphics.getUseToolTip());


    if (graphics.getSeriesNames() != null) {
      jgen.writeObjectField("seriesNames", graphics.getSeriesNames());
    }
    if (graphics.getValue() != null) {
      jgen.writeObjectField("value", graphics.getValue());

    }
    if (graphics.getColors() != null) {
      jgen.writeObjectField("colors", graphics.getColors());
    } else {
      jgen.writeObjectField("color", graphics.getColor());
    }
  }
}
