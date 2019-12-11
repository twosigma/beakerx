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

package com.twosigma.beakerx.table;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.chart.xychart.XYChart;
import com.twosigma.beakerx.fileloader.CSV;
import com.twosigma.beakerx.jvm.serialization.DateSerializer;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.table.format.TableDisplayStringFormat;
import com.twosigma.beakerx.table.highlight.HeatmapHighlighter;
import com.twosigma.beakerx.table.highlight.TableDisplayCellHighlighter;
import com.twosigma.beakerx.table.highlight.ThreeColorHeatmapHighlighter;
import com.twosigma.beakerx.table.highlight.UniqueEntriesHighlighter;
import com.twosigma.beakerx.table.highlight.ValueHighlighter;
import com.twosigma.beakerx.table.renderer.TableDisplayCellRenderer;
import com.twosigma.beakerx.table.serializer.DataBarsRendererSerializer;
import com.twosigma.beakerx.table.serializer.DecimalStringFormatSerializer;
import com.twosigma.beakerx.table.serializer.HeatmapHighlighterSerializer;
import com.twosigma.beakerx.table.serializer.ThreeColorHeatmapHighlighterSerializer;
import com.twosigma.beakerx.table.serializer.TimeStringFormatSerializer;
import com.twosigma.beakerx.table.serializer.UniqueEntriesHighlighterSerializer;
import com.twosigma.beakerx.table.serializer.ValueHighlighterSerializer;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static com.twosigma.beakerx.fileloader.CSVTest.TABLE_ROWS_TEST_CSV;
import static com.twosigma.beakerx.fileloader.CSVTest.getOsAppropriatePath;
import static com.twosigma.beakerx.table.TableDisplay.THE_LENGTH_OF_TYPES_SHOULD_BE_SAME_AS_NUMBER_OF_ROWS;
import static com.twosigma.beakerx.table.serializer.DecimalStringFormatSerializer.MAX_DECIMALS;
import static com.twosigma.beakerx.table.serializer.DecimalStringFormatSerializer.MIN_DECIMALS;
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
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.STRING_FORMAT_FOR_COLUMN;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.STRING_FORMAT_FOR_TYPE;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.TABLE_DISPLAY;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.TIME_ZONE;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.TOOLTIPS;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.TYPE;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.VALUES;
import static com.twosigma.beakerx.table.serializer.ValueStringFormatSerializer.VALUE_STRING;
import static com.twosigma.beakerx.widget.TestWidgetUtils.findValueForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getMessageUpdate;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyOpenCommMsgWitoutLayout;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

public class TableDisplayTest {

  public static final String COL_1 = "str1";
  public static final String COL_3 = "str3";

  protected KernelTest kernel;

  private TableDisplay tableDisplay;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelTest();
    KernelManager.register(kernel);
    tableDisplay = new TableDisplay(getListOfMapsData());
    tableDisplay.display();
    kernel.clearMessages();
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void shouldSendCommMsgWhenAlignmentProviderForColumnChange() throws Exception {
    //given
    TableDisplayAlignmentProvider centerAlignment = TableDisplayAlignmentProvider.CENTER_ALIGNMENT;
    //when
    tableDisplay.setAlignmentProviderForColumn(COL_1, centerAlignment);
    //then
    assertThat(tableDisplay.getAlignmentForColumn().get(COL_1)).isEqualTo(centerAlignment);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    Map actual = getValueAsMap(model, ALIGNMENT_FOR_COLUMN);
    String value = (String) actual.get(COL_1);
    assertThat(value).isEqualTo(TableDisplayAlignmentProvider.CENTER_ALIGNMENT.toString());
  }

  @Test
  public void shouldSendCommMsgWhenAlignmentProviderForTypeChange() throws Exception {
    //given
    TableDisplayAlignmentProvider centerAlignment = TableDisplayAlignmentProvider.CENTER_ALIGNMENT;
    //when
    tableDisplay.setAlignmentProviderForType(ColumnType.String, centerAlignment);
    //then
    assertThat(tableDisplay.getAlignmentForType().get(ColumnType.String)).isEqualTo(centerAlignment);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    Map actual = (Map) model.get(ALIGNMENT_FOR_TYPE);
    assertThat(actual.get(ColumnType.String.toString())).isEqualTo(centerAlignment.toString());
  }

  @Test
  public void shouldSendCommMsgWhenColumnFrozenChange() throws Exception {
    //given
    //when
    tableDisplay.setColumnFrozen(COL_1, true);
    //then
    assertThat(tableDisplay.getColumnsFrozen().get(COL_1)).isEqualTo(true);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    Map actual = (Map) model.get(COLUMNS_FROZEN);
    assertThat(actual.get(COL_1)).isEqualTo(true);
  }

  @Test
  public void shouldSendCommMsgWhenColumnOrderChange() throws Exception {
    //given
    //when
    tableDisplay.setColumnOrder(getStringList());
    //then
    assertThat(tableDisplay.getColumnOrder()).isEqualTo(getStringList());
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(COLUMN_ORDER)).isEqualTo(getStringList());
  }

  @Test
  public void shouldSendCommMsgWhenColumnVisibleChange() throws Exception {
    //given
    //when
    tableDisplay.setColumnVisible(COL_1, true);
    //then
    assertThat(tableDisplay.getColumnsVisible().get(COL_1)).isEqualTo(true);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(getValueAsMap(model, COLUMNS_VISIBLE).get(COL_1)).isEqualTo(true);
  }

  @Test
  public void shouldSendCommMsgWhenDataFontSizeChange() throws Exception {
    //given
    //when
    tableDisplay.setDataFontSize(12);
    //then
    assertThat(tableDisplay.getDataFontSize()).isEqualTo(12);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(DATA_FONT_SIZE)).isEqualTo(12);
  }

  @Test
  public void shouldSendCommMsgWhenDoubleClickActionChange() throws Exception {
    //given
    //when
    tableDisplay.setDoubleClickAction(new Object());
    //then
    assertThat(tableDisplay.hasDoubleClickAction()).isEqualTo(true);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(2);
    assertThat(model.get(HAS_DOUBLE_CLICK_ACTION)).isEqualTo(true);
  }

  @Test
  public void shouldSendCommMsgWhenDoubleClickActionTagChange() throws Exception {
    //given
    String clickTag = "ClickTag";
    //when
    tableDisplay.setDoubleClickAction(clickTag);
    //then
    assertThat(tableDisplay.getDoubleClickTag()).isEqualTo(clickTag);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(2);
    assertThat(model.get(DOUBLE_CLICK_TAG)).isEqualTo(clickTag);
  }

  @Test
  public void shouldSendCommMsgWhenHasIndexChange() throws Exception {
    //given
    String index1 = "index1";
    //when
    tableDisplay.setHasIndex(index1);
    //then
    assertThat(tableDisplay.getHasIndex()).isEqualTo(index1);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(HAS_INDEX)).isEqualTo(index1);
  }

  @Test
  public void shouldSendCommMsgWhenHeaderFontSizeChange() throws Exception {
    //given
    //when
    tableDisplay.setHeaderFontSize(12);
    //then
    assertThat(tableDisplay.getHeaderFontSize()).isEqualTo(12);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(HEADER_FONT_SIZE)).isEqualTo(12);
  }

  @Test
  public void shouldSendCommMsgWhenHeadersVerticalChange() throws Exception {
    //given
    //when
    tableDisplay.setHeadersVertical(true);
    //then
    assertThat(tableDisplay.getHeadersVertical()).isEqualTo(true);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(HEADERS_VERTICAL)).isEqualTo(true);
  }

  @Test
  public void shouldSendCommMsgWhenAddHeatmapHighlighterForColumnChange() throws Exception {
    //given;
    //when
    TableDisplayCellHighlighter heatmapHighlighter = TableDisplayCellHighlighter.getHeatmapHighlighter(COL_1, TableDisplayCellHighlighter.FULL_ROW);
    tableDisplay.addCellHighlighter(heatmapHighlighter);
    //then
    assertThat(tableDisplay.getCellHighlighters().get(0)).isEqualTo(heatmapHighlighter);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    List actual = getValueAsList(model, CELL_HIGHLIGHTERS);
    Map column = (Map) actual.get(0);
    assertThat(column.get(HeatmapHighlighterSerializer.TYPE)).isEqualTo(HeatmapHighlighter.class.getSimpleName());
    assertThat(column.get(HeatmapHighlighterSerializer.STYLE)).isEqualTo(TableDisplayCellHighlighter.FULL_ROW.toString());
  }

  @Test
  public void shouldSendCommMsgWhenAddThreeColorHighlighterForColumnChange() throws Exception {
    //given;
    ThreeColorHeatmapHighlighter highlighter = new ThreeColorHeatmapHighlighter(COL_1, TableDisplayCellHighlighter.SINGLE_COLUMN, 4, 6, 8, new Color(247, 106, 106), new Color(239, 218, 82), new Color(100, 189, 122));
    //when
    tableDisplay.addCellHighlighter(highlighter);
    //then
    assertThat(tableDisplay.getCellHighlighters().get(0)).isEqualTo(highlighter);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    List actual = getValueAsList(model, CELL_HIGHLIGHTERS);
    Map column = (Map) actual.get(0);
    assertThat(column.get(ThreeColorHeatmapHighlighterSerializer.TYPE)).isEqualTo(ThreeColorHeatmapHighlighter.class.getSimpleName());
    assertThat(column.get(ThreeColorHeatmapHighlighterSerializer.STYLE)).isEqualTo(TableDisplayCellHighlighter.SINGLE_COLUMN.toString());
    assertThat(column.get(ThreeColorHeatmapHighlighterSerializer.MID_VAL)).isEqualTo(6);
    assertThat(column.get(ThreeColorHeatmapHighlighterSerializer.MID_COLOR)).isNotNull();
  }

  @Test
  public void shouldSendCommMsgWhenAddUniqueEntriesHighlighterForColumnChange() throws Exception {
    //given;
    TableDisplayCellHighlighter highlighter = TableDisplayCellHighlighter.getUniqueEntriesHighlighter(COL_1, TableDisplayCellHighlighter.FULL_ROW);
    //when
    tableDisplay.addCellHighlighter(highlighter);
    //then
    assertThat(tableDisplay.getCellHighlighters().get(0)).isEqualTo(highlighter);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    List actual = getValueAsList(model, CELL_HIGHLIGHTERS);
    Map column = (Map) actual.get(0);
    assertThat(column.get(UniqueEntriesHighlighterSerializer.TYPE)).isEqualTo(UniqueEntriesHighlighter.class.getSimpleName());
    assertThat(column.get(UniqueEntriesHighlighterSerializer.STYLE)).isEqualTo(TableDisplayCellHighlighter.FULL_ROW.toString());
    assertThat(column.get(UniqueEntriesHighlighterSerializer.COL_NAME)).isEqualTo(COL_1);
  }

  @Test
  public void shouldSendCommMsgWhenAddValueHighlighterForColumnChange() throws Exception {
    //given;
    ValueHighlighter highlighter = new ValueHighlighter(COL_1, asList(new Color(247, 106, 106)));
    //when
    tableDisplay.addCellHighlighter(highlighter);
    //then
    assertThat(tableDisplay.getCellHighlighters().get(0)).isEqualTo(highlighter);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    List actual = getValueAsList(model, CELL_HIGHLIGHTERS);
    Map column = (Map) actual.get(0);
    assertThat(column.get(ValueHighlighterSerializer.TYPE)).isEqualTo(ValueHighlighter.class.getSimpleName());
    assertThat(column.get(ValueHighlighterSerializer.COL_NAME)).isEqualTo(COL_1);
    assertThat(column.get(ValueHighlighterSerializer.COLORS)).isNotNull();
  }

  @Test
  public void shouldSendCommMsgWhenAddValueHighlighterClosureForColumnChange() throws Exception {
    //when
    tableDisplay.addCellHighlighter(new ClosureTest() {
      @Override
      public Color call(Object row, Object col, Object tbl) {
        return ((int) row % 2 == 0) ? Color.GREEN : Color.BLUE;
      }

      @Override
      public int getMaximumNumberOfParameters() {
        return 3;
      }
    });
    //then
    List actual = getValueAsList(getModelUpdate(), CELL_HIGHLIGHTERS);
    Map column = (Map) actual.get(0);
    assertThat(column.get(ValueHighlighterSerializer.TYPE)).isEqualTo(ValueHighlighter.class.getSimpleName());
  }


  @Test
  public void shouldSendCommMsgWhenSetToolTipClojureChange() throws Exception {
    //when
    tableDisplay.setToolTip(new ClosureTest() {
      @Override
      public String call(Object row, Object col, Object tbl) {
        return ((int) row % 2 == 0) ? "even row" : "odd row";
      }

      @Override
      public int getMaximumNumberOfParameters() {
        return 3;
      }
    });
    //then
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    List valueAsList = getValueAsList(model, TOOLTIPS);
    assertThat(valueAsList.get(0)).isNotNull();
    assertThat(valueAsList.get(1)).isNotNull();
  }

  @Test
  public void shouldSendCommMsgWhenSetFontColorProviderClojureChange() throws Exception {
    //when
    tableDisplay.setFontColorProvider(new ClosureTest() {
      @Override
      public Color call(Object row, Object col, Object tbl) {
        return ((int) row % 2 == 0) ? Color.GREEN : Color.BLUE;
      }

      @Override
      public int getMaximumNumberOfParameters() {
        return 3;
      }
    });
    //then
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    List colors = getValueAsList(model, FONT_COLOR);
    List actual = (List) colors.get(0);
    assertThat(actual.get(0).toString()).startsWith("#");
  }

  @Test
  public void shouldSendCommMsgWhenSetRowFilterClojureChange() throws Exception {
    //when
    tableDisplay.setRowFilter(new ClosureTest() {
      @Override
      public Boolean call(Object row, Object tbl) {
        return ((int) row == 1);
      }

      @Override
      public int getMaximumNumberOfParameters() {
        return 2;
      }
    });
    //then
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    List filteredValues = getValueAsList(model, FILTERED_VALUES);
    assertThat(filteredValues).isNotEmpty();
  }

  @Test
  public void shouldSendCommMsgWhenRendererForColumnChange() throws Exception {
    //given
    TableDisplayCellRenderer dataBarsRenderer = TableDisplayCellRenderer.getDataBarsRenderer();
    //when
    tableDisplay.setRendererForColumn(COL_1, dataBarsRenderer);
    //then
    assertThat(tableDisplay.getRendererForColumn().get(COL_1)).isEqualTo(dataBarsRenderer);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    Map actual = getValueAsMap(model, RENDERER_FOR_COLUMN);
    Map column = getValueAsMap(actual, COL_1);
    assertThat(column.get(DataBarsRendererSerializer.TYPE)).isEqualTo(DataBarsRendererSerializer.VALUE_DATA_BARS);
    assertThat(column.get(DataBarsRendererSerializer.INCLUDE_TEXT)).isEqualTo(true);
  }

  @Test
  public void shouldSendCommMsgWhenRendererForTypeChange() throws Exception {
    //given
    TableDisplayCellRenderer dataBarsRenderer = TableDisplayCellRenderer.getDataBarsRenderer();
    //when
    tableDisplay.setRendererForType(ColumnType.String, dataBarsRenderer);
    //then
    assertThat(tableDisplay.getRendererForType().get(ColumnType.String)).isEqualTo(dataBarsRenderer);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    Map actual = (Map) ((Map) model.get(RENDERER_FOR_TYPE)).get(ColumnType.String.toString());
    assertThat(actual.get(DataBarsRendererSerializer.TYPE)).isEqualTo(DataBarsRendererSerializer.VALUE_DATA_BARS);
    assertThat(actual.get(DataBarsRendererSerializer.INCLUDE_TEXT)).isEqualTo(true);
  }

  @Test
  public void shouldSendCommMsgWhenStringFormatForColumnChange() throws Exception {
    //given
    TableDisplayStringFormat timeFormat = TableDisplayStringFormat.getTimeFormat();
    //when
    tableDisplay.setStringFormatForColumn(COL_1, timeFormat);
    //then
    assertThat(tableDisplay.getStringFormatForColumn().get(COL_1)).isEqualTo(timeFormat);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    Map column = (Map) ((Map) model.get(STRING_FORMAT_FOR_COLUMN)).get(COL_1);
    assertThat(column.get(TimeStringFormatSerializer.TYPE)).isEqualTo(TimeStringFormatSerializer.VALUE_TIME);
    assertThat(column.get(TimeStringFormatSerializer.UNIT)).isEqualTo(TimeUnit.MILLISECONDS.toString());
    assertThat(column.get(TimeStringFormatSerializer.HUMAN_FRIENDLY)).isEqualTo(false);
  }

  @Test
  public void shouldSendCommMsgWhenClojureFormatForColumnChange() throws Exception {
    //given
    //when
    tableDisplay.setStringFormatForColumn(COL_1, new ClosureTest() {
      @Override
      public String call(Object value, Object row, Object col, Object tableDisplay) {
        return ((float) value < 8) ? ":(" : ":)";
      }

      @Override
      public int getMaximumNumberOfParameters() {
        return 4;
      }
    });
    //then
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    Map actual = getValueAsMap(model, STRING_FORMAT_FOR_COLUMN);
    Map column = getValueAsMap(actual, COL_1);
    Map values = getValueAsMap(column, VALUES);
    String type = (String) column.get(TYPE);
    assertThat(type).isEqualTo(VALUE_STRING);
    ArrayList valuesForColumn = (ArrayList) values.get(COL_1);
    assertThat(valuesForColumn.get(0)).isEqualTo(":(");
    assertThat(valuesForColumn.get(1)).isEqualTo(":(");
  }

  @Test
  public void shouldSendCommMsgWhenStringFormatForTimesChange() throws Exception {
    //given
    TimeUnit days = TimeUnit.DAYS;
    //when
    tableDisplay.setStringFormatForTimes(days);
    //then
    assertThat(tableDisplay.getStringFormatForTimes()).isEqualTo(days);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    Map time = (Map) ((Map) model.get(STRING_FORMAT_FOR_TYPE)).get(ColumnType.Time.toString());
    assertThat(time.get("unit")).isEqualTo(days.toString());
  }

  @Test
  public void shouldSendCommMsgWhenStringFormatForTypeChange() throws Exception {
    //given
    TableDisplayStringFormat timeFormat = TableDisplayStringFormat.getTimeFormat();
    //when
    tableDisplay.setStringFormatForType(ColumnType.String, timeFormat);
    //then
    assertThat(tableDisplay.getStringFormatForType()).isNotNull();
    Map actual = getValueAsMap(getModelUpdate(), STRING_FORMAT_FOR_TYPE);
    Map column = getValueAsMap(actual, ColumnType.String.toString());
    assertThat(column.get(TimeStringFormatSerializer.TYPE)).isEqualTo(TimeStringFormatSerializer.VALUE_TIME);
    assertThat(column.get(TimeStringFormatSerializer.UNIT)).isNotNull();
    assertThat(column.get(TimeStringFormatSerializer.HUMAN_FRIENDLY)).isNotNull();
  }

  @Test
  public void shouldSendCommMsgWhenDecimalFormatForTypeChange() throws Exception {
    //given
    TableDisplayStringFormat decimalFormat = TableDisplayStringFormat.getDecimalFormat(9, 9);
    //when
    tableDisplay.setStringFormatForType(ColumnType.Double, decimalFormat);
    kernel.clearMessages();
    tableDisplay.setStringFormatForType(ColumnType.String, decimalFormat);
    //then
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    Map actual = getValueAsMap(model, STRING_FORMAT_FOR_TYPE);
    verifyDecimalFormat(actual, ColumnType.Double.toString());
    verifyDecimalFormat(actual, ColumnType.String.toString());
  }

  private void verifyDecimalFormat(Map actual, String field) {
    Map column = getValueAsMap(actual, field);
    assertThat(column.get(DecimalStringFormatSerializer.TYPE)).isEqualTo(DecimalStringFormatSerializer.VALUE_DECIMAL);
    assertThat(column.get(MIN_DECIMALS)).isEqualTo(9);
    assertThat(column.get(MAX_DECIMALS)).isEqualTo(9);
  }

  @Test
  public void shouldSendCommMsgWhenTimeZoneChange() throws Exception {
    //given
    String timezone = "TZ1";
    //when
    tableDisplay.setTimeZone(timezone);
    //then
    assertThat(tableDisplay.getTimeZone()).isEqualTo(timezone);
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    assertThat(model.get(TIME_ZONE)).isEqualTo(timezone);
  }

  @Test
  public void shouldSendCommMsgWithAllModelWhenDisplay() throws Exception {
    //given
    kernel.clearMessages();
    ArrayList<Map<String, Object>> v = new ArrayList<>();
    TableDisplay tableDisplay = new TableDisplay(v);
    //when
    tableDisplay.display();
    //then
    verifyOpenCommMsgWitoutLayout(kernel.getPublishedMessages(), TableDisplay.MODEL_NAME_VALUE, TableDisplay.VIEW_NAME_VALUE);
    Map valueForProperty = getValueForProperty(kernel.getPublishedMessages().get(1), TableDisplay.MODEL, Map.class);
    assertThat(valueForProperty.get(TYPE)).isEqualTo(TABLE_DISPLAY);
    assertThat(tableDisplay.getValues()).isEqualTo(v);
    LinkedHashMap model = getModel();
    assertThat(model.get(VALUES)).isNotNull();
  }

  @Test
  public void createWithMultipleTypesPerColumnParam_hasSafeTypes() throws Exception {
    TableDisplay tableDisplay = new TableDisplay(getListOfMapsWithInconsistentTypes());
    assertThat(tableDisplay.getSubtype()).isEqualTo(TableDisplay.LIST_OF_MAPS_SUBTYPE);
    List<String> expectedValues = asList("string", "string", "string");
    assertThat(tableDisplay.getTypes()).isEqualTo(expectedValues);
  }

  @Test
  public void createWithMultipleTypesPerColumnParam_hasSafeTypesInOrder() throws Exception {
    TableDisplay tableDisplay = new TableDisplay(getListOfMapsWithMostlyInconsistentTypes());
    assertThat(tableDisplay.getSubtype()).isEqualTo(TableDisplay.LIST_OF_MAPS_SUBTYPE);
    System.out.println(tableDisplay.getTypes());
    List<String> expectedValues = asList("string", "string", "double");
    assertThat(tableDisplay.getTypes()).isEqualTo(expectedValues);
  }

  @Test
  public void createWithUndefinedTypes() throws Exception {
    TableDisplay tableDisplay = new TableDisplay(getListOfMapsWithEmptyTypes());
    assertThat(tableDisplay.getSubtype()).isEqualTo(TableDisplay.LIST_OF_MAPS_SUBTYPE);
    System.out.println(tableDisplay.getTypes());
    List<String> expectedValues = asList("string", "double", "integer");
    assertThat(tableDisplay.getTypes()).isEqualTo(expectedValues);
  }

  @Test
  public void createWithListOfMapsParam_hasListOfMapsSubtype() throws Exception {
    //when
    TableDisplay tableDisplay = new TableDisplay(getListOfMapsData());
    //then
    assertThat(tableDisplay.getSubtype()).isEqualTo(TableDisplay.LIST_OF_MAPS_SUBTYPE);
    assertThat(tableDisplay.getValues().size()).isEqualTo(2);
    assertThat(tableDisplay.getColumnNames().size()).isEqualTo(3);
    assertThat(tableDisplay.getTypes().size()).isEqualTo(3);
  }

  @Test
  public void createWithListsParams_hasTableDisplaySubtype() throws Exception {
    //when
    TableDisplay tableDisplay =
            new TableDisplay(asList(getRowData(), getRowData()), getStringList(), getStringList());
    //then
    assertThat(tableDisplay.getSubtype()).isEqualTo(TableDisplay.TABLE_DISPLAY_SUBTYPE);
    assertThat(tableDisplay.getValues().size()).isEqualTo(2);
    assertThat(tableDisplay.getColumnNames().size()).isEqualTo(3);
    assertThat(tableDisplay.getTypes().size()).isEqualTo(3);
  }

  @Test
  public void createTableDisplayForMap_hasDictionarySubtype() throws Exception {
    //when
    TableDisplay tableDisplay = new TableDisplay(getMapData());
    //then
    assertThat(tableDisplay.getSubtype()).isEqualTo(TableDisplay.DICTIONARY_SUBTYPE);
    assertThat(tableDisplay.getValues().size()).isEqualTo(3);
    assertThat(tableDisplay.getColumnNames().size()).isEqualTo(2);
    assertThat(tableDisplay.getTypes().size()).isEqualTo(0);
  }

  @Test
  public void createTableDisplay_hasCommIsNotNull() throws Exception {
    //when
    TableDisplay tableDisplay = new TableDisplay(getListOfMapsData());
    //then
    assertThat(tableDisplay.getComm()).isNotNull();
  }

  @Test
  public void getValuesAsRowsWithoutParams_returnedListOfMapsIsNotEmpty() throws Exception {
    //given
    TableDisplay tableDisplay = new TableDisplay(getListOfMapsData());
    //when
    List<Map<String, Object>> rows = tableDisplay.getValuesAsRows();
    //then
    assertThat(rows.size()).isEqualTo(2);
    assertThat(rows.get(0).size()).isEqualTo(3);
  }

  @Test
  public void getValuesAsRowsWithTwoParams_returnedListOfMapsIsNotEmpty() throws Exception {
    //when
    List<Map<String, Object>> rows =
            TableDisplay.getValuesAsRows(asList(getRowData(), getRowData()), getStringList());
    //then
    assertThat(rows.size()).isEqualTo(2);
    assertThat(rows.get(0).size()).isEqualTo(3);
  }

  @Test
  public void getValuesAsMatrixWithoutParams_returnedListOfListIsNotEmpty() throws Exception {
    //given
    TableDisplay tableDisplay = new TableDisplay(getListOfMapsData());
    //when
    List<List<?>> values = tableDisplay.getValuesAsMatrix();
    //then
    assertThat(values).isNotEmpty();
  }

  @Test
  public void getValuesAsMatrixWithParam_returnedListOfListIsNotEmpty() throws Exception {
    //when
    List<List<?>> values =
            TableDisplay.getValuesAsMatrix(asList(getStringList(), getRowData()));
    //then
    assertThat(values).isNotEmpty();
  }

  @Test
  public void getValuesAsDictionaryWithoutParam_returnedMapIsNotEmpty() throws Exception {
    //given
    TableDisplay tableDisplay = new TableDisplay(getMapData());
    //when
    Map<String, Object> dictionary = tableDisplay.getValuesAsDictionary();
    //then
    assertThat(dictionary).isNotEmpty();
  }

  @Test
  public void getValuesAsDictionaryWithParam_returnedMapIsNotEmpty() throws Exception {
    //when
    Map<String, Object> dictionary =
            TableDisplay.getValuesAsDictionary(asList(asList("k1", 1), asList("k2", 2)));
    //then
    assertThat(dictionary).isNotEmpty();
  }

  @Test
  public void shouldContainTime() throws Exception {
    //given
    List<Map<String, Object>> data = new CSV().read(getOsAppropriatePath(getClass().getClassLoader(), TABLE_ROWS_TEST_CSV));
    TableDisplay tableDisplay = new TableDisplay(data);
    //when
    tableDisplay.display();
    //then
    assertThat(tableDisplay.getTypes()).contains(CSV.TIME_COLUMN);
    LinkedHashMap model = getModel();
    List values = (List) model.get(VALUES);
    List row0 = (List) values.get(0);
    Map date = (Map) row0.get(7);
    assertThat(date.get(DateSerializer.TYPE)).isEqualTo(DateSerializer.VALUE_DATE);
    assertThat(date.get(DateSerializer.TIMESTAMP)).isNotNull();
  }

  @Test
  public void shouldSendCommMsgWhenRemoveAllCellHighlighters() throws Exception {
    //given;
    TableDisplayCellHighlighter uniqueEntriesHighlighter = TableDisplayCellHighlighter.getUniqueEntriesHighlighter(COL_1, TableDisplayCellHighlighter.FULL_ROW);
    TableDisplayCellHighlighter heatmapHighlighter = TableDisplayCellHighlighter.getHeatmapHighlighter(COL_1, 0, 8, Color.ORANGE, Color.PINK);
    ThreeColorHeatmapHighlighter colorHeatmapHighlighter = new ThreeColorHeatmapHighlighter(COL_1, TableDisplayCellHighlighter.SINGLE_COLUMN, 4, 6, 8, new Color(247, 106, 106), new Color(239, 218, 82), new Color(100, 189, 122));
    tableDisplay.addCellHighlighter(uniqueEntriesHighlighter);
    tableDisplay.addCellHighlighter(heatmapHighlighter);
    tableDisplay.addCellHighlighter(colorHeatmapHighlighter);
    kernel.clearMessages();
    //when
    tableDisplay.removeAllCellHighlighters();
    //then
    assertThat(tableDisplay.getCellHighlighters()).isEmpty();
    LinkedHashMap model = getModelUpdate();
    assertThat(model.size()).isEqualTo(1);
    List actual = getValueAsList(model, CELL_HIGHLIGHTERS);
    assertThat(actual).isEmpty();
  }

  public static List<Map<String, Object>> getListOfMapsData() {
    List<Map<String, Object>> list = new ArrayList<>();
    List<String> cols = getStringList();
    List<?> row = getRowData();
    list.add(
            new HashMap<String, Object>() {
              {
                put(cols.get(0), row.get(0));
                put(cols.get(1), row.get(1));
                put(cols.get(2), row.get(2));
              }
            });
    list.add(
            new HashMap<String, Object>() {
              {
                put(cols.get(0), row.get(0));
                put(cols.get(1), row.get(1));
                put(cols.get(2), row.get(2));
              }
            });
    return list;
  }

  public static List<Map<String, Object>> getListOfMapsWithInconsistentTypes() {
    List<Map<String, Object>> list = new ArrayList<>();
    List<String> cols = getStringList();
    list.add(
            new LinkedHashMap<String, Object>() {
              {
                put(cols.get(0), 1.82);
                put(cols.get(1), "string 2");
                put(cols.get(2), "string 3");
              }
            });
    list.add(
            new LinkedHashMap<String, Object>() {
              {
                put(cols.get(0), "a string");
                put(cols.get(1), 10.4);
                put(cols.get(2), 3.14159);
              }
            });
    return list;
  }


  public static List<Map<String, Object>> getListOfMapsWithMostlyInconsistentTypes() {
    List<Map<String, Object>> list = new ArrayList<>();
    List<String> cols = getStringList();
    list.add(
            new LinkedHashMap<String, Object>() {
              {
                put(cols.get(0), 10);
                put(cols.get(1), "string 1");
                put(cols.get(2), 2.7);
              }
            });
    list.add(
            new LinkedHashMap<String, Object>() {
              {
                put(cols.get(0), "a string");
                put(cols.get(1), 10.4);
                put(cols.get(2), 3.14159);
              }
            });
    return list;
  }

  public static List<Map<String, Object>> getListOfMapsWithEmptyTypes() {
    List<Map<String, Object>> list = new ArrayList<>();
    List<String> cols = getStringList();
    list.add(
            new LinkedHashMap<String, Object>() {
              {
                put(cols.get(0), "string 1");
                put(cols.get(1), null);
                put(cols.get(2), 1);
              }
            });
    list.add(
            new LinkedHashMap<String, Object>() {
              {
                put(cols.get(0), null);
                put(cols.get(1), 2.2);
                put(cols.get(2), 2);
              }
            });
    list.add(
            new LinkedHashMap<String, Object>() {
              {
                put(cols.get(0), "string 3");
                put(cols.get(1), 2.3);
                put(cols.get(2), null);
              }
            });
    return list;
  }

  private Map<?, ?> getMapData() {
    return new HashMap<String, Object>() {
      {
        put("key1", 1);
        put("key2", 2);
        put("key3", 3);
        put("key1", 4);
        put("key2", 5);
      }
    };
  }

  private static List<String> getStringList() {
    return asList(COL_1, "str2", COL_3);
  }

  private static List<?> getRowData() {
    return asList(new Float(1.0), 1490970521000L, "value1");
  }

  protected LinkedHashMap getModel() {
    return findValueForProperty(kernel, XYChart.MODEL, LinkedHashMap.class);
  }

  private LinkedHashMap getModelUpdate() {
    Optional<Message> messageUpdate = getMessageUpdate(kernel);
    assertTrue("No " + JupyterMessages.COMM_MSG.getName() + " msg.", messageUpdate.isPresent());
    return getModelUpdate(messageUpdate.get());
  }

  private LinkedHashMap getModelUpdate(Message message) {
    return getValueForProperty(message, XYChart.MODEL_UPDATE, LinkedHashMap.class);
  }

  private Map getValueAsMap(final Map model, final String field) {
    return (Map) model.get(field);
  }

  private List getValueAsList(Map model, String field) {
    return (List) model.get(field);
  }

  @Test
  public void shouldUpdateCellByColumnName() throws Exception {
    //given
    //when
    tableDisplay.updateCell(0, COL_3, 121);
    //then
    int indexOfCol3 = tableDisplay.getColumnNames().indexOf(COL_3);
    assertThat(tableDisplay.getValues().get(0).get(indexOfCol3)).isEqualTo(121);
  }

  @Test
  public void shouldThrowExceptionWhenUpdateCellByNotExistingColumnName() throws Exception {
    //given
    //when
    try {
      tableDisplay.updateCell(0, "UnknownColumnName", 121);
      fail("Should not update cell for unknown column name");
    } catch (Exception e) {
      //then
      assertThat(e.getMessage()).contains("UnknownColumnName");
    }
  }

  @Test
  public void shouldThrowExceptionWhenNumberOfRowsDifferentThanLengthOfTypes() {
    //given
    List<List<?>> v = new ArrayList<>();
    v.add(asList("1", 2, 3, 4));
    v.add(asList("1", 2, 3, 4));
    List<String> cl = asList("string column", "integer column", "double column", "default number type");
    List<String> co = asList("string", "integer", "double");
    //when
    try {
      new TableDisplay(v, cl, co);
      fail("Should not create TableDisplay when the length of types is not the same as number of rows.");
    } catch (Exception e) {
      //then
      assertThat(e.getMessage()).contains(THE_LENGTH_OF_TYPES_SHOULD_BE_SAME_AS_NUMBER_OF_ROWS);
    }
  }

  @Test
  public void shouldCreateWhenTheLengthOfTypesIsTheSameAsNumberOfRows() {
    //given
    List<List<?>> v = new ArrayList<>();
    v.add(asList("1", 2, 3.0, 4));
    v.add(asList("5", 6, 7.0, 8));
    List<String> cl = asList("string column", "integer column", "double column", "integer column");
    List<String> co = asList("string", "integer", "double", "integer");
    //when
    TableDisplay tableDisplay = new TableDisplay(v, cl, co);
    //then
    assertThat(tableDisplay).isNotNull();
  }

}
