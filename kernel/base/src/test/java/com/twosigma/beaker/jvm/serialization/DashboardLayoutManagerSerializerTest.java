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
import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.jvm.object.DashboardLayoutManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

public class DashboardLayoutManagerSerializerTest {
  private DashboardLayoutManager layoutManager;
  private static DashboardLayoutManagerSerializer serializer;
  private static SerializationTestHelper<DashboardLayoutManagerSerializer, DashboardLayoutManager> helper;

  @BeforeClass
  public static void setUpClass() throws IOException {
    serializer = new DashboardLayoutManagerSerializer(() -> { return new BasicObjectSerializer(); } );
    helper = new SerializationTestHelper<>(serializer);
  }

  @Before
  public void setUp() throws Exception {
    KernelManager.register(new KernelTest());
    layoutManager = new DashboardLayoutManager(5);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void serializeDashboardLayoutManager_resultJsonHasType() throws IOException {
    //when
    JsonNode actualObj = helper.serializeObject(layoutManager);
    //then
    Assertions.assertThat(actualObj.has("type")).isTrue();
    Assertions.assertThat(actualObj.get("type").asText()).isEqualTo("DashboardLayoutManager");
  }

  @Test
  public void serializeColumns_resultJsonHasColumns() throws IOException {
    int num = layoutManager.getColumns();
    //when
    JsonNode actualObj = helper.serializeObject(layoutManager);
    //then
    Assertions.assertThat(actualObj.has("columns")).isTrue();
    Assertions.assertThat(actualObj.get("columns").asInt()).isEqualTo(num);
  }

  @Test
  public void serializeBorderDisplayed_resultJsonHasBorderDisplayed() throws IOException {
    //given
    layoutManager.setBorderDisplayed(true);
    //when
    JsonNode actualObj = helper.serializeObject(layoutManager);
    //then
    Assertions.assertThat(actualObj.has("borderDisplayed")).isTrue();
    Assertions.assertThat(actualObj.get("borderDisplayed").asBoolean()).isTrue();
  }

  @Test
  public void serializePaddingBottom_resultJsonHasPaddingBottom() throws IOException {
    //given
    layoutManager.setPaddingBottom(1);
    //when
    JsonNode actualObj = helper.serializeObject(layoutManager);
    //then
    Assertions.assertThat(actualObj.has("paddingBottom")).isTrue();
    Assertions.assertThat(actualObj.get("paddingBottom").asInt()).isEqualTo(1);
  }

  @Test
  public void serializePaddingTop_resultJsonHasPaddingTop() throws IOException {
    //given
    layoutManager.setPaddingTop(2);
    //when
    JsonNode actualObj = helper.serializeObject(layoutManager);
    //then
    Assertions.assertThat(actualObj.has("paddingTop")).isTrue();
    Assertions.assertThat(actualObj.get("paddingTop").asInt()).isEqualTo(2);
  }

  @Test
  public void serializePaddingLeft_resultJsonHasPaddingLeft() throws IOException {
    //given
    layoutManager.setPaddingLeft(3);
    //when
    JsonNode actualObj = helper.serializeObject(layoutManager);
    //then
    Assertions.assertThat(actualObj.has("paddingLeft")).isTrue();
    Assertions.assertThat(actualObj.get("paddingLeft").asInt()).isEqualTo(3);
  }

  @Test
  public void serializePaddingRight_resultJsonHasPaddingRight() throws IOException {
    //given
    layoutManager.setPaddingRight(4);
    //when
    JsonNode actualObj = helper.serializeObject(layoutManager);
    //then
    Assertions.assertThat(actualObj.has("paddingRight")).isTrue();
    Assertions.assertThat(actualObj.get("paddingRight").asInt()).isEqualTo(4);
  }

}
