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

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.twosigma.beakerx.table.TableDisplay;
import com.twosigma.beakerx.table.TableDisplayLoadingMode;

import java.io.IOException;
import java.util.List;

public class TableDisplaySerializer extends ObservableTableDisplaySerializer<TableDisplay> {

  public static final String ALIGNMENT_FOR_COLUMN = "alignmentForColumn";
  public static final String ALIGNMENT_FOR_TYPE = "alignmentForType";
  public static final String COLUMNS_FROZEN = "columnsFrozen";
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
  public static final String STRING_FORMAT_FOR_TYPE = "stringFormatForType";
  public static final String TIME_ZONE = "timeZone";
  public static final String VALUES = "values";
  public static final String TYPE = "type";
  public static final String TABLE_DISPLAY = "TableDisplay";
  public static final String CELL_HIGHLIGHTERS = "cellHighlighters";
  public static final String TOOLTIPS = "tooltips";
  public static final String LOADING_MODE = "loadingMode";
  public static final String ROWS_TO_SHOW = "rowsToShow";


  @Override
  public void serialize(TableDisplay tableDisplay,
                        JsonGenerator jgen,
                        SerializerProvider provider)
          throws IOException, JsonProcessingException {

    synchronized (tableDisplay) {
      jgen.writeStartObject();
      super.serialize(tableDisplay, jgen);
      jgen.writeObjectField(TYPE, TABLE_DISPLAY);
      jgen.writeObjectField("columnNames", tableDisplay.getColumnNames());
      jgen.writeObjectField("types", tableDisplay.getTypes());
      jgen.writeObjectField("subtype", tableDisplay.getSubtype());
      jgen.writeObjectField(STRING_FORMAT_FOR_TYPE, tableDisplay.getStringFormatForType());
      jgen.writeObjectField(STRING_FORMAT_FOR_COLUMN, tableDisplay.getStringFormatForColumn());
      jgen.writeObjectField(RENDERER_FOR_TYPE, tableDisplay.getRendererForType());
      jgen.writeObjectField(RENDERER_FOR_COLUMN, tableDisplay.getRendererForColumn());
      jgen.writeObjectField(ALIGNMENT_FOR_TYPE, tableDisplay.getAlignmentForType());
      jgen.writeObjectField(ALIGNMENT_FOR_COLUMN, tableDisplay.getAlignmentForColumn());
      jgen.writeObjectField(COLUMNS_FROZEN, tableDisplay.getColumnsFrozen());
      jgen.writeObjectField(COLUMNS_VISIBLE, tableDisplay.getColumnsVisible());
      jgen.writeObjectField(COLUMN_ORDER, tableDisplay.getColumnOrder());
      jgen.writeObjectField(CELL_HIGHLIGHTERS, tableDisplay.getCellHighlighters());
      jgen.writeObjectField(TOOLTIPS, tableDisplay.getTooltips());
      jgen.writeObjectField(DATA_FONT_SIZE, tableDisplay.getDataFontSize());
      jgen.writeObjectField(HEADER_FONT_SIZE, tableDisplay.getHeaderFontSize());
      jgen.writeObjectField(FONT_COLOR, tableDisplay.getFontColor());
      jgen.writeObjectField(ROWS_TO_SHOW, tableDisplay.getRowsToShow().getRows());

      if (tableDisplay.getFilteredValues() != null) {
        jgen.writeObjectField(FILTERED_VALUES, tableDisplay.getFilteredValues());
      }
      jgen.writeBooleanField(HEADERS_VERTICAL, tableDisplay.getHeadersVertical());
      jgen.writeObjectField(HAS_INDEX, tableDisplay.getHasIndex());
      jgen.writeObjectField(TIME_ZONE, tableDisplay.getTimeZone());
      jgen.writeObjectField(LOADING_MODE, TableDisplay.getLoadingMode());
      if (TableDisplay.getLoadingMode().equals(TableDisplayLoadingMode.ALL)) {
        loadingAllMode(tableDisplay, jgen, tableDisplay.takeAllData());
      } else {
        loadingPageMode(jgen, tableDisplay.getValues());
      }
      jgen.writeEndObject();
    }
  }

  private void loadingPageMode(JsonGenerator jgen, List<List<?>> values) throws IOException {
    jgen.writeObjectField(VALUES, values);
  }

  private void loadingAllMode(TableDisplay tableDisplay, JsonGenerator jgen, List<List<?>> values) throws IOException {
    if (values.size() > tableDisplay.ROWS_LIMIT) {
      jgen.writeObjectField(VALUES, values.subList(0, tableDisplay.ROW_LIMIT_TO_INDEX));
      jgen.writeBooleanField("tooManyRows", true);
      jgen.writeObjectField("rowLength", values.size());
      jgen.writeObjectField("rowLimit", tableDisplay.ROWS_LIMIT);
      jgen.writeObjectField("rowLimitMsg", tableDisplay.getRowLimitMsg());
    } else {
      jgen.writeObjectField("values", values);
      jgen.writeBooleanField("tooManyRows", false);
    }
  }
}
