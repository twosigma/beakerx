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

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;

import java.io.IOException;
import java.io.StringWriter;

public class SerializationTestHelper<S extends JsonSerializer, V> {

  private JsonGenerator jgen;
  private StringWriter sw;
  private S serializer;
  private static ObjectMapper mapper = new ObjectMapper();

  public SerializationTestHelper(S serializer) throws IOException {
    this.serializer = serializer;
  }

  public JsonNode serializeObject(V value) throws IOException {
    sw = new StringWriter();
    jgen = mapper.getFactory().createGenerator(sw);
    serializer.serialize(value, jgen, new DefaultSerializerProvider.Impl());
    jgen.flush();
    return mapper.readTree(sw.toString());
  }

}
