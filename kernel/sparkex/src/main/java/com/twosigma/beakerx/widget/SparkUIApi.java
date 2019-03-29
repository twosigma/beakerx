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

import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.configuration.SparkConfiguration;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

public interface SparkUIApi {

  String SPARK_REPL_CLASS_OUTPUT_DIR = "spark.repl.class.outputDir";
  String SPARK_APP_NAME = "spark.app.name";
  String SPARK_MASTER = "spark.master";
  String SPARK_EXECUTOR_MEMORY = "spark.executor.memory";
  String SPARK_EXECUTOR_CORES = "spark.executor.cores";
  String SPARK_EXTRA_LISTENERS = "spark.extraListeners";
  String SPARK_ADVANCED_OPTIONS = "properties";
  String BEAKERX_ID = "beakerx.id";
  List<String> STANDARD_SETTINGS = Arrays.asList(SPARK_MASTER, SPARK_EXECUTOR_MEMORY, SPARK_EXECUTOR_CORES, SPARK_APP_NAME, BEAKERX_ID, SPARK_EXTRA_LISTENERS, SPARK_REPL_CLASS_OUTPUT_DIR);
  String SPARK_SESSION_NAME = "spark";
  String SPARK_CONTEXT_NAME = "sc";

  List<SparkConfiguration.Configuration> getAdvancedOptions();

  Text getMasterURL();

  boolean getHiveSupport();

  Text getExecutorMemory();

  Text getExecutorCores();

  void startStage(int stageId, int numTasks);

  void endStage(int stageId);

  void taskStart(int stageId, long taskId);

  void taskEnd(int stageId, long taskId);

  void applicationEnd();

  void cancelAllJobs();

  void startSpinner(Message message);

  void stopSpinner();

  void taskCancelled(int stageId, long taskId);

  Button getConnectButton();

  void afterDisplay(Message message);
}
