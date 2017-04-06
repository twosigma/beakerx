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
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.table.ColumnType;
import com.twosigma.beaker.table.ObservableTableDisplayTest;
import com.twosigma.beaker.table.TableDisplay;
import com.twosigma.beaker.table.format.TableDisplayStringFormat;
import com.twosigma.beaker.table.renderer.TableDisplayCellRenderer;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;
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
    Assertions.assertThat(actualObj.get("stringFormatForTimes").asText()).isEqualTo(TimeUnit.DAYS.toString());
  }

  @Test
  public void serializeStringFormatForType_resultJsonHasStringFormatForType() throws IOException{
    //given
    tableDisplay.setStringFormatForType(ColumnType.Double, TableDisplayStringFormat.getDecimalFormat(1, 1));
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.get("stringFormatForType").has("Double")).isTrue();
  }

  @Test
  public void serializeStringFormatForColumn_resultJsonHasStringFormatForColumn() throws IOException{
    //given
    tableDisplay.setStringFormatForColumn("a", TableDisplayStringFormat.getDecimalFormat(1, 1));
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
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
    Assertions.assertThat(actualObj.get("rendererForType").has("Boolean")).isTrue();
  }

  @Test
  public void serializeRendererForColumn_resultJsonHasRendererForColumn() throws IOException{
    //given
    tableDisplay.setRendererForColumn("a", TableDisplayCellRenderer.getDataBarsRenderer(true));
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.get("rendererForColumn").has("a")).isTrue();
  }

  private JsonNode serializeTableDisplay() throws IOException{
    tableDisplaySerializer.serialize(tableDisplay, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    return mapper.readTree(sw.toString());
  }

}
