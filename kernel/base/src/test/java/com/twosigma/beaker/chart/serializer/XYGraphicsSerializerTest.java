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
import com.twosigma.beaker.chart.Filter;
import com.twosigma.beaker.chart.xychart.NanoPlot;
import com.twosigma.beaker.chart.xychart.plotitem.Line;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;
import java.math.BigInteger;
import java.util.Arrays;

public class XYGraphicsSerializerTest {

  static ObjectMapper mapper;
  static XYGraphicsSerializer xyGraphicsSerializer;
  JsonGenerator jgen;
  StringWriter sw;
  Line line;

  @BeforeClass
  public static void initClassStubData() {
    mapper = new ObjectMapper();
    xyGraphicsSerializer = new LineSerializer();
  }

  @Before
  public void initTestStubData() throws IOException {
    sw = new StringWriter();
    jgen = mapper.getJsonFactory().createJsonGenerator(sw);
    line = new Line();
    line.setX(Arrays.asList(1, 2, 3));
    line.setY(Arrays.asList(1, 2, 3));
  }

  @Test
  public void serializeXOfXYGraphicsLine_resultJsonHasX() throws IOException {
    //when
    line.setX(Arrays.asList(1, 2, 3));
    xyGraphicsSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("x")).isTrue();
    Assertions.assertThat(actualObj.get("x")).isNotEmpty();
  }

  @Test
  public void serializeBigIntXWithNanoPlotType_resultJsonHasStringX() throws IOException {
    //when
    line.setX(
        Arrays.asList(
            new BigInteger("12345678901234567891000"), new BigInteger("12345678901234567891000")));
    line.setPlotType(NanoPlot.class);
    xyGraphicsSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("x")).isTrue();
    ArrayNode arrayNode = (ArrayNode) actualObj.get("x");
    Assertions.assertThat(arrayNode.get(1).isTextual()).isTrue();
  }

  @Test
  public void serializeYOfXYGraphicsLine_resultJsonHasY() throws IOException {
    //when
    line.setY(Arrays.asList(1, 2, 3));
    xyGraphicsSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("y")).isTrue();
    Assertions.assertThat(actualObj.get("y")).isNotEmpty();
  }

  @Test
  public void serializeDisplayNameOfXYGraphicsLine_resultJsonHasDisplayName() throws IOException {
    //when
    line.setDisplayName("some display name");
    xyGraphicsSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("display_name")).isTrue();
    Assertions.assertThat(actualObj.get("display_name").asText()).isEqualTo("some display name");
  }

  @Test
  public void serializeLodFilterOfXYGraphicsLine_resultJsonHasLodFilter() throws IOException {
    //when
    line.setLodFilter(Filter.LINE);
    xyGraphicsSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("lod_filter")).isTrue();
    Assertions.assertThat(actualObj.get("lod_filter").asText()).isEqualTo("line");
  }

  @Test
  public void serializeTooltipsOfXYGraphicsLine_resultJsonHastooltips() throws IOException {
    //when
    line.setToolTip(Arrays.asList("one", "two"));
    xyGraphicsSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("tooltips")).isTrue();
    ArrayNode arrayNode = (ArrayNode) actualObj.get("tooltips");
    Assertions.assertThat(arrayNode.get(1).asText()).isEqualTo("two");
  }
}
