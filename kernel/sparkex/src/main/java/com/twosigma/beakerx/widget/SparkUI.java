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

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.message.Message;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.kernel.PlainCode.createSimpleEvaluationObject;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

public class SparkUI extends VBox implements SparkUIApi {

  public static final String SPARK_REPL_CLASS_OUTPUT_DIR = "spark.repl.class.outputDir";
  public static final String SPARK_APP_NAME = "spark.app.name";
  public static final String SPARK_MASTER = "spark.master";
  public static final String SPARK_EXECUTOR_MEMORY = "spark.executor.memory";
  public static final String SPARK_EXECUTOR_CORES = "spark.executor.cores";
  public static final String SPARK_EXTRA_LISTENERS = "spark.extraListeners";
  public static final String BEAKERX_ID = "beakerx.id";
  public static final List<String> STANDARD_SETTINGS = Arrays.asList(SPARK_MASTER, SPARK_EXECUTOR_MEMORY, SPARK_EXECUTOR_CORES, SPARK_APP_NAME, BEAKERX_ID, SPARK_EXTRA_LISTENERS, SPARK_REPL_CLASS_OUTPUT_DIR);
  public static final String VIEW_NAME_VALUE = "SparkUIView";
  public static final String MODEL_NAME_VALUE = "SparkUIModel";
  static final String SPARK_SESSION_NAME = "spark";
  static final String CONNECT = "Start";
  private static final String SPARK_MASTER_DEFAULT = "local[*]";
  public static final String SPARK_APP_ID = "sparkAppId";

  private VBox sparkConfig;
  private VBox sparkConfigPanel;
  private Button connectButton;
  private HBox statusPanel;
  private Map<Integer, SparkStateProgress> progressBarMap = new HashMap<>();
  private Text masterURL;
  private Text executorMemory;
  private Text executorCores;
  private SparkConfiguration advancedOption;
  private boolean active = false;
  private SparkFoldout jobPanel = null;
  private Message currentParentHeader = null;

  private SparkEngine sparkEngine;
  private SparkUiDefaults sparkUiDefaults;

  SparkUI(SparkSession.Builder builder, SparkEngine.SparkEngineFactory sparkEngineFactory, SparkUiDefaults sparkUiDefaults) {
    super(new ArrayList<>());
    this.sparkUiDefaults = sparkUiDefaults;
    this.sparkUiDefaults.loadDefaults(builder);
    this.sparkEngine = sparkEngineFactory.create(builder);
    this.sparkConfig = new VBox(new ArrayList<>());
    this.sparkConfigPanel = new VBox(singletonList(sparkConfig));
    add(sparkConfigPanel);
    SparkVariable.putSparkUI(this);
    createSparkView();
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

  private void createSparkView() {
    this.masterURL = createMasterURL();
    this.executorMemory = createExecutorMemory();
    this.executorCores = createExecutorCores();
    this.addConnectButton(createConnectButton());
    this.addMasterUrl(masterURL);
    this.addExecutorCores(executorCores);
    this.addExecutorMemory(executorMemory);
    this.advancedOption = new SparkConfiguration(sparkEngine.getAdvanceSettings());
    this.addAdvanceOptions(advancedOption);
    this.sendUpdate("sparkDefaultMasterUrl", SPARK_MASTER_DEFAULT);
  }

  private Text createExecutorCores() {
    Text cores = new Text();
    cores.setDescription("Executor cores");
    cores.setDomClasses(new ArrayList<>(Arrays.asList("bx-spark-executor-cores")));
    if (getSparkConf().contains(SPARK_EXECUTOR_CORES)) {
      cores.setValue(getSparkConf().get(SPARK_EXECUTOR_CORES));
    } else {
      cores.setValue("10");
    }
    return cores;
  }

  private SparkConf getSparkConf() {
    return sparkEngine.getSparkConf();
  }

  private Text createExecutorMemory() {
    Text memory = new Text();
    memory.setDescription("Executor Memory");
    memory.setDomClasses(new ArrayList<>(Arrays.asList("bx-spark-executor-memory")));
    if (getSparkConf().contains(SPARK_EXECUTOR_MEMORY)) {
      memory.setValue(getSparkConf().get(SPARK_EXECUTOR_MEMORY));
    } else {
      memory.setValue("8g");
    }
    return memory;
  }

  private Text createMasterURL() {
    Text masterURL = new Text();
    masterURL.setDescription("Master URL");
    masterURL.setDomClasses(new ArrayList<>(Arrays.asList("bx-spark-master-url")));
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
    connect.registerOnClick((content, message) -> initSparkContext(message));
    return connect;
  }

  private void initSparkContext(Message parentMessage) {
    KernelFunctionality kernel = KernelManager.get();
    try {
      TryResult configure = sparkEngine.configure(kernel, this, parentMessage);
      if (configure.isError()) {
        sendError(parentMessage, kernel, configure.error());
      } else {
        active = true;
        saveSparkConf(sparkEngine.getSparkConf());
      }
    } catch (Exception e) {
      sendError(parentMessage, kernel, e.getMessage());
    }
  }

  private SparkSession getSparkSession() {
    return sparkEngine.getOrCreate();
  }

  private void sendError(Message parentMessage, KernelFunctionality kernel, String message) {
    SimpleEvaluationObject seo = createSimpleEvaluationObject("", kernel, parentMessage, 1);
    seo.error(message);
  }

  public void applicationStart() {
    clearView();
    addStatusPanel(createStatusPanel());
    sendUpdate(SPARK_APP_ID, sparkEngine.getSparkAppId());
    sendUpdate("sparkUiWebUrl", sparkEngine.getSparkUiWebUrl());
    sendUpdate("sparkMasterUrl", sparkEngine.getSparkMasterUrl());
  }

  public void applicationEnd() {
    removeStatusPanel();
    active = false;
    addView();
  }

  private HBox createStatusPanel() {
    Label appStatus = createAppStatus();
    Button disconnect = createDisconnectButton();
    HBox connectionPanel = new HBox(Arrays.asList(appStatus, disconnect));
    connectionPanel.setDomClasses(new ArrayList<>(Arrays.asList("bx-status-panel")));
    return connectionPanel;
  }

  private Label createAppStatus() {
    Label appStatus = new Label();
    appStatus.setValue("Connected");
    appStatus.setDomClasses(new ArrayList<>(Arrays.asList("bx-connection-status", "connected")));
    return appStatus;
  }

  private Button createDisconnectButton() {
    Button disconnect = new Button();
    disconnect.registerOnClick((content, message) -> getSparkSession().sparkContext().stop());
    disconnect.setDomClasses(new ArrayList<>(Arrays.asList("bx-button", "icon-close")));
    return disconnect;
  }

  public void startStage(int stageId, int numTasks) {
    if (isStartStageFromNewCell()) {
      jobPanel = createSparkFoldout(jobPanel);
    }
    SparkStateProgress intProgress = new SparkStateProgress(numTasks, stageId, stageId, jobLink(stageId), stageLink(stageId));
    intProgress.init();
    jobPanel.add(intProgress);
    progressBarMap.put(stageId, intProgress);
  }

  private boolean isStartStageFromNewCell() {
    return InternalVariable.getParentHeader() != currentParentHeader;
  }

  private SparkFoldout createSparkFoldout(SparkFoldout oldJobPanel) {
    currentParentHeader = InternalVariable.getParentHeader();

    if (oldJobPanel != null) {
      oldJobPanel.getLayout().setDisplayNone();
      oldJobPanel.close();
    }
    SparkFoldout.FoldoutOption foldoutOption = new SparkFoldout.FoldoutOption();
    foldoutOption.headerLabel = "Spark progress";
    SparkFoldout jobPanel = new SparkFoldout(new ArrayList<>(), foldoutOption);
    jobPanel.display();
    return jobPanel;
  }

  public void endStage(int stageId) {
    SparkStateProgress sparkStateProgress = progressBarMap.get(stageId);
    sparkStateProgress.hide();
  }

  public void taskStart(int stageId, long taskId) {
    SparkStateProgress intProgress = progressBarMap.get(stageId);
    intProgress.addActive();
  }

  public void taskEnd(int stageId, long taskId) {
    SparkStateProgress intProgress = progressBarMap.get(stageId);
    intProgress.addDone();
  }

  private String stageLink(int stageId) {
    if (getSparkSession().sparkContext().uiWebUrl().isDefined()) {
      return getSparkSession().sparkContext().uiWebUrl().get() + "/stages/stage/?id=" + stageId + "&attempt=0";
    } else {
      return "";
    }
  }

  private String jobLink(int jobId) {
    if (getSparkSession().sparkContext().uiWebUrl().isDefined()) {
      return getSparkSession().sparkContext().uiWebUrl().get() + "/jobs/job/?id=" + jobId;
    } else {
      return "";
    }
  }

  public void cancelAllJobs() {
    getSparkSession().sparkContext().cancelAllJobs();
  }

  @Override
  public boolean isActive() {
    return active;
  }

  public Text getMasterURL() {
    return masterURL;
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
    remove(sparkConfigPanel);
    sparkConfigPanel = null;
  }

  public void addView() {
    this.sparkConfigPanel = new VBox(asList(sparkConfig));
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

  void saveSparkConf(SparkConf sparkConf) {
    sparkUiDefaults.saveSparkConf(sparkConf);
  }

  public interface SparkUIFactory {
    SparkUI create(SparkSession.Builder builder);
  }

  public static class SparkUIFactoryImpl implements SparkUIFactory {
    SparkEngine.SparkEngineFactory sparkEngineFactory;
    SparkUiDefaults sparkUiDefaults;

    public SparkUIFactoryImpl(SparkEngine.SparkEngineFactory sparkEngineFactory, SparkUiDefaults sparkUiDefaults) {
      this.sparkEngineFactory = sparkEngineFactory;
      this.sparkUiDefaults = sparkUiDefaults;
    }

    @Override
    public SparkUI create(SparkSession.Builder builder) {
      return new SparkUI(builder, sparkEngineFactory, sparkUiDefaults);
    }
  }
}
