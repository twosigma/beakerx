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
package com.twosigma.beakerx.widget;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.widget.SparkUI.BEAKERX_ID;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_APP_NAME;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_EXTRA_LISTENERS;

public class SparkUiDefaultsImpl implements SparkUiDefaults {

  public static final String SPARK_OPTIONS = "spark_options";
  public static final String BEAKERX = "beakerx";
  private Gson gson = new GsonBuilder().setPrettyPrinting().create();
  private Path path;

  public SparkUiDefaultsImpl(Path path) {
    this.path = path;
  }

  @Override
  public void saveSparkConf(SparkConf sparkConf) {
    Map<String, String> newSparkConf = getNewSparkConf(sparkConf);
    try {
      Map<String, Map> map = beakerxJson(path);
      map.get(BEAKERX).put(SPARK_OPTIONS, newSparkConf);
      String content = gson.toJson(map);
      Files.write(path, content.getBytes(StandardCharsets.UTF_8));
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void loadDefaults(SparkSession.Builder builder) {
    SparkConf sparkConf = SparkEngineImpl.getSparkConfBasedOn(builder);
    try {
      Map<String, Map> beakerxJson = beakerxJson(path);
      Map<String, String> map = (Map<String, String>) beakerxJson.get(BEAKERX).get(SPARK_OPTIONS);
      if (map != null) {
        map.entrySet().stream()
                .filter(x -> !sparkConf.contains(x.getKey()))
                .forEach(x -> builder.config(x.getKey(), x.getValue()));
      }
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  private Map<String, Map> beakerxJson(Path path) throws IOException {
    String pathToFile = new String(Files.readAllBytes(path), StandardCharsets.UTF_8);
    return toMap(pathToFile);
  }

  private Map<String, Map> toMap(String pathToFile) {
    return (Map<String, Map>) gson.fromJson(pathToFile, Map.class);
  }

  private Map<String, String> getNewSparkConf(SparkConf sparkConf) {
    Map<String, String> result = new HashMap<>();
    Arrays.stream(sparkConf.getAll())
            .filter(x -> !x._1.equals(SPARK_EXTRA_LISTENERS))
            .filter(x -> !x._1.equals(BEAKERX_ID))
            .filter(x -> !x._1.equals(SPARK_APP_NAME))
            .forEach(x -> result.put(x._1, x._2));
    return result;
  }

}
