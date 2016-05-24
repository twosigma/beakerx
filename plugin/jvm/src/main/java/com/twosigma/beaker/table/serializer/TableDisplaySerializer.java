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
package com.twosigma.beaker.table.serializer;

import com.twosigma.beaker.table.TableDisplay;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class TableDisplaySerializer extends ObservableTableDisplaySerializer<TableDisplay> {

  @Override
  public void serialize(TableDisplay value,
                        JsonGenerator jgen,
                        SerializerProvider provider)
    throws IOException, JsonProcessingException {

    synchronized (value) {
      jgen.writeStartObject();
      super.serialize(value, jgen);
      jgen.writeObjectField("type", "TableDisplay");
      jgen.writeObjectField("columnNames", value.getColumnNames());
      jgen.writeObjectField("types", value.getTypes());
      jgen.writeObjectField("subtype", value.getSubtype());
      jgen.writeObjectField("stringFormatForTimes", value.getStringFormatForTimes());
      jgen.writeObjectField("stringFormatForType", value.getStringFormatForType());
      jgen.writeObjectField("stringFormatForColumn", value.getStringFormatForColumn());
      jgen.writeObjectField("rendererForType", value.getRendererForType());
      jgen.writeObjectField("rendererForColumn", value.getRendererForColumn());
      jgen.writeObjectField("alignmentForType", value.getAlignmentForType());
      jgen.writeObjectField("alignmentForColumn", value.getAlignmentForColumn());
      jgen.writeObjectField("columnsFrozen", value.getColumnsFrozen());
      jgen.writeObjectField("columnsFrozenRight", value.getColumnsFrozenRight());
      jgen.writeObjectField("columnsVisible", value.getColumnsVisible());
      jgen.writeObjectField("columnOrder", value.getColumnOrder());
      jgen.writeObjectField("cellHighlighters", value.getCellHighlighters());
      jgen.writeObjectField("values", value.getValues());
      jgen.writeEndObject();
    }
  }
}
