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

package com.twosigma.beakerx.table.serializer;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.table.ClosureTest;
import com.twosigma.beakerx.table.ColumnType;
import com.twosigma.beakerx.table.ObservableTableDisplayTest;
import com.twosigma.beakerx.table.TableDisplay;
import com.twosigma.beakerx.table.TableDisplayAlignmentProvider;
import com.twosigma.beakerx.table.TableDisplayToJson;
import com.twosigma.beakerx.table.format.TableDisplayStringFormat;
import com.twosigma.beakerx.table.highlight.HighlightStyle;
import com.twosigma.beakerx.table.highlight.TableDisplayCellHighlighter;
import com.twosigma.beakerx.table.renderer.TableDisplayCellRenderer;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import static com.twosigma.beakerx.table.serializer.DataBarsRendererSerializer.INCLUDE_TEXT;
import static com.twosigma.beakerx.table.serializer.DecimalStringFormatSerializer.MAX_DECIMALS;
import static com.twosigma.beakerx.table.serializer.DecimalStringFormatSerializer.MIN_DECIMALS;
import static com.twosigma.beakerx.table.serializer.DecimalStringFormatSerializer.TYPE;
import static com.twosigma.beakerx.table.serializer.TableDisplaySerializer.STRING_FORMAT_FOR_TYPE;
import static org.assertj.core.api.Assertions.assertThat;

public class TableDisplaySerializerTest {

  private TableDisplay tableDisplay;

  @Before
  public void setUp() throws Exception {
    KernelManager.register(new KernelTest());
    tableDisplay = new TableDisplay(ObservableTableDisplayTest.getListOfMapsData());
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void serializeTableDisplay_resultJsonHasType() throws IOException {
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat(actualObj.get("type")).isEqualTo("TableDisplay");
  }

  @Test
  public void serializeTableDisplay_resultJsonHasSubtype() throws IOException {
    //given
    String result = tableDisplay.getSubtype();
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat(actualObj.get("subtype")).isEqualTo(result);
  }

  @Test
  public void serializeDoubleClickAction_resultJsonHasDoubleClickAction() throws IOException {
    //given
    tableDisplay.setDoubleClickAction(new Object());
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat(actualObj.get("hasDoubleClickAction")).isEqualTo(true);
  }

  @Test
  public void serializeDoubleClickTag_resultJsonHasDoubleClickTag() throws IOException {
    //given
    tableDisplay.setDoubleClickAction("tag_name");
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat(actualObj.get("doubleClickTag")).isEqualTo("tag_name");
  }

  @Test
  public void serializeContextMenuItems_resultJsonHasContextMenuItems() throws IOException {
    //given
    tableDisplay.addContextMenuItem("run_tag", new Object());
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat(actualObj.get("contextMenuItems")).isNotNull();
  }

  @Test
  public void serializeContextMenuTags_resultJsonHasContextMenuTags() throws IOException {
    //given
    tableDisplay.addContextMenuItem("run_tag", "tag_name");
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat(actualObj.get("contextMenuTags")).isNotNull();
  }

  @Test
  public void serializeTableDisplay_resultJsonHasColumnNames() throws IOException {
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat(actualObj.get("columnNames")).isNotNull();
  }

  @Test
  public void serializeTableDisplay_resultJsonHasTypes() throws IOException {
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat(actualObj.get("types")).isNotNull();
  }

  @Test
  public void serializeStringFormatForTimes_resultJsonHasStringFormatForTimes() throws IOException {
    //given
    tableDisplay.setStringFormatForTimes(TimeUnit.DAYS);
    //when
    Map model = serializeTableDisplay();
    //then
    Map time = (Map)((Map)model.get(STRING_FORMAT_FOR_TYPE)).get(ColumnType.Time.toString());
    assertThat(time.get("unit")).isEqualTo(TimeUnit.DAYS.toString());
  }

  @Test
  public void serializeStringFormatForType_resultJsonHasStringFormatForType() throws IOException {
    //given
    tableDisplay.setStringFormatForType(ColumnType.Double, TableDisplayStringFormat.getDecimalFormat(1, 1));
    //when
    Map actualObj = serializeTableDisplay();
    //then
    Map stringFormatForColumn = (Map)actualObj.get("stringFormatForType");
    Map a = getValueAsMap(stringFormatForColumn, ColumnType.Double.getType());
    assertThat(a.get(TYPE)).isEqualTo("decimal");
    assertThat(a.get(MIN_DECIMALS)).isEqualTo(1);
    assertThat(a.get(MAX_DECIMALS)).isEqualTo(1);
  }

  @Test
  public void serializeStringFormatForColumn_resultJsonHasStringFormatForColumn() throws IOException {
    //given
    tableDisplay.setStringFormatForColumn("a", TableDisplayStringFormat.getDecimalFormat(1, 1));
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat(((Map) actualObj.get("stringFormatForColumn")).get("a")).isNotNull();
  }

  @Test
  public void serializeTableDisplayStringFormat_resultJsonHasTableDisplayStringFormat() throws IOException {
    //given
    tableDisplay.setStringFormatForColumn("a", TableDisplayStringFormat.getDecimalFormat(1, 1));
    tableDisplay.setStringFormatForColumn("b", TableDisplayStringFormat.getTimeFormat(true));
    tableDisplay.setStringFormatForColumn("c", TableDisplayStringFormat.getTimeFormat(TimeUnit.DAYS));
    tableDisplay.setStringFormatForColumn("d", TableDisplayStringFormat.getTimeFormat(TimeUnit.DAYS, true));
    //when
    Map actualObj = serializeTableDisplay();
    //then
    Map formatNode = (Map) actualObj.get("stringFormatForColumn");
    Map a = (Map) formatNode.get("a");
    assertThat(a.get("minDecimals")).isEqualTo(1);
    Map b = (Map) formatNode.get("b");
    assertThat(b.get("humanFriendly")).isEqualTo(true);
    Map c = (Map) formatNode.get("c");
    assertThat(c.get("unit")).isEqualTo("DAYS");
    Map d = (Map) formatNode.get("d");
    assertThat(d.get("humanFriendly")).isEqualTo(true);
  }

  @Test
  public void serializeRendererForType_resultJsonHasRendererForType() throws IOException {
    //given
    tableDisplay.setRendererForType(ColumnType.Boolean, TableDisplayCellRenderer.getDataBarsRenderer());
    //when
    Map actualObj = serializeTableDisplay();
    //then
    Map rendererForType = getValueAsMap(actualObj, "rendererForType");
    Map aBoolean = getValueAsMap(rendererForType, "boolean");
    assertThat(aBoolean.get(INCLUDE_TEXT)).isEqualTo(true);
  }

  private Map getValueAsMap(Map o, String property) {
    return (Map) o.get(property);
  }

  @Test
  public void serializeRendererForColumn_resultJsonHasRendererForColumn() throws IOException {
    //given
    tableDisplay.setRendererForColumn("a", TableDisplayCellRenderer.getDataBarsRenderer(true));
    //when
    Map actualObj = serializeTableDisplay();
    //then
    Map rendererForType = getValueAsMap(actualObj, "rendererForColumn");
    Map aBoolean = getValueAsMap(rendererForType, "a");
    assertThat(aBoolean.get(INCLUDE_TEXT)).isEqualTo(true);
  }

  @Test
  public void serializeAlignmentForType_resultJsonHasAlignmentForType() throws IOException {
    //given
    tableDisplay.setAlignmentProviderForType(ColumnType.Double, TableDisplayAlignmentProvider.LEFT_ALIGNMENT);
    //when
    Map actualObj = serializeTableDisplay();
    //then
    Map rendererForType = getValueAsMap(actualObj, "alignmentForType");
    assertThat(rendererForType.get("double")).isEqualTo("L");
  }

  @Test
  public void serializeAlignmentForColumn_resultJsonHasAlignmentForColumn() throws IOException {
    //given
    tableDisplay.setAlignmentProviderForColumn("a", TableDisplayAlignmentProvider.RIGHT_ALIGNMENT);
    //when
    Map actualObj = serializeTableDisplay();
    //then
    Map rendererForType = getValueAsMap(actualObj, "alignmentForColumn");
    assertThat(rendererForType.get("a")).isEqualTo("R");
  }

  @Test
  public void serializeColumnFrozen_resultJsonHasColumnFrozen() throws IOException {
    //given
    tableDisplay.setColumnFrozen("a", true);
    //when
    Map actualObj = serializeTableDisplay();
    //then
    Map rendererForType = getValueAsMap(actualObj, "columnsFrozen");
    assertThat(rendererForType.get("a")).isEqualTo(true);
  }

  @Test
  public void serializeColumnsVisible_resultJsonHasColumnsVisible() throws IOException {
    //given
    tableDisplay.setColumnVisible("a", true);
    //when
    Map actualObj = serializeTableDisplay();
    //then
    Map rendererForType = getValueAsMap(actualObj, "columnsVisible");
    assertThat(rendererForType.get("a")).isEqualTo(true);
  }

  @Test
  public void serializeColumnOrder_resultJsonHasColumnOrder() throws IOException {
    //given
    tableDisplay.setColumnOrder(Arrays.asList("col1", "col2"));
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat((ArrayList) actualObj.get("columnOrder")).isNotEmpty();
  }

  @Test
  public void serializeCellHighlighter_resultJsonHasCellHighlighter() throws IOException {
    //given
    tableDisplay.addCellHighlighter(TableDisplayCellHighlighter.getUniqueEntriesHighlighter("a"));
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat((ArrayList) actualObj.get("cellHighlighters")).isNotEmpty();
  }

  @Test
  public void serializeTableDisplayCellHighlighter_resultJsonHasTableDisplayCellHighlighterData() throws IOException {
    //given
    tableDisplay.addCellHighlighter(TableDisplayCellHighlighter.getHeatmapHighlighter("a"));
    tableDisplay.addCellHighlighter(TableDisplayCellHighlighter.getHeatmapHighlighter("b",
            HighlightStyle.FULL_ROW));
    tableDisplay.addCellHighlighter(TableDisplayCellHighlighter.getHeatmapHighlighter("c",
            HighlightStyle.SINGLE_COLUMN, 1, 10));
    tableDisplay.addCellHighlighter(TableDisplayCellHighlighter.getHeatmapHighlighter("d",
            HighlightStyle.SINGLE_COLUMN, 1, 10, Color.BLACK, Color.BLUE));
    tableDisplay.addCellHighlighter(TableDisplayCellHighlighter.getHeatmapHighlighter("e",
            1, 10));
    tableDisplay.addCellHighlighter(TableDisplayCellHighlighter.getHeatmapHighlighter("f",
            1, 10, Color.BLACK, Color.BLUE));
    tableDisplay.addCellHighlighter(TableDisplayCellHighlighter.getUniqueEntriesHighlighter("g"));
    tableDisplay.addCellHighlighter(TableDisplayCellHighlighter.getUniqueEntriesHighlighter("i",
            HighlightStyle.FULL_ROW));
    //when
    Map actualObj = serializeTableDisplay();
    //then
    ArrayList node = (ArrayList) actualObj.get("cellHighlighters");
    assertThat(((Map)node.get(0)).get("colName")).isEqualTo("a");
    assertThat(((Map)node.get(1)).get("style")).isEqualTo("FULL_ROW");
    assertThat(((Map)node.get(2)).get("minVal")).isEqualTo(1);
    Map node3 = (Map)node.get(3);
    assertThat(node3.get("minColor")).isEqualTo("#FF000000");
    assertThat(((Map)node.get(4)).get("maxVal")).isEqualTo(10);
    Map node5 = (Map)node.get(5);
    assertThat(node5.get("maxColor")).isEqualTo("#FF0000FF");
    assertThat(((Map)node.get(6)).get("colName")).isEqualTo("g");
    assertThat(((Map)node.get(7)).get("style")).isEqualTo("FULL_ROW");
  }

  @Test
  public void serializeTooltips_resultJsonHasTooltips() throws IOException {
    //given
    tableDisplay.setToolTip(new EmptyClosureTest(3));
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat((ArrayList) actualObj.get("tooltips")).isNotEmpty();
  }

  @Test
  public void serializeDataFontSize_resultJsonHasDataFontSize() throws IOException {
    //given
    tableDisplay.setDataFontSize(10);
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat(actualObj.get("dataFontSize")).isEqualTo(10);
  }

  @Test
  public void serializeHeaderFontSize_resultJsonHasHeaderFontSize() throws IOException {
    //given
    tableDisplay.setHeaderFontSize(10);
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat(actualObj.get("headerFontSize")).isEqualTo(10);
  }

  @Test
  public void serializeFontColor_resultJsonHasFontColor() throws IOException {
    //given
    tableDisplay.setFontColorProvider(new EmptyClosureTest(3));
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat((ArrayList) actualObj.get("fontColor")).isNotEmpty();
  }

  @Test
  public void serializeFilteredValues_resultJsonHasFilteredValues() throws IOException {
    //given
    tableDisplay.setRowFilter(new EmptyClosureTest(2));
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat((ArrayList) actualObj.get("filteredValues")).isNotEmpty();
  }

  @Test
  public void serializeHeadersVertical_resultJsonHasHeadersVertical() throws IOException {
    //given
    tableDisplay.setHeadersVertical(true);
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat(actualObj.get("headersVertical")).isNotNull();
  }

  @Test
  public void serializeTableDisplay_resultJsonHasValues() throws IOException {
    //when
    Map actualObj = serializeTableDisplay();
    //then
    assertThat((ArrayList) actualObj.get("values")).isNotEmpty();
  }

  private Map serializeTableDisplay() throws IOException {
    return TableDisplayToJson.toJson(tableDisplay);
  }

  private class EmptyClosureTest extends ClosureTest {
    int num;

    public EmptyClosureTest(int num) {
      this.num = num;
    }

    @Override
    public Object call(Object arg1, Object arg2) {
      return true;
    }

    @Override
    public int getMaximumNumberOfParameters() {
      return num;
    }
  }

}
