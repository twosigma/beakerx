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
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import com.twosigma.beakerx.chart.actions.GraphicsActionListener;
import com.twosigma.beakerx.chart.actions.GraphicsActionObject;
import com.twosigma.beakerx.chart.xychart.plotitem.Line;
import java.util.Arrays;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;

public class GraphicsSerializerTest {

  static ObjectMapper mapper;
  static GraphicsSerializer graphicsSerializer;
  JsonGenerator jgen;
  StringWriter sw;
  Line line;

  @BeforeClass
  public static void initClassStubData() {
    mapper = new ObjectMapper();
    graphicsSerializer = new LineSerializer();
  }

  @Before
  public void initTestStubData() throws IOException {
    sw = new StringWriter();
    jgen = mapper.getJsonFactory().createJsonGenerator(sw);
    line = new Line() {};
    line.setX(Arrays.asList(1, 2, 3));
    line.setY(Arrays.asList(1, 2, 3));
  }

  @Test
  public void serializeLineGraphics_resultJsonHasType() throws IOException {
    //when
    graphicsSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("type")).isTrue();
    Assertions.assertThat(actualObj.get("type").asText()).isEqualTo("Line");
  }

  @Test
  public void serializeLineGraphics_resultJsonHasUid() throws IOException {
    //when
    graphicsSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("uid")).isTrue();
    Assertions.assertThat(actualObj.get("uid")).isNotNull();
  }

  @Test
  public void serializeVisibleLineGraphics_resultJsonHasVisible() throws IOException {
    //when
    line.setVisible(true);
    graphicsSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("visible")).isTrue();
    Assertions.assertThat(actualObj.get("visible").asBoolean()).isTrue();
  }

  @Test
  public void serializeYAxisLineGraphics_resultJsonHasYAxis() throws IOException {
    //when
    line.setyAxis("Y Axis name");
    graphicsSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("yAxis")).isTrue();
    Assertions.assertThat(actualObj.get("yAxis").asText()).isEqualTo("Y Axis name");
  }

  @Test
  public void serializeClickActionLineGraphics_resultJsonHasClickAction() throws IOException {
    //when
    line.onClick(actionObject -> {});
    graphicsSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("hasClickAction")).isTrue();
    Assertions.assertThat(actualObj.get("hasClickAction").asBoolean()).isTrue();
  }

  @Test
  public void serializeClickTagLineGraphics_resultJsonHasClickTag() throws IOException {
    //when
    line.onClick("some click tag");
    graphicsSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("clickTag")).isTrue();
    Assertions.assertThat(actualObj.get("clickTag").asText()).isEqualTo("some click tag");
  }

  @Test
  public void serializeKeyTagsLineGraphics_resultJsonHasKeyTags() throws IOException {
    //when
    line.onKey("key01", "tag01");
    graphicsSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("keyTags")).isTrue();
    Assertions.assertThat(actualObj.get("keyTags")).isNotEmpty();
  }

  @Test
  public void serializeKeysLineGraphics_resultJsonHasKeys() throws IOException {
    //when
    line.onKey(
        "key01",
        new GraphicsActionListener() {
          @Override
          public void execute(GraphicsActionObject actionObject) {}
        });
    graphicsSerializer.serialize(line, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    JsonNode actualObj = mapper.readTree(sw.toString());
    Assertions.assertThat(actualObj.has("keys")).isTrue();
    Assertions.assertThat(actualObj.get("keys")).isNotEmpty();
  }
}
