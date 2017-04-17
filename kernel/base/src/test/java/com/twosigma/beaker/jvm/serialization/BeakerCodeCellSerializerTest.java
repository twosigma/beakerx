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

package com.twosigma.beaker.jvm.serialization;

import com.fasterxml.jackson.databind.JsonNode;
import com.twosigma.beaker.BeakerCodeCell;
import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.jupyter.KernelManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

public class BeakerCodeCellSerializerTest {
  private BeakerCodeCell beakerCodeCell;
  private static BeakerCodeCell.Serializer serializer;
  private static SerializationTestHelper<BeakerCodeCell.Serializer, BeakerCodeCell> helper;

  @BeforeClass
  public static void setUpClass() throws IOException {
    serializer = new BeakerCodeCell.Serializer(() -> { return new BasicObjectSerializer(); } );
    helper = new SerializationTestHelper<>(serializer);
  }

  @Before
  public void setUp() throws Exception {
    KernelManager.register(new KernelTest());
    beakerCodeCell = new BeakerCodeCell();
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void serializeOutputContainer_resultJsonHasType() throws IOException {
    //when
    JsonNode actualObj = helper.serializeObject(beakerCodeCell);
    //then
    Assertions.assertThat(actualObj.has("type")).isTrue();
    Assertions.assertThat(actualObj.get("type").asText()).isEqualTo("BeakerCodeCell");
  }

  @Test
  public void serializeCellId_resultJsonHasCellId() throws IOException {
    //given
    beakerCodeCell.setcellId("testId");
    //when
    JsonNode actualObj = helper.serializeObject(beakerCodeCell);
    //then
    Assertions.assertThat(actualObj.has("cellId")).isTrue();
    Assertions.assertThat(actualObj.get("cellId").asText()).isEqualTo("testId");
  }

  @Test
  public void serializeCode_resultJsonHasCode() throws IOException {
    //given
    beakerCodeCell.setcode("code test");
    //when
    JsonNode actualObj = helper.serializeObject(beakerCodeCell);
    //then
    Assertions.assertThat(actualObj.has("code")).isTrue();
    Assertions.assertThat(actualObj.get("code").asText()).isEqualTo("code test");
  }

  @Test
  public void serializeOutputType_resultJsonHasOutputType() throws IOException {
    //given
    beakerCodeCell.setoutputtype("output type");
    //when
    JsonNode actualObj = helper.serializeObject(beakerCodeCell);
    //then
    Assertions.assertThat(actualObj.has("outputtype")).isTrue();
    Assertions.assertThat(actualObj.get("outputtype").asText()).isEqualTo("output type");
  }

  @Test
  public void serializeOutput_resultJsonHasOutput() throws IOException {
    //given
    beakerCodeCell.setoutput("test output");
    //when
    JsonNode actualObj = helper.serializeObject(beakerCodeCell);
    //then
    Assertions.assertThat(actualObj.has("output")).isTrue();
    Assertions.assertThat(actualObj.get("output").asText()).isEqualTo("test output");
  }

  @Test
  public void serializeTags_resultJsonHasTags() throws IOException {
    //given
    beakerCodeCell.settags("test tags");
    //when
    JsonNode actualObj = helper.serializeObject(beakerCodeCell);
    //then
    Assertions.assertThat(actualObj.has("tags")).isTrue();
    Assertions.assertThat(actualObj.get("tags").asText()).isEqualTo("test tags");
  }

}
