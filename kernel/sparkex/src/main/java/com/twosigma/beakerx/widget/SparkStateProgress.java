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

import java.util.ArrayList;
import java.util.HashMap;


public class SparkStateProgress extends VBox {

  public static final String VIEW_NAME_VALUE = "SparkStateProgressView";
  public static final String MODEL_NAME_VALUE = "SparkStateProgressModel";
  private int active = 0;
  private int done = 0;
  private int numberOfTasks = 0;
  private int jobId;
  private int stageId;
  private String jobLink;
  private String stageLink;

  public SparkStateProgress(int numTasks, int jobId, int stageId, String jobLink, String stageLink) {
    super(new ArrayList<>());
    init(numTasks, jobId, stageId, jobLink, stageLink);
  }

  private void init(int numTasks, int jobId, int stageId, String jobLink, String stageLink) {
    this.numberOfTasks = numTasks;
    this.jobId = jobId;
    this.stageId = stageId;
    this.jobLink = jobLink;
    this.stageLink = stageLink;
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


  public int getNumberOfTasks() {
    return numberOfTasks;
  }

  public int getActive() {
    return active;
  }

  public int getDone() {
    return done;
  }

  public int getWaiting() {
    return getNumberOfTasks() - (done + active);
  }

  public synchronized void addActive() {
    this.active += 1;
    sendState();
  }

  public synchronized void addDone() {
    this.done += 1;
    this.active -= 1;
    sendState();
  }

  public synchronized void init() {
    this.done = 0;
    this.active = 0;
    sendState();
  }

  private synchronized void sendState() {
    HashMap<Object, Object> state = new HashMap<>();
    state.put("jobId", this.jobId);
    state.put("stageId", this.stageId);
    state.put("stageLink", this.stageLink);
    state.put("jobLink", this.jobLink);
    state.put("done", this.done);
    state.put("active", this.active);
    state.put("numberOfTasks", this.numberOfTasks);
    sendUpdate("state", state);
  }

  public void hide() {
    sendUpdate("hide", true);
  }
}
