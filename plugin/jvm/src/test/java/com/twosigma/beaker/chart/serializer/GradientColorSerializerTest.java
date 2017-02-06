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
import com.twosigma.beaker.chart.GradientColor;
import org.assertj.core.api.Assertions;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Arrays;

public class GradientColorSerializerTest {

    static ObjectMapper mapper;
    static GradientColorSerializer gradientColorSerializer;
    JsonGenerator jgen;
    StringWriter sw;

    @BeforeClass
    public static void initClassStubData(){
        mapper = new ObjectMapper();
        gradientColorSerializer = new GradientColorSerializer();
    }

    @Before
    public void initTestStubData() throws IOException {
        sw = new StringWriter();
        jgen = mapper.getJsonFactory().createJsonGenerator(sw);
    }

    @Test
    public void serializeGradientColor_resultJsonHasGradientColor() throws IOException{
        //when
        GradientColor gradientColor = new GradientColor(Arrays.asList(Color.GREEN, Color.BLUE));
        gradientColorSerializer.serialize(gradientColor, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        ArrayNode arrayNode = (ArrayNode) mapper.readTree(sw.toString());
        Assertions.assertThat(arrayNode).isNotEmpty();
        Assertions.assertThat(arrayNode.get(0).get("rgb").asInt()).isEqualTo(Color.GREEN.getRGB());
    }

}
