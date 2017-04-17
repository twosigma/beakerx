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

package com.twosigma.beaker.jvm.serialization;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beaker.table.ObservableTableDisplayTest;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class BasicObjectSerializerTest {
  private BasicObjectSerializer basicObjectSerializer;
  private SerializationTestHelper<TestSerializer, String> helper;
  private static JsonGenerator jgen;
  private static ObjectMapper mapper;

  @BeforeClass
  public static void setUpClass() throws Exception {
    mapper = new ObjectMapper();
    jgen = mapper.getFactory().createGenerator(new StringWriter());
  }

  @Before
  public void setUp() throws Exception {
    basicObjectSerializer = new BasicObjectSerializer();
    helper = new SerializationTestHelper<>(new TestSerializer());
  }

  @Test
  public void addTypeConversion_shouldConvertType() throws Exception {
    //given
    basicObjectSerializer.addTypeConversion("fromType", "toType");
    //when
    String typeName = basicObjectSerializer.convertType("fromType");
    //then
    Assertions.assertThat(typeName).isEqualTo("toType");
  }

  @Test
  public void addThreadSpecificTypeConversion_shouldConvertType() throws Exception {
    //given
    basicObjectSerializer.addThreadSpecificTypeConversion("fromType", "toType");
    //when
    String typeName =basicObjectSerializer.convertType("fromType");
    //then
    Assertions.assertThat(typeName).isEqualTo("toType");
  }

  @Test
  public void addTypeConversion_shouldAddType() throws Exception {
    //when
    basicObjectSerializer.addTypeConversion("fromType", "toType");
    //then
    boolean result = basicObjectSerializer.isPrimitiveType("fromType");
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void addThreadSpecificTypeConversion_shouldAddType() throws Exception {
    //when
    basicObjectSerializer.addThreadSpecificTypeConversion("fromType", "toType");
    //then
    boolean result = basicObjectSerializer.isPrimitiveType("fromType");
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void addKnownBeakerType_shouldAddBeakerType() throws Exception {
    //when
    basicObjectSerializer.addKnownBeakerType("testType");
    //then
    boolean result = basicObjectSerializer.isKnownBeakerType("testType");
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void addTypeSerializer_containsThatSerializer() throws Exception {
    //when
    basicObjectSerializer.addTypeSerializer(new TestObjectSerializer());
    //then
    boolean result = basicObjectSerializer.runConfiguredSerializers(new Object(), jgen, true);
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void addfTypeSerializer_containsThatSerializer() throws Exception {
    //when
    basicObjectSerializer.addfTypeSerializer(new TestObjectSerializer());
    //then
    boolean result = basicObjectSerializer.runConfiguredSerializers(new Object(), jgen, true);
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void addThreadSpecificTypeSerializer_containsThatSerializer() throws Exception {
    //when
    basicObjectSerializer.addThreadSpecificTypeSerializer(new TestObjectSerializer());
    //then
    boolean result = basicObjectSerializer.runThreadSerializers(new Object(), jgen, true);
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void addTypeDeserializer_containsThatDeserializer() throws Exception {
    //given
    JsonNode jsonNode = helper.serializeObject("test object");
    //when
    basicObjectSerializer.addTypeDeserializer(new TestObjectDeserializer());
    //then
    boolean result = (boolean) basicObjectSerializer.deserialize(jsonNode, new ObjectMapper());
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void addfTypeDeserializer_containsThatDeserializer() throws Exception {
    //given
    JsonNode jsonNode = helper.serializeObject("test object");
    //when
    basicObjectSerializer.addfTypeDeserializer(new TestObjectDeserializer());
    //then
    boolean result = (boolean) basicObjectSerializer.deserialize(jsonNode, new ObjectMapper());
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void addThreadSpecificTypeDeserializer_containsThatDeserializer() throws Exception {
    //given
    JsonNode jsonNode = helper.serializeObject("test object");
    //when
    basicObjectSerializer.addThreadSpecificTypeDeserializer(new TestObjectDeserializer());
    //then
    boolean result = (boolean) basicObjectSerializer.deserialize(jsonNode, new ObjectMapper());
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void isPrimitiveTypeMap_returnTrue() throws Exception {
    //given
    Map<String, String> map  =  new HashMap<String, String>(){
      { put("key", "value"); }
    };
    //when
    boolean result = basicObjectSerializer.isPrimitiveTypeMap(map);
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void isListOfPrimitiveTypeMaps_returnTrue() throws Exception {
    //when
    boolean result = basicObjectSerializer.isListOfPrimitiveTypeMaps(
        ObservableTableDisplayTest.getListOfMapsData());
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void isPrimitiveTypeListOfList_returnTrue() throws Exception {
    //when
    boolean result = basicObjectSerializer.isPrimitiveTypeListOfList(
        Arrays.asList(Arrays.asList("k1", 1), Arrays.asList("k2", 2)));
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void serializeMap_returnTrue() throws Exception {
    //given
    Map<String, String> map  =  new HashMap<String, String>(){
      { put("key", "value"); }
    };
    //when
    boolean result = basicObjectSerializer.writeObject(map, jgen, true);
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void serializeArray_returnTrue() throws Exception {
    //when
    boolean result = basicObjectSerializer.writeObject(
        Arrays.asList("v1", "v2"), jgen, true);
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void serializeListOfList_returnTrue() throws Exception {
    //when
    boolean result = basicObjectSerializer.writeObject(
        Arrays.asList(Arrays.asList("k1", 1), Arrays.asList("k2", 2)), jgen, true);
    //then
    Assertions.assertThat(result).isTrue();
  }

  private class TestObjectSerializer implements ObjectSerializer{
    @Override
    public boolean canBeUsed(Object obj, boolean expand) {
      return true;
    }

    @Override
    public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand)
        throws JsonProcessingException, IOException {
      return true;
    }
  }

  private class TestObjectDeserializer implements ObjectDeserializer{
    @Override
    public boolean canBeUsed(JsonNode n) {
      return true;
    }

    @Override
    public Object deserialize(JsonNode n, ObjectMapper mapper) {
      return true;
    }
  }

}
