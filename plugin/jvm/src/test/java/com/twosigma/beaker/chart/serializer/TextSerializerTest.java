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
import com.twosigma.beaker.chart.xychart.NanoPlot;
import com.twosigma.beaker.chart.xychart.plotitem.Text;
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
import java.math.BigInteger;

public class TextSerializerTest {

    static ObjectMapper mapper;
    static TextSerializer textSerializer;
    JsonGenerator jgen;
    StringWriter sw;
    Text text;

    @BeforeClass
    public static void initClassStubData(){
        mapper = new ObjectMapper();
        textSerializer = new TextSerializer();
    }

    @Before
    public void initTestStubData() throws IOException {
        sw = new StringWriter();
        jgen = mapper.getJsonFactory().createJsonGenerator(sw);
        text = new Text();
    }

    @Test
    public void serializeText_resultJsonHasType() throws IOException{
        //when
        textSerializer.serialize(text, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("type")).isTrue();
        Assertions.assertThat(actualObj.get("type").asText()).isEqualTo("Text");
    }

    @Test
    public void serializeXText_resultJsonHasX() throws IOException{
        //when
        text.setX(new Integer(11));
        textSerializer.serialize(text, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("x")).isTrue();
        Assertions.assertThat(actualObj.get("x").asInt()).isEqualTo(11);
    }

    @Test
    public void serializeBigIntXWithNanoPlotType_resultJsonHasStringX() throws IOException{
        //when
        text.setX(new BigInteger("12345678901234567891000"));
        text.setPlotType(NanoPlot.class);
        textSerializer.serialize(text, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("x")).isTrue();
        Assertions.assertThat(actualObj.get("x").isTextual()).isTrue();
    }

    @Test
    public void serializeYText_resultJsonHasY() throws IOException{
        //when
        text.setY(new Integer(22));
        textSerializer.serialize(text, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("y")).isTrue();
        Assertions.assertThat(actualObj.get("y").asInt()).isEqualTo(22);
    }

    @Test
    public void serializeShowPointerText_resultJsonHasShowPointer() throws IOException{
        //when
        text.setShowPointer(true);
        textSerializer.serialize(text, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("show_pointer")).isTrue();
        Assertions.assertThat(actualObj.get("show_pointer").asBoolean()).isTrue();
    }

    @Test
    public void serializeTextOfText_resultJsonHasText() throws IOException{
        //when
        text.setText("some text");
        textSerializer.serialize(text, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("text")).isTrue();
        Assertions.assertThat(actualObj.get("text").asText()).isEqualTo("some text");
    }

    @Test
    public void serializePointerAngleOfText_resultJsonHasPointerAngle() throws IOException{
        //when
        text.setPointerAngle(0.5);
        textSerializer.serialize(text, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("pointer_angle")).isTrue();
        Assertions.assertThat(actualObj.get("pointer_angle").asDouble()).isEqualTo(0.5);
    }

    @Test
    public void serializeColorOfText_resultJsonHasColor() throws IOException{
        //when
        text.setColor(Color.GREEN);
        textSerializer.serialize(text, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("color")).isTrue();
        Assertions.assertThat(actualObj.get("color").get("rgb").asInt()).isEqualTo(Color.GREEN.getRGB());
    }

    @Test
    public void serializeSizeOfText_resultJsonHasSize() throws IOException{
        //when
        text.setSize(11);
        textSerializer.serialize(text, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("size")).isTrue();
        Assertions.assertThat(actualObj.get("size").asInt()).isEqualTo(11);
    }

}
