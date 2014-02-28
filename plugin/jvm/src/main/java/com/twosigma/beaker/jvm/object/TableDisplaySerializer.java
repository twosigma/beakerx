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
package com.twosigma.beaker.jvm.object;

import java.io.IOException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class TableDisplaySerializer
        extends JsonSerializer<TableDisplay> {

  public TableDisplaySerializer() {
  }

  @Override
  public void serialize(TableDisplay value,
          JsonGenerator jgen,
          SerializerProvider provider)
          throws IOException, JsonProcessingException {
    jgen.writeStartObject();
    jgen.writeObjectField("type", "TableDisplay");
    jgen.writeObjectField("columnNames", value.columns);
    jgen.writeObjectField("values", value.values);
    // there is an optional field timeStrings XXX
    jgen.writeEndObject();
  }
}
