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
package com.twosigma.beakerx.widget.configuration;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.Button;
import com.twosigma.beakerx.widget.HiveSupport;
import com.twosigma.beakerx.widget.Text;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

public class HiveSupportTest {

  private static final String SPARK_VERSION = "2.3.1";
  private static final Map<String, String> EMPTY_ADVANCED_SETTINGS = new HashMap<>();
  private static final Map<String, String> ADVANCED_SETTINGS_WITH_ONE_ROW = new HashMap<String, String>() {{
    put("name", "value");
  }};

  private static final Map<String, String> ADVANCED_SETTINGS_WITH_HIVE_SUPPORT = new HashMap<String, String>() {{
    put(HiveSupport.CATALOG_IMPLEMENTATION, HiveSupport.HIVE);
  }};

  private KernelTest kernel;
  private Button add;

  @Before
  public void setUp() {
    kernel = new KernelTest();
    KernelManager.register(kernel);
    add = new Button();
  }

  @Test
  public void create() {
    //given
    HiveSupport hive = new HiveSupport("Hive");
    //when
    new SparkConfiguration(EMPTY_ADVANCED_SETTINGS, SPARK_VERSION, hive);
    //then
    assertThat(hive.getValue()).isFalse();
  }

  @Test
  public void createWithHiveAdditionalProperty() {
    //given
    HiveSupport hive = new HiveSupport("Hive");
    //when
    new SparkConfiguration(ADVANCED_SETTINGS_WITH_HIVE_SUPPORT, SPARK_VERSION, hive);
    //then
    assertThat(hive.getValue()).isTrue();
  }

  @Test
  public void enableHiveSupport() {
    //given
    HiveSupport hive = new HiveSupport("Hive");
    SparkConfiguration sparkConfiguration = new SparkConfiguration(ADVANCED_SETTINGS_WITH_HIVE_SUPPORT, SPARK_VERSION, hive);
    //when
    hive.updateValue(false);
    //then
    Optional<SparkConfiguration.Configuration> hiveConf = sparkConfiguration.getConfiguration().stream()
            .filter(x -> x.getName().equals(HiveSupport.CATALOG_IMPLEMENTATION))
            .filter(x -> x.getValue().equals(HiveSupport.HIVE))
            .findFirst();
    assertThat(hiveConf).isNotPresent();
  }

  @Test
  public void disableHiveSupport() {
    //given
    HiveSupport hive = new HiveSupport("Hive");
    SparkConfiguration sparkConfiguration = new SparkConfiguration(EMPTY_ADVANCED_SETTINGS, SPARK_VERSION, hive);
    //when
    hive.updateValue(true);
    //then
    Optional<SparkConfiguration.Configuration> hiveConf = sparkConfiguration.getConfiguration().stream()
            .filter(x -> x.getName().equals(HiveSupport.CATALOG_IMPLEMENTATION))
            .filter(x -> x.getValue().equals(HiveSupport.HIVE))
            .findFirst();
    assertThat(hiveConf).isPresent();
  }

  @Test
  public void disableHiveSupportWhenUpdateNameFromAvailableProperties() {
    //given
    HiveSupport hive = new HiveSupport("Hive");
    List<Text> texts = new ArrayList<>();
    new SparkConfiguration(
            ADVANCED_SETTINGS_WITH_HIVE_SUPPORT,
            SPARK_VERSION,
            hive,
            add,
            (nameWidget, valueWidget, remove) -> {
              texts.add(nameWidget);
              texts.add(valueWidget);
              return new PropertyItem(nameWidget, valueWidget, remove);
            });
    //when
    texts.get(0).updateValue("value1");
    //then
    assertThat(hive.getValue()).isFalse();
  }

  @Test
  public void disableHiveSupportWhenUpdateValueFromAvailableProperties() {
    //given
    HiveSupport hive = new HiveSupport("Hive");
    List<Text> texts = new ArrayList<>();
    new SparkConfiguration(
            ADVANCED_SETTINGS_WITH_HIVE_SUPPORT,
            SPARK_VERSION,
            hive,
            add,
            (nameWidget, valueWidget, remove) -> {
              texts.add(nameWidget);
              texts.add(valueWidget);
              return new PropertyItem(nameWidget, valueWidget, remove);
            });
    //when
    texts.get(1).updateValue("value1");
    //then
    assertThat(hive.getValue()).isFalse();
  }

  @Test
  public void enableHiveSupportWhenUpdateRowToHiveSupportInAvailableProperties() {
    //given
    HiveSupport hive = new HiveSupport("Hive");
    List<Text> texts = new ArrayList<>();
    new SparkConfiguration(
            ADVANCED_SETTINGS_WITH_ONE_ROW,
            SPARK_VERSION,
            hive,
            add,
            (nameWidget, valueWidget, remove) -> {
              texts.add(nameWidget);
              texts.add(valueWidget);
              return new PropertyItem(nameWidget, valueWidget, remove);
            });
    //when
    texts.get(0).updateValue(HiveSupport.CATALOG_IMPLEMENTATION);
    texts.get(1).updateValue(HiveSupport.HIVE);
    //then
    assertThat(hive.getValue()).isTrue();
  }

  @Test
  public void disableHiveSupportWhenRemoveFromAvailableProperties() {
    //given
    HiveSupport hive = new HiveSupport("Hive");
    List<Button> removeButton = new ArrayList<>();
    new SparkConfiguration(
            ADVANCED_SETTINGS_WITH_HIVE_SUPPORT,
            SPARK_VERSION,
            hive,
            add,
            (nameWidget, valueWidget, remove) -> {
              removeButton.add(remove);
              return new PropertyItem(nameWidget, valueWidget, remove);
            });
    //when
    removeButton.get(0).onClick(new HashMap(), new Message(new Header(JupyterMessages.COMM_MSG, "s1")));
    //then
    assertThat(hive.getValue()).isFalse();
  }

  @Test
  public void enableHiveSupportWhenAddedFromAvailableProperties() {
    //given
    HiveSupport hive = new HiveSupport("Hive");
    List<Text> texts = new ArrayList<>();
    new SparkConfiguration(
            EMPTY_ADVANCED_SETTINGS,
            SPARK_VERSION,
            hive,
            add,
            (nameWidget, valueWidget, remove) -> {
              texts.add(nameWidget);
              texts.add(valueWidget);
              return new PropertyItem(nameWidget, valueWidget, remove);
            });
    add.onClick(new HashMap(), new Message(new Header(JupyterMessages.COMM_MSG, "s1")));
    //when
    texts.get(0).updateValue(HiveSupport.CATALOG_IMPLEMENTATION);
    texts.get(1).updateValue(HiveSupport.HIVE);
    //then
    assertThat(hive.getValue()).isTrue();
  }

}