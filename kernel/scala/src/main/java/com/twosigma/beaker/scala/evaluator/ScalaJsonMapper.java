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
package com.twosigma.beaker.scala.evaluator;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.module.scala.DefaultScalaModule;

import java.io.IOException;
import java.io.StringWriter;

public class ScalaJsonMapper {

  private static ObjectMapper mapper = new ObjectMapper();

  static {
    mapper.registerModule(new DefaultScalaModule());
  }

  /**
   * Used in object beaker extends Dynamic to convert object to json
   */
  public static String toJson(Object obj) {
    StringWriter out = new StringWriter();
    try {
      mapper.writeValue(out, obj);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    return out.toString();
  }

  public static String fromJson(String obj) {
    StringWriter out = new StringWriter();
    try {
      mapper.readValue(obj, Object.class);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    return out.toString();
  }
}
