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

import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryStems;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class CategoryStemsSerializer extends CategoryGraphicsSerializer<CategoryStems> {

  @Override
  public void serialize(CategoryStems categoryStems,
                        JsonGenerator jgen,
                        SerializerProvider provider) throws
                                                     IOException,
                                                     JsonProcessingException {
    jgen.writeStartObject();

    super.serialize(categoryStems, jgen, provider);

    if (categoryStems.getBases() != null) {
      jgen.writeObjectField("bases", categoryStems.getBases());
    } else {
      jgen.writeObjectField("base", categoryStems.getBase());
    }
    if (categoryStems.getWidth() != null) {
      jgen.writeObjectField("width", categoryStems.getWidth());
    }
    if (categoryStems.getStyles() != null) {
      jgen.writeObjectField("styles", categoryStems.getStyles());
    } else {
      jgen.writeObjectField("style", categoryStems.getStyle().toString());
    }

    jgen.writeEndObject();
  }
}
