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

import java.util.ArrayList;

public class SparkUI extends VBox {

  public static final String SPARK_EXTRA_LISTENERS = "spark.extraListeners";

  public static final String VIEW_NAME_VALUE = "SparkUIView";
  public static final String MODEL_NAME_VALUE = "SparkUIModel";

  private SparkContext sparkContext;

  public static SparkUI create(SparkConf sparkConf) {
    return new SparkUI(sparkConf);
  }

  private SparkUI(SparkConf sparkConf) {
    super(new ArrayList<>());
    sparkContext = createSparkContext(this, sparkConf.clone());
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

  private SparkContext createSparkContext(SparkUI sparkUI, SparkConf sparkConf) {
    sparkConf = configureSparkConf(sparkConf);
    return new SparkContextManager(sparkUI, sparkConf).getSparkContext();
  }

  private SparkConf configureSparkConf(SparkConf sparkConf) {
    if (!isLocalSpark(sparkConf)) {
      sparkConf.set("spark.repl.class.outputDir", KernelManager.get().getOutDir());
    }
    sparkConf = configureExtraListeners(sparkConf);
    return sparkConf;
  }

  private static boolean isLocalSpark(SparkConf sparkConf) {
    return sparkConf.get("spark.master") != null && sparkConf.get("spark.master").startsWith("local");
  }

  private SparkConf configureExtraListeners(SparkConf sparkConf) {
    String listeners = "";
    if (sparkConf.contains(SPARK_EXTRA_LISTENERS)) {
      listeners = sparkConf.get(SPARK_EXTRA_LISTENERS) + ",";
    }
    sparkConf.set(SPARK_EXTRA_LISTENERS, listeners + "com.twosigma.beakerx.widget.StartStopSparkListener");
    return sparkConf;
  }
}
