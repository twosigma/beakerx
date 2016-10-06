/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.core.module.config;

import java.util.List;
import java.util.Map;

/**
 * BeakerConfigPref
 * keeps the user preferences that will be used to assist in creating configurations used
 * by beaker. Note the default value of individual preference settings should be null. It's
 * up to the BeakerConfig implementation (which take BeakerConfigPref as input) to provide
 * the real default value upon getting null preferences.
 */
public interface BeakerConfigPref {
  /**
   * Gets whether to use Kerberos or not
   * @return
   */
  public Boolean getUseKerberos();
  /**
   * Gets the preferred port base
   * @return
   */
  public Integer getPortBase();
  public Boolean getPublicServer();
  public Boolean getRequirePassword();
  public String getPassword();
  public String getUseHttpsCert();
  public String getUseHttpsKey();
  public String getListenInterface();
  public String getConnectHost();
  
  /**
   * Gets the url of the default notebook
   * @return
   */
  public String getDefaultNotebookUrl();
  /**
   * Gets a map of plugin starting options
   * @return
   */
  public Map<String, List<String>> getPluginOptions();

  public String getAuthToken();

  /**
   * Puts what normally goes in ~/.beaker instead into the root of the drive where the application
   * is mounted G:/.beaker or whatever drive.
   */
  public Boolean getPortable();

  /**
   * Switchs off logging unsuccessfull requests from outdated beaker pages
   */
  public Boolean getShowZombieLogging();

}
