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

import com.twosigma.beaker.chart.Graphics;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.io.IOException;
import java.util.Map;

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
        jgen.writeObjectField("hasClickAction", graphics.hasClickAction());
        if(StringUtils.isNotEmpty(graphics.getClickTag())) {
            jgen.writeObjectField("clickTag", graphics.getClickTag());
        }
        Map<String, String> keyTags = graphics.getKeyTags();
        if(keyTags != null && !keyTags.isEmpty()) {
            jgen.writeObjectField("keyTags", keyTags);
        }
        Object[] keys = graphics.getKeys();
        if(ArrayUtils.isNotEmpty(keys)) {
            jgen.writeObjectField("keys", keys);
        }
    }
}
