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
import com.twosigma.beaker.chart.xychart.Plot;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantBand;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantLine;
import com.twosigma.beaker.chart.xychart.plotitem.Line;
import com.twosigma.beaker.chart.xychart.plotitem.Text;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Arrays;

public class XYChartSerializerTest {

  static ObjectMapper mapper;
  static XYChartSerializer xyChartSerializer;
  JsonGenerator jgen;
  StringWriter sw;
  Plot plot;

  @BeforeClass
  public static void initClassStubData() {
    mapper = new ObjectMapper();
    xyChartSerializer = new XYChartSerializer();
  }

  @Before
  public void initTestStubData() throws IOException {
    sw = new StringWriter();
    jgen = mapper.getJsonFactory().createJsonGenerator(sw);
    plot = new Plot();
  }

  @Test
  public void serializeGraphicsOfXYChartPlot_resultJsonHasGraphicsList() throws IOException {
    //given
    Line line = new Line();
    line.setX(Arrays.asList(1, 2, 3));
    line.setY(Arrays.asList(2, 3, 4));
    plot.add(line);
    //when
    xyChartSerializer.serialize(plot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("graphics_list")).isTrue();
    Assertions.assertThat(actualObj.get("graphics_list")).isNotEmpty();
  }

  @Test
  public void serializeConstantLinesOfXYChartPlot_resultJsonHasConstantLines() throws IOException {
    //given
    ConstantLine constantLine = new ConstantLine();
    plot.add(constantLine);
    //when
    xyChartSerializer.serialize(plot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("constant_lines")).isTrue();
    Assertions.assertThat(actualObj.get("constant_lines")).isNotEmpty();
  }

  @Test
  public void serializeConstantBandsOfXYChartPlot_resultJsonHasConstantBands() throws IOException {
    //given
    ConstantBand constantBand = new ConstantBand();
    plot.add(constantBand);
    //when
    xyChartSerializer.serialize(plot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("constant_bands")).isTrue();
    Assertions.assertThat(actualObj.get("constant_bands")).isNotEmpty();
  }

  @Test
  public void serializeTextsOfXYChartPlot_resultJsonHasTexts() throws IOException {
    //given
    plot.add(new Text());
    //when
    xyChartSerializer.serialize(plot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("texts")).isTrue();
    Assertions.assertThat(actualObj.get("texts")).isNotEmpty();
  }

  @Test
  public void serializeXAutoRangeOfXYChartPlot_resultJsonHasXAutoRange() throws IOException {
    //when
    plot.setXAutoRange(true);
    xyChartSerializer.serialize(plot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("x_auto_range")).isTrue();
    Assertions.assertThat(actualObj.get("x_auto_range").asBoolean()).isTrue();
  }

  @Test
  public void serializeXLowerBoundOfXYChartPlot_resultJsonHasXLowerBound() throws IOException {
    //when
    plot.setXBound(0.5, 1.5);
    xyChartSerializer.serialize(plot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("x_lower_bound")).isTrue();
    Assertions.assertThat(actualObj.get("x_lower_bound").asDouble()).isEqualTo(0.5);
  }

  @Test
  public void serializeXUpperBoundOfXYChartPlot_resultJsonHasXUpperBound() throws IOException {
    //when
    plot.setXBound(0.5, 1.5);
    xyChartSerializer.serialize(plot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("x_upper_bound")).isTrue();
    Assertions.assertThat(actualObj.get("x_upper_bound").asDouble()).isEqualTo(1.5);
  }

  @Test
  public void serializeLogXOfXYChartPlot_resultJsonHasLogX() throws IOException {
    //when
    plot.setLogX(true);
    xyChartSerializer.serialize(plot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("log_x")).isTrue();
    Assertions.assertThat(actualObj.get("log_x").asBoolean()).isTrue();
  }

  @Test
  public void serializeXLogBaseOfXYChartPlot_resultJsonHasXLogBase() throws IOException {
    //when
    plot.setxLogBase(1.5);
    xyChartSerializer.serialize(plot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("x_log_base")).isTrue();
    Assertions.assertThat(actualObj.get("x_log_base").asDouble()).isEqualTo(1.5);
  }

  @Test
  public void serializeLodThresholdOfXYChartPlot_resultJsonHasLodThreshold() throws IOException {
    //when
    plot.setLodThreshold(11);
    xyChartSerializer.serialize(plot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("lodThreshold")).isTrue();
    Assertions.assertThat(actualObj.get("lodThreshold").asInt()).isEqualTo(11);
  }

  @Test
  public void serializeXTickLabelsVisibleOfXYChartPlot_resultJsonHasXTickLabelsVisible()
      throws IOException {
    //when
    plot.setxTickLabelsVisible(true);
    xyChartSerializer.serialize(plot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("x_tickLabels_visible")).isTrue();
    Assertions.assertThat(actualObj.get("x_tickLabels_visible").asBoolean()).isTrue();
  }

  @Test
  public void serializeYTickLabelsVisibleOfXYChartPlot_resultJsonHasYTickLabelsVisible()
      throws IOException {
    //when
    plot.setyTickLabelsVisible(true);
    xyChartSerializer.serialize(plot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("y_tickLabels_visible")).isTrue();
    Assertions.assertThat(actualObj.get("y_tickLabels_visible").asBoolean()).isTrue();
  }
}
