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

import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryBars;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class CategoryBarsSerializer extends CategoryGraphicsSerializer<CategoryBars> {

  @Override
  public void serialize(CategoryBars categoryBars,
                        JsonGenerator jgen,
                        SerializerProvider provider) throws
                                                     IOException,
                                                     JsonProcessingException {
    jgen.writeStartObject();

    serialize(categoryBars, jgen);

    if (categoryBars.getBases() != null) {
      jgen.writeObjectField("bases", categoryBars.getBases());
    } else {
      jgen.writeObjectField("base", categoryBars.getBase());
    }
    if (categoryBars.getWidths() != null) {
      jgen.writeObjectField("widths", categoryBars.getWidths());
    } else {
      jgen.writeObjectField("width", categoryBars.getWidth());
    }
    if (categoryBars.getColors() != null) {
      jgen.writeObjectField("colors", categoryBars.getColors());
    } else {
      jgen.writeObjectField("color", categoryBars.getColor());
    }
    if (categoryBars.getOutlineColors() != null) {
      jgen.writeObjectField("outline_colors", categoryBars.getOutlineColors());
    } else {
      jgen.writeObjectField("outline_color", categoryBars.getOutlineColor());
    }

    jgen.writeEndObject();
  }
}
