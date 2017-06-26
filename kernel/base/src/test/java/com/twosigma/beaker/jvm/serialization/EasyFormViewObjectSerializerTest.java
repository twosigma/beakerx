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
package com.twosigma.beaker.jvm.serialization;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.easyform.EasyForm;
import com.twosigma.beaker.jupyter.KernelManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.StringWriter;
import java.util.Arrays;

public class EasyFormViewObjectSerializerTest {
    private EasyFormViewObjectSerializer easyFormViewObjectSerializer;
    private static JsonGenerator jgen;
    private static ObjectMapper mapper;
    StringWriter sw;

    @BeforeClass
    public static void setUpClass() throws Exception {
        mapper = new ObjectMapper();
        mapper.disable(MapperFeature.AUTO_DETECT_GETTERS);
        mapper.disable(MapperFeature.AUTO_DETECT_IS_GETTERS);
        mapper.disable(MapperFeature.AUTO_DETECT_FIELDS);
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        jgen = mapper.getFactory().createGenerator(new StringWriter());
    }

    @Before
    public void setUp() throws Exception {
        KernelManager.register(new KernelTest());
        easyFormViewObjectSerializer = new EasyFormViewObjectSerializer();
        sw = new StringWriter();
        jgen = mapper.getJsonFactory().createJsonGenerator(sw);
    }

    @After
    public void tearDown() throws Exception {
        KernelManager.register(null);
    }

    @Test
    public void serializeCaption_returnTrue() throws Exception {
        //when
        boolean result = easyFormViewObjectSerializer.writeObject(Arrays.asList(new EasyForm("test")), jgen, true);
        //then
        Assertions.assertThat(result).isTrue();
    }

}
