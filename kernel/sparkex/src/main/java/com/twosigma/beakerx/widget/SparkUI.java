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
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.restserver.BeakerXServer;
import com.twosigma.beakerx.kernel.restserver.Context;
import com.twosigma.beakerx.message.Message;
import org.apache.spark.sql.SparkSession;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.kernel.comm.BxComm.createComm;
import static com.twosigma.beakerx.widget.SparkUiDefaultsImpl.CURRENT_PROFILE;
import static com.twosigma.beakerx.widget.SparkUiDefaultsImpl.SPARK_PROFILES;
import static java.util.Arrays.asList;

public class SparkUI extends VBox implements SparkUIApi {

  public static final String ONE_SPARK_SESSION_MSG_ERROR = "Cannot have more than one Spark session open in the same notebook.";

  public static final String VIEW_NAME_VALUE = "SparkUI2View";
  public static final String MODEL_NAME_VALUE = "SparkUI2Model";
  public static final String PUT_SPARK_JOBS_IN_THE_BACKGROUND = "putSparkJobsInTheBackground";
  public static final String CANCELLED_SPARK_JOBS = "cancelledSparkJobs";
  public static final String SPARK_APP_ID = "sparkAppId";
  public static final String SPARK_UI_WEB_URL = "sparkUiWebUrl";
  public static final String START = "start";
  public static final String IS_AUTO_START = "is_auto_start";
  public static final String USER_SPARK_CONF = "user_spark_conf";

  private final KernelFunctionality kernel;
  private SparkEngineWithUI sparkEngine;
  private SparkUiDefaults sparkUiDefaults;
  private SingleSparkSession singleSparkSession;
  private Message currentParentHeader = null;
  private SparkFoldout jobPanel = null;
  private Map<Integer, SparkStateGroupPanel> progressBarMap = new HashMap<>();

  public SparkUI(Comm comm, SparkEngineWithUI sparkEngine, SparkUiDefaults sparkUiDefaults, SingleSparkSession singleSparkSession, KernelFunctionality kernel) {
    super(comm, new ArrayList<>());
    this.sparkUiDefaults = sparkUiDefaults;
    this.sparkEngine = sparkEngine;
    this.singleSparkSession = singleSparkSession;
    this.kernel = kernel;
    getComm().addMsgCallbackList((Handler<Message>) this::handleMessage);
    SparkVariable.putSparkUI(this);
    this.configureRESTMapping();
    openComm();
  }

  public SparkUI(SparkEngineWithUI sparkEngine, SparkUiDefaults sparkUiDefaults, SingleSparkSession singleSparkSession) {
    this(createComm(), sparkEngine, sparkUiDefaults, singleSparkSession, KernelManager.get());
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    this.sparkUiDefaults.loadProfiles();
    super.content(content);
    content.put(SPARK_PROFILES, this.sparkUiDefaults.getProfiles());
    content.put(CURRENT_PROFILE, this.sparkUiDefaults.getCurrentProfileName());
    content.put(IS_AUTO_START, this.sparkEngine.isAutoStart());
    content.put(USER_SPARK_CONF, this.getUserSparkConf());
    return content;
  }

  private Map getUserSparkConf() {
    Map<String, Object> spark_options = sparkUiDefaults.getProfileByName(sparkUiDefaults.getCurrentProfileName());
    spark_options.putAll(this.sparkEngine.getSparkEngineConf().getConfigs());
    spark_options.putAll(this.sparkEngine.getSparkConfAsMap());
    return spark_options;
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
  public void afterDisplay(Message parent) {
    if (this.sparkEngine.isAutoStart()) {
      handleAutoStart(parent);
    }
  }

  private void handleMessage(Message message) {
    Map data = (Map) message.getContent().get("data");
    Map content = (Map) data.get("content");
    String event = (String) content.get("event");
    if (event.equals("start")) {
      handleStartEvent(content, message);
    } else if (event.equals("stop")) {
      handleStopEvent();
    } else if (event.equals("save_profiles")) {
      handleSaveProfilesEvent(content);
    }
  }

  private void handleStopEvent() {
    sparkEngine.stop();
  }

  private void handleAutoStart(Message message) {
    Map<String, Object> spark_options = sparkUiDefaults.getProfileByName(sparkUiDefaults.getCurrentProfileName());
    TryResult tryResult = initSparkContext(message, spark_options);
    if (tryResult.isError()) {
      sendError(tryResult.error());
    } else {
      sendStartDoneEvent("auto_start");
    }
  }

  private void handleStartEvent(Map content, Message message) {
    Map payload = (Map) content.get("payload");
    Map spark_options = (Map) payload.get("spark_options");
    TryResult tryResult = initSparkContext(message, spark_options);
    if (tryResult.isError()) {
      sendError(tryResult.error());
    } else {
      String current_profile = (String) payload.get("current_profile");
      sparkUiDefaults.saveCurrentProfileName(current_profile);
      sendStartDoneEvent(START);
    }
  }

  private void sendStartDoneEvent(String event) {
    getComm().sendData("event", new HashMap<String, String>() {
      {
        put(event, "done");
        put(SPARK_APP_ID, sparkEngine.getSparkAppId());
        put(SPARK_UI_WEB_URL, sparkEngine.getSparkUiWebUrl());
      }
    });
  }

  private void handleSaveProfilesEvent(Map content) {
    List payload = (List) content.get("payload");
    this.sparkUiDefaults.saveProfiles(payload);
    getComm().sendData("event", new HashMap<String, String>() {
      {
        put("save_profiles", "done");
      }
    });
  }

  private TryResult initSparkContext(Message parentMessage, Map sparkOptions) {
    KernelFunctionality kernel = KernelManager.get();
    if (singleSparkSession.isActive()) {
      return TryResult.createError(ONE_SPARK_SESSION_MSG_ERROR);
    } else {
      SparkVariable.putSparkUI(this);
      return configureSparkContext(parentMessage, kernel, sparkOptions);
    }
  }

  private TryResult configureSparkContext(Message parentMessage, KernelFunctionality kernel, Map sparkOptions) {
    try {
      TryResult configure = sparkEngine.configure(kernel, this, parentMessage, sparkOptions);
      if (configure.isError()) {
        return TryResult.createError(configure.error());
      } else {
        singleSparkSession.activate();
        applicationStart();
        return TryResult.createResult("done");
      }
    } catch (Exception e) {
      return TryResult.createError(e.toString());
    }
  }

  private void sendError(String text) {
    getComm().sendData("error", new HashMap<String, String>() {
      {
        put("message", text);
      }
    });
  }

  private void applicationStart() {
  }

  @Override
  public void applicationEnd() {
    singleSparkSession.inActivate();
    getComm().sendData("event", new HashMap<String, String>() {
      {
        put(sparkEngine.getStopContext(), "done");
      }
    });
  }

  @Override
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

  @Override
  public void endStage(int stageId) {
    SparkStateGroupPanel decorator = progressBarMap.get(stageId);
    decorator.getSparkStateProgress().hide();

  }

  @Override
  public void taskStart(int stageId, long taskId) {
    SparkStateGroupPanel decorator = progressBarMap.get(stageId);
    decorator.getSparkStateProgress().addActive();
  }

  @Override
  public void taskEnd(int stageId, long taskId) {
    SparkStateGroupPanel decorator = progressBarMap.get(stageId);
    decorator.getSparkStateProgress().addDone();
  }

  @Override
  public void taskCancelled(int stageId, long taskId) {
    SparkStateGroupPanel decorator = progressBarMap.get(stageId);
    decorator.getSparkStateProgress().addCancelled();
  }

  public void cancelAllJobs() {
    sparkEngine.cancelAllJobs();
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

  private void configureRESTMapping() {
    BeakerXServer beakerXServer = this.kernel.getBeakerXServer();
    beakerXServer.addPostMapping(PUT_SPARK_JOBS_IN_THE_BACKGROUND,
            (Context ctx) -> this.kernel.putEvaluationInToBackground());
    beakerXServer.addPostMapping(CANCELLED_SPARK_JOBS + "/:stageid",
            (Context ctx) -> sparkEngine.cancelStage(Integer.parseInt(ctx.param("stageid"))));
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

  private String stageLink(int stageId) {
    return this.sparkEngine.stageLink(stageId);
  }

  private String jobLink(int jobId) {
    return this.sparkEngine.jobLink(jobId);
  }

  private Widget createCancelledJobsButton(int stageId) {
    BeakerXServer beakerXServer = KernelManager.get().getBeakerXServer();
    RESTButton xButton = new RESTButton(beakerXServer.getURL() + CANCELLED_SPARK_JOBS + "/" + stageId);
    xButton.setTooltip("interrupt spark job");
    xButton.setDomClasses(new ArrayList<>(asList("bx-button", "icon-close")));
    return xButton;
  }

  private Widget createBkgJobsButton(int stageId) {
    BeakerXServer beakerXServer = KernelManager.get().getBeakerXServer();
    RESTButton bkgButton = new RESTButton(beakerXServer.getURL() + PUT_SPARK_JOBS_IN_THE_BACKGROUND);
    bkgButton.setTooltip("put spark job in the background, let it complete asynchronously");
    bkgButton.setDomClasses(new ArrayList<>(asList("bx-button", "icon-bg")));
    return bkgButton;
  }

}
