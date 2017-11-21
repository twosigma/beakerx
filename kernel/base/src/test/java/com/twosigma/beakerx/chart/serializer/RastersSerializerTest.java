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

package com.twosigma.beakerx.chart.serializer;

import com.fasterxml.jackson.databind.JsonNode;
import com.twosigma.beakerx.ResourceLoaderTest;
import com.twosigma.beakerx.chart.xychart.plotitem.Rasters;
import com.twosigma.beakerx.jvm.serialization.SerializationTestHelper;
import java.util.Collections;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.util.Arrays;

public class RastersSerializerTest {

  private Rasters rasters;
  private static RastersSerializer serializer;
  private static SerializationTestHelper<RastersSerializer, Rasters> helper;

  @BeforeClass
  public static void setUpClass() throws IOException {
    serializer = new RastersSerializer();
    helper = new SerializationTestHelper<>(serializer);
  }

  @Before
  public void setUp() throws Exception {
    rasters = new Rasters() {};
    List<Number> value = Collections.singletonList(1);
    rasters.setY(value);
    rasters.setWidth(value);
    rasters.setHeight(value);
    rasters.setOpacity(Arrays.asList(1, 1));
  }

  @Test
  public void serialize_resultJsonHasType() throws IOException {
    //when
    JsonNode actualObj = helper.serializeObject(rasters);
    //then
    Assertions.assertThat(actualObj.get("type").asText()).isEqualTo("Rasters");
  }

  @Test
  public void serializeX_resultJsonHasX() throws IOException {
    //given
    rasters.setX(Arrays.asList(1, 2));
    //when
    JsonNode actualObj = helper.serializeObject(rasters);
    //then
    Assertions.assertThat(actualObj.has("x")).isTrue();
  }

  @Test
  public void serializeY_resultJsonHasY() throws IOException {
    //given
    rasters.setY(Arrays.asList(1, 2));
    //when
    JsonNode actualObj = helper.serializeObject(rasters);
    //then
    Assertions.assertThat(actualObj.has("y")).isTrue();
  }

  @Test
  public void serializeVisible_resultJsonHasVisible() throws IOException {
    //given
    rasters.setVisible(true);
    //when
    JsonNode actualObj = helper.serializeObject(rasters);
    //then
    Assertions.assertThat(actualObj.has("visible")).isTrue();
  }

  @Test
  public void serializeYAxis_resultJsonHasYAxis() throws IOException {
    //given
    rasters.setYAxis("test");
    //when
    JsonNode actualObj = helper.serializeObject(rasters);
    //then
    Assertions.assertThat(actualObj.has("yAxis")).isTrue();
  }

  @Test
  public void serializePosition_resultJsonHasPosition() throws IOException {
    //given
    rasters.setPosition("test");
    //when
    JsonNode actualObj = helper.serializeObject(rasters);
    //then
    Assertions.assertThat(actualObj.has("position")).isTrue();
  }

  @Test
  public void serializeWidth_resultJsonHasWidth() throws IOException {
    //given
    rasters.setWidth(Arrays.asList(100, 200));
    //when
    JsonNode actualObj = helper.serializeObject(rasters);
    //then
    Assertions.assertThat(actualObj.has("width")).isTrue();
  }

  @Test
  public void serializeHeight_resultJsonHasHeight() throws IOException {
    //given
    rasters.setHeight(Arrays.asList(100, 200));
    //when
    JsonNode actualObj = helper.serializeObject(rasters);
    //then
    Assertions.assertThat(actualObj.has("height")).isTrue();
  }

  @Test
  public void serializeDataString_resultJsonHasValue() throws Exception {
    //given
    rasters.setDataString("test".getBytes());
    //when
    JsonNode actualObj = helper.serializeObject(rasters);
    //then
    Assertions.assertThat(actualObj.has("value")).isTrue();
  }

  @Test
  public void serializeDataWithFilePath_resultJsonHasValue() throws Exception {
    //given
    rasters.setFilePath(ResourceLoaderTest.getOsAppropriatePath("logo.png", ResourceLoaderTest.class));
    //when
    JsonNode actualObj = helper.serializeObject(rasters);
    //then
    Assertions.assertThat(actualObj.has("value")).isTrue();
  }

  @Test
  public void serializeDataWithFileUrl_resultJsonHasValue() throws Exception {
    //given
    rasters.setFileUrl("url");
    //when
    JsonNode actualObj = helper.serializeObject(rasters);
    //then
    Assertions.assertThat(actualObj.has("value")).isTrue();
  }

}
