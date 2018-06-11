
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
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_EXECUTOR_CORES;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_EXECUTOR_MEMORY;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_MASTER;
import static com.twosigma.beakerx.widget.SparkUiDefaultsImpl.BEAKERX;
import static com.twosigma.beakerx.widget.SparkUiDefaultsImpl.NAME;
import static com.twosigma.beakerx.widget.SparkUiDefaultsImpl.PROPERTIES;
import static com.twosigma.beakerx.widget.SparkUiDefaultsImpl.SPARK_OPTIONS;
import static com.twosigma.beakerx.widget.SparkUiDefaultsImpl.VALUE;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkUiDefaultsImplTest {

  private SparkUiDefaultsImpl sut;
  private Path pathToBeakerxTestJson;

  @Before
  public void setUp() {
    String path = this.getClass().getClassLoader().getResource("beakerxTest.json").getPath();
    this.pathToBeakerxTestJson = Paths.get(path);
    this.sut = new SparkUiDefaultsImpl(pathToBeakerxTestJson);
  }

  @Test
  public void saveMasterURL() {
    //given
    SparkConf sparkConf = new SparkConf();
    sparkConf.set(SPARK_MASTER, "local[4]");
    //when
    sut.saveSparkConf(sparkConf);
    //then
    Map options = getOptions();
    String prop = (String) options.get(SPARK_MASTER);
    assertThat(prop).isEqualTo("local[4]");
  }

  @Test
  public void saveExecutorMemory() {
    //given
    SparkConf sparkConf = new SparkConf();
    sparkConf.set(SPARK_EXECUTOR_MEMORY, "8g");
    //when
    sut.saveSparkConf(sparkConf);
    //then
    Map options = getOptions();
    String prop = (String) options.get(SPARK_EXECUTOR_MEMORY);
    assertThat(prop).isEqualTo("8g");
  }

  @Test
  public void saveCores() {
    //given
    SparkConf sparkConf = new SparkConf();
    sparkConf.set(SPARK_EXECUTOR_CORES, "10");
    //when
    sut.saveSparkConf(sparkConf);
    //then
    Map options = getOptions();
    String prop = (String) options.get(SPARK_EXECUTOR_CORES);
    assertThat(prop).isEqualTo("10");
  }

  @Test
  public void saveAsProp() {
    //given
    SparkConf sparkConf = new SparkConf();
    sparkConf.set("sparkOption2", "sp2");
    //when
    sut.saveSparkConf(sparkConf);
    //then
    List<Object> props = getProps();
    assertThat(props).isNotEmpty();
    Map prop = (Map) props.get(0);
    assertThat(prop.get(NAME)).isEqualTo("sparkOption2");
    assertThat(prop.get(VALUE)).isEqualTo("sp2");
  }

  @SuppressWarnings("unchecked")
  private List<Object> getProps() {
    Map options = getOptions();
    return (List<Object>) options.get(PROPERTIES);
  }

  @SuppressWarnings("unchecked")
  private Map getOptions() {
    Map<String, Map> beakerxTestJson = sut.beakerxJsonAsMap(this.pathToBeakerxTestJson).get(BEAKERX);
    return beakerxTestJson.get(SPARK_OPTIONS);
  }

  @Test
  public void saveAndLoadDefaults() {
    //given
    SparkConf sparkConf = new SparkConf();
    sparkConf.set("sparkOption2", "sp2");
    sparkConf.set(SPARK_MASTER, "local[4]");
    //when
    sut.saveSparkConf(sparkConf);
    //then
    SparkSession.Builder builder = SparkSession.builder();
    sut.loadDefaults(builder);
    SparkConf sparkConfBasedOn = SparkEngineImpl.getSparkConfBasedOn(builder);
    assertThat(sparkConfBasedOn.get("sparkOption2")).isEqualTo("sp2");
    assertThat(sparkConfBasedOn.get(SPARK_MASTER)).isEqualTo("local[4]");
  }
}