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

import org.apache.spark.sql.SparkSession;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;

import static com.twosigma.beakerx.widget.StartStopSparkListener.START_STOP_SPARK_LISTENER;

public class SparkUI extends VBox {

  public static final String SPARK_EXTRA_LISTENERS = "spark.extraListeners";
  public static final String VIEW_NAME_VALUE = "SparkUIView";
  public static final String MODEL_NAME_VALUE = "SparkUIModel";
  public static final String BEAKERX_ID = "beakerx.id";

  private final SparkUIManager sparkUIManager;

  private VBox sparkConfig;
  private VBox sparkConfigPanel;
  private Button connectButton;
  private HBox statusPanel;

  private static SparkUI create(SparkManager sparkManager) {
    return new SparkUI(sparkManager);
  }

  private SparkUI(SparkManager sparkManager) {
    super(new ArrayList<>());
    configureSparkSessionBuilder(sparkManager.getBuilder());
    this.sparkConfig = new VBox(new ArrayList<>());
    this.sparkConfigPanel = new VBox(Arrays.asList(sparkConfig));
    add(sparkConfigPanel);
    this.sparkUIManager = new SparkUIManager(this, sparkManager);
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }

  @Override
  public String getModelModuleValue() {
    return BeakerxWidget.MODEL_MODULE_VALUE;
  }

  @Override
  public String getViewModuleValue() {
    return BeakerxWidget.VIEW_MODULE_VALUE;
  }

  private SparkSession.Builder configureSparkSessionBuilder(SparkSession.Builder builder) {
    builder.config(SPARK_EXTRA_LISTENERS, START_STOP_SPARK_LISTENER);
    builder.config(BEAKERX_ID, UUID.randomUUID().toString());
    return builder;
  }

  public boolean isSparkSessionIsActive() {
    return sparkUIManager.isActive();
  }

  public void addMasterUrl(Text masterURL) {
    sparkConfig.add(masterURL);
  }

  public void addExecutorCores(Text executorCores) {
    sparkConfig.add(executorCores);
  }

  public void addExecutorMemory(Text executorMemory) {
    sparkConfig.add(executorMemory);
  }

  public void addConnectButton(Button connect) {
    this.connectButton = connect;
    sparkConfig.add(connectButton);
  }

  public void clearView() {
    sparkConfigPanel.getLayout().setDisplayNone();
    sparkConfigPanel = null;
  }

  public void addView() {
    this.sparkConfigPanel = new VBox(Arrays.asList(sparkConfig));
    add(sparkConfigPanel);
  }

  public Button getConnectButton() {
    return connectButton;
  }

  public void addAdvanceOptions(SparkConfiguration advancedOption) {
    this.sparkConfig.add(advancedOption);
  }

  public void addStatusPanel(HBox statusPanel) {
    this.statusPanel = statusPanel;
    add(statusPanel);
  }

  public void removeStatusPanel() {
    if (statusPanel != null) {
      removeDOMWidget(statusPanel);
      statusPanel = null;
    }
  }

  public interface SparkUIFactory {
    SparkUI create(SparkManager sparkManager);
  }

  public static class SparkUIFactoryImpl implements SparkUIFactory {
    @Override
    public SparkUI create(SparkManager sparkManager) {
      return SparkUI.create(sparkManager);
    }
  }
}
