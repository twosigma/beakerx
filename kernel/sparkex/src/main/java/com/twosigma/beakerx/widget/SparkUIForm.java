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

import com.twosigma.beakerx.message.Message;
import org.apache.spark.SparkConf;

import java.util.ArrayList;
import java.util.List;

import static com.twosigma.beakerx.widget.SparkUI.SPARK_EXECUTOR_CORES;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_EXECUTOR_MEMORY;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_MASTER;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_MASTER_DEFAULT;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

public class SparkUIForm extends VBox {

  static final String CONNECT = "Start";

  private HBox errors;
  private Text masterURL;
  private Text executorMemory;
  private Text executorCores;
  private SparkConfiguration advancedOption;
  private SparkEngine sparkEngine;
  private SparkUI.OnSparkButtonAction onStartAction;
  private Button connectButton;
  private Spinner spinner;
  private HBox spinnerPanel;

  public SparkUIForm(SparkEngine sparkEngine, SparkUI.OnSparkButtonAction onStartAction) {
    super(new ArrayList<>());
    this.sparkEngine = sparkEngine;
    this.onStartAction = onStartAction;
    createSparkView();
  }

  private void createSparkView() {
    this.masterURL = createMasterURL();
    this.executorMemory = createExecutorMemory();
    this.executorCores = createExecutorCores();
    this.addConnectButton(createConnectButton());
    this.add(masterURL);
    this.add(executorCores);
    this.add(executorMemory);
    this.advancedOption = new SparkConfiguration(sparkEngine.getAdvanceSettings(), sparkEngine.sparkVersion());
    this.add(advancedOption);
  }

  private void addConnectButton(Button connect) {
    this.connectButton = connect;
    this.errors = new HBox(new ArrayList<>());
    this.spinnerPanel = new HBox();
    HBox hBox = new HBox(asList(connectButton, spinnerPanel));
    add(new VBox(asList(hBox, this.errors)));
  }

  public void startSpinner(Message parentMessage) {
    this.spinner = new Spinner(parentMessage);
    spinnerPanel.add(spinner, parentMessage);
  }

  public void stopSpinner() {
    spinnerPanel.remove(spinner);
  }

  private SparkConf getSparkConf() {
    return sparkEngine.getSparkConf();
  }

  private Text createMasterURL() {
    Text masterURL = new Text();
    masterURL.setDescription("Master URL");
    masterURL.setDomClasses(new ArrayList<>(asList("bx-spark-config", "bx-spark-master-url")));
    if (getSparkConf().contains(SPARK_MASTER)) {
      masterURL.setValue(getSparkConf().get(SPARK_MASTER));
    } else {
      masterURL.setValue(SPARK_MASTER_DEFAULT);
    }
    return masterURL;
  }

  private Button createConnectButton() {
    Button connect = new Button();
    connect.setDescription(CONNECT);
    connect.registerOnClick((content, message) -> onStartAction.run(message));
    return connect;
  }

  private Text createExecutorMemory() {
    Text memory = new Text();
    memory.setDescription("Executor Memory");
    memory.setDomClasses(new ArrayList<>(asList("bx-spark-config", "bx-spark-executor-memory")));
    if (getSparkConf().contains(SPARK_EXECUTOR_MEMORY)) {
      memory.setValue(getSparkConf().get(SPARK_EXECUTOR_MEMORY));
    } else {
      memory.setValue("8g");
    }
    return memory;
  }

  private Text createExecutorCores() {
    Text cores = new Text();
    cores.setDescription("Executor cores");
    cores.setDomClasses(new ArrayList<>(asList("bx-spark-config", "bx-spark-executor-cores")));
    if (getSparkConf().contains(SPARK_EXECUTOR_CORES)) {
      cores.setValue(getSparkConf().get(SPARK_EXECUTOR_CORES));
    } else {
      cores.setValue("10");
    }
    return cores;
  }

  public Text getMasterURL() {
    return this.masterURL;
  }

  public Text getExecutorMemory() {
    return executorMemory;
  }

  public Text getExecutorCores() {
    return executorCores;
  }

  public List<SparkConfiguration.Configuration> getAdvancedOptions() {
    return this.advancedOption.getConfiguration();
  }

  public void sendError(String message) {
    clearErrors();
    BxHTML label = new BxHTML();
    label.setValue(message);
    Foldout.FoldoutOption foldoutOption = new Foldout.FoldoutOption();
    foldoutOption.headerLabel = "Error";
    Foldout value = new Foldout(singletonList(label), foldoutOption);
    this.errors.add(value);
  }

  public void clearErrors() {
    errors.removeAllChildren();
  }

  public Button getConnectButton() {
    return connectButton;
  }
}
