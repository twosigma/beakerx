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

import com.twosigma.beakerx.kernel.KernelManager;
import org.apache.spark.SparkConf;
import org.apache.spark.SparkContext;

public class SparkUI extends VBox {

  public static final String VIEW_NAME_VALUE = "SparkUIView";
  public static final String MODEL_NAME_VALUE = "SparkUIModel";

  private SparkContext sparkContext;

  public SparkUI(SparkConf sparkConf) {
    this.sparkContext = createSparkContext(sparkConf.clone());
    openComm();
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

  public SparkContext getSparkContext() {
    return sparkContext;
  }

  private SparkContext createSparkContext(SparkConf sparkConf) {
    if (!isLocalSpark(sparkConf)) {
      sparkConf.set("spark.repl.class.outputDir", KernelManager.get().getOutDir());
    }
    SparkContextManager sparkContextManager = new SparkContextManager(sparkConf);
    return sparkContextManager.getSparkContext();
  }

  private boolean isLocalSpark(SparkConf sparkConf) {
    return sparkConf.get("spark.master") != null && sparkConf.get("spark.master").startsWith("local");
  }
}
