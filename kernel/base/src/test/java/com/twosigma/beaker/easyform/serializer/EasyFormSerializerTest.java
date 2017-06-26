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
package com.twosigma.beaker.easyform.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.easyform.EasyForm;
import com.twosigma.beaker.jupyter.KernelManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;

public class EasyFormSerializerTest {
    static ObjectMapper mapper;
    static EasyFormSerializer easyFormSerializer;
    JsonGenerator jgen;
    StringWriter sw;
    EasyForm form;
    @BeforeClass
    public static void initClassStubData() {
        mapper = new ObjectMapper();
        easyFormSerializer = new EasyFormSerializer();
    }

    @Before
    public void initTestStubData() throws IOException {
        KernelManager.register(new KernelTest());
        sw = new StringWriter();
        jgen = mapper.getJsonFactory().createJsonGenerator(sw);
        form = new EasyForm("test");
    }

    @After
    public void tearDown() throws Exception {
        KernelManager.register(null);
    }

    @Test
    public void serializeCaptionOfEasytForm_resultJsonHasCorrectCaption() throws IOException {
        //when
        easyFormSerializer.serialize(form, jgen, new DefaultSerializerProvider.Impl());
        jgen.flush();
        //then
        JsonNode actualObj = mapper.readTree(sw.toString());
        Assertions.assertThat(actualObj.has("caption")).isTrue();
        Assertions.assertThat(actualObj.get("caption").asText()).isEqualTo("test");
    }


}