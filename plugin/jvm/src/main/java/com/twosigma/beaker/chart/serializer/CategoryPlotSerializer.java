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
import java.util.List;

public class CategoryPlotSerializer extends AbstractChartSerializer<CategoryPlot> {

  @Override
  public void serialize(CategoryPlot categoryPlot, JsonGenerator jgen, SerializerProvider provider) throws
                                                                                             IOException,
                                                                                             JsonProcessingException {
    jgen.writeStartObject();

    serialize(categoryPlot, jgen);

    List<String> categoryNames = categoryPlot.getCategoryNames();
    if (categoryNames != null) {
      jgen.writeObjectField("categoryNames", categoryNames);
    }
    List<CategoryGraphics> categoryGraphicsList = categoryPlot.getGraphics();
    if (categoryGraphicsList != null) {
      for (CategoryGraphics categoryGraphics : categoryGraphicsList) {
        categoryGraphics.createItemLabels(categoryPlot);
      }
      jgen.writeObjectField("graphics_list", categoryGraphicsList);
    }

    jgen.writeObjectField("orientation", categoryPlot.getOrientation());
    jgen.writeObjectField("category_margin", categoryPlot.getCategoryMargin());
    jgen.writeObjectField("categoryNamesLabelAngle", categoryPlot.getCategoryNamesLabelAngle());


    jgen.writeEndObject();
  }
}
