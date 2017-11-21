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

package com.twosigma.beakerx.chart.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import com.twosigma.beakerx.chart.Color;
import net.sf.jtreemap.swing.DefaultValue;
import net.sf.jtreemap.swing.TreeMapNode;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

public class TreeMapNodeSerializerTest {

  static ObjectMapper mapper;
  static TreeMapNodeSerializer treeMapNodeSerializer;
  JsonGenerator jgen;
  StringWriter sw;
  Map<String, Object> values;

  @BeforeClass
  public static void initClassStubData() {
    mapper = new ObjectMapper();
    mapper.disable(MapperFeature.AUTO_DETECT_GETTERS);
    mapper.disable(MapperFeature.AUTO_DETECT_IS_GETTERS);
    mapper.disable(MapperFeature.AUTO_DETECT_FIELDS);
    mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
    treeMapNodeSerializer = new TreeMapNodeSerializer();
  }

  @Before
  public void initTestStubData() throws IOException {
    sw = new StringWriter();
    jgen = mapper.getJsonFactory().createJsonGenerator(sw);
    values = new HashMap<>();
    values.put("label", "some label");
    values.put("color", Color.GREEN);
    values.put("tooltip", "some tooltip");
  }

  @Test
  public void serializeTreeMapNode_resultJsonHasType() throws IOException {
    //when
    TreeMapNode treeMapNode = new TreeMapNode("label") {};
    treeMapNodeSerializer.serialize(treeMapNode, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("type")).isTrue();
    Assertions.assertThat(actualObj.get("type").asText()).isEqualTo("TreeMapNode");
  }

  @Test
  public void serializeWeightOfTreeMapNode_resultJsonHasWeight() throws IOException {
    //when
    TreeMapNode treeMapNode = new TreeMapNode("label");
    treeMapNode.setWeight(0.5);
    treeMapNodeSerializer.serialize(treeMapNode, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("weight")).isTrue();
    Assertions.assertThat(actualObj.get("weight").asDouble()).isEqualTo(0.5);
  }

  @Test
  public void serializeDoubleValueOfTreeMapNode_resultJsonHasDoubleValue() throws IOException {
    //when
    TreeMapNode treeMapNode = new TreeMapNode("010", 1, new DefaultValue(1.5));
    treeMapNode.setUserObject(values);
    treeMapNodeSerializer.serialize(treeMapNode, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("doubleValue")).isTrue();
    Assertions.assertThat(actualObj.get("doubleValue").asDouble()).isEqualTo(1.5);
  }

  @Test
  public void serializeLabelValueOfTreeMapNode_resultJsonHasLabelValue() throws IOException {
    //when
    TreeMapNode treeMapNode = new TreeMapNode("010", 1, new DefaultValue(1.5));
    treeMapNode.setUserObject(values);
    treeMapNodeSerializer.serialize(treeMapNode, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("labelValue")).isTrue();
    Assertions.assertThat(actualObj.get("labelValue").asText()).isEqualTo("1.5");
  }

  @Test
  public void serializeLabelOfTreeMapNode_resultJsonHasLabel() throws IOException {
    //when
    TreeMapNode treeMapNode = new TreeMapNode("010", 1, new DefaultValue(1.5));
    treeMapNode.setUserObject(values);
    treeMapNodeSerializer.serialize(treeMapNode, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("label")).isTrue();
    Assertions.assertThat(actualObj.get("label").asText()).isEqualTo("some label");
  }

  @Test
  public void serializeColorOfTreeMapNode_resultJsonHasColor() throws IOException {
    //when
    TreeMapNode treeMapNode = new TreeMapNode("010", 1, new DefaultValue(1.5));
    treeMapNode.setUserObject(values);
    treeMapNodeSerializer.serialize(treeMapNode, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("color")).isTrue();
  }

  @Test
  public void serializeTooltipOfTreeMapNode_resultJsonHasTooltip() throws IOException {
    //when
    TreeMapNode treeMapNode = new TreeMapNode("010", 1, new DefaultValue(1.5));
    treeMapNode.setUserObject(values);
    treeMapNodeSerializer.serialize(treeMapNode, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("tooltip")).isTrue();
    Assertions.assertThat(actualObj.get("tooltip").asText()).isEqualTo("some tooltip");
  }

  @Test
  public void serializeChildrenOfTreeMapNode_resultJsonHasChildren() throws IOException {
    //when
    TreeMapNode treeMapNodeRoot = new TreeMapNode("001");
    treeMapNodeRoot.add(new TreeMapNode("010", 1, new DefaultValue(1.5)));
    treeMapNodeRoot.add(new TreeMapNode("020", 2, new DefaultValue(2.5)));
    treeMapNodeSerializer.serialize(treeMapNodeRoot, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("children")).isTrue();
    Assertions.assertThat(actualObj.get("children")).isNotEmpty();
  }
}
