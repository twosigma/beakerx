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
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.msg.StacktraceHtmlPrinter;
import com.twosigma.beakerx.message.Message;
import org.apache.spark.sql.SparkSession;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Arrays.asList;

public class SparkUI extends VBox implements SparkUIApi {

  public static final String ONE_SPARK_SESSION_MSG_ERROR = "Cannot have more than one Spark session open in the same notebook.";

  public static final String VIEW_NAME_VALUE = "SparkUIView";
  public static final String MODEL_NAME_VALUE = "SparkUIModel";
  public static final String SPARK_MASTER_DEFAULT = "local[*]";
  private static final String SPARK_APP_ID = "sparkAppId";
  public static final String ERROR_CREATING_SPARK_SESSION = "Error creating SparkSession, see the console log for more explanation";
  public static final String SPARK_EXECUTOR_CORES_DEFAULT = "10";
  public static final String SPARK_EXECUTOR_MEMORY_DEFAULT = "8g";
  public static final Map<String, String> SPARK_ADVANCED_OPTIONS_DEFAULT = new HashMap<>();


  private final SparkUIForm sparkUIForm;
  private VBox sparkUIFormPanel;
  private HBox statusPanel;
  private Map<Integer, SparkStateProgress> progressBarMap = new HashMap<>();
  private SparkFoldout jobPanel = null;
  private Message currentParentHeader = null;
  private SparkEngine sparkEngine;
  private SparkUiDefaults sparkUiDefaults;
  private SingleSparkSession singleSparkSession;

  SparkUI(SparkSession.Builder builder, SparkEngine.SparkEngineFactory sparkEngineFactory, SparkUiDefaults sparkUiDefaults, SingleSparkSession singleSparkSession) {
    super(new ArrayList<>());
    this.sparkUiDefaults = sparkUiDefaults;
    this.singleSparkSession = singleSparkSession;
    this.sparkUiDefaults.loadDefaults(builder);
    this.sparkEngine = sparkEngineFactory.create(builder);
    this.sparkUIFormPanel = new VBox(new ArrayList<>());
    add(sparkUIFormPanel);
    SparkVariable.putSparkUI(this);
    this.sparkUIForm = new SparkUIForm(sparkEngine, sparkUiDefaults, this::initSparkContext);
    this.sparkUIFormPanel.add(sparkUIForm);
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

  @Override
  public void startSpinner(Message parentMessage) {
    this.sparkUIForm.startSpinner(parentMessage);
  }

  @Override
  public void stopSpinner() {
    this.sparkUIForm.stopSpinner();
  }


  private void initSparkContext(Message parentMessage) {
    this.sparkUIForm.clearErrors();
    KernelFunctionality kernel = KernelManager.get();
    if (singleSparkSession.isActive()) {
      this.sparkUIForm.sendError(StacktraceHtmlPrinter.printRedBold(ONE_SPARK_SESSION_MSG_ERROR));
    } else {
      SparkVariable.putSparkUI(this);
      configureSparkContext(parentMessage, kernel);
    }
  }

  private void configureSparkContext(Message parentMessage, KernelFunctionality kernel) {
    try {
      TryResult configure = sparkEngine.configure(kernel, this, parentMessage);
      if (configure.isError()) {
        this.sparkUIForm.sendError(StacktraceHtmlPrinter.printRedBold(ERROR_CREATING_SPARK_SESSION));
      } else {
        singleSparkSession.active();
        sparkUIForm.saveDefaults();
        applicationStart();
      }
    } catch (Exception e) {
      this.sparkUIForm.sendError(StacktraceHtmlPrinter.printRedBold(e.getMessage()));
    }
  }

  private SparkSession getSparkSession() {
    return sparkEngine.getOrCreate();
  }

  private void applicationStart() {
    clearSparkUIFormPanel();
    this.statusPanel = new SparkUIStatus(message -> getSparkSession().sparkContext().stop());
    add(this.statusPanel);
    sendUpdate(SPARK_APP_ID, sparkEngine.getSparkAppId());
    sendUpdate("sparkUiWebUrl", sparkEngine.getSparkUiWebUrl());
    sendUpdate("sparkMasterUrl", sparkEngine.getSparkMasterUrl());
  }

  @Override
  public void applicationEnd() {
    removeStatusPanel();
    singleSparkSession.inActive();
    addSparkUIFormPanel();
  }

  private void removeStatusPanel() {
    if (statusPanel != null) {
      remove(statusPanel);
      statusPanel = null;
    }
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

  public Text getMasterURL() {
    return this.sparkUIForm.getMasterURL();
  }

  public Text getExecutorMemory() {
    return this.sparkUIForm.getExecutorMemory();
  }

  public Text getExecutorCores() {
    return this.sparkUIForm.getExecutorCores();
  }

  public List<SparkConfiguration.Configuration> getAdvancedOptions() {
    return this.sparkUIForm.getAdvancedOptions();
  }

  private void clearSparkUIFormPanel() {
    if (sparkUIFormPanel != null) {
      remove(sparkUIFormPanel);
      sparkUIFormPanel = null;
    }
  }

  private void addSparkUIFormPanel() {
    if (sparkUIFormPanel == null) {
      this.sparkUIFormPanel = new VBox(asList(this.sparkUIForm));
      add(sparkUIFormPanel);
    }
  }

  public Button getConnectButton() {
    return this.sparkUIForm.getConnectButton();
  }

  public interface SparkUIFactory {
    SparkUI create(SparkSession.Builder builder);
  }

  public static class SparkUIFactoryImpl implements SparkUIFactory {
    SparkEngine.SparkEngineFactory sparkEngineFactory;
    SparkUiDefaults sparkUiDefaults;
    private SingleSparkSession singleSparkSession;

    public SparkUIFactoryImpl(SparkEngine.SparkEngineFactory sparkEngineFactory, SparkUiDefaults sparkUiDefaults, SingleSparkSession singleSparkSession) {
      this.sparkEngineFactory = sparkEngineFactory;
      this.sparkUiDefaults = sparkUiDefaults;
      this.singleSparkSession = singleSparkSession;
    }

    @Override
    public SparkUI create(SparkSession.Builder builder) {
      return new SparkUI(builder, sparkEngineFactory, sparkUiDefaults, singleSparkSession);
    }
  }

  @FunctionalInterface
  public interface OnSparkButtonAction {
    void run(Message message);
  }
}
