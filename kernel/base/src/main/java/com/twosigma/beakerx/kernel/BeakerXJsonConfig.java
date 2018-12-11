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
package com.twosigma.beakerx.kernel;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedHashMap;
import java.util.Map;

public class BeakerXJsonConfig implements BeakerXJson {

  private Path path;
  private ObjectMapper objectMapper;

  public BeakerXJsonConfig() {
    this(Paths.get((
            System.getenv("JUPYTER_CONFIG_DIR") != null
                    ? System.getenv("JUPYTER_CONFIG_DIR")
                    : (System.getProperty("user.home") + File.separator + ".jupyter"))
            + File.separator + "beakerx.json"));
  }

  public BeakerXJsonConfig(Path path) {
    this.path = path;
    this.objectMapper = new ObjectMapper();
    this.objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
  }

  @SuppressWarnings("unchecked")
  public Map<String, Map> beakerxJsonAsMap() {
    String jsonAsString = null;
    try {
      jsonAsString = new String(Files.readAllBytes(path), StandardCharsets.UTF_8);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    return fromJson(jsonAsString, LinkedHashMap.class);
  }


  private <T> T fromJson(String json, Class<T> theClass) {
    T result = null;
    try {
      result = objectMapper.readValue(json, theClass);
    } catch (Exception e) {
      // Ignored.
    }

    return result;
  }

  private String toJson(Object object) {
    try {
      return objectMapper.writeValueAsString(object);
    } catch (Exception e) {
      return null;
    }
  }

  @Override
  public void save(Map<String, Map> map) {
    try {
      String content = toJson(map);
      Files.write(path, content.getBytes(StandardCharsets.UTF_8));
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
