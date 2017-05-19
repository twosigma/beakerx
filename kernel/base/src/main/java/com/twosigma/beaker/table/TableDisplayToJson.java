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

package com.twosigma.beaker.table;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.twosigma.beaker.table.serializer.TableDisplaySerializer;

import java.util.Map;

public class TableDisplayToJson {

  private static ObjectMapper mapper;

  static {
    SimpleModule module = new SimpleModule("TableDisplaySerializer", new Version(1, 0, 0, null));
    module.addSerializer(TableDisplay.class, new TableDisplaySerializer());
    mapper = new ObjectMapper();
    mapper.registerModule(module);
  }

  public static Map toJson(TableDisplay tableDisplay) {
    return mapper.convertValue(tableDisplay, Map.class);
  }
}