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
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.message.Message;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
  }

  private Text createExecutorCores() {
    Text cores = new Text();
    cores.setDescription("Executor cores");
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
    Text masterURL = new Text();
    masterURL.setDescription("Executor Memory");
    if (getSparkConf().contains(SPARK_EXECUTOR_MEMORY)) {
      masterURL.setValue(getSparkConf().get(SPARK_EXECUTOR_MEMORY));
    } else {
      masterURL.setValue("8g");
    }
    return masterURL;
  }

  private Text createMasterURL() {
    Text masterURL = new Text();
    masterURL.setDescription("Master URL");
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
  }

  public void applicationEnd() {
    sparkUI.removeStatusPanel();
    active = false;
    sparkUI.addView();
  }

  private HBox createStatusPanel() {
    Label appStatus = createAppStatus();
    Button disconnect = createDisconnectButton();
    return new HBox(Arrays.asList(uiLink(), disconnect, appStatus));
  }

  private Label createAppStatus() {
    Label appStatus = new Label();
    appStatus.setValue("Connected to " + getSparkConf().get("spark.master"));
    return appStatus;
  }

  private Button createDisconnectButton() {
    Button disconnect = new Button();
    disconnect.registerOnClick((content, message) -> getSparkSession().sparkContext().stop());
    disconnect.setDescription("Disconnect");
    return disconnect;
  }

  void startStage(int stageId, int numTasks) {
    SparkStateProgress intProgress = new SparkStateProgress(numTasks, stageId, stageId, jobLink(stageId), stageLink(stageId));
    intProgress.init();
    clearJobPanel();
    jobPanel = createSparkFoldout();
    addSparkJobsToJobPanel(stageId, intProgress);
    jobPanel.display();
  }

  private void addSparkJobsToJobPanel(int stageId, SparkStateProgress intProgress) {
    progressBarMap.put(stageId, intProgress);
    jobPanel.add(intProgress);
  }

  private void clearJobPanel() {
    if (jobPanel != null) {
      jobPanel.getLayout().setDisplayNone();
      jobPanel.close();
    }
  }

  private SparkFoldout createSparkFoldout() {
    Label label = new Label();
    label.setValue("Spark progress");
    SparkFoldout jobPanel = new SparkFoldout();
    jobPanel.add(label);
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

  private HTML uiLink() {
    if (this.sparkManager.sparkContext().uiWebUrl().isDefined()) {
      HTML html = new HTML();
      html.setValue("<a target=\"_blank\" href=\"" + getSparkSession().sparkContext().uiWebUrl().get() + "\">Spark UI" + "</a>");
      return html;
    } else {
      HTML html = new HTML();
      html.setValue("<a target=\"_blank\" href=\"\">Spark UI " + "</a>");
      return html;
    }
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
