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
import com.twosigma.beaker.table.ObservableTableDisplayTest;
import com.twosigma.beaker.table.TableDisplay;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.io.StringWriter;

public class TableDisplaySerializerTest {

  private JsonGenerator jgen;
  private StringWriter sw;
  private TableDisplay tableDisplay;
  private static ObjectMapper mapper;
  private static TableDisplaySerializer tableDisplaySerializer;

  @BeforeClass
  public static void setUpClass() {
    mapper = new ObjectMapper();
    tableDisplaySerializer = new TableDisplaySerializer();
  }

  @Before
  public void setUp() throws Exception {
    KernelManager.register(new KernelTest());
    tableDisplay = new TableDisplay(ObservableTableDisplayTest.getListOfMapsData());
    sw = new StringWriter();
    jgen = mapper.getFactory().createGenerator(sw);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void serializeTableDisplay_resultJsonHasType() throws IOException{
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.get("type").asText()).isEqualTo("TableDisplay");
  }

  @Test
  public void serializeTableDisplay_resultJsonHasSubtype() throws IOException{
    //given
    String result = tableDisplay.getSubtype();
    //when
    JsonNode actualObj = serializeTableDisplay();
    //then
    Assertions.assertThat(actualObj.get("subtype").asText()).isEqualTo(result);
  }

  private JsonNode serializeTableDisplay() throws IOException{
    tableDisplaySerializer.serialize(tableDisplay, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    //then
    return mapper.readTree(sw.toString());
  }

}
