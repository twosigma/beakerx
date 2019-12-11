/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beakerx.table;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.chart.serializer.ColorSerializer;
import com.twosigma.beakerx.jvm.serialization.DateSerializer;
import com.twosigma.beakerx.table.format.DecimalStringFormat;
import com.twosigma.beakerx.table.format.HTMLStringFormat;
import com.twosigma.beakerx.table.format.ImageStringFormat;
import com.twosigma.beakerx.table.format.TableDisplayStringFormat;
import com.twosigma.beakerx.table.format.TimeStringFormat;
import com.twosigma.beakerx.table.format.ValueStringFormat;
import com.twosigma.beakerx.table.highlight.HeatmapHighlighter;
import com.twosigma.beakerx.table.highlight.TableDisplayCellHighlighter;
import com.twosigma.beakerx.table.highlight.ThreeColorHeatmapHighlighter;
import com.twosigma.beakerx.table.highlight.UniqueEntriesHighlighter;
import com.twosigma.beakerx.table.highlight.ValueHighlighter;
import com.twosigma.beakerx.table.renderer.DataBarsRenderer;
import com.twosigma.beakerx.table.renderer.TableDisplayCellRenderer;
import com.twosigma.beakerx.table.serializer.DataBarsRendererSerializer;
import com.twosigma.beakerx.table.serializer.DecimalStringFormatSerializer;
import com.twosigma.beakerx.table.serializer.HTMLStringFormatSerializer;
import com.twosigma.beakerx.table.serializer.HeatmapHighlighterSerializer;
import com.twosigma.beakerx.table.serializer.ImageStringFormatSerializer;
import com.twosigma.beakerx.table.serializer.TableDisplaySerializer;
import com.twosigma.beakerx.table.serializer.ThreeColorHeatmapHighlighterSerializer;
import com.twosigma.beakerx.table.serializer.TimeStringFormatSerializer;
import com.twosigma.beakerx.table.serializer.UniqueEntriesHighlighterSerializer;
import com.twosigma.beakerx.table.serializer.ValueHighlighterSerializer;
import com.twosigma.beakerx.table.serializer.ValueStringFormatSerializer;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static com.fasterxml.jackson.databind.SerializationFeature.WRITE_ENUMS_USING_TO_STRING;
import static com.twosigma.beakerx.table.serializer.ObservableTableDisplaySerializer.DOUBLE_CLICK_TAG;
import static com.twosigma.beakerx.table.serializer.ObservableTableDisplaySerializer.HAS_DOUBLE_CLICK_ACTION;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.ALIGNMENT_FOR_COLUMN;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.ALIGNMENT_FOR_TYPE;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.CELL_HIGHLIGHTERS;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.COLUMNS_FROZEN;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.COLUMNS_VISIBLE;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.COLUMN_ORDER;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.DATA_FONT_SIZE;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.FILTERED_VALUES;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.FONT_COLOR;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.HAS_INDEX;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.HEADERS_VERTICAL;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.HEADER_FONT_SIZE;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.RENDERER_FOR_COLUMN;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.RENDERER_FOR_TYPE;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.ROWS_TO_SHOW;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.STRING_FORMAT_FOR_COLUMN;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.STRING_FORMAT_FOR_TYPE;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.TIME_ZONE;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.TOOLTIPS;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.VALUES;

public class TableDisplayToJson {

  private static ObjectMapper mapper;

  static {
    SimpleModule module = tableDisplayModule();
    mapper = new ObjectMapper();
    mapper.enable(WRITE_ENUMS_USING_TO_STRING);
    mapper.registerModule(module);
  }

  public static SimpleModule tableDisplayModule() {
    SimpleModule module = new SimpleModule("TableDisplaySerializer", new Version(1, 0, 0, null));
    module.addSerializer(TableDisplay.class, new TableDisplaySerializer());
    module.addSerializer(ValueStringFormat.class, new ValueStringFormatSerializer());
    module.addSerializer(DecimalStringFormat.class, new DecimalStringFormatSerializer());
    module.addSerializer(HTMLStringFormat.class, new HTMLStringFormatSerializer());
    module.addSerializer(TimeStringFormat.class, new TimeStringFormatSerializer());
    module.addSerializer(ImageStringFormat.class, new ImageStringFormatSerializer());
    module.addSerializer(DataBarsRenderer.class, new DataBarsRendererSerializer());
    module.addSerializer(HeatmapHighlighter.class, new HeatmapHighlighterSerializer());
    module.addSerializer(ThreeColorHeatmapHighlighter.class, new ThreeColorHeatmapHighlighterSerializer());
    module.addSerializer(UniqueEntriesHighlighter.class, new UniqueEntriesHighlighterSerializer());
    module.addSerializer(ValueHighlighter.class, new ValueHighlighterSerializer());
    module.addSerializer(Date.class, new DateSerializer());
    module.addSerializer(Color.class, new ColorSerializer());
    return module;
  }

  public static Map toJson(Object item) {
    return mapper.convertValue(item, Map.class);
  }

  public static List toJsonList(Object item) {
    return mapper.convertValue(item, List.class);
  }

  static Map<Object, Object> serializeStringFormatForType(Map<ColumnType, TableDisplayStringFormat> stringFormatForType) {
    Map<String, Map> result = new LinkedHashMap<>();
    for (Map.Entry<ColumnType, TableDisplayStringFormat> pair : stringFormatForType.entrySet()) {
      result.put(pair.getKey().getType(), toJson(pair.getValue()));
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(STRING_FORMAT_FOR_TYPE, result);
    return value;
  }

  static Map<Object, Object> serializeAlignmentForColumn(Map<String, TableDisplayAlignmentProvider> alignmentForColumn) {
    Map<String, Object> result = new LinkedHashMap<>();
    for (Map.Entry<String, TableDisplayAlignmentProvider> pair : alignmentForColumn.entrySet()) {
      result.put(pair.getKey(), pair.getValue().toString());
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(ALIGNMENT_FOR_COLUMN, result);
    return value;
  }

  static Map<Object, Object> serializeStringFormatForColumn(Map<String, TableDisplayStringFormat> stringFormatForColumn) {
    Map<String, Object> result = new LinkedHashMap<>();
    for (Map.Entry<String, TableDisplayStringFormat> pair : stringFormatForColumn.entrySet()) {
      result.put(pair.getKey(), toJson(pair.getValue()));
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(STRING_FORMAT_FOR_COLUMN, result);
    return value;
  }

  static Map<Object, Object> serializeRendererForType(Map<ColumnType, TableDisplayCellRenderer> rendererForType) {
    Map<String, Object> result = new LinkedHashMap<>();
    for (Map.Entry<ColumnType, TableDisplayCellRenderer> pair : rendererForType.entrySet()) {
      result.put(pair.getKey().getType(), toJson(pair.getValue()));
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(RENDERER_FOR_TYPE, result);
    return value;
  }

  static Map<Object, Object> serializeRendererForColumn(Map<String, TableDisplayCellRenderer> rendererMap) {
    Map<String, Object> result = new LinkedHashMap<>();
    for (Map.Entry<String, TableDisplayCellRenderer> pair : rendererMap.entrySet()) {
      result.put(pair.getKey(), toJson(pair.getValue()));
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(RENDERER_FOR_COLUMN, result);
    return value;
  }

  static Map<Object, Object> serializeAlignmentForType(Map<ColumnType, TableDisplayAlignmentProvider> map) {
    Map<String, Object> result = new LinkedHashMap<>();
    for (Map.Entry<ColumnType, TableDisplayAlignmentProvider> pair : map.entrySet()) {
      result.put(pair.getKey().toString(), pair.getValue().toString());
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(ALIGNMENT_FOR_TYPE, result);
    return value;
  }

  static Map<Object, Object> serializeColumnsFrozen(Map<String, Boolean> map) {
    Map<String, Object> result = new LinkedHashMap<>();
    for (Map.Entry<String, Boolean> pair : map.entrySet()) {
      result.put(pair.getKey(), pair.getValue());
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(COLUMNS_FROZEN, result);
    return value;
  }

  static Map<Object, Object> serializeColumnsVisible(Map<String, Boolean> map) {
    Map<String, Object> result = new LinkedHashMap<>();
    for (Map.Entry<String, Boolean> pair : map.entrySet()) {
      result.put(pair.getKey(), pair.getValue());
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(COLUMNS_VISIBLE, result);
    return value;
  }

  static Map<Object, Object> serializeCellHighlighters(List<TableDisplayCellHighlighter> list) {
    List result = new ArrayList();
    for (TableDisplayCellHighlighter item : list) {
      result.add(toJson(item));
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(CELL_HIGHLIGHTERS, result);
    return value;
  }

  static Map<Object, Object> serializeColumnOrder(List<String> list) {
    List result = new ArrayList();
    for (String item : list) {
      result.add(item);
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(COLUMN_ORDER, result);
    return value;
  }

  static Map<Object, Object> serializeTooltips(List<List<String>> list) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(TOOLTIPS, toJsonList(list));
    return value;
  }

  static Map<Object, Object> serializeDataFontSize(Integer dataFontSize) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(DATA_FONT_SIZE, dataFontSize);
    return value;
  }

  static Map<Object, Object> serializeHeaderFontSize(Integer headerFontSize) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HEADER_FONT_SIZE, headerFontSize);
    return value;
  }

  static Map<Object, Object> serializeFontColor(List<List<Color>> list) {
    List<List<String>> result = new ArrayList<>();
    list.forEach(item -> {
      List<String> elements = new ArrayList<>();
      item.forEach(x -> elements.add(mapper.convertValue(x, String.class)));
      result.add(elements);
    });
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(FONT_COLOR, result);
    return value;
  }

  static Map<Object, Object> serializeFilteredValues(List<List<?>> list) {
    List<List<String>> result = new ArrayList<>();
    list.forEach(item -> {
      List<String> elements = new ArrayList<>();
      item.forEach(x -> elements.add(mapper.convertValue(x, String.class)));
      result.add(elements);
    });
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(FILTERED_VALUES, result);
    return value;
  }

  static Map<Object, Object> serializeHeadersVertical(boolean headersVertical) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HEADERS_VERTICAL, headersVertical);
    return value;
  }

  static Map<Object, Object> serializeRowsToShow(RowsToShow rowsToShow) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(ROWS_TO_SHOW, rowsToShow.getRows());
    return value;
  }

  static Map<Object, Object> serializeHasIndex(String hasIndex) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HAS_INDEX, hasIndex);
    return value;
  }

  static Map<Object, Object> serializeTimeZone(String timeZone) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(TIME_ZONE, timeZone);
    return value;
  }

  static Map<Object, Object> serializeDoubleClickAction(String doubleClickTag, boolean hasDoubleClickAction) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HAS_DOUBLE_CLICK_ACTION, hasDoubleClickAction);
    value.put(DOUBLE_CLICK_TAG, doubleClickTag);
    return value;
  }

  static Map<Object, Object> serializeValues(TableDisplay tableDisplay) {
    List list = tableDisplay.takeNextPage();
    Map<Object, Object> result = new LinkedHashMap<>();
    result.put(VALUES, list);
    return result;
  }

}
