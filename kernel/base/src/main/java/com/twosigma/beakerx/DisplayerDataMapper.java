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
package com.twosigma.beakerx;

import com.fasterxml.jackson.databind.ObjectMapper;

public class DisplayerDataMapper {

  private static ObjectMapper mapper = new ObjectMapper();
  private static Converter none = data -> data;
  private static Converter simple = data -> {
    String s = mapper.writeValueAsString(data);
    return mapper.readValue(s, Object.class);
  };
  private static Converter converter = none;

  static Object convert(Object data) {
    try {
      return converter.convert(data);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public static void turnOn() {
    converter = simple;
  }

  public static void turnOff() {
    converter = none;
  }

  @FunctionalInterface
  public interface Converter {
    Object convert(Object data) throws Exception;
  }
}
