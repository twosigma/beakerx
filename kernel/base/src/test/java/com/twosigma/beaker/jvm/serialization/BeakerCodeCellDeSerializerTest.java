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
import com.twosigma.beaker.BeakerCodeCell;
import org.assertj.core.api.Assertions;
import org.junit.Test;

public class BeakerCodeCellDeSerializerTest {

  @Test
  public void deserialize_resultObjectHasExecutionCount() throws Exception {
    String execCount = "5";
    //given
    ObjectMapper mapper = new ObjectMapper();
    JsonNode actualObj = mapper.readTree(
        "{\"type\":\"BeakerCodeCell\",\"execution_count\":" + execCount + ",\"cell_type\":null," +
            "\"outputs\":null,\"metadata\":null,\"source\":null}");
    BeakerCodeCell.DeSerializer deserializer = new BeakerCodeCell.DeSerializer(new BasicObjectSerializer());
    //when
    BeakerCodeCell bkCell = (BeakerCodeCell) deserializer.deserialize(actualObj, mapper);
    //then
    Assertions.assertThat(bkCell).isNotNull();
    Assertions.assertThat(bkCell.getExecutionCount()).isEqualTo(execCount);
  }

}
