/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.jvm.serialization.BasicObjectSerializer;
import com.twosigma.beakerx.table.TableDisplayToJson;

import java.io.IOException;
import java.io.StringWriter;

import static com.fasterxml.jackson.databind.SerializationFeature.WRITE_ENUMS_USING_TO_STRING;

public class DefaultBeakerXJsonSerializer implements BeakerXJsonSerializer {

  private final BasicObjectSerializer objectSerializer;
  private ObjectMapper objectMapper;

  public DefaultBeakerXJsonSerializer() {
    this.objectMapper = new ObjectMapper();
    objectMapper.enable(WRITE_ENUMS_USING_TO_STRING);
    objectMapper.registerModule(TableDisplayToJson.tableDisplayModule());
    objectSerializer = new BasicObjectSerializer();
  }

  @Override
  public String toJson(Object value) {
    try {
      StringWriter sw = new StringWriter();
      JsonGenerator jgen = objectMapper.getFactory().createGenerator(sw);
      objectSerializer.writeObject(value, jgen, true);
      jgen.flush();
      sw.flush();
      return sw.toString();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

}
