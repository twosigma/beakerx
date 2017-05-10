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
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import com.twosigma.beaker.chart.treemap.Mode;
import com.twosigma.beaker.chart.treemap.TreeMap;
import com.twosigma.beaker.chart.treemap.ValueAccessor;
import net.sf.jtreemap.swing.DefaultValue;
import net.sf.jtreemap.swing.TreeMapNode;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;

public class TreeMapSerializerTest {
//  static ObjectMapper mapper;
//  static TreeMapSerializer treeMapSerializer;
//  JsonGenerator jgen;
//  StringWriter sw;
//  TreeMap treeMap;
//
//  @BeforeClass
//  public static void initClassStubData() {
//    mapper = new ObjectMapper();
//    mapper.disable(MapperFeature.AUTO_DETECT_GETTERS);
//    mapper.disable(MapperFeature.AUTO_DETECT_IS_GETTERS);
//    mapper.disable(MapperFeature.AUTO_DETECT_FIELDS);
//    mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
//    treeMapSerializer = new TreeMapSerializer();
//  }
//
//  @Before
//  public void initTestStubData() throws IOException {
//    sw = new StringWriter();
//    jgen = mapper.getJsonFactory().createJsonGenerator(sw);
//    treeMap = new TreeMap(new TreeMapNode("label", 1, new DefaultValue(1.5)));
//  }
//
//  @Test
//  public void serializeGraphicsListOfTreeMap_resultJsonHasGraphicsList() throws IOException {
//    //when
//    treeMapSerializer.serialize(treeMap, jgen, new DefaultSerializerProvider.Impl());
//    jgen.flush();
//    //then
//    JsonNode actualObj = mapper.readTree(sw.toString());
//    Assertions.assertThat(actualObj.has("graphics_list")).isTrue();
//  }
//
//  @Test
//  public void serializeModeOfTreeMap_resultJsonHasMode() throws IOException {
//    //when
//    treeMap.setMode(Mode.DICE);
//    treeMapSerializer.serialize(treeMap, jgen, new DefaultSerializerProvider.Impl());
//    jgen.flush();
//    //then
//    JsonNode actualObj = mapper.readTree(sw.toString());
//    Assertions.assertThat(actualObj.has("mode")).isTrue();
//    Assertions.assertThat(actualObj.get("mode").asText()).isNotEmpty();
//  }
//
//  @Test
//  public void serializeStickyOfTreeMap_resultJsonHasSticky() throws IOException {
//    //when
//    treeMap.setSticky(true);
//    treeMapSerializer.serialize(treeMap, jgen, new DefaultSerializerProvider.Impl());
//    jgen.flush();
//    //then
//    JsonNode actualObj = mapper.readTree(sw.toString());
//    Assertions.assertThat(actualObj.has("sticky")).isTrue();
//    Assertions.assertThat(actualObj.get("sticky").asBoolean()).isTrue();
//  }
//
//  @Test
//  public void serializeRatioOfTreeMap_resultJsonHasRatio() throws IOException {
//    //when
//    treeMap.setRatio(2.0);
//    treeMapSerializer.serialize(treeMap, jgen, new DefaultSerializerProvider.Impl());
//    jgen.flush();
//    //then
//    JsonNode actualObj = mapper.readTree(sw.toString());
//    Assertions.assertThat(actualObj.has("ratio")).isTrue();
//    Assertions.assertThat(actualObj.get("ratio").asDouble()).isEqualTo(2.0);
//  }
//
//  @Test
//  public void serializeRoundOfTreeMap_resultJsonHasRound() throws IOException {
//    //when
//    treeMap.setRound(true);
//    treeMapSerializer.serialize(treeMap, jgen, new DefaultSerializerProvider.Impl());
//    jgen.flush();
//    //then
//    JsonNode actualObj = mapper.readTree(sw.toString());
//    Assertions.assertThat(actualObj.has("round")).isTrue();
//    Assertions.assertThat(actualObj.get("round").asBoolean()).isTrue();
//  }
//
//  @Test
//  public void serializeValueAccessorOfTreeMap_resultJsonHasValueAccessor() throws IOException {
//    //when
//    treeMap.setValueAccessor(ValueAccessor.WEIGHT);
//    treeMapSerializer.serialize(treeMap, jgen, new DefaultSerializerProvider.Impl());
//    jgen.flush();
//    //then
//    JsonNode actualObj = mapper.readTree(sw.toString());
//    Assertions.assertThat(actualObj.has("valueAccessor")).isTrue();
//    Assertions.assertThat(actualObj.get("valueAccessor").asText()).isNotEmpty();
//  }
}
