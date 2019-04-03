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
package com.twosigma.beakerx.scala.magic.command;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.SparkEngineConf;
import com.twosigma.beakerx.widget.SparkEngineNoUI;
import com.twosigma.beakerx.widget.SparkUiDefaults;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;

import java.util.Map;

public class SparkEngineNoUIEmptyMock implements SparkEngineNoUI {
  @Override
  public TryResult configure(KernelFunctionality kernel, Message parentMessage) {
    return null;
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
    return null;
  }

  @Override
  public Map<String, String> getAdvanceSettings(SparkUiDefaults defaults) {
    return null;
  }

  @Override
  public String getSparkUiWebUrl() {
    return null;
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
  public void jobLinkFactory(JobLinkFactory jobLinkFactory) {

  }

  @Override
  public void stageLinkFactory(StageLinkFactory stageLinkFactory) {

  }

  @Override
  public void sparkUiWebUrlFactory(SparkUiWebUrlFactory factory) {

  }
}
