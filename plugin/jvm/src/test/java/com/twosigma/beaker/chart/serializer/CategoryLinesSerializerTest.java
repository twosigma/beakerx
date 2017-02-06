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

import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryLines;
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

public class CategoryLinesSerializerTest {

    static ObjectMapper mapper;
    static CategoryLinesSerializer categoryLinesSerializer;
    JsonGenerator jgen;
    StringWriter sw;

    @BeforeClass
    public static void initClassStubData(){
        mapper = new ObjectMapper();
        categoryLinesSerializer = new CategoryLinesSerializer();
    }

    @Before
    public void initTestStubData() throws IOException {
        sw = new StringWriter();
        jgen = mapper.getJsonFactory().createJsonGenerator(sw);
    }

    @Test
    public void serializeWidthCategoryLines_resultJsonHasWidth() throws IOException{
        //when
        CategoryLines categoryLines = new CategoryLines();
        categoryLines.setWidth(11f);
        categoryLinesSerializer.serialize(categoryLines, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("width")).isTrue();
        Assertions.assertThat(actualObj.get("width").asInt()).isEqualTo(11);
    }

    @Test
    public void serializeStrokeTypeStems_resultJsonHasStyle() throws IOException{
        //when
        CategoryLines categoryLines = new CategoryLines();
        categoryLines.setStyle(StrokeType.SOLID);
        categoryLinesSerializer.serialize(categoryLines, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("style")).isTrue();
        Assertions.assertThat(actualObj.get("style").asText()).isEqualTo("SOLID");
    }

    @Test
    public void serializeStrokeTypeListStems_resultJsonHasStyles() throws IOException{
        //when
        CategoryLines categoryLines = new CategoryLines();
        categoryLines.setStyle(Arrays.asList(StrokeType.SOLID, StrokeType.DASHDOT));
        categoryLinesSerializer.serialize(categoryLines, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("styles")).isTrue();
        ArrayNode arrayNode = (ArrayNode) actualObj.get("styles");
        Assertions.assertThat(arrayNode.get(1).asText()).isEqualTo("DASHDOT");
    }

    @Test
    public void serializeInterpolationCategoryLines_resultJsonHasInterpolation() throws IOException{
        //when
        CategoryLines categoryLines = new CategoryLines();
        categoryLines.setInterpolation(1);
        categoryLinesSerializer.serialize(categoryLines, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("interpolation")).isTrue();
        Assertions.assertThat(actualObj.get("interpolation").asInt()).isEqualTo(1);
    }

}
