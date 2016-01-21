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

import com.twosigma.beaker.chart.Graphics;
import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

/**
 * GraphicsSerializer
 */
public class GraphicsSerializer <T extends Graphics> extends JsonSerializer<T> {

    @Override
    public void serialize(T graphics, JsonGenerator jgen, SerializerProvider sp)
            throws IOException, JsonProcessingException {
        jgen.writeObjectField("type", graphics.getClass().getSimpleName());
        jgen.writeObjectField("uid", graphics.getUid());
        jgen.writeObjectField("visible", graphics.getVisible());
        jgen.writeObjectField("yAxis", graphics.getYAxis());
        if(StringUtils.isNotEmpty(graphics.getClickTag())) {
            jgen.writeObjectField("clickTag", graphics.getClickTag());
        }
    }
}
