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

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.table.highlight.HeatmapHighlighter;
import com.twosigma.beakerx.table.highlight.HighlightStyle;
import com.twosigma.beakerx.table.highlight.TableDisplayCellHighlighter;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;

public class HeatmapHighlighterSerializerTest {
  private JsonGenerator jgen;
  private StringWriter sw;
  private static ObjectMapper mapper;
  private static HeatmapHighlighterSerializer serializer;

  @BeforeClass
  public static void setUpClass() {
    mapper = new ObjectMapper();
    serializer = new HeatmapHighlighterSerializer();
  }

  @Before
  public void setUp() throws Exception {
    KernelManager.register(new KernelTest());
    sw = new StringWriter();
    jgen = mapper.getFactory().createGenerator(sw);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void serializeHeatmapHighlighter_resultJsonHasHeatmapHighlighterType() throws IOException {
    //given
    HeatmapHighlighter heatmapHighlighter =
        (HeatmapHighlighter) TableDisplayCellHighlighter.getHeatmapHighlighter("a");
    //when
    JsonNode actualObj = serializeHeatmapHighlighter(heatmapHighlighter);
    //then
    Assertions.assertThat(actualObj.has("type")).isTrue();
    Assertions.assertThat(actualObj.get("type").asText()).isEqualTo("HeatmapHighlighter");
  }

  @Test
  public void serializeColumnName_resultJsonHasColumnName() throws IOException {
    //given
    HeatmapHighlighter heatmapHighlighter =
        (HeatmapHighlighter) TableDisplayCellHighlighter.getHeatmapHighlighter("a");
    //when
    JsonNode actualObj = serializeHeatmapHighlighter(heatmapHighlighter);
    //then
    Assertions.assertThat(actualObj.has("colName")).isTrue();
    Assertions.assertThat(actualObj.get("colName").asText()).isEqualTo("a");
  }

  @Test
  public void serializeStyle_resultJsonHasStyle() throws IOException {
    //given
    HeatmapHighlighter heatmapHighlighter =
        (HeatmapHighlighter) TableDisplayCellHighlighter.getHeatmapHighlighter(
            "a", HighlightStyle.FULL_ROW);
    //when
    JsonNode actualObj = serializeHeatmapHighlighter(heatmapHighlighter);
    //then
    Assertions.assertThat(actualObj.has("style")).isTrue();
    Assertions.assertThat(actualObj.get("style").asText()).isEqualTo("FULL_ROW");
  }
  @Test
  public void serializeMinValue_resultJsonHasMinValue() throws IOException {
    //given
    HeatmapHighlighter heatmapHighlighter =
        (HeatmapHighlighter) TableDisplayCellHighlighter.getHeatmapHighlighter("a", 1, 10);
    //when
    JsonNode actualObj = serializeHeatmapHighlighter(heatmapHighlighter);
    //then
    Assertions.assertThat(actualObj.has("minVal")).isTrue();
    Assertions.assertThat(actualObj.get("minVal").asInt()).isEqualTo(1);
  }
  @Test
  public void serializeMaxValue_resultJsonHasMaxValue() throws IOException {
    //given
    HeatmapHighlighter heatmapHighlighter =
        (HeatmapHighlighter) TableDisplayCellHighlighter.getHeatmapHighlighter("a", 1, 10);
    //when
    JsonNode actualObj = serializeHeatmapHighlighter(heatmapHighlighter);
    //then
    Assertions.assertThat(actualObj.has("maxVal")).isTrue();
    Assertions.assertThat(actualObj.get("maxVal").asInt()).isEqualTo(10);
  }
  @Test
  public void serializeMinColor_resultJsonHasMinColor() throws IOException {
    //given
    HeatmapHighlighter heatmapHighlighter =
        (HeatmapHighlighter) TableDisplayCellHighlighter.getHeatmapHighlighter(
            "a", 1, 10, Color.BLACK, Color.BLUE);
    //when
    JsonNode actualObj = serializeHeatmapHighlighter(heatmapHighlighter);
    //then
    Assertions.assertThat(actualObj.has("minColor")).isTrue();
    Assertions.assertThat(actualObj.get("minColor").get("rgb").asInt())
        .isEqualTo(Color.BLACK.getRGB());
  }
  @Test
  public void serializeMaxColor_resultJsonHasMaxColor() throws IOException {
    //given
    HeatmapHighlighter heatmapHighlighter =
        (HeatmapHighlighter) TableDisplayCellHighlighter.getHeatmapHighlighter(
            "a", 1, 10, Color.BLACK, Color.BLUE);
    //when
    JsonNode actualObj = serializeHeatmapHighlighter(heatmapHighlighter);
    //then
    Assertions.assertThat(actualObj.has("maxColor")).isTrue();
    Assertions.assertThat(actualObj.get("maxColor").get("rgb").asInt())
        .isEqualTo(Color.BLUE.getRGB());
  }

  private JsonNode serializeHeatmapHighlighter(HeatmapHighlighter heatmapHighlighter) throws IOException {
    serializer.serialize(heatmapHighlighter, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    return mapper.readTree(sw.toString());
  }
}
