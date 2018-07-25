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
import java.util.Arrays;

import static java.util.Arrays.asList;

public class SparkStateGroupPanel extends HBox {
  private SparkStateProgress intProgress;
  private Button xButton;

  public SparkStateGroupPanel(SparkStateProgress intProgress, Button xButton) {
    super(Arrays.asList(intProgress, xButton));
    this.intProgress = intProgress;
    this.xButton = configureButton(xButton);
    setDomClasses(asList("bx-spark-stageGroupPanel"));
  }

  private Button configureButton(Button xButton) {
    xButton.setTooltip("Interrupt spark job");
    xButton.setDomClasses(new ArrayList<>(asList("bx-button", "icon-close")));
    return xButton;
  }

  public SparkStateProgress getSparkStateProgress() {
    return intProgress;
  }
}
