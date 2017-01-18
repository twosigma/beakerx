/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.jupyter.groovy;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Comm {

  public static final String COMM_HASH_DELIMITER = "/";

  @JsonProperty("comm_id")
  private String commId;
  @JsonProperty("target_name")
  private String targetName;
  @JsonProperty("data")
  private String data;
  @JsonProperty("target_module")
  private String targetModule;

  public Comm(String commId, String targetName) {
    super();
    this.setCommId(commId);
    this.setTargetName(targetName);
  }

  public String getCommId() {
    return commId;
  }

  public void setCommId(String commId) {
    this.commId = commId;
  }

  public String getTargetName() {
    return targetName;
  }

  public void setTargetName(String targetName) {
    this.targetName = targetName;
  }

  public String getData() {
    return data;
  }

  public void setData(String data) {
    this.data = data;
  }

  public String getTargetModule() {
    return targetModule;
  }

  public void setTargetModule(String targetModule) {
    this.targetModule = targetModule;
  }

  public String getCommHash() {
    return getCommHash(getCommId(), getTargetName());
  }

  @Override
  public String toString() {
    return getCommHash();
  }

  public static String getCommHash(String commId, String targetName) {
    return commId + COMM_HASH_DELIMITER + targetName;
  }
}