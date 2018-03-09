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

import org.apache.spark.SparkConf;
import org.apache.spark.SparkContext;

import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.widget.SparkUI.BEAKERX_ID;

public class SparkVariable {

  private static Map<String, SparkContextManager> manager = new HashMap<>();
  private static SparkContext sparkContext;

  static void putSparkContextManager(SparkConf sparkConf, SparkContextManager sparkContextManager) {
    manager.put(sparkConf.get(BEAKERX_ID), sparkContextManager);
  }

  public static SparkContextManager getSparkContextManager(SparkConf sparkConf) {
    return manager.get(sparkConf.get(BEAKERX_ID));
  }

  static void putSparkContext(SparkContext sc) {
    sparkContext = sc;
  }

  public static SparkContext getSparkContext() {
    return sparkContext;
  }

  public static void cancelAllJobs() {
    manager.values().forEach(SparkContextManager::cancelAllJobs);
  }
}
