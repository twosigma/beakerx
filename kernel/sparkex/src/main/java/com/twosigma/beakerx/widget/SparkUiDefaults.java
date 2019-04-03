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

import java.util.List;
import java.util.Map;

public interface SparkUiDefaults {

  String DEFAULT_PROFILE = "";

  void saveSparkConf(List<Map<String, Object>> sparkConf);

  void loadDefaults();

  List<Map<String, Object>> getProfiles();

  Map<String, Object> getProfileByName(String name);

  void removeSparkConf(String profileName);

  void loadProfiles();

  void saveProfile(Map<String, Object> profile);

  List<String> getProfileNames();

  void saveProfileName(String profileName);

  String getCurrentProfileName();

  boolean containsKey(String key);

  Object get(String key);

  Map<String, String> getProperties();
}
