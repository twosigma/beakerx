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

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

public class SparkUIStatus extends HBox {

  private SparkUI.OnSparkButtonAction onSparkButtonAction;

  public SparkUIStatus(SparkUI.OnSparkButtonAction onSparkButtonAction) {
    super(new ArrayList<>());
    this.onSparkButtonAction = onSparkButtonAction;
    createStatusPanel();
  }

  private void createStatusPanel() {
    Label appStatus = createAppStatus();
    add(appStatus);
    Button disconnect = createDisconnectButton();
    add(disconnect);
    setDomClasses(new ArrayList<>(singletonList("bx-status-panel")));
  }

  private Label createAppStatus() {
    Label appStatus = new Label();
    appStatus.setValue("Connected");
    appStatus.setDomClasses(new ArrayList<>(asList("bx-connection-status", "connected")));
    return appStatus;
  }

  private Button createDisconnectButton() {
    Button disconnect = new Button();
    disconnect.registerOnClick((content, message) -> onSparkButtonAction.run(message));
    disconnect.setTooltip("Stop Spark Session");
    disconnect.setDomClasses(new ArrayList<>(asList("bx-button", "icon-close")));
    return disconnect;
  }


}
