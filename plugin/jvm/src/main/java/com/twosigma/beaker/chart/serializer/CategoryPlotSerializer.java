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


import com.twosigma.beaker.chart.categoryplot.CategoryPlot;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryGraphics;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class CategoryPlotSerializer extends AbstractChartSerializer<CategoryPlot> {

  @Override
  public void serialize(CategoryPlot categoryPlot, JsonGenerator jgen, SerializerProvider provider) throws
                                                                                             IOException,
                                                                                             JsonProcessingException {
    jgen.writeStartObject();

    serialize(categoryPlot, jgen);

    int i = 0;
    for (CategoryGraphics g : categoryPlot.getGraphics()) {
      if (g.getColor() == null) {
        g.setColori(ColorPalette.getColor(i++));
      }
    }

    if (categoryPlot.getCategoryNames() != null) {
      jgen.writeObjectField("categoryNames", categoryPlot.getCategoryNames());
    }
    if (categoryPlot.getGraphics() != null) {
      jgen.writeObjectField("graphics_list", categoryPlot.getGraphics());
    }

    jgen.writeEndObject();
  }
}
