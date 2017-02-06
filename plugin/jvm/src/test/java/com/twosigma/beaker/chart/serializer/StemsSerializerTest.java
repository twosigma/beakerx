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

import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.xychart.plotitem.Stems;
import com.twosigma.beaker.chart.xychart.plotitem.StrokeType;
import org.assertj.core.api.Assertions;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Arrays;

public class StemsSerializerTest {

    static ObjectMapper mapper;
    static StemsSerializer stemsSerializer;
    JsonGenerator jgen;
    StringWriter sw;

    @BeforeClass
    public static void initClassStubData(){
        mapper = new ObjectMapper();
        stemsSerializer = new StemsSerializer();
    }

    @Before
    public void initTestStubData() throws IOException {
        sw = new StringWriter();
        jgen = mapper.getJsonFactory().createJsonGenerator(sw);
    }

    @Test
    public void serializeColorsStems_resultJsonHasColors() throws IOException{
        //when
        Stems stems = new Stems();
        stems.setColor(Arrays.asList(Color.BLUE, Color.GREEN, Color.BLACK));
        stemsSerializer.serialize(stems, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("colors")).isTrue();
        ArrayNode arrayNode = (ArrayNode) actualObj.get("colors");
        Assertions.assertThat(arrayNode.get(1).get("rgb").asInt()).isEqualTo(Color.GREEN.getRGB());
    }

    @Test
    public void serializeColorStems_resultJsonHasColor() throws IOException{
        //when
        Stems stems = new Stems();
        stems.setColor(Color.GREEN);
        stemsSerializer.serialize(stems, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("color")).isTrue();
        Assertions.assertThat(actualObj.get("color").get("rgb").asInt()).isEqualTo(Color.GREEN.getRGB());
    }

    @Test
    public void serializeWidthStems_resultJsonHasWidth() throws IOException{
        //when
        Stems stems = new Stems();
        stems.setWidth(11f);
        stemsSerializer.serialize(stems, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("width")).isTrue();
        Assertions.assertThat(actualObj.get("width").asInt()).isEqualTo(11);
    }

    @Test
    public void serializeStrokeTypeStems_resultJsonHasStyle() throws IOException{
        //when
        Stems stems = new Stems();
        stems.setStyle(StrokeType.SOLID);
        stemsSerializer.serialize(stems, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("style")).isTrue();
        Assertions.assertThat(actualObj.get("style").asText()).isEqualTo("SOLID");
    }

    @Test
    public void serializeStrokeTypeListStems_resultJsonHasStyles() throws IOException{
        //when
        Stems stems = new Stems();
        stems.setStyle(Arrays.asList(StrokeType.SOLID, StrokeType.DASHDOT));
        stemsSerializer.serialize(stems, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("styles")).isTrue();
        ArrayNode arrayNode = (ArrayNode) actualObj.get("styles");
        Assertions.assertThat(arrayNode.get(1).asText()).isEqualTo("DASHDOT");
    }

}
