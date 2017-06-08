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
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beaker.jvm.object.OutputContainerCell;
import org.assertj.core.api.Assertions;
import org.junit.Test;

public class OutputContainerCellDeserializerTest {

  private String json = "{\"type\":\"OutputContainerCell\"," +
      "\"labels\":[\"label\"],\"items\":[1],\"layout\":{\"borderDisplayed\":false}}";

  @Test
  public void deserialize_resultObjectHasLabels() throws Exception {
    //given
    ObjectMapper mapper = new ObjectMapper();
    JsonNode actualObj = mapper.readTree(json);
    OutputContainerCellDeserializer deserializer =
        new OutputContainerCellDeserializer(new BasicObjectSerializer());
    //when
    OutputContainerCell outputContainerCell =
        (OutputContainerCell) deserializer.deserialize(actualObj, mapper);
    //then
    Assertions.assertThat(outputContainerCell).isNotNull();
    Assertions.assertThat(outputContainerCell.getLabels()).isNotEmpty();
  }

  @Test
  public void canBeUsed_returnTrue() throws Exception {
    //given
    ObjectMapper mapper = new ObjectMapper();
    JsonNode actualObj = mapper.readTree(json);
    OutputContainerCellDeserializer deserializer =
        new OutputContainerCellDeserializer(new BasicObjectSerializer());
    //when
    boolean result = deserializer.canBeUsed(actualObj);
    //then
    Assertions.assertThat(result).isTrue();
  }

}
