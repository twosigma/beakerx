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
import scala.Tuple2;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.widget.SparkUI.BEAKERX_ID;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_APP_NAME;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_EXTRA_LISTENERS;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_EXECUTOR_CORES;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_EXECUTOR_MEMORY;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_MASTER;

public class SparkUiDefaultsImpl implements SparkUiDefaults {

  public static final String NAME = "name";
  public static final String VALUE = "value";
  public static final String PROPERTIES = "properties";
  public static final String SPARK_OPTIONS = "spark_options";
  public static final String BEAKERX = "beakerx";
  private Gson gson = new GsonBuilder().setPrettyPrinting().create();
  private Path path;

  public SparkUiDefaultsImpl(Path path) {
    this.path = path;
  }

  @Override
  @SuppressWarnings("unchecked")
  public void saveSparkConf(SparkConf sparkConf) {
    Map<String, Object> newSparkConf = toMap(sparkConf);
    try {
      Map<String, Map> map = beakerxJsonAsMap(path);
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
    Map<String, Map> beakerxJson = beakerxJsonAsMap(path);
    Map<String, Object> map = getOptions(beakerxJson);
    if (map != null) {
      map.entrySet().stream()
              .filter(x -> !sparkConf.contains(x.getKey()))
              .forEach(x -> addToBuilder(builder, x.getKey(), x.getValue()));
    }
  }

  @SuppressWarnings("unchecked")
  private void addToBuilder(SparkSession.Builder builder, String key, Object value) {
    if (isOneOfMainProp(key)) {
      builder.config(key, (String) value);
    } else if (key.equals(PROPERTIES)) {
      List<Map<String, String>> props = (List<Map<String, String>>) value;
      props.forEach(x -> builder.config(x.get(NAME), x.get(VALUE)));
    }
  }

  @SuppressWarnings("unchecked")
  private Map<String, Object> getOptions(Map<String, Map> beakerxJson) {
    return (Map<String, Object>) beakerxJson.get(BEAKERX).get(SPARK_OPTIONS);
  }

  private boolean isOneOfMainProp(String key) {
    return key.equals(SPARK_MASTER) || key.equals(SPARK_EXECUTOR_MEMORY) || key.equals(SPARK_EXECUTOR_CORES);
  }

  @SuppressWarnings("unchecked")
  Map<String, Map> beakerxJsonAsMap(Path path) {
    String jsonAsString = null;
    try {
      jsonAsString = new String(Files.readAllBytes(path), StandardCharsets.UTF_8);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    return (Map<String, Map>) gson.fromJson(jsonAsString, Map.class);
  }

  private Map<String, Object> toMap(SparkConf sparkConf) {
    Map<String, Object> result = new HashMap<>();
    Arrays.stream(sparkConf.getAll())
            .filter(x -> !x._1.equals(SPARK_EXTRA_LISTENERS))
            .filter(x -> !x._1.equals(BEAKERX_ID))
            .filter(x -> !x._1.equals(SPARK_APP_NAME))
            .forEach(x -> addToMap(result, x));
    return result;
  }

  private void addToMap(Map<String, Object> result, Tuple2<String, String> x) {
    if (isOneOfMainProp(x._1)) {
      result.put(x._1, x._2);
    } else {
      List<Map<String, String>> props = getProps(result);
      Map<String, String> e = new HashMap<>();
      e.put(NAME, x._1);
      e.put(VALUE, x._2);
      props.add(e);
    }
  }

  @SuppressWarnings("unchecked")
  private List<Map<String, String>> getProps(Map<String, Object> result) {
    Object propsAsObject = result.get(PROPERTIES);
    if (propsAsObject == null) {
      List<Map<String, String>> props = new ArrayList<>();
      result.put(PROPERTIES, props);
      return props;
    }
    return (List<Map<String, String>>) propsAsObject;
  }

}
