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

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class SparkEngineConf {

  private String master = null;
  private String executorCores = null;
  private String executorMemory = null;
  private Map<String, String> configs = new HashMap<>();

  public Optional<String> getMaster() {
    return Optional.ofNullable(master);
  }

  public void setMaster(String master) {
    this.master = master;
  }

  public void setExecutorCores(String executorCores) {
    this.executorCores = executorCores;
  }

  public Optional<String> getExecutorCores() {
    return Optional.ofNullable(executorCores);
  }

  public void setExecutorMemory(String executorMemory) {
    this.executorMemory = executorMemory;
  }

  public Optional<String> getExecutorMemory() {
    return Optional.ofNullable(executorMemory);
  }

  public void setConfigs(Map<String, String> configs) {
    this.configs = configs;
  }

  public Map<String, String> getConfigs() {
    return configs;
  }
}
