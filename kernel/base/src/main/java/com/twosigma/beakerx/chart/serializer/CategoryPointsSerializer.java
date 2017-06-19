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
package com.twosigma.beakerx.chart.serializer;

import com.twosigma.beakerx.chart.categoryplot.plotitem.CategoryPoints;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.io.IOException;

public class CategoryPointsSerializer extends CategoryGraphicsSerializer<CategoryPoints> {

  @Override
  public void serialize(CategoryPoints categoryPoints,
                        JsonGenerator jgen,
                        SerializerProvider provider) throws
                                                     IOException,
                                                     JsonProcessingException {
    jgen.writeStartObject();

    super.serialize(categoryPoints, jgen, provider);

    if (categoryPoints.getSizes() != null) {
      jgen.writeObjectField("sizes", categoryPoints.getSizes());
    } else {
      jgen.writeObjectField("size", categoryPoints.getSize());
    }
    if (categoryPoints.getShapes() != null) {
      jgen.writeObjectField("shaps", categoryPoints.getShapes());
    } else {
      jgen.writeObjectField("shape", categoryPoints.getShape());
    }
    if (categoryPoints.getFills() != null) {
      jgen.writeObjectField("fills", categoryPoints.getFills());
    } else {
      jgen.writeObjectField("fill", categoryPoints.getFill());
    }
    if (categoryPoints.getOutlineColors() != null) {
      jgen.writeObjectField("outline_colors", categoryPoints.getOutlineColors());
    } else {
      jgen.writeObjectField("outline_color", categoryPoints.getOutlineColor());
    }

    jgen.writeEndObject();
  }
}
