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
import org.assertj.core.api.Assertions;
import org.junit.Test;

import java.awt.image.BufferedImage;

public class BufferedImageDeserializerTest {

  private String json = "{\"type\":\"ImageIcon\",\"imageData\"" +
      ":\"iVBORw0KGgoAAAANSUhEUgAAAGQAAADICAIAAACRXtOWAAAAUUlEQVR42u3BMQEAAADCoPVPbQo/o" +
      "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB" +
      "4GOsoAAHf1Nx9AAAAAElFTkSuQmCC\",\"width\":100,\"height\":200}";

  @Test
  public void deserialize_resultObjectHasData() throws Exception {
    //given
    ObjectMapper mapper = new ObjectMapper();
    JsonNode actualObj = mapper.readTree(json);
    BufferedImageDeserializer deserializer = new BufferedImageDeserializer(new BasicObjectSerializer());
    //when
    BufferedImage bufferedImage = (BufferedImage) deserializer.deserialize(actualObj, mapper);
    //then
    Assertions.assertThat(bufferedImage).isNotNull();
    Assertions.assertThat(bufferedImage.getData()).isNotNull();
  }

  @Test
  public void canBeUsed_returnTrue() throws Exception {
    //given
    ObjectMapper mapper = new ObjectMapper();
    JsonNode actualObj = mapper.readTree(json);
    BufferedImageDeserializer deserializer = new BufferedImageDeserializer(new BasicObjectSerializer());
    //when
    boolean result = deserializer.canBeUsed(actualObj);
    //then
    Assertions.assertThat(result).isTrue();
  }

}
