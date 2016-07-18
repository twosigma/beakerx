/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.jvm.utils;

import com.twosigma.beaker.NamespaceClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Map;

public class BeakerPrefsUtils {

  private static final Logger logger = LoggerFactory.getLogger(BeakerPrefsUtils.class.getName());

  private final static String PREFS_NAME = "prefs";
  private final static String USE_OUTPUT_PANEL_KEY = "useOutputPanel";

  public static Boolean isUseOutputPanel(final NamespaceClient nc) {
    return Boolean.parseBoolean(String.valueOf(getOptionValue(nc, USE_OUTPUT_PANEL_KEY)));
  }

  public static Object getOptionValue(final NamespaceClient nc, final String key) {
    Object optionValue = null;
    try {
      Object options = nc.get(PREFS_NAME);
      if (options instanceof Map) {
        Map<String, Object> optionsMap = (Map<String, Object>) nc.get(PREFS_NAME);
        if (optionsMap.containsKey(key)) {
          optionValue = optionsMap.get(key);
        }
      }
    } catch (IOException e) {
      logger.warn("Can't retrieve \"useOutputPanel\" option from beaker object.");
    }
    return optionValue;
  }
}
