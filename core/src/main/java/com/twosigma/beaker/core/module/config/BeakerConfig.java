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
import java.net.UnknownHostException;

import org.json.simple.JSONObject;

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
   * The Beaker file load search directories
   * @return
   */
  public String [] getFileSearchDirs();
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
   * folder the user can use for storage
   * @return
   */
  public String getUserFolder();
  /**
   * optional/extra/override nginx plugin rules
   * @return
   */
  public Map<String, String> getNginxPluginRules();
  /**
   * Public Server
   * @return
   */
  public Boolean getPublicServer();
  /**
   * Require Password for access
   * @return
   */
  public Boolean getRequirePassword();
  /**
   * The SSL cert
   * @return
   */
  public String getUseHttpsCert();
  /**
   * The SSL Key
   * @return
   */
  public String getUseHttpsKey();
  /**
   * Interface to listen on
   * @return
   */
  public String getListenInterface();
  /**
   * Hostname that user should connect to.
   * @return
   */
  public String getConnectHost();
  /**
   * Auth cookie
   * @return
   */
  public String getAuthCookie();
  /**
   * Password Hash
   * @return
   */
  public String getPasswordHash();
  /**
   * Password
   * @return
   */
  public String getPassword();
  /**
   * Password Salt
   * @return
   */
  public String getPasswordSalt();
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
   * where to find the configuration file
   * @return
   */
  public String getConfigFileUrl();
  /**
   * where to find the user preference file
   * @return
   */
  public String getPreferenceFileUrl();
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
  public Map<String, List<String>> getPluginOptions();
  /**
   * optional alternative environment variables a plugin should be started with
   * @return
   */
  public Map<String, String[]> getPluginEnvps();
  /**
   * base URL from which whole application is served
   * @return
   */
  public String getBaseURL() throws UnknownHostException;
  /**
   * version
   * @return
   */
  public String getVersion();
  /**
   * build time
   * @return
   */
  public String getBuildTime();
  /**
   * hash
   * @return
   */
  public String getHash();
  /**
   * main page file name
   * @return
   */
  public String getMainPageFileName();
  /**
   * gist server url for notebook sharing
   * @return
   */
  public String getGistServerUrl();
  /**
   * sharing server url for shared notebook display
   * @return
   */
  public String getSharingServerUrl();

  /**
   * Path to find a backend.
   * @return
   */
  public String getPluginPath(String plugin);

  public Object getPluginPrefs();

  public void setPluginPrefs(JSONObject prefs);

  public Boolean getShowZombieLogging();
}
