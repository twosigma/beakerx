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
import org.apache.spark.sql.SparkSession;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.kernel.PlainCode.createSimpleEvaluationObject;

public class SparkUIManager {

  public static final String SPARK_MASTER = "spark.master";
  public static final String SPARK_EXECUTOR_MEMORY = "spark.executor.memory";

  public static final String SPARK_EXECUTOR_CORES = "spark.executor.cores";
  public static final String SPARK_SESSION_NAME = "spark";
  public static final String CONNECT = "Connect";
  private static final String SPARK_MASTER_DEFAULT = "local[*]";

  private final SparkUI sparkUI;
  private Map<Integer, SparkStateProgress> progressBars = new HashMap<>();
  private HBox statusPanel;
  private Text masterURL;
  private Text executorMemory;
  private Text executorCores;

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
    this.sparkUI.addMasterUrl(masterURL);
    this.sparkUI.addExecutorCores(executorCores);
    this.sparkUI.addExecutorMemory(executorMemory);
    this.sparkUI.addConnectButton(createConnectButton());
  }

  private Text createExecutorCores() {
    Text cores = new Text();
    cores.setDescription("Executor cores");
    if (sparkManager.getSparkConf().contains(SPARK_EXECUTOR_CORES)) {
      cores.setValue(sparkManager.getSparkConf().get(SPARK_EXECUTOR_CORES));
    } else {
      cores.setValue("10");
    }
    return cores;
  }

  private Text createExecutorMemory() {
    Text masterURL = new Text();
    masterURL.setDescription("Executor Memory");
    if (sparkManager.getSparkConf().contains(SPARK_EXECUTOR_MEMORY)) {
      masterURL.setValue(sparkManager.getSparkConf().get(SPARK_EXECUTOR_MEMORY));
    } else {
      masterURL.setValue("8g");
    }
    return masterURL;
  }

  private Text createMasterURL() {
    Text masterURL = new Text();
    masterURL.setDescription("Master URL");
    if (sparkManager.getSparkConf().contains(SPARK_MASTER)) {
      masterURL.setValue(sparkManager.getSparkConf().get(SPARK_MASTER));
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
    statusPanel = createStatusPanel();
  }

  public void applicationEnd() {
    if (statusPanel != null) {
      sparkUI.removeDOMWidget(statusPanel);
      statusPanel = null;
      active = false;
      createSparkView();
    }
  }

  private HBox createStatusPanel() {
    Label appStatus = createAppStatus();
    Button disconnect = createDisconnectButton();
    HBox statusPanel = new HBox(Arrays.asList(uiLink(), disconnect, appStatus));
    sparkUI.add(statusPanel);
    return statusPanel;
  }

  private Label createAppStatus() {
    Label appStatus = new Label();
    appStatus.setValue("Connected to " + this.sparkManager.getSparkConf().get("spark.master"));
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
    if (jobPanel != null) {
      jobPanel.getLayout().setDisplayNone();
      jobPanel.close();
    }

    Label label = new Label();
    label.setValue("Spark progress");

    jobPanel = new SparkFoldout();
    jobPanel.add(label);
    jobPanel.add(intProgress);
    jobPanel.display();
    progressBars.put(stageId, intProgress);
  }

  void endStage(int stageId) {
    SparkStateProgress sparkStateProgress = progressBars.get(stageId);
    sparkStateProgress.hide();
  }

  void taskStart(int stageId, long taskId) {
    SparkStateProgress intProgress = progressBars.get(stageId);
    intProgress.addActive();
  }

  void taskEnd(int stageId, long taskId) {
    SparkStateProgress intProgress = progressBars.get(stageId);
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
}
