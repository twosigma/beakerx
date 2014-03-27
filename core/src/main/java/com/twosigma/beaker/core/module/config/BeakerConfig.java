/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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

import java.util.Map;

/**
 * BeakerConfig
 * stores run-time configuration used by Beaker
 */
public interface BeakerConfig {
  /**
   * The Beaker core directory
   * @return
   */
  public String getInstallDirectory();
  /**
   * where to search for plugin executables and starting scripts
   * @return
   */
  public String getPluginDirectory();
  /**
   * where temp directory and variable storage and cache go
   * @return
   */
  public String getDotDirectory();
  /**
   * where to locate beaker specific nginx configs and scripts
   * @return
   */
  public String getNginxDirectory();
  /**
   * where to locate nginx executable
   * @return
   */
  public String getNginxBinDirectory();
  /**
   * where the static files are for the nginx server
   * @return
   */
  public String getNginxStaticDirectory();
  /**
   * the root of nginx server
   * @return
   */
  public String getNginxServDirectory();
  /**
   * extra enginx rules to be appended to nginx.conf
   * @return
   */
  public String getNginxExtraRules();
  /**
   * gets the port base
   * @return
   */
  public Integer getPortBase();
  /**
   * gets how many consecutive ports (starting with portbase) were used
   * @return
   */
  public Integer getReservedPortCount();
  /**
   * whether to use kerberos or not
   * @return
   */
  public Boolean getUseKerberos();
  /**
   * where to find the config file
   * @return
   */
  public String getConfigFileUrl();
  /**
   * where to find the default notebook
   * @return
   */
  public String getDefaultNotebookUrl();
  /**
   * where to find the file that stores the list of recent files
   * @return
   */
  public String getRecentNotebooksFileUrl();
  /**
   * the directory where session-backup files go
   * @return
   */
  public String getSessionBackupsDirectory();
  /**
   * optional locations to look for plugin starting scripts
   * @return
   */
  public Map<String, String> getPluginLocations();
  /**
   * Additional options to use when starting a plugin
   * @return
   */
  public Map<String, String> getPluginOptions();
  /**
   * optional alternative environment variables a plugin should be started with
   * @return
   */
  public Map<String, String[]> getPluginEnvps();
}
