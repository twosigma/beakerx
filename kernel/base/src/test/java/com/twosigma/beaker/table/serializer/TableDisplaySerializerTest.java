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

package com.twosigma.beaker.table.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.table.ClosureTest;
import com.twosigma.beaker.table.ColumnType;
import com.twosigma.beaker.table.ObservableTableDisplayTest;
import com.twosigma.beaker.table.TableDisplay;
import com.twosigma.beaker.table.TableDisplayAlignmentProvider;
import com.twosigma.beaker.table.format.TableDisplayStringFormat;
import com.twosigma.beaker.table.highlight.HighlightStyle;
import com.twosigma.beaker.table.highlight.TableDisplayCellHighlighter;
import com.twosigma.beaker.table.renderer.TableDisplayCellRenderer;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;

public class TableDisplaySerializerTest {

  private JsonGenerator jgen;
  private StringWriter sw;
  private TableDisplay tableDisplay;
  private static ObjectMapper mapper;
  private static TableDisplaySerializer tableDisplaySerializer;

  @BeforeClass
  public static void setUpClass() {
    mapper = new ObjectMapper();
    tableDisplaySerializer = new TableDisplaySerializer();
  }

  @Before
  public void setUp() throws Exception {
    KernelManager.register(new KernelTest());
    tableDisplay = new TableDisplay(ObservableTableDisplayTest.getListOfMapsData());
    sw = new StringWriter();
    jgen = mapper.getFactory().createGenerator(sw);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void serializeTableDisplay_resultJsonHasType() throws IOException{
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.get("type").asText()).isEqualTo("TableDisplay");
  }

  @Test
  public void serializeTableDisplay_resultJsonHasSubtype() throws IOException{
    //given
    String result = tableDisplay.getSubtype();
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.get("subtype").asText()).isEqualTo(result);
  }

  @Test
  public void serializeDoubleClickAction_resultJsonHasDoubleClickAction() throws IOException{
    //given
    tableDisplay.setDoubleClickAction(new Object());
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.get("hasDoubleClickAction").asBoolean()).isTrue();
  }

  @Test
  public void serializeDoubleClickTag_resultJsonHasDoubleClickTag() throws IOException{
    //given
    tableDisplay.setDoubleClickAction("tag_name");
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.get("doubleClickTag").asText()).isEqualTo("tag_name");
  }

  @Test
  public void serializeContextMenuItems_resultJsonHasContextMenuItems() throws IOException{
    //given
    tableDisplay.addContextMenuItem("run_tag", new Object());
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat((ArrayNode) actualObj.get("contextMenuItems")).isNotEmpty();
  }

  @Test
  public void serializeContextMenuTags_resultJsonHasContextMenuTags() throws IOException{
    //given
    tableDisplay.addContextMenuItem("run_tag", "tag_name");
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.get("contextMenuTags")).isNotEmpty();
  }

  @Test
  public void serializeTableDisplay_resultJsonHasColumnNames() throws IOException{
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat((ArrayNode) actualObj.get("columnNames")).isNotEmpty();
  }

  @Test
  public void serializeTableDisplay_resultJsonHasTypes() throws IOException{
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat((ArrayNode) actualObj.get("types")).isNotEmpty();
  }

  @Test
  public void serializeStringFormatForTimes_resultJsonHasStringFormatForTimes() throws IOException{
    //given
    tableDisplay.setStringFormatForTimes(TimeUnit.DAYS);
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("stringFormatForTimes")).isTrue();
    Assertions.assertThat(actualObj.get("stringFormatForTimes").asText()).isEqualTo(TimeUnit.DAYS.toString());
  }

  @Test
  public void serializeStringFormatForType_resultJsonHasStringFormatForType() throws IOException{
    //given
    tableDisplay.setStringFormatForType(ColumnType.Double, TableDisplayStringFormat.getDecimalFormat(1, 1));
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("stringFormatForType")).isTrue();
    Assertions.assertThat(actualObj.get("stringFormatForType").has("Double")).isTrue();
  }

  @Test
  public void serializeStringFormatForColumn_resultJsonHasStringFormatForColumn() throws IOException{
    //given
    tableDisplay.setStringFormatForColumn("a", TableDisplayStringFormat.getDecimalFormat(1, 1));
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("stringFormatForColumn")).isTrue();
    Assertions.assertThat(actualObj.get("stringFormatForColumn").has("a")).isTrue();
  }

  @Test
  public void serializeTableDisplayStringFormat_resultJsonHasTableDisplayStringFormat() throws IOException{
    //given
    tableDisplay.setStringFormatForColumn("a", TableDisplayStringFormat.getDecimalFormat(1, 1));
    tableDisplay.setStringFormatForColumn("b", TableDisplayStringFormat.getTimeFormat(true));
    tableDisplay.setStringFormatForColumn("c", TableDisplayStringFormat.getTimeFormat(TimeUnit.DAYS));
    tableDisplay.setStringFormatForColumn("d", TableDisplayStringFormat.getTimeFormat(TimeUnit.DAYS, true));
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("stringFormatForColumn")).isTrue();
    JsonNode formatNode = actualObj.get("stringFormatForColumn");
    Assertions.assertThat(formatNode.get("a").get("minDecimals").asInt()).isEqualTo(1);
    Assertions.assertThat(formatNode.get("b").get("humanFriendly").asBoolean()).isTrue();
    Assertions.assertThat(formatNode.get("c").get("unit").asText()).isEqualTo("DAYS");
    Assertions.assertThat(formatNode.get("d").get("humanFriendly").asBoolean()).isTrue();
  }

  @Test
  public void serializeRendererForType_resultJsonHasRendererForType() throws IOException{
    //given
    tableDisplay.setRendererForType(ColumnType.Boolean, TableDisplayCellRenderer.getDataBarsRenderer());
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("rendererForType")).isTrue();
    Assertions.assertThat(actualObj.get("rendererForType").has("Boolean")).isTrue();
  }

  @Test
  public void serializeRendererForColumn_resultJsonHasRendererForColumn() throws IOException{
    //given
    tableDisplay.setRendererForColumn("a", TableDisplayCellRenderer.getDataBarsRenderer(true));
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("rendererForColumn")).isTrue();
    Assertions.assertThat(actualObj.get("rendererForColumn").has("a")).isTrue();
  }

  @Test
  public void serializeAlignmentForType_resultJsonHasAlignmentForType() throws IOException{
    //given
    tableDisplay.setAlignmentProviderForType(ColumnType.Double, TableDisplayAlignmentProvider.LEFT_ALIGNMENT);
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("alignmentForType")).isTrue();
    Assertions.assertThat(actualObj.get("alignmentForType").has("Double")).isTrue();
  }

  @Test
  public void serializeAlignmentForColumn_resultJsonHasAlignmentForColumn() throws IOException{
    //given
    tableDisplay.setAlignmentProviderForColumn("a", TableDisplayAlignmentProvider.RIGHT_ALIGNMENT);
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("alignmentForColumn")).isTrue();
    Assertions.assertThat(actualObj.get("alignmentForColumn").has("a")).isTrue();
  }

  @Test
  public void serializeColumnFrozen_resultJsonHasColumnFrozen() throws IOException{
    //given
    tableDisplay.setColumnFrozen("a", true);
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("columnsFrozen")).isTrue();
    Assertions.assertThat(actualObj.get("columnsFrozen").has("a")).isTrue();
  }

  @Test
  public void serializeColumnFrozenRight_resultJsonHasColumnFrozenRight() throws IOException{
    //given
    tableDisplay.setColumnFrozenRight("a", true);
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("columnsFrozenRight")).isTrue();
    Assertions.assertThat(actualObj.get("columnsFrozenRight").has("a")).isTrue();
  }

  @Test
  public void serializeColumnsVisible_resultJsonHasColumnsVisible() throws IOException{
    //given
    tableDisplay.setColumnVisible("a", true);
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("columnsVisible")).isTrue();
    Assertions.assertThat(actualObj.get("columnsVisible").has("a")).isTrue();
  }

  @Test
  public void serializeColumnOrder_resultJsonHasColumnOrder() throws IOException{
    //given
    tableDisplay.setColumnOrder(Arrays.asList("col1", "col2"));
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat((ArrayNode) actualObj.get("columnOrder")).isNotEmpty();
  }

  @Test
  public void serializeCellHighlighter_resultJsonHasCellHighlighter() throws IOException{
    //given
    tableDisplay.addCellHighlighter(TableDisplayCellHighlighter.getUniqueEntriesHighlighter("a"));
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat((ArrayNode) actualObj.get("cellHighlighters")).isNotEmpty();
  }

  @Test
  public void serializeTableDisplayCellHighlighter_resultJsonHasTableDisplayCellHighlighterData() throws IOException{
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
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("cellHighlighters")).isTrue();
    ArrayNode node = (ArrayNode)actualObj.get("cellHighlighters");
    Assertions.assertThat(node.get(0).get("colName").asText()).isEqualTo("a");
    Assertions.assertThat(node.get(1).get("style").asText()).isEqualTo("FULL_ROW");
    Assertions.assertThat(node.get(2).get("minVal").asInt()).isEqualTo(1);
    Assertions.assertThat(node.get(3).get("minColor").get("rgb").asInt()).isEqualTo(Color.BLACK.getRGB());
    Assertions.assertThat(node.get(4).get("maxVal").asInt()).isEqualTo(10);
    Assertions.assertThat(node.get(5).get("maxColor").get("rgb").asInt()).isEqualTo(Color.BLUE.getRGB());
    Assertions.assertThat(node.get(6).get("colName").asText()).isEqualTo("g");
    Assertions.assertThat(node.get(7).get("style").asText()).isEqualTo("FULL_ROW");
  }

  @Test
  public void serializeTooltips_resultJsonHasTooltips() throws IOException{
    //given
    tableDisplay.setToolTip(new EmptyClosureTest(3));
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("tooltips")).isTrue();
    Assertions.assertThat((ArrayNode) actualObj.get("tooltips")).isNotEmpty();
  }

  @Test
  public void serializeDataFontSize_resultJsonHasDataFontSize() throws IOException{
    //given
    tableDisplay.setDataFontSize(10);
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("dataFontSize")).isTrue();
    Assertions.assertThat(actualObj.get("dataFontSize").asInt()).isEqualTo(10);
  }

  @Test
  public void serializeHeaderFontSize_resultJsonHasHeaderFontSize() throws IOException{
    //given
    tableDisplay.setHeaderFontSize(10);
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("headerFontSize")).isTrue();
    Assertions.assertThat(actualObj.get("headerFontSize").asInt()).isEqualTo(10);
  }

  @Test
  public void serializeFontColor_resultJsonHasFontColor() throws IOException{
    //given
    tableDisplay.setFontColorProvider(new EmptyClosureTest(3));
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("fontColor")).isTrue();
    Assertions.assertThat((ArrayNode)actualObj.get("fontColor")).isNotEmpty();
  }

  @Test
  public void serializeFilteredValues_resultJsonHasFilteredValues() throws IOException{
    //given
    tableDisplay.setRowFilter(new EmptyClosureTest(2));
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("filteredValues")).isTrue();
    Assertions.assertThat((ArrayNode)actualObj.get("filteredValues")).isNotEmpty();
  }

  @Test
  public void serializeHeadersVertical_resultJsonHasHeadersVertical() throws IOException{
    //given
    tableDisplay.setHeadersVertical(true);
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("headersVertical")).isTrue();
  }

  @Test
  public void serializeTableDisplay_resultJsonHasValues() throws IOException{
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.has("values")).isTrue();
    Assertions.assertThat((ArrayNode)actualObj.get("values")).isNotEmpty();
  }

  private JsonNode serializeTableDisplay() throws IOException{
    tableDisplaySerializer.serialize(tableDisplay, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    return mapper.readTree(sw.toString());
  }

  private class EmptyClosureTest extends ClosureTest {
    int num;

    public EmptyClosureTest(int num){
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
