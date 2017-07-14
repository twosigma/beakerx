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
package com.twosigma.beakerx.table.serializer;

import com.twosigma.beakerx.table.TableDisplay;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.util.List;
import java.io.IOException;

public class TableDisplaySerializer extends ObservableTableDisplaySerializer<TableDisplay> {

  public static final String ALIGNMENT_FOR_COLUMN = "alignmentForColumn";
  public static final String ALIGNMENT_FOR_TYPE = "alignmentForType";
  public static final String COLUMNS_FROZEN = "columnsFrozen";
  public static final String COLUMNS_FROZEN_RIGHT = "columnsFrozenRight";
  public static final String COLUMN_ORDER = "columnOrder";
  public static final String COLUMNS_VISIBLE = "columnsVisible";
  public static final String DATA_FONT_SIZE = "dataFontSize";
  public static final String FONT_COLOR = "fontColor";
  public static final String HAS_INDEX = "hasIndex";
  public static final String HEADER_FONT_SIZE = "headerFontSize";
  public static final String HEADERS_VERTICAL = "headersVertical";
  public static final String RENDERER_FOR_COLUMN = "rendererForColumn";
  public static final String RENDERER_FOR_TYPE = "rendererForType";
  public static final String FILTERED_VALUES = "filteredValues";
  public static final String STRING_FORMAT_FOR_COLUMN = "stringFormatForColumn";
  public static final String STRING_FORMAT_FOR_TIMES = "stringFormatForTimes";
  public static final String STRING_FORMAT_FOR_TYPE = "stringFormatForType";
  public static final String TIME_ZONE = "timeZone";
  public static final String VALUES = "values";
  public static final String TYPE = "type";
  public static final String TABLE_DISPLAY = "TableDisplay";
  public static final String CELL_HIGHLIGHTERS = "cellHighlighters";
  public static final String TOOLTIPS = "tooltips";

  public int ROWS_LIMIT = 10000;
  @Override
  public void serialize(TableDisplay value,
                        JsonGenerator jgen,
                        SerializerProvider provider)
    throws IOException, JsonProcessingException {

    synchronized (value) {
      jgen.writeStartObject();
      super.serialize(value, jgen);
      jgen.writeObjectField(TYPE, TABLE_DISPLAY);
      jgen.writeObjectField("columnNames", value.getColumnNames());
      jgen.writeObjectField("types", value.getTypes());
      jgen.writeObjectField("subtype", value.getSubtype());
      jgen.writeObjectField(STRING_FORMAT_FOR_TIMES, value.getStringFormatForTimes());
      jgen.writeObjectField(STRING_FORMAT_FOR_TYPE, value.getStringFormatForType());
      jgen.writeObjectField(STRING_FORMAT_FOR_COLUMN, value.getStringFormatForColumn());
      jgen.writeObjectField(RENDERER_FOR_TYPE, value.getRendererForType());
      jgen.writeObjectField(RENDERER_FOR_COLUMN, value.getRendererForColumn());
      jgen.writeObjectField(ALIGNMENT_FOR_TYPE, value.getAlignmentForType());
      jgen.writeObjectField(ALIGNMENT_FOR_COLUMN, value.getAlignmentForColumn());
      jgen.writeObjectField(COLUMNS_FROZEN, value.getColumnsFrozen());
      jgen.writeObjectField(COLUMNS_FROZEN_RIGHT, value.getColumnsFrozenRight());
      jgen.writeObjectField(COLUMNS_VISIBLE, value.getColumnsVisible());
      jgen.writeObjectField(COLUMN_ORDER, value.getColumnOrder());
      jgen.writeObjectField(CELL_HIGHLIGHTERS, value.getCellHighlighters());
      jgen.writeObjectField(TOOLTIPS, value.getTooltips());
      jgen.writeObjectField(DATA_FONT_SIZE, value.getDataFontSize());
      jgen.writeObjectField(HEADER_FONT_SIZE, value.getHeaderFontSize());
      jgen.writeObjectField(FONT_COLOR, value.getFontColor());
      if (value.getFilteredValues() != null) {
        jgen.writeObjectField(FILTERED_VALUES, value.getFilteredValues());
      }
      jgen.writeBooleanField(HEADERS_VERTICAL, value.getHeadersVertical());
      jgen.writeObjectField(HAS_INDEX, value.getHasIndex());
      jgen.writeObjectField(TIME_ZONE, value.getTimeZone());
      List<List<?>> values = value.getValues();
      if (values.size() > ROWS_LIMIT) {
        jgen.writeObjectField(VALUES, values.subList(0, 1000));
        jgen.writeBooleanField("tooManyRows", true);
        jgen.writeObjectField("rowLength", values.size());
        jgen.writeObjectField("rowLimit", ROWS_LIMIT);
      } else {
        jgen.writeObjectField("values", values);
        jgen.writeBooleanField("tooManyRows", false);
      }
      jgen.writeEndObject();
    }
  }
}
