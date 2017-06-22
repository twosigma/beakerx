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

package com.twosigma.beakerx.chart.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.twosigma.beakerx.chart.categoryplot.plotitem.CategoryArea;
import java.io.IOException;

public class CategoryAreasSerializer extends CategoryGraphicsSerializer<CategoryArea> {

  @Override
  public void serialize(CategoryArea categoryArea, JsonGenerator jgen, SerializerProvider provider)
      throws IOException {
    jgen.writeStartObject();

    super.serialize(categoryArea, jgen, provider);

    if (categoryArea.getBases() != null) {
      jgen.writeObjectField("bases", categoryArea.getBases());
    } else {
      jgen.writeObjectField("base", categoryArea.getBase());
    }
    if (categoryArea.getWidths() != null) {
      jgen.writeObjectField("widths", categoryArea.getWidths());
    } else {
      jgen.writeObjectField("width", categoryArea.getWidth());
    }
    if (categoryArea.getOutlineColors() != null) {
      jgen.writeObjectField("outline_colors", categoryArea.getOutlineColors());
    } else {
      jgen.writeObjectField("outline_color", categoryArea.getOutlineColor());
    }
    if (categoryArea.getFills() != null) {
      jgen.writeObjectField("fills", categoryArea.getFills());
    } else {
      jgen.writeObjectField("fill", categoryArea.getFill());
    }
    if (categoryArea.getDrawOutlines() != null) {
      jgen.writeObjectField("outlines", categoryArea.getDrawOutlines());
    } else {
      jgen.writeObjectField("outline", categoryArea.getDrawOutline());
    }

    jgen.writeObjectField("labelPosition", categoryArea.getLabelPosition());
    jgen.writeEndObject();
  }
}
