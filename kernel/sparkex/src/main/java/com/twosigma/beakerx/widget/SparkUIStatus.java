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

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.restserver.BeakerXServer;
import com.twosigma.beakerx.kernel.restserver.Context;

import java.util.ArrayList;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

public class SparkUIStatus extends HBox {

  public static final String STOP_SPARK_SESSION = "stopsparksession";

  public SparkUIStatus(SparkUI.OnSparkRestButtonAction onSparkButtonAction) {
    super(new ArrayList<>());
    KernelFunctionality kernel = KernelManager.get();
    BeakerXServer beakerXServer = kernel.getBeakerXServer();
    beakerXServer.addPostMapping(STOP_SPARK_SESSION, (Context ctx) -> onSparkButtonAction.run());
    createStatusPanel();
  }

  private void createStatusPanel() {
    Label appStatus = createAppStatus();
    add(appStatus);
    Widget disconnect = createDisconnectButton();
    add(disconnect);
    setDomClasses(new ArrayList<>(singletonList("bx-status-panel")));
  }

  private Label createAppStatus() {
    Label appStatus = new Label();
    appStatus.setValue("Connected");
    appStatus.setDomClasses(new ArrayList<>(asList("bx-connection-status", "connected")));
    return appStatus;
  }

  private Widget createDisconnectButton() {
    BeakerXServer beakerXServer = KernelManager.get().getBeakerXServer();
    RESTButton disconnect2 = new RESTButton(beakerXServer.getURL() + STOP_SPARK_SESSION);
    disconnect2.setTooltip("Stop Spark Session");
    disconnect2.setDomClasses(new ArrayList<>(asList("bx-button", "icon-close")));
    return disconnect2;
  }
}
