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

import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryLines;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class CategoryLinesSerializer extends CategoryGraphicsSerializer<CategoryLines> {

  @Override
  public void serialize(CategoryLines categoryLines,
                        JsonGenerator jgen,
                        SerializerProvider provider) throws
                                                     IOException,
                                                     JsonProcessingException {
    jgen.writeStartObject();

    super.serialize(categoryLines, jgen, provider);

    if (categoryLines.getWidth() != null) {
      jgen.writeObjectField("width", categoryLines.getWidth());
    }
    if (categoryLines.getStyles() != null) {
      jgen.writeObjectField("styles", categoryLines.getStyles());
    } else {
      jgen.writeObjectField("style", categoryLines.getStyle().toString());
    }
    if (categoryLines.getInterpolation() != null) {
      jgen.writeObjectField("interpolation", categoryLines.getInterpolation());
    }

    jgen.writeEndObject();
  }
}
