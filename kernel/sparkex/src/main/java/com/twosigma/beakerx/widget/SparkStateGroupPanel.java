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
import java.util.List;
import java.util.WeakHashMap;

import static java.util.Arrays.asList;

public class SparkStateGroupPanel extends HBox {
  private SparkStateProgress intProgress;
  private List<Widget> widgets;

  public SparkStateGroupPanel(SparkStateProgress intProgress, List<Widget> widgets) {
    super(getChildren(intProgress, widgets));
    this.intProgress = intProgress;
    this.widgets = widgets;
    setDomClasses(asList("bx-spark-stageGroupPanel"));
  }

  private static List<Widget> getChildren(SparkStateProgress intProgress, List<Widget> widgets) {
    List<Widget> result = new ArrayList<>();
    result.add(intProgress);
    result.addAll(widgets);
    return result;
  }

  public SparkStateProgress getSparkStateProgress() {
    return intProgress;
  }
}
