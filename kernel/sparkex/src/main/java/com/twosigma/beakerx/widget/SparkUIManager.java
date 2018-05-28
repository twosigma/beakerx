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

import java.util.*;

import static com.twosigma.beakerx.kernel.PlainCode.createSimpleEvaluationObject;

public class SparkUIManager {

  public static final String SPARK_MASTER = "spark.master";
  public static final String SPARK_EXECUTOR_MEMORY = "spark.executor.memory";

  public static final String SPARK_EXECUTOR_CORES = "spark.executor.cores";
  public static final String SPARK_SESSION_NAME = "spark";
  public static final String CONNECT = "Start";
  private static final String SPARK_MASTER_DEFAULT = "local[*]";

  private final SparkUI sparkUI;
  private Map<Integer, SparkStateProgress> progressBarMap = new HashMap<>();
  private Text masterURL;
  private Text executorMemory;
  private Text executorCores;
  private SparkConfiguration advancedOption;
  private boolean active = false;
  private SparkManager sparkManager;
  private SparkFoldout jobPanel = null;
  private Message currentParentHeader = null;

  public SparkUIManager(SparkUI sparkUI, SparkManager sparkManager) {
    this.sparkUI = sparkUI;
    this.sparkManager = sparkManager;
    SparkVariable.putSparkUIManager(this);
    createSparkView();
  }

  private void createSparkView() {
    this.masterURL = createMasterURL();
    this.executorMemory = createExecutorMemory();
    this.executorCores = createExecutorCores();
    this.sparkUI.addConnectButton(createConnectButton());
    this.sparkUI.addMasterUrl(masterURL);
    this.sparkUI.addExecutorCores(executorCores);
    this.sparkUI.addExecutorMemory(executorMemory);
    this.advancedOption = new SparkConfiguration();
    this.sparkUI.addAdvanceOptions(advancedOption);
    this.sparkUI.sendUpdate("sparkDefaultMasterUrl", SPARK_MASTER_DEFAULT);
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
    List<SparkConfiguration.Configuration> list = (this.advancedOption != null) ? this.advancedOption.getConfiguration() : Collections.EMPTY_LIST;
    return sparkManager.getSparkConf(list);
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
      TryResult configure = sparkManager.configure(kernel, this, parentMessage);
      if (configure.isError()) {
        sendError(parentMessage, kernel, configure.error());
      } else {
        active = true;
      }
    } catch (Exception e) {
      sendError(parentMessage, kernel, e.getMessage());
    }
  }

  private SparkSession getSparkSession() {
    return sparkManager.getOrCreate();
  }

  private void sendError(Message parentMessage, KernelFunctionality kernel, String message) {
    SimpleEvaluationObject seo = createSimpleEvaluationObject("", kernel, parentMessage, 1);
    seo.error(message);
  }

  public void applicationStart() {
    sparkUI.clearView();
    sparkUI.addStatusPanel(createStatusPanel());
    sparkUI.sendUpdate("sparkAppId", sparkManager.getSparkAppId());
    sparkUI.sendUpdate("sparkUiWebUrl", sparkManager.getSparkUiWebUrl());
    sparkUI.sendUpdate("sparkMasterUrl", sparkManager.getSparkMasterUrl());
  }

  public void applicationEnd() {
    sparkUI.removeStatusPanel();
    active = false;
    sparkUI.addView();
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

  void startStage(int stageId, int numTasks) {
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

  void endStage(int stageId) {
    SparkStateProgress sparkStateProgress = progressBarMap.get(stageId);
    sparkStateProgress.hide();
  }

  void taskStart(int stageId, long taskId) {
    SparkStateProgress intProgress = progressBarMap.get(stageId);
    intProgress.addActive();
  }

  void taskEnd(int stageId, long taskId) {
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
}
