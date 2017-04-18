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
import com.twosigma.beaker.chart.Color;
import org.assertj.core.api.Assertions;
import org.junit.Test;

public class ColorDeserializerTest {

  @Test
  public void deserialize_resultObjectHasColor() throws Exception {
    //given
    ObjectMapper mapper = new ObjectMapper();
    JsonNode actualObj = mapper.readTree("\"#FF00FF00\"");
    ColorDeserializer deserializer = new ColorDeserializer(new BasicObjectSerializer());
    //when
    Color color = (Color) deserializer.deserialize(actualObj, mapper);
    //then
    Assertions.assertThat(color).isNotNull();
    Assertions.assertThat(color.getRGB()).isEqualTo(Color.GREEN.getRGB());
  }

}
