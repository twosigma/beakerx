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
import com.google.gson.internal.LinkedTreeMap;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;
import scala.Tuple2;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.twosigma.beakerx.widget.SparkUI.BEAKERX_ID;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_APP_NAME;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_EXECUTOR_CORES_DEFAULT;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_EXECUTOR_MEMORY_DEFAULT;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_EXTRA_LISTENERS;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_MASTER_DEFAULT;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_ADVANCED_OPTIONS;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_EXECUTOR_CORES;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_EXECUTOR_MEMORY;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_MASTER;

public class SparkUiDefaultsImpl implements SparkUiDefaults {

  public static final String NAME = "name";
  public static final String VALUE = "value";
  public static final String PROPERTIES = "properties";
  public static final String SPARK_OPTIONS = "spark_options";
  public static final String BEAKERX = "beakerx";
  private static final String SPARK_PROFILES = "profiles";
  private static final String CURRENT_PROFILE = "current_profile";
  private static final String CONFIG = "config";

  private List<Map<String, Object>> profiles = new ArrayList<>();
  private Gson gson = new GsonBuilder().setPrettyPrinting().create();
  private Path path;
  private String currentProfile = DEFAULT_PROFILE;

  public SparkUiDefaultsImpl(Path path) {
    this.path = path;
  }

  public void saveSparkConf(List<Map<String, Object>> profiles) {
    try {
      Map<String, Map> map = beakerxJsonAsMap(path);
      Map<String, Object> sparkOptions = (Map<String, Object>) map.get(BEAKERX).getOrDefault(SPARK_OPTIONS, new HashMap<>());
      sparkOptions.put(SPARK_PROFILES, profiles == null ? new ArrayList<>() : profiles);
      map.get(BEAKERX).put(SPARK_OPTIONS, sparkOptions);
      String content = gson.toJson(map);
      Files.write(path, content.getBytes(StandardCharsets.UTF_8));
      this.profiles = profiles;
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void loadDefaults(SparkSession.Builder builder) {
    SparkConf sparkConf = SparkEngineImpl.getSparkConfBasedOn(builder);
    loadProfiles();
    Map<String, Object> map = (Map<String, Object>) getProfileByName(currentProfile).get(CONFIG);
    if (map != null) {
      map.entrySet().stream()
              .filter(x -> !sparkConf.contains(x.getKey()))
              .forEach(x -> addToBuilder(builder, x.getKey(), x.getValue()));
    }
  }

  @Override
  public List<Map<String, Object>> getProfiles() {
    return profiles;
  }

  public Map<String, Object> getProfileByName(String name) {
    Map<String, Object> profile = new HashMap<>();
    return profiles.stream().filter(x -> x.get("name").equals(name)).findFirst().orElse(profile);
  }

  @Override
  public void loadProfiles() {
    Map<String, Map> beakerxJson = beakerxJsonAsMap(path);
    Map sparkOptions = (Map) beakerxJson.get(BEAKERX).getOrDefault(SPARK_OPTIONS, new HashMap<>());
    List<Map<String, Object>> profiles = (List<Map<String, Object>>) sparkOptions.get(SPARK_PROFILES);
    currentProfile = (String) sparkOptions.getOrDefault(CURRENT_PROFILE, DEFAULT_PROFILE);
    if (profiles == null) {
      //save default config if it doesn't exist
      Map<String, Object> defaultProfile = new HashMap<>();
      defaultProfile.put("name", DEFAULT_PROFILE);
      Map config = new HashMap();
      config.put(SPARK_MASTER, SPARK_MASTER_DEFAULT);
      config.put(SPARK_EXECUTOR_CORES, SPARK_EXECUTOR_CORES_DEFAULT);
      config.put(SPARK_EXECUTOR_MEMORY, SPARK_EXECUTOR_MEMORY_DEFAULT);
      config.put(SPARK_ADVANCED_OPTIONS, new ArrayList<>());
      defaultProfile.put(CONFIG, config);
      saveProfile(defaultProfile);
    } else {
      this.profiles = profiles;
    }
  }

  @Override
  public void saveProfile(Map<String, Object> profile) {
    int idx = IntStream.range(0, profiles.size())
            .filter(i -> profile.get("name").equals(profiles.get(i).get("name")))
            .findFirst().orElse(-1);
    if (idx == -1) {
      profiles.add(profile);
    } else {
      profiles.set(idx, profile);
    }
    saveSparkConf(profiles);

  }

  @Override
  public List<String> getProfileNames() {
    return profiles.stream().map(x -> (String) x.get("name")).collect(Collectors.toList());
  }

  @Override
  public void saveProfileName(String profileName) {
    try {
      Map<String, Map> map = beakerxJsonAsMap(path);
      Map<String, Object> sparkOptions = (Map<String, Object>) map.get(BEAKERX).getOrDefault(SPARK_OPTIONS, new HashMap<>());
      sparkOptions.put(CURRENT_PROFILE, profileName);
      map.get(BEAKERX).put(SPARK_OPTIONS, sparkOptions);
      String content = gson.toJson(map);
      Files.write(path, content.getBytes(StandardCharsets.UTF_8));
      currentProfile = profileName;
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @Override
  public String getCurrentProfileName() {
    return currentProfile;
  }

  @Override
  public void removeSparkConf(String profileName) {
    profiles.removeIf(x -> x.get("name").equals(profileName));
    saveSparkConf(profiles);
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
