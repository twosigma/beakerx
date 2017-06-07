/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.io.IOException;
import java.util.List;

public class CategoryPlotSerializer extends AbstractChartSerializer<CategoryPlot> {

  public static final String GRAPHICS_LIST = "graphics_list";
  public static final String CATEGORY_NAMES = "categoryNames";
  public static final String ORIENTATION = "orientation";
  public static final String CATEGORY_MARGIN = "category_margin";
  public static final String CATEGORY_NAMES_LABEL_ANGLE = "categoryNamesLabelAngle";

  @Override
  public void serialize(CategoryPlot categoryPlot, JsonGenerator jgen, SerializerProvider provider) throws
                                                                                             IOException,
                                                                                             JsonProcessingException {
    jgen.writeStartObject();

    serialize(categoryPlot, jgen);

    List<String> categoryNames = categoryPlot.getCategoryNames();
    if (categoryNames != null) {
      jgen.writeObjectField(CATEGORY_NAMES, categoryNames);
    }
    List<CategoryGraphics> categoryGraphicsList = categoryPlot.getGraphics();
    if (categoryGraphicsList != null) {
      for (CategoryGraphics categoryGraphics : categoryGraphicsList) {
        categoryGraphics.createItemLabels(categoryPlot);
      }
      jgen.writeObjectField(GRAPHICS_LIST, categoryGraphicsList);
    }

    jgen.writeObjectField(ORIENTATION, categoryPlot.getOrientation());
    jgen.writeObjectField(CATEGORY_MARGIN, categoryPlot.getCategoryMargin());
    jgen.writeObjectField(CATEGORY_NAMES_LABEL_ANGLE, categoryPlot.getCategoryNamesLabelAngle());


    jgen.writeEndObject();
  }
}
