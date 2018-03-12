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
import org.apache.spark.SparkContext;
import org.apache.spark.scheduler.SparkListener;
import org.apache.spark.scheduler.SparkListenerJobEnd;
import org.apache.spark.scheduler.SparkListenerJobStart;
import org.apache.spark.scheduler.SparkListenerStageCompleted;
import org.apache.spark.scheduler.SparkListenerStageSubmitted;
import org.apache.spark.scheduler.SparkListenerTaskEnd;
import org.apache.spark.scheduler.SparkListenerTaskStart;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.twosigma.beakerx.kernel.PlainCode.createSimpleEvaluationObject;
import static java.util.Arrays.asList;

public class SparkContextManager {

  public static final String SPARK_MASTER = "spark.master";
  public static final String SPARK_EXECUTOR_MEMORY = "spark.executor.memory";
  public static final String SPARK_APP_NAME = "spark.app.name";
  public static final String SPARK_CORES_MAX = "spark.cores.max";
  public static final String SPARK_EXECUTOR_CORES = "spark.executor.cores";

  private final SparkUI sparkUI;
  private SparkContext sparkContext;
  private final SparkConf sparkConf;
  private Map<Integer, VBox> jobs = new HashMap<>();
  private Map<Integer, IntProgress> progressBars = new HashMap<>();
  private Map<Integer, Label> labels = new HashMap<>();
  private VBox jobPanel = null;
  private Label appStatus;
  private Button disconnect;
  private HBox statusPanel;
  private VBox sparkView;
  private Text masterURL;
  private Text executorMemory;
  private Text sparkContextAlias;
  private Text executorCores;

  public SparkContextManager(SparkUI sparkUI, SparkConf sparkConf) {
    SparkVariable.putSparkContextManager(sparkConf, this);
    this.sparkUI = sparkUI;
    this.sparkConf = sparkConf;
    this.sparkView = createSparkView();
  }

  private VBox createSparkView() {
    this.masterURL = createMasterURL();
    this.executorMemory = createExecutorMemory();
    this.executorCores = createExecutorCores();
    this.sparkContextAlias = sparkContextAlias();
    Button connect = createConnectButton();
    ArrayList<Widget> children = new ArrayList<>();
    children.add(masterURL);
    children.add(executorCores);
    children.add(executorMemory);
    children.add(sparkContextAlias);
    children.add(connect);
    VBox vBox = new VBox(children);
    this.sparkUI.add(vBox);
    return vBox;
  }

  private Text createExecutorCores() {
    Text cores = new Text();
    cores.setDescription("Executor cores");
    if (this.sparkConf.contains(SPARK_EXECUTOR_CORES)) {
      cores.setValue(this.sparkConf.get(SPARK_EXECUTOR_CORES));
    } else {
      cores.setValue("10");
    }
    return cores;
  }

  private Text sparkContextAlias() {
    Text alias = new Text();
    alias.setDescription("SparkContext alias");
    alias.setValue("sc");
    return alias;
  }

  private Text createExecutorMemory() {
    Text masterURL = new Text();
    masterURL.setDescription("Executor Memory");
    if (this.sparkConf.contains(SPARK_EXECUTOR_MEMORY)) {
      masterURL.setValue(this.sparkConf.get(SPARK_EXECUTOR_MEMORY));
    } else {
      masterURL.setValue("8g");
    }
    return masterURL;
  }

  private Text createMasterURL() {
    Text masterURL = new Text();
    masterURL.setDescription("Master URL");
    if (this.sparkConf.contains(SPARK_MASTER)) {
      masterURL.setValue(this.sparkConf.get(SPARK_MASTER));
    }
    return masterURL;
  }

  private Button createConnectButton() {
    Button connect = new Button();
    connect.setDescription("Connect");
    connect.registerOnClick((content, message) -> initSparkContext(sparkConf, message));
    return connect;
  }

  private void initSparkContext(SparkConf sparkConf, Message parentMessage) {
    KernelFunctionality kernel = KernelManager.get();
    try {
      configureSparkConf(sparkConf);
      SparkContext sparkContext = new SparkContext(sparkConf);
      sparkContext = addListener(sparkContext);
      this.sparkContext = sparkContext;
      SparkVariable.putSparkContext(this.sparkContext);
      TryResult tryResult = initSparkContextInShell(kernel);
      if (tryResult.isError()) {
        sendError(parentMessage, kernel, tryResult.error());
      }
    } catch (Exception e) {
      sendError(parentMessage, kernel, e.getMessage());
    }
  }

  private void configureSparkConf(SparkConf sparkConf) {
    if (!sparkConf.contains(SPARK_APP_NAME)) {
      sparkConf.setAppName("beaker_" + UUID.randomUUID().toString());
    }
    if (masterURL.getValue() != null && !masterURL.getValue().isEmpty()) {
      sparkConf.set(SPARK_MASTER, masterURL.getValue());
    }
    if (!isLocalSpark(sparkConf)) {
      sparkConf.set("spark.repl.class.outputDir", KernelManager.get().getOutDir());
    }
    if (executorMemory.getValue() != null && !executorMemory.getValue().isEmpty()) {
      sparkConf.set(SPARK_EXECUTOR_MEMORY, executorMemory.getValue());
    }

    if (executorCores.getValue() != null && !executorCores.getValue().isEmpty()) {
      sparkConf.set(SPARK_EXECUTOR_CORES, executorCores.getValue());
    }

    if (!sparkConf.contains(SPARK_CORES_MAX)) {
      sparkConf.set(SPARK_CORES_MAX, "100");
    }
  }

  private static boolean isLocalSpark(SparkConf sparkConf) {
    return sparkConf.contains(SPARK_MASTER) && sparkConf.get(SPARK_MASTER) != null && sparkConf.get("spark.master").startsWith("local");
  }

  private TryResult initSparkContextInShell(KernelFunctionality kernel) {
    if (sparkContextAlias.getValue() == null || sparkContextAlias.getValue().isEmpty()) {
      throw new RuntimeException("SparkContext alias can not be empty");
    }
    String addSc = String.format(
            "import com.twosigma.beakerx.widget.SparkVariable\n" +
                    "var %s = SparkVariable.getSparkContext()\n",
            sparkContextAlias.getValue());
    SimpleEvaluationObject seo = createSimpleEvaluationObject(addSc, kernel, new Message(), 1);
    return kernel.executeCode(addSc, seo);
  }

  private void sendError(Message parentMessage, KernelFunctionality kernel, String message) {
    SimpleEvaluationObject seo = createSimpleEvaluationObject("", kernel, parentMessage, 1);
    seo.error(message);
  }

  private SparkContext addListener(SparkContext sc) {
    sc.addSparkListener(new SparkListener() {

      @Override
      public void onJobStart(SparkListenerJobStart jobStart) {
        super.onJobStart(jobStart);
        startJob(jobStart.jobId());
      }

      @Override
      public void onJobEnd(SparkListenerJobEnd jobEnd) {
        super.onJobEnd(jobEnd);
        endJob(jobEnd.jobId());
      }

      @Override
      public void onStageSubmitted(SparkListenerStageSubmitted stageSubmitted) {
        super.onStageSubmitted(stageSubmitted);
        startStage(stageSubmitted.stageInfo().stageId(), stageSubmitted.stageInfo().numTasks());
      }

      @Override
      public void onStageCompleted(SparkListenerStageCompleted stageCompleted) {
        super.onStageCompleted(stageCompleted);
        endStage(stageCompleted.stageInfo().stageId());
      }

      @Override
      public void onTaskStart(SparkListenerTaskStart taskStart) {
        super.onTaskStart(taskStart);
      }

      @Override
      public void onTaskEnd(SparkListenerTaskEnd taskEnd) {
        super.onTaskEnd(taskEnd);
        taskEnd(taskEnd.stageId(), taskEnd.taskInfo().taskId());
      }
    });
    return sc;
  }

  public void applicationStart() {
    sparkUI.removeDOMWidget(sparkView);
    sparkView = null;
    statusPanel = createStatusPanel();
  }

  public void applicationEnd() {
    if (statusPanel != null) {
      clearSparkContextVariable();
      sparkUI.removeDOMWidget(statusPanel);
      statusPanel = null;
      this.sparkView = createSparkView();
    }
  }

  private void clearSparkContextVariable() {
    KernelFunctionality kernel = KernelManager.get();
    String addSc = String.format("var %s = null\n", sparkContextAlias.getValue());
    SimpleEvaluationObject seo = createSimpleEvaluationObject(addSc, kernel, new Message(), 1);
    kernel.executeCode(addSc, seo);
  }

  private HBox createStatusPanel() {
    appStatus = createAppStatus();
    disconnect = createDisconnectButton();
    HBox statusPanel = new HBox(Arrays.asList(uiLink(), disconnect, appStatus));
    sparkUI.add(statusPanel);
    return statusPanel;
  }

  private Label createAppStatus() {
    Label appStatus = new Label();
    appStatus.setValue("Connected to " + sparkConf.get("spark.master"));
    return appStatus;
  }

  private Button createDisconnectButton() {
    Button disconnect = new Button();
    disconnect.registerOnClick((content, message) -> {
      sparkContext.stop();
      sparkContext = null;
    });
    disconnect.setDescription("Disconnect");
    return disconnect;
  }

  private void startJob(int jobId) {
    jobPanel = createJobPanel();
    VBox job = createJob(jobId);
    jobs.put(jobId, job);
    jobPanel.add(job);
    jobPanel.display();
  }

  private VBox createJobPanel() {
    VBox jobPanel = new VBox(new ArrayList<>());
    return jobPanel;
  }

  private VBox createJob(int jobId) {
    HTML jobLink = jobLink(jobId);
    List<Widget> jobItems = new ArrayList<>();
    jobItems.add(jobLink);
    return new VBox(jobItems);
  }

  private void endJob(int jobId) {

  }

  private void startStage(int stageId, int numTasks) {
    IntProgress intProgress = new IntProgress(0, numTasks, 1);
    intProgress.setBarStyle(IntProgress.BarStyle.INFO);
    Label label = new Label();
    label.setValue(intProgress.getValue() + "/" + intProgress.getMax());
    VBox job = jobs.get(stageId);
    HBox stageWithProgress = new HBox(asList(stageLink(stageId), intProgress, label));
    stageWithProgress.getLayout().setMargin("0 0 0 40px");
    job.add(stageWithProgress);
    progressBars.put(stageId, intProgress);
    labels.put(stageId, label);
  }

  private void endStage(int stageId) {
    IntProgress intProgress = progressBars.get(stageId);
    intProgress.setBarStyle(IntProgress.BarStyle.SUCCESS);
    jobPanel.getLayout().setDisplayNone();
    jobPanel.close();
    jobPanel = null;
  }

  private void taskEnd(int stageId, long taskId) {
    IntProgress intProgress = progressBars.get(stageId);
    intProgress.setValue(intProgress.getValue() + 1);
    labels.get(stageId).setValue(intProgress.getValue() + "/" + intProgress.getMax());
  }

  private HTML uiLink() {
    if (sparkContext.uiWebUrl().isDefined()) {
      HTML html = new HTML();
      html.setValue("<a target=\"_blank\" href=\"" + sparkContext.uiWebUrl().get() + "\">Spark UI" + "</a>");
      return html;
    } else {
      HTML html = new HTML();
      html.setValue("<a target=\"_blank\" href=\"\">Spark UI " + "</a>");
      return html;
    }
  }

  private HTML stageLink(int stageId) {
    if (sparkContext.uiWebUrl().isDefined()) {
      HTML html = new HTML();
      html.setValue("<a target=\"_blank\" href=\"" + sparkContext.uiWebUrl().get() + "/stages/stage/?id=" + stageId + "&attempt=0\">Stage " + stageId + "</a>");
      return html;
    } else {
      HTML html = new HTML();
      html.setValue("<a target=\"_blank\" href=\"\">Spark job " + stageId + "</a>");
      return html;
    }
  }

  private HTML jobLink(int jobId) {
    if (sparkContext.uiWebUrl().isDefined()) {
      HTML html = new HTML();
      html.setValue("<a target=\"_blank\" href=\"" + sparkContext.uiWebUrl().get() + "/jobs/job/?id=" + jobId + "\">Spark job " + jobId + "</a>");
      return html;
    } else {
      HTML html = new HTML();
      html.setValue("<a target=\"_blank\" href=\"\">Spark job " + jobId + "</a>");
      return html;
    }
  }

  public void cancelAllJobs() {
    if (this.sparkContext != null) {
      this.sparkContext.cancelAllJobs();
    }
  }
}
