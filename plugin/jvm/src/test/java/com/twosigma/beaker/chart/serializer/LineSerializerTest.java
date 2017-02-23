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
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.Filter;
import com.twosigma.beaker.chart.xychart.plotitem.Line;
import com.twosigma.beaker.chart.xychart.plotitem.StrokeType;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;

public class LineSerializerTest {

  static ObjectMapper mapper;
  static LineSerializer lineSerializer;
  JsonGenerator jgen;
  StringWriter sw;

  @BeforeClass
  public static void initClassStubData() {
    mapper = new ObjectMapper();
    lineSerializer = new LineSerializer();
  }

  @Before
  public void initTestStubData() throws IOException {
    sw = new StringWriter();
    jgen = mapper.getJsonFactory().createJsonGenerator(sw);
  }

  @Test
  public void serializeWidthLine_resultJsonHasWidth() throws IOException {
    //when
    Line line = new Line();
    line.setWidth(1f);
    lineSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("width")).isTrue();
    Assertions.assertThat(actualObj.get("width").asDouble()).isEqualTo(1.0);
  }

  @Test
  public void serializeColorLine_resultJsonHasColor() throws IOException {
    //when
    Line line = new Line();
    line.setColor(Color.GREEN);
    lineSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("color")).isTrue();
    Assertions.assertThat(actualObj.get("color").get("rgb").asInt())
        .isEqualTo(Color.GREEN.getRGB());
  }

  @Test
  public void serializeStrokeTypeLine_resultJsonHasStyle() throws IOException {
    //when
    Line line = new Line();
    line.setStyle(StrokeType.SOLID);
    lineSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("style")).isTrue();
    Assertions.assertThat(actualObj.get("style").asText()).isEqualTo("SOLID");
  }

  @Test
  public void serializeInterpolationLine_resultJsonHasInterpolation() throws IOException {
    //when
    Line line = new Line();
    line.setInterpolation(1);
    lineSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("interpolation")).isTrue();
    Assertions.assertThat(actualObj.get("interpolation").asInt()).isEqualTo(1);
  }

  @Test
  public void serializeLodFilterLine_resultJsonHasLodFilter() throws IOException {
    Line line = new Line();
    line.setLodFilter(Filter.LINE);
    lineSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("lod_filter")).isTrue();
    Assertions.assertThat(actualObj.get("lod_filter").asText()).isEqualTo("line");
  }
}
