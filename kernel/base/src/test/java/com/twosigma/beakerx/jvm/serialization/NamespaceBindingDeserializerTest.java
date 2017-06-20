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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.BeakerCodeCell;
import com.twosigma.beakerx.shared.NamespaceBinding;
import org.assertj.core.api.Assertions;
import org.junit.Test;

public class NamespaceBindingDeserializerTest {

  @Test
  public void deserialize_resultObjectHasName() throws Exception {
    String name = "test";
    //given
    ObjectMapper mapper = new ObjectMapper();
    String str = "{\"type\":\"NamespaceBinding\",\"name\":\"test\"," +
            "\"session\":\"test\",\"value\":1,\"defined\":true}";
    NamespaceBindingDeserializer deserializer =  new NamespaceBindingDeserializer(() -> {
      BasicObjectSerializer boSerializer = new BasicObjectSerializer();
      boSerializer.addTypeDeserializer(new BeakerCodeCell.DeSerializer(boSerializer));
      return boSerializer;
    });
    //when
    NamespaceBinding namespaceBinding = (NamespaceBinding) deserializer.deserialize(
        mapper.getFactory().createParser(str), null);
    //then
    Assertions.assertThat(namespaceBinding).isNotNull();
    Assertions.assertThat(namespaceBinding.getName()).isEqualTo(name);
  }

}
