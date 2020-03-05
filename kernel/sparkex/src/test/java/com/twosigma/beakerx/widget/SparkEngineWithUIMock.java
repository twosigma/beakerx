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
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.scala.magic.command.JobLinkFactory;
import com.twosigma.beakerx.scala.magic.command.SparkUiWebUrlFactory;
import com.twosigma.beakerx.scala.magic.command.StageLinkFactory;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;

import java.util.Map;

public class SparkEngineWithUIMock implements SparkEngineWithUI {

  public static final String SPARK_UI_WEB_URL_1 = "SparkUiWebUrl1";
  public static final String APP_ID_LOCAL_1 = "appIdLocal1";
  private boolean autoStartConfigured = false;

  @Override
  public TryResult configure(KernelFunctionality kernel, SparkUIApi sparkUI, Message parentMessage, Map<String, Object> sparkOptions) {
    return TryResult.createResult("done");
  }

  @Override
  public boolean isAutoStart() {
    return autoStartConfigured;
  }

  @Override
  public SparkSession getOrCreate() {
    return null;
  }

  @Override
  public SparkConf getSparkConf() {
    return null;
  }

  @Override
  public String getSparkAppId() {
    return APP_ID_LOCAL_1;
  }

  @Override
  public Map<String, String> getAdvanceSettings(SparkUiDefaults defaults) {
    return null;
  }

  @Override
  public String getSparkUiWebUrl() {
    return SPARK_UI_WEB_URL_1;
  }

  @Override
  public String getSparkMasterUrl() {
    return null;
  }

  @Override
  public String sparkVersion() {
    return null;
  }

  @Override
  public void additionalConf(SparkEngineConf conf) {

  }

  @Override
  public SparkEngineConf getSparkEngineConf() {
    return null;
  }

  @Override
  public void configAutoStart() {
    this.autoStartConfigured = true;
  }

  @Override
  public String stageLink(int stageId) {
    return null;
  }

  @Override
  public String jobLink(int jobId) {
    return null;
  }

  @Override
  public void jobLinkFactory(JobLinkFactory factory) {

  }

  @Override
  public void stageLinkFactory(StageLinkFactory factory) {

  }

  @Override
  public void sparkUiWebUrlFactory(SparkUiWebUrlFactory factory) {

  }

  @Override
  public void stop() {

  }

  @Override
  public void cancelAllJobs() {

  }

  @Override
  public void cancelStage(int stageid) {

  }
}
