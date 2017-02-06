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

import com.twosigma.beaker.chart.xychart.plotitem.YAxis;
import org.assertj.core.api.Assertions;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;

public class YAxisSerializerTest {

    static ObjectMapper mapper;
    static YAxisSerializer yAxisSerializer;
    JsonGenerator jgen;
    StringWriter sw;
    YAxis yAxis;

    @BeforeClass
    public static void initClassStubData(){
        mapper = new ObjectMapper();
        yAxisSerializer = new YAxisSerializer();
    }

    @Before
    public void initTestStubData() throws IOException {
        sw = new StringWriter();
        jgen = mapper.getJsonFactory().createJsonGenerator(sw);
        yAxis = new YAxis();
    }

    @Test
    public void serializeYAxis_resultJsonHasType() throws IOException{
        //when
        yAxisSerializer.serialize(yAxis, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("type")).isTrue();
        Assertions.assertThat(actualObj.get("type").asText()).isEqualTo("YAxis");
    }

    @Test
    public void serializeLabelOfYAxis_resultJsonHasLabel() throws IOException{
        //when
        yAxis.setLabel("some label");
        yAxisSerializer.serialize(yAxis, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("label")).isTrue();
        Assertions.assertThat(actualObj.get("label").asText()).isEqualTo("some label");
    }

    @Test
    public void serializeAutoRangeOfYAxis_resultJsonHasAutoRange() throws IOException{
        //when
        yAxis.setAutoRange(true);
        yAxisSerializer.serialize(yAxis, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("auto_range")).isTrue();
        Assertions.assertThat(actualObj.get("auto_range").asBoolean()).isTrue();
    }

    @Test
    public void serializeAutoRangeIncludesZeroOfYAxis_resultJsonHasAutoRangeIncludesZero() throws IOException{
        //when
        yAxis.setAutoRangeIncludesZero(true);
        yAxisSerializer.serialize(yAxis, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("auto_range_includes_zero")).isTrue();
        Assertions.assertThat(actualObj.get("auto_range_includes_zero").asBoolean()).isTrue();
    }

    @Test
    public void serializeLowerMarginOfYAxis_resultJsonHasLowerMargin() throws IOException{
        //when
        yAxis.setLowerMargin(1.5);
        yAxisSerializer.serialize(yAxis, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("lower_margin")).isTrue();
        Assertions.assertThat(actualObj.get("lower_margin").asDouble()).isEqualTo(1.5);
    }

    @Test
    public void serializeUpperMarginOfYAxis_resultJsonHasUpperMargin() throws IOException{
        //when
        yAxis.setUpperMargin(2.5);
        yAxisSerializer.serialize(yAxis, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("upper_margin")).isTrue();
        Assertions.assertThat(actualObj.get("upper_margin").asDouble()).isEqualTo(2.5);
    }

    @Test
    public void serializeLogOfYAxis_resultJsonHasLog() throws IOException{
        //when
        yAxis.setLog(true);
        yAxisSerializer.serialize(yAxis, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("use_log")).isTrue();
        Assertions.assertThat(actualObj.get("use_log").asBoolean()).isTrue();
    }

    @Test
    public void serializeLogBaseOfYAxis_resultJsonHasLogBase() throws IOException{
        //when
        yAxis.setLogBase(1.5);
        yAxisSerializer.serialize(yAxis, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("log_base")).isTrue();
        Assertions.assertThat(actualObj.get("log_base").asDouble()).isEqualTo(1.5);
    }

}
