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

import com.twosigma.beaker.chart.legend.LegendPosition;
import org.assertj.core.api.Assertions;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ser.StdSerializerProvider;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;

public class LegendPositionSerializerTest {

    static ObjectMapper mapper;
    static LegendPositionSerializer legendPositionSerializer;
    JsonGenerator jgen;
    StringWriter sw;
    LegendPosition legendPosition;

    @BeforeClass
    public static void initClassStubData(){
        mapper = new ObjectMapper();
        legendPositionSerializer = new LegendPositionSerializer();
    }

    @Before
    public void initTestStubData() throws IOException {
        sw = new StringWriter();
        jgen = mapper.getJsonFactory().createJsonGenerator(sw);
        legendPosition = new LegendPosition();
    }

    @Test
    public void serializeLegendPosition_resultJsonHasType() throws IOException{
        //when
        legendPositionSerializer.serialize(legendPosition, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("type")).isTrue();
        Assertions.assertThat(actualObj.get("type").asText()).isEqualTo("LegendPosition");
    }

    @Test
    public void serializePositionOfLegendPosition_resultJsonHasPosition() throws IOException{
        //when
        legendPosition.setPosition(LegendPosition.Position.LEFT);
        legendPositionSerializer.serialize(legendPosition, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("position")).isTrue();
        Assertions.assertThat(actualObj.get("position").asText()).isEqualTo("LEFT");
    }

    @Test
    public void serializeXLegendPosition_resultJsonHasX() throws IOException{
        //when
        LegendPosition legendPositionX = new LegendPosition(new int[] {11, 22});
        legendPositionSerializer.serialize(legendPositionX, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("x")).isTrue();
        Assertions.assertThat(actualObj.get("x").asInt()).isEqualTo(11);
    }

    @Test
    public void serializeYLegendPosition_resultJsonHasY() throws IOException{
        //when
        LegendPosition legendPositionY = new LegendPosition(new int[] {11, 22});
        legendPositionSerializer.serialize(legendPositionY, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("y")).isTrue();
        Assertions.assertThat(actualObj.get("y").asInt()).isEqualTo(22);
    }

}
