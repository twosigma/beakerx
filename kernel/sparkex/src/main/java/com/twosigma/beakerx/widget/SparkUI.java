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
import com.twosigma.beakerx.kernel.restserver.BeakerXServer;
import com.twosigma.beakerx.kernel.restserver.Context;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.configuration.SparkConfiguration;
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
  public static final String PUT_SPARK_JOBS_IN_THE_BACKGROUND = "putSparkJobsInTheBackground";
  public static final String CANCELLED_SPARK_JOBS = "cancelledSparkJobs";


  private final SparkUIForm sparkUIForm;
  private HBox statusPanel;
  private Map<Integer, SparkStateGroupPanel> progressBarMap = new HashMap<>();
  private SparkFoldout jobPanel = null;
  private Message currentParentHeader = null;
  private SparkEngineWithUI sparkEngine;
  private SparkUiDefaults sparkUiDefaults;
  private SingleSparkSession singleSparkSession;

  SparkUI(SparkEngineWithUI sparkEngine, SparkUiDefaults sparkUiDefaults, SingleSparkSession singleSparkSession) {
    super(new ArrayList<>());
    this.sparkUiDefaults = sparkUiDefaults;
    this.sparkEngine = sparkEngine;
    this.singleSparkSession = singleSparkSession;
    VBox sparkUIFormPanel = new VBox(new ArrayList<>());
    add(sparkUIFormPanel);
    SparkVariable.putSparkUI(this);
    this.sparkUIForm = new SparkUIForm(sparkEngine, sparkUiDefaults, this::initSparkContext);
    sparkUIFormPanel.add(sparkUIForm);
    this.configureRESTMapping();
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
      this.sparkUIForm.setAllToDisabled();
      TryResult configure = sparkEngine.configure(kernel, this, parentMessage);
      if (configure.isError()) {
        this.sparkUIForm.sendError(StacktraceHtmlPrinter.printRedBold(ERROR_CREATING_SPARK_SESSION));
        this.sparkUIForm.setAllToEnabled();
      } else {
        singleSparkSession.active();
        sparkUIForm.saveDefaults();
        sparkUIForm.getConnectButton().setDomClasses(asList("hidden"));
        sparkUiDefaults.saveProfileName(sparkUIForm.getProfileName());
        applicationStart();
      }
    } catch (Exception e) {
      this.sparkUIForm.setAllToEnabled();
      this.sparkUIForm.sendError(StacktraceHtmlPrinter.printRedBold(e.getMessage()));
    }
  }

  private SparkSession getSparkSession() {
    return sparkEngine.getOrCreate();
  }

  private void applicationStart() {
    this.statusPanel = new SparkUIStatus(() -> getSparkSession().sparkContext().stop());
    this.sparkUIForm.setDomClasses(new ArrayList<>(asList("bx-disabled")));
    add(0, this.statusPanel);
    sendUpdate(SPARK_APP_ID, sparkEngine.getSparkAppId());
    sendUpdate("sparkUiWebUrl", sparkEngine.getSparkUiWebUrl());
    sendUpdate("sparkMasterUrl", sparkEngine.getSparkMasterUrl());
  }

  @Override
  public void applicationEnd() {
    this.sparkUIForm.setDomClasses(new ArrayList<>());
    this.sparkUIForm.setAllToEnabled();
    removeStatusPanel();
    singleSparkSession.inActive();
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
    Widget xButton = createCancelledJobsButton(stageId);
    Widget bkgButton = createBkgJobsButton(stageId);
    SparkStateGroupPanel sparkProgressDecorator = new SparkStateGroupPanel(intProgress, asList(xButton, bkgButton));
    jobPanel.add(sparkProgressDecorator);
    progressBarMap.put(stageId, sparkProgressDecorator);
  }

  private Widget createBkgJobsButton(int stageId) {
    BeakerXServer beakerXServer = KernelManager.get().getBeakerXServer();
    RESTButton bkgButton = new RESTButton(beakerXServer.getURL() + PUT_SPARK_JOBS_IN_THE_BACKGROUND);
    bkgButton.setTooltip("put spark job in the background, let it complete asynchronously");
    bkgButton.setDomClasses(new ArrayList<>(asList("bx-button", "icon-bg")));
    return bkgButton;
  }

  private Widget createCancelledJobsButton(int stageId) {
    BeakerXServer beakerXServer = KernelManager.get().getBeakerXServer();
    RESTButton xButton = new RESTButton(beakerXServer.getURL() + CANCELLED_SPARK_JOBS + "/" + stageId);
    xButton.setTooltip("interrupt spark job");
    xButton.setDomClasses(new ArrayList<>(asList("bx-button", "icon-close")));
    return xButton;
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
    SparkStateGroupPanel decorator = progressBarMap.get(stageId);
    decorator.getSparkStateProgress().hide();
  }

  public void taskStart(int stageId, long taskId) {
    SparkStateGroupPanel decorator = progressBarMap.get(stageId);
    decorator.getSparkStateProgress().addActive();
  }

  public void taskEnd(int stageId, long taskId) {
    SparkStateGroupPanel decorator = progressBarMap.get(stageId);
    decorator.getSparkStateProgress().addDone();
  }

  public void taskCancelled(int stageId, long taskId) {
    SparkStateGroupPanel decorator = progressBarMap.get(stageId);
    decorator.getSparkStateProgress().addCancelled();
  }

  private String stageLink(int stageId) {
    return this.sparkEngine.stageLink(stageId);
  }

  private String jobLink(int jobId) {
    return this.sparkEngine.jobLink(jobId);
  }

  public void cancelAllJobs() {
    getSparkSession().sparkContext().cancelAllJobs();
  }

  public Text getMasterURL() {
    return this.sparkUIForm.getMasterURL();
  }

  public boolean getHiveSupport() {
    return this.sparkUIForm.getHiveSupport().getValue();
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

  public Button getConnectButton() {
    return this.sparkUIForm.getConnectButton();
  }

  public void afterDisplay(Message parent) {
    if (this.sparkEngine.isAutoStart()) {
      getConnectButton().onClick(new HashMap(), parent);
    }
  }

  public interface SparkUIFactory {
    SparkUIApi create(SparkSession.Builder builder, SparkEngineWithUI sparkEngineWithUI, SparkUiDefaults sparkUiDefaults);
  }

  public static class SparkUIFactoryImpl implements SparkUIFactory {
    private SingleSparkSession singleSparkSession;

    public SparkUIFactoryImpl(SingleSparkSession singleSparkSession) {
      this.singleSparkSession = singleSparkSession;
    }

    @Override
    public SparkUI create(SparkSession.Builder builder, SparkEngineWithUI sparkEngine, SparkUiDefaults sparkUiDefaults) {
      return new SparkUI(sparkEngine, sparkUiDefaults, singleSparkSession);
    }
  }

  @FunctionalInterface
  public interface OnSparkButtonAction {
    void run(Message message);
  }

  @FunctionalInterface
  public interface OnSparkRestButtonAction {
    void run();
  }

  private void configureRESTMapping() {
    KernelFunctionality kernel = KernelManager.get();
    BeakerXServer beakerXServer = kernel.getBeakerXServer();
    beakerXServer.addPostMapping(PUT_SPARK_JOBS_IN_THE_BACKGROUND,
            (Context ctx) -> kernel.putEvaluationInToBackground());
    beakerXServer.addPostMapping(CANCELLED_SPARK_JOBS + "/:stageid",
            (Context ctx) -> getSparkSession().sparkContext().cancelStage(Integer.parseInt(ctx.param("stageid"))));
  }

}
