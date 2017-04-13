/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.table.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.table.renderer.DataBarsRenderer;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;

public class DataBarsRendererSerializerTest {
  private JsonGenerator jgen;
  private StringWriter sw;
  private static ObjectMapper mapper;
  private static DataBarsRendererSerializer dataBarsRendererSerializer;

  @BeforeClass
  public static void setUpClass() {
    mapper = new ObjectMapper();
    dataBarsRendererSerializer = new DataBarsRendererSerializer();
  }

  @Before
  public void setUp() throws Exception {
    KernelManager.register(new KernelTest());
    sw = new StringWriter();
    jgen = mapper.getFactory().createGenerator(sw);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void serializeDataBarsRenderer_resultJsonHasDataBarsType() throws IOException {
    //given
    DataBarsRenderer dataBarsRenderer = new DataBarsRenderer();
    //when
    JsonNode actualObj = serializeDataBarsRenderer(dataBarsRenderer);
    //then
    Assertions.assertThat(actualObj.has("type")).isTrue();
    Assertions.assertThat(actualObj.get("type").asText()).isEqualTo("DataBars");
  }

  @Test
  public void serializeIncludeTextValue_resultJsonHasIncludeTextFlag() throws IOException {
    //given
    DataBarsRenderer dataBarsRenderer = new DataBarsRenderer(false);
    //when
    JsonNode actualObj = serializeDataBarsRenderer(dataBarsRenderer);
    //then
    Assertions.assertThat(actualObj.has("includeText")).isTrue();
    Assertions.assertThat(actualObj.get("includeText").asBoolean()).isFalse();
  }

  private JsonNode serializeDataBarsRenderer(DataBarsRenderer dataBarsRenderer) throws IOException {
    dataBarsRendererSerializer.serialize(dataBarsRenderer, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    return mapper.readTree(sw.toString());
  }

}
