
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

import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;
import org.junit.Before;
import org.junit.Test;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_ADVANCED_OPTIONS;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_EXECUTOR_CORES;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_EXECUTOR_MEMORY;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_MASTER;
import static com.twosigma.beakerx.widget.SparkUiDefaults.DEFAULT_PROFILE;
import static com.twosigma.beakerx.widget.SparkUiDefaultsImpl.BEAKERX;
import static com.twosigma.beakerx.widget.SparkUiDefaultsImpl.PROPERTIES;
import static com.twosigma.beakerx.widget.SparkUiDefaultsImpl.SPARK_OPTIONS;
import static com.twosigma.beakerx.widget.SparkUiDefaultsImpl.VALUE;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkUiDefaultsImplTest {

  private SparkUiDefaultsImpl sut;
  private Path pathToBeakerxTestJson;
  private final String PROFILE1 = "profile_1";
  private final String PROFILE2 = "profile_2";
  private final String NAME = "name";
  private final String SPARK_OPT = "spark_options";

  @Before
  public void setUp() {
    String path = this.getClass().getClassLoader().getResource("beakerxTest.json").getPath();
    this.pathToBeakerxTestJson = Paths.get(path);
    this.sut = new SparkUiDefaultsImpl(pathToBeakerxTestJson);
  }

  @Test
  public void saveMasterURL() {
    //given
    HashMap<String, Object> profileConfig = new HashMap<>();
    profileConfig.put(SPARK_MASTER, "local[4]");
    Map<String, Object> profile = new HashMap<>();
    profile.put(NAME, PROFILE1);
    profile.put(SPARK_OPT, profileConfig);
    //when
    sut.saveProfile(profile);
    //then
    Map options = getOptions(PROFILE1);
    String prop = (String) options.get(SPARK_MASTER);
    assertThat(prop).isEqualTo("local[4]");
  }

  @Test
  public void saveExecutorMemory() {
    //given
    HashMap<String, Object> profileConfig = new HashMap<>();
    profileConfig.put(SPARK_EXECUTOR_MEMORY, "8g");
    Map<String, Object> profile = new HashMap<>();
    profile.put(NAME, PROFILE1);
    profile.put(SPARK_OPT, profileConfig);
    //when
    sut.saveProfile(profile);
    //then
    Map options = getOptions(PROFILE1);
    String prop = (String) options.get(SPARK_EXECUTOR_MEMORY);
    assertThat(prop).isEqualTo("8g");
  }

  @Test
  public void saveCores() {
    //given
    HashMap<String, Object> profileConfig = new HashMap<>();
    profileConfig.put(SPARK_EXECUTOR_CORES, "10");
    Map<String, Object> profile = new HashMap<>();
    profile.put(NAME, PROFILE1);
    profile.put(SPARK_OPT, profileConfig);
    //when
    sut.saveProfile(profile);
    //then
    Map options = getOptions(PROFILE1);
    String prop = (String) options.get(SPARK_EXECUTOR_CORES);
    assertThat(prop).isEqualTo("10");
  }

  @Test
  public void saveAsProp() {
    //given
    HashMap<String, Object> profileConfig = new HashMap<>();
    profileConfig.put(SPARK_ADVANCED_OPTIONS, Arrays.asList(
            new SparkConfiguration.Configuration("sparkOption2", "sp2")));
    Map<String, Object> profile = new HashMap<>();
    profile.put(NAME, PROFILE1);
    profile.put(SPARK_OPT, profileConfig);
    //when
    sut.saveProfile(profile);
    //then
    List<Object> props = getProps();
    assertThat(props).isNotEmpty();
    Map prop = (Map) props.get(0);
    assertThat(prop.get(NAME)).isEqualTo("sparkOption2");
    assertThat(prop.get(VALUE)).isEqualTo("sp2");
  }

  @SuppressWarnings("unchecked")
  private List<Object> getProps() {
    Map options = getOptions(PROFILE1);
    return (List<Object>) options.get(PROPERTIES);
  }

  @SuppressWarnings("unchecked")
  private Map getOptions(String profileName) {
    return getOptions(profileName, this.pathToBeakerxTestJson);
  }

  private Map getOptions(String profileName, Path path) {
    Map<String, Map> beakerxTestJson = sut.beakerxJsonAsMap(path).get(BEAKERX);
    List<Map<String, Object>> profiles = (List<Map<String, Object>>) beakerxTestJson.get("spark_profiles");
    return profiles.stream().filter(x -> x.get(NAME).equals(profileName)).map(x -> (Map) x.get(SPARK_OPTIONS)).findFirst().orElse(null);
  }

  @Test
  public void saveAndLoadDefaults() {
    //given
    HashMap<String, Object> profileConfig = new HashMap<>();
    profileConfig.put(SPARK_ADVANCED_OPTIONS, Arrays.asList(
            new SparkConfiguration.Configuration("sparkOption2", "sp2")));
    profileConfig.put(SPARK_MASTER, "local[4]");
    Map<String, Object> profile = new HashMap<>();
    profile.put(NAME, DEFAULT_PROFILE);
    profile.put(SPARK_OPT, profileConfig);

    List config = new ArrayList();
    config.add(profile);
    //when
    sut.saveProfile(profile);
    //then
    SparkSession.Builder builder = SparkSession.builder();
    sut.loadDefaults(builder);
    SparkConf sparkConfBasedOn = SparkEngineImpl.getSparkConfBasedOn(builder);
    assertThat(sparkConfBasedOn.get("sparkOption2")).isEqualTo("sp2");
    assertThat(sparkConfBasedOn.get(SPARK_MASTER)).isEqualTo("local[4]");
  }

  @Test
  public void createTwoProfiles() {
    //given
    Map<String, Object> profile1 = new HashMap<>();
    HashMap<String, Object> profileConfig1 = new HashMap<>();
    profileConfig1.put(SPARK_MASTER, "local[4]");
    profile1.put(NAME, PROFILE1);
    profile1.put(SPARK_OPT, profileConfig1);


    Map<String, Object> profile2 = new HashMap<>();
    HashMap<String, Object> profileConfig2 = new HashMap<>();
    profileConfig2.put(SPARK_MASTER, "local[8]");
    profile2.put(NAME, PROFILE2);
    profile2.put(SPARK_OPT, profileConfig2);
    //when
    sut.saveSparkConf(Arrays.asList(profile1, profile2));
    //then
    Map options1 = getOptions(PROFILE1);
    Map options2 = getOptions(PROFILE2);
    String prop1 = (String) options1.get(SPARK_MASTER);
    String prop2 = (String) options2.get(SPARK_MASTER);
    assertThat(prop1).isEqualTo("local[4]");
    assertThat(prop2).isEqualTo("local[8]");
    assertThat(sut.getProfiles().size()).isEqualTo(2);
  }

  @Test
  public void removeProfile() {
    //given
    Map<String, Object> profile1 = new HashMap<>();
    HashMap<String, Object> profileConfig1 = new HashMap<>();
    profileConfig1.put(SPARK_MASTER, "local[4]");
    profile1.put(NAME, PROFILE1);
    profile1.put(SPARK_OPT, profileConfig1);

    Map<String, Object> profile2 = new HashMap<>();
    HashMap<String, Object> profileConfig2 = new HashMap<>();
    profileConfig2.put(SPARK_MASTER, "local[8]");
    profile2.put(NAME, PROFILE2);
    profile2.put(SPARK_OPT, profileConfig2);
    //when
    sut.saveProfile(profile1);
    sut.saveProfile(profile2);
    sut.removeSparkConf(PROFILE1);
    //then
    Map options2 = getOptions(PROFILE2);
    String prop2 = (String) options2.get(SPARK_MASTER);
    assertThat(prop2).isEqualTo("local[8]");
    assertThat(sut.getProfiles().size()).isEqualTo(1);
  }

  @Test
  public void overwriteProfile() {
    //given
    Map<String, Object> profile1 = new HashMap<>();
    HashMap<String, Object> profileConfig1 = new HashMap<>();
    profileConfig1.put(SPARK_MASTER, "local[4]");
    profile1.put(NAME, PROFILE1);
    profile1.put(SPARK_OPT, profileConfig1);

    Map<String, Object> profile2 = new HashMap<>();
    HashMap<String, Object> profileConfig2 = new HashMap<>();
    profileConfig2.put(SPARK_MASTER, "local[8]");
    profile2.put(NAME, PROFILE1);
    profile2.put(SPARK_OPT, profileConfig2);
    //when
    sut.saveProfile(profile1);
    sut.saveProfile(profile2);
    //then
    Map options = getOptions(PROFILE1);
    String prop = (String) options.get(SPARK_MASTER);
    assertThat(prop).isEqualTo("local[8]");
    assertThat(sut.getProfiles().size()).isEqualTo(1);
  }
}