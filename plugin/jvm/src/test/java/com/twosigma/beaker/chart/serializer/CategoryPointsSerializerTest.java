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

import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryPoints;
import com.twosigma.beaker.chart.xychart.plotitem.ShapeType;
import org.assertj.core.api.Assertions;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ser.StdSerializerProvider;
import org.codehaus.jackson.node.ArrayNode;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Arrays;

public class CategoryPointsSerializerTest {

    static ObjectMapper mapper;
    static CategoryPointsSerializer categoryPointsSerializer;
    JsonGenerator jgen;
    StringWriter sw;

    @BeforeClass
    public static void initClassStubData(){
        mapper = new ObjectMapper();
        categoryPointsSerializer = new CategoryPointsSerializer();
    }

    @Before
    public void initTestStubData() throws IOException {
        sw = new StringWriter();
        jgen = mapper.getJsonFactory().createJsonGenerator(sw);
    }

    @Test
    public void serializeSizeCategoryPoints_resultJsonHasSize() throws IOException{
        //when
        CategoryPoints categoryPoints = new CategoryPoints();
        categoryPoints.setSize(11);
        categoryPointsSerializer.serialize(categoryPoints, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("size")).isTrue();
        Assertions.assertThat(actualObj.get("size").asInt()).isEqualTo(11);
    }

    @Test
    public void serializeSizesCategoryPoints_resultJsonHasSizes() throws IOException{
        //when
        CategoryPoints categoryPoints = new CategoryPoints();
        categoryPoints.setSize(Arrays.asList(11, 22, 33));
        categoryPointsSerializer.serialize(categoryPoints, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("sizes")).isTrue();
        ArrayNode arrayNode = (ArrayNode) actualObj.get("sizes");
        Assertions.assertThat(arrayNode.get(1).asInt()).isEqualTo(22);
    }

    @Test
    public void serializeShapeCategoryPoints_resultJsonHasShape() throws IOException{
        //when
        CategoryPoints categoryPoints = new CategoryPoints();
        categoryPoints.setShape(ShapeType.CIRCLE);
        categoryPointsSerializer.serialize(categoryPoints, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("shape")).isTrue();
        Assertions.assertThat(actualObj.get("shape").asText()).isEqualTo("CIRCLE");
    }

    @Test
    public void serializeShapesCategoryPoints_resultJsonHasShapes() throws IOException{
        //when
        CategoryPoints categoryPoints = new CategoryPoints();
        categoryPoints.setShape(Arrays.asList(ShapeType.CIRCLE, ShapeType.TRIANGLE));
        categoryPointsSerializer.serialize(categoryPoints, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("shaps")).isTrue();
        ArrayNode arrayNode = (ArrayNode) actualObj.get("shaps");
        Assertions.assertThat(arrayNode.get(1).asText()).isEqualTo("TRIANGLE");
    }

    @Test
    public void serializeFillCategoryPoints_resultJsonHasFill() throws IOException{
        //when
        CategoryPoints categoryPoints = new CategoryPoints();
        categoryPoints.setFill(true);
        categoryPointsSerializer.serialize(categoryPoints, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("fill")).isTrue();
        Assertions.assertThat(actualObj.get("fill").asBoolean()).isTrue();
    }

    @Test
    public void serializeFillsCategoryPoints_resultJsonHasFills() throws IOException{
        //when
        CategoryPoints categoryPoints = new CategoryPoints();
        categoryPoints.setFill(Arrays.asList(false, true, false));
        categoryPointsSerializer.serialize(categoryPoints, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("fills")).isTrue();
        ArrayNode arrayNode = (ArrayNode) actualObj.get("fills");
        Assertions.assertThat(arrayNode.get(1).asBoolean()).isTrue();
    }

    @Test
    public void serializeOutlineColorCategoryPoints_resultJsonHasOutlineColor() throws IOException{
        //when
        CategoryPoints categoryPoints = new CategoryPoints();
        categoryPoints.setOutlineColor(Color.GREEN);
        categoryPointsSerializer.serialize(categoryPoints, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("outline_color")).isTrue();
        Assertions.assertThat(actualObj.get("outline_color").get("rgb").asInt()).isEqualTo(Color.GREEN.getRGB());
    }

    @Test
    public void serializeOutlineColorsCategoryPoints_resultJsonHasOutlineColors() throws IOException{
        //when
        CategoryPoints categoryPoints = new CategoryPoints();
        categoryPoints.setOutlineColor(Arrays.asList(Color.BLUE, Color.GREEN, Color.BLACK));
        categoryPointsSerializer.serialize(categoryPoints, jgen, new StdSerializerProvider());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("outline_colors")).isTrue();
        ArrayNode arrayNode = (ArrayNode) actualObj.get("outline_colors");
        Assertions.assertThat(arrayNode.get(1).get("rgb").asInt()).isEqualTo(Color.GREEN.getRGB());
    }

}
