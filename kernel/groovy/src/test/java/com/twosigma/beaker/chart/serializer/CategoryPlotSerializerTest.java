/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
import com.twosigma.beaker.chart.categoryplot.CategoryPlot;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryBars;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryPoints;
import com.twosigma.beaker.chart.xychart.plotitem.PlotOrientationType;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.widgets.GroovyKernelTest;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Arrays;

public class CategoryPlotSerializerTest {

  static ObjectMapper mapper;
  static CategoryPlotSerializer categoryPlotSerializer;
  JsonGenerator jgen;
  StringWriter sw;

  @BeforeClass
  public static void initClassStubData() {
    mapper = new ObjectMapper();
    categoryPlotSerializer = new CategoryPlotSerializer();
  }

  @Before
  public void initTestStubData() throws IOException {
    sw = new StringWriter();
    jgen = mapper.getJsonFactory().createJsonGenerator(sw);
    KernelManager.register(new GroovyKernelTest());
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }


  @Test
  public void serializeCategoryNamesOfCategoryPlot_resultJsonHasCategoryNames() throws IOException {
    //when
    CategoryPlot categoryPlot = new CategoryPlot();
    categoryPlot.setCategoryNames(Arrays.asList("name1", "name2"));
    categoryPlotSerializer.serialize(categoryPlot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("categoryNames")).isTrue();
    ArrayNode arrayNode = (ArrayNode) actualObj.get("categoryNames");
    Assertions.assertThat(arrayNode.get(1).asText()).isEqualTo("name2");
  }

  @Test
  public void serializeGraphicsListCategoryPlot_resultJsonHasGraphicsList() throws IOException {
    //when
    CategoryPlot categoryPlot = new CategoryPlot();
    categoryPlot.add(Arrays.asList(new CategoryBars(), new CategoryPoints()));
    categoryPlotSerializer.serialize(categoryPlot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("graphics_list")).isTrue();
    ArrayNode arrayNode = (ArrayNode) actualObj.get("graphics_list");
    Assertions.assertThat(arrayNode.size()).isEqualTo(2);
  }

  @Test
  public void serializeOrientationCategoryPlot_resultJsonHasOrientation() throws IOException {
    //when
    CategoryPlot categoryPlot = new CategoryPlot();
    categoryPlot.setOrientation(PlotOrientationType.VERTICAL);
    categoryPlotSerializer.serialize(categoryPlot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("orientation")).isTrue();
    Assertions.assertThat(actualObj.get("orientation").asText()).isEqualTo("VERTICAL");
  }

  @Test
  public void serializeCategoryMarginOfCategoryPlot_resultJsonHasCategoryMargin()
      throws IOException {
    //when
    CategoryPlot categoryPlot = new CategoryPlot();
    categoryPlot.setCategoryMargin(0.5);
    categoryPlotSerializer.serialize(categoryPlot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("category_margin")).isTrue();
    Assertions.assertThat(actualObj.get("category_margin").asDouble()).isEqualTo(0.5);
  }

  @Test
  public void serializeCategoryNamesLabelAngleOfCategoryPlot_resultJsonHasCategoryNamesLabelAngle()
      throws IOException {
    //when
    CategoryPlot categoryPlot = new CategoryPlot();
    categoryPlot.setCategoryNamesLabelAngle(0.5);
    categoryPlotSerializer.serialize(categoryPlot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("categoryNamesLabelAngle")).isTrue();
    Assertions.assertThat(actualObj.get("categoryNamesLabelAngle").asDouble()).isEqualTo(0.5);
  }
}
