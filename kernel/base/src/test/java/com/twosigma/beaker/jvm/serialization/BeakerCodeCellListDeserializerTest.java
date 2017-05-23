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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beaker.BeakerCodeCell;
import org.assertj.core.api.Assertions;
import org.junit.Test;

public class BeakerCodeCellListDeserializerTest {

  @Test
  public void deserialize_resultObjectHasBeakerCodeCellList() throws Exception {
    //given
    ObjectMapper mapper = new ObjectMapper();
    String str =
        "[{\"type\":\"BeakerCodeCell\",\"execution_count\":null," +
        "\"cell_type\":null,\"outputs\":null,\"metadata\":null,\"source\":null}," +
        "{\"type\":\"BeakerCodeCell\",\"execution_count\":null,\"" +
        "cell_type\":null,\"outputs\":null,\"metadata\":null,\"source\":null}]";
    BeakerCodeCellListDeserializer deserializer =  new BeakerCodeCellListDeserializer(() -> {
      BasicObjectSerializer boSerializer = new BasicObjectSerializer();
      boSerializer.addTypeDeserializer(new BeakerCodeCell.DeSerializer(boSerializer));
      return boSerializer;
    });
    //when
    BeakerCodeCellList bkList = (BeakerCodeCellList) deserializer.deserialize(
        mapper.getFactory().createParser(str), null);
    //then
    Assertions.assertThat(bkList).isNotNull();
    Assertions.assertThat(bkList.theList.size()).isEqualTo(2);
  }

}
