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

import com.twosigma.beakerx.widget.SparkUiDefaults;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SparkUiDefaultsImplMock implements SparkUiDefaults {

  public boolean saved = false;
  public boolean loaded = false;
  private String currentProfileName = "default";
  private List<Map<String, Object>> profiles = null;

  @Override

  public void saveSparkConf(List<Map<String, Object>> sparkConf) {
    saved = true;
  }

  @Override
  public void loadDefaults() {
    loaded = true;
  }

  @Override
  public List<Map<String, Object>> getProfiles() {
    return this.profiles;
  }

  @Override
  public Map<String, Object> getProfileByName(String name) {
    return null;
  }

  @Override
  public void removeSparkConf(String profileName) {

  }

  @Override
  public void loadProfiles() {
    this.profiles = new ArrayList<>();
  }

  @Override
  public void saveProfiles(List<Map<String, Object>> profiles) {

  }

  @Override
  public void saveCurrentProfileName(String profileName) {
    this.currentProfileName = profileName;
  }

  @Override
  public String getCurrentProfileName() {
    return this.currentProfileName;
  }

  @Override
  public Object get(String key) {
    return null;
  }

  @Override
  public Map<String, String> getProperties() {
    return new HashMap<>();
  }
}
