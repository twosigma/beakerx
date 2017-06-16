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

package com.twosigma.beakerx.jvm.serialization;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.jvm.object.DashboardLayoutManager;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

public class DashboardLayoutManagerDeserializerTest {

  private String json;
  private int columns;

  @Before
  public void setUp() throws Exception {
    columns = 10;
    json = "{\"type\":\"DashboardLayoutManager\"," +
        "\"borderDisplayed\":false,\"columns\":" + columns + ",\"paddingBottom\":0," +
        "\"paddingTop\":0,\"paddingRight\":15,\"paddingLeft\":15}";
  }

  @Test
  public void deserialize_resultObjectHasColumns() throws Exception {
    //given
    ObjectMapper mapper = new ObjectMapper();
    JsonNode actualObj = mapper.readTree(json);
    DashboardLayoutManagerDeserializer deserializer =
        new DashboardLayoutManagerDeserializer(new BasicObjectSerializer());
    //when
    DashboardLayoutManager layoutManager =
        (DashboardLayoutManager) deserializer.deserialize(actualObj, mapper);
    //then
    Assertions.assertThat(layoutManager).isNotNull();
    Assertions.assertThat(layoutManager.getColumns()).isEqualTo(columns);
  }

  @Test
  public void canBeUsed_returnTrue() throws Exception {
    //given
    ObjectMapper mapper = new ObjectMapper();
    JsonNode actualObj = mapper.readTree(json);
    DashboardLayoutManagerDeserializer deserializer =
        new DashboardLayoutManagerDeserializer(new BasicObjectSerializer());
    //when
    boolean result = deserializer.canBeUsed(actualObj);
    //then
    Assertions.assertThat(result).isTrue();
  }

}
