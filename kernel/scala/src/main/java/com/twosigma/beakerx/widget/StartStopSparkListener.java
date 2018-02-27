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
import org.apache.spark.scheduler.SparkListener;
import org.apache.spark.scheduler.SparkListenerApplicationEnd;
import org.apache.spark.scheduler.SparkListenerApplicationStart;

public class StartStopSparkListener extends SparkListener {

  private SparkConf sparkConf;

  public StartStopSparkListener(SparkConf sparkConf) {
    this.sparkConf = sparkConf;
  }

  @Override
  public void onApplicationStart(SparkListenerApplicationStart applicationStart) {
    super.onApplicationStart(applicationStart);
    SparkContextManager sparkContextManager = SparkVariable.get();
    sparkContextManager.applicationStart();
  }

  @Override
  public void onApplicationEnd(SparkListenerApplicationEnd applicationEnd) {
    super.onApplicationEnd(applicationEnd);
    SparkContextManager sparkContextManager = SparkVariable.get();
    sparkContextManager.applicationEnd();
  }
}