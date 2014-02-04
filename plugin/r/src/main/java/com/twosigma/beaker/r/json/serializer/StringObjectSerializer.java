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

package com.twosigma.beaker.r.json.serializer;

import java.io.IOException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

/**
 * Serializer for StringObject. Basically wrap a string in to a JSON object
 * like: { "value": originalStringText }
 * @author alee
 */
public class StringObjectSerializer extends JsonSerializer<StringObject>
{
    public StringObjectSerializer() {
    }

    @Override
    public void serialize(StringObject value, JsonGenerator jgen, SerializerProvider provider)
        throws IOException, JsonProcessingException
    {
        synchronized(value) {
            jgen.writeStartObject();
            jgen.writeObjectField("value", value.getText());
            jgen.writeEndObject();
        }
    }

}
