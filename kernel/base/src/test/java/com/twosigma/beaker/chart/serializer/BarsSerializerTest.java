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

package com.twosigma.beaker.chart.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.xychart.plotitem.Bars;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Arrays;

public class BarsSerializerTest {

  static ObjectMapper mapper;
  static BarsSerializer barsSerializer;
  JsonGenerator jgen;
  StringWriter sw;

  @BeforeClass
  public static void initClassStubData() {
    mapper = new ObjectMapper();
    barsSerializer = new BarsSerializer();
  }

  @Before
  public void initTestStubData() throws IOException {
    sw = new StringWriter();
    jgen = mapper.getJsonFactory().createJsonGenerator(sw);
  }

  @Test
  public void serializeWidthBars_resultJsonHasWidth() throws IOException {
    //when
    Bars bars = new Bars();
    bars.setWidth(11);
    barsSerializer.serialize(bars, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("width")).isTrue();
    Assertions.assertThat(actualObj.get("width").asInt()).isEqualTo(11);
  }

  @Test
  public void serializeWidthsBars_resultJsonHasWidths() throws IOException {
    //when
    Bars bars = new Bars();
    bars.setWidth(Arrays.asList(11, 22, 33));
    barsSerializer.serialize(bars, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("widths")).isTrue();
    ArrayNode arrayNode = (ArrayNode) actualObj.get("widths");
    Assertions.assertThat(arrayNode.get(1).asInt()).isEqualTo(22);
  }

  @Test
  public void serializeColorBars_resultJsonHasColor() throws IOException {
    //when
    Bars bars = new Bars();
    bars.setColor(Color.GREEN);
    barsSerializer.serialize(bars, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("color")).isTrue();
    Assertions.assertThat(actualObj.get("color").get("rgb").asInt())
        .isEqualTo(Color.GREEN.getRGB());
  }

  @Test
  public void serializeColorsBars_resultJsonHasColors() throws IOException {
    //when
    Bars bars = new Bars();
    bars.setColor(Arrays.asList(Color.BLUE, Color.GREEN, Color.BLACK));
    barsSerializer.serialize(bars, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("colors")).isTrue();
    ArrayNode arrayNode = (ArrayNode) actualObj.get("colors");
    Assertions.assertThat(arrayNode.get(1).get("rgb").asInt()).isEqualTo(Color.GREEN.getRGB());
  }

  @Test
  public void serializeOutlineColorBars_resultJsonHasOutlineColor() throws IOException {
    //when
    Bars bars = new Bars();
    bars.setOutlineColor(Color.GREEN);
    barsSerializer.serialize(bars, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("outline_color")).isTrue();
    Assertions.assertThat(actualObj.get("outline_color").get("rgb").asInt())
        .isEqualTo(Color.GREEN.getRGB());
  }

  @Test
  public void serializeOutlineColorsBars_resultJsonHasOutlineColors() throws IOException {
    //when
    Bars bars = new Bars();
    bars.setOutlineColor(Arrays.asList(Color.BLUE, Color.GREEN, Color.BLACK));
    barsSerializer.serialize(bars, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("outline_colors")).isTrue();
    ArrayNode arrayNode = (ArrayNode) actualObj.get("outline_colors");
    Assertions.assertThat(arrayNode.get(1).get("rgb").asInt()).isEqualTo(Color.GREEN.getRGB());
  }
}
