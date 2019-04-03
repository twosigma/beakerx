
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

import com.twosigma.beakerx.kernel.BeakerXJsonConfig;
import com.twosigma.beakerx.widget.configuration.SparkConfiguration;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.net.URISyntaxException;
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
import static com.twosigma.beakerx.widget.SparkUiDefaultsImpl.VALUE;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkUiDefaultsImplTest {

  private SparkUiDefaultsImpl sut;
  private Path pathToBeakerxTestJson;
  private final String PROFILE1 = "profile_1";
  private final String PROFILE2 = "profile_2";
  private final String NAME = "name";
  private BeakerXJsonConfig beakerXJson;

  @Before
  public void setUp() throws URISyntaxException {
    Path path = Paths.get(this.getClass().getClassLoader().getResource("beakerxTest.json").toURI());
    this.pathToBeakerxTestJson = path;
    this.beakerXJson = new BeakerXJsonConfig(pathToBeakerxTestJson);
    this.sut = new SparkUiDefaultsImpl(beakerXJson);
  }

  @Test
  public void loadAndSaveWithoutChangesShouldBeIdempotent() throws IOException {
    //given
    HashMap<String, Object> profileConfig = new HashMap<>();
    profileConfig.put(NAME, DEFAULT_PROFILE);
    //when
    sut.loadDefaults();
    sut.saveProfile(profileConfig);
    //then
    Map<String, Map> result = beakerXJson.beakerxJsonAsMap();
    Assertions.assertThat(result.get("beakerx").get("version")).isEqualTo(2);
  }

  @Test
  public void saveMasterURL() {
    //given
    HashMap<String, Object> profileConfig = new HashMap<>();
    profileConfig.put(SPARK_MASTER, "local[4]");
    profileConfig.put(NAME, PROFILE1);
    //when
    sut.saveProfile(profileConfig);
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
    profileConfig.put(NAME, PROFILE1);
    //when
    sut.saveProfile(profileConfig);
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
    profileConfig.put(NAME, PROFILE1);
    //when
    sut.saveProfile(profileConfig);
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
    profileConfig.put(NAME, PROFILE1);
    //when
    sut.saveProfile(profileConfig);
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
    Map<String, Map> beakerxTestJson = beakerXJson.beakerxJsonAsMap().get(BEAKERX);
    List<Map<String, Object>> profiles = (List<Map<String, Object>>) beakerxTestJson.get("spark_options").get("profiles");
    return profiles.stream().filter(x -> x.get(NAME).equals(profileName)).findFirst().orElse(new HashMap<>());
  }

  @Test
  public void saveAndLoadDefaults() {
    //given
    HashMap<String, Object> profileConfig = new HashMap<>();
    profileConfig.put(SPARK_ADVANCED_OPTIONS, Arrays.asList(
            new SparkConfiguration.Configuration("sparkOption2", "3")));
    profileConfig.put(SPARK_MASTER, "local[4]");
    profileConfig.put(NAME, DEFAULT_PROFILE);

    List config = new ArrayList();
    config.add(profileConfig);
    //when
    sut.saveProfile(profileConfig);
    //then
    sut.loadDefaults();
    assertThat(sut.getProperties().get("sparkOption2")).isEqualTo("3");
    assertThat(sut.get(SPARK_MASTER)).isEqualTo("local[4]");
  }

  @Test
  public void createTwoProfiles() {
    //given
    HashMap<String, Object> profileConfig1 = new HashMap<>();
    profileConfig1.put(SPARK_MASTER, "local[4]");
    profileConfig1.put(NAME, PROFILE1);

    HashMap<String, Object> profileConfig2 = new HashMap<>();
    profileConfig2.put(SPARK_MASTER, "local[8]");
    profileConfig2.put(NAME, PROFILE2);
    //when
    sut.saveSparkConf(Arrays.asList(profileConfig1, profileConfig2));
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
    HashMap<String, Object> profileConfig1 = new HashMap<>();
    profileConfig1.put(SPARK_MASTER, "local[4]");
    profileConfig1.put(NAME, PROFILE1);

    HashMap<String, Object> profileConfig2 = new HashMap<>();
    profileConfig2.put(SPARK_MASTER, "local[8]");
    profileConfig2.put(NAME, PROFILE2);
    //when
    sut.saveProfile(profileConfig1);
    sut.saveProfile(profileConfig2);
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
    HashMap<String, Object> profileConfig1 = new HashMap<>();
    profileConfig1.put(SPARK_MASTER, "local[4]");
    profileConfig1.put(NAME, PROFILE1);

    HashMap<String, Object> profileConfig2 = new HashMap<>();
    profileConfig2.put(SPARK_MASTER, "local[8]");
    profileConfig2.put(NAME, PROFILE1);
    //when
    sut.saveProfile(profileConfig1);
    sut.saveProfile(profileConfig2);
    //then
    Map options = getOptions(PROFILE1);
    String prop = (String) options.get(SPARK_MASTER);
    assertThat(prop).isEqualTo("local[8]");
    assertThat(sut.getProfiles().size()).isEqualTo(1);
  }
}