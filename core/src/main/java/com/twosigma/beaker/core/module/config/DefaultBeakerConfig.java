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

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.twosigma.beaker.shared.module.util.GeneralUtils;
import java.io.File;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

/**
 * DefaultBeakerConfig
 * holds the default beaker configuration which used by DefaultBeakerConfigModule who binds it
 * to BeakerConfig interface. The configuration is determined with both constant default
 * values and the input of BeakerConfigPref
 */
@Singleton
public class DefaultBeakerConfig implements BeakerConfig {

  private final String installDir;
  private final String pluginDir;
  private final String dotDir;
  private final String nginxDir;
  private final String nginxBinDir;
  private final String nginxStaticDir;
  private final String nginxServDir;
  private final String nginxExtraRules;
  private final Boolean useKerberos;
  private final Integer portBase;
  private final Integer reservedPortCount;
  private final String configFileUrl;
  private final String defaultNotebookUrl;
  private final String recentNotebooksFileUrl;
  private final String sessionBackupDir;
  private final Map<String, String> pluginLocations;
  private final Map<String, String> pluginOptions;
  private final Map<String, String[]> pluginEnvps;


  @Inject
  public DefaultBeakerConfig(BeakerConfigPref pref, GeneralUtils utils)
      throws UnknownHostException, IOException {

    this.installDir = System.getProperty("user.dir");
    this.useKerberos = pref.getUseKerberos();
    this.portBase = pref.getPortBase();
    this.reservedPortCount = 3;
    this.dotDir = System.getProperty("user.home") + "/.beaker/v1";
    this.pluginDir = this.installDir + "/config/plugins/eval";
    utils.ensureDirectoryExists(this.dotDir);
    this.nginxDir = this.installDir + "/nginx";
    if (System.getProperty("beaker.nginx.bin.dir") != null) {      
      this.nginxBinDir = System.getProperty("beaker.nginx.bin.dir");
    } else {
      this.nginxBinDir = ""; // assuming nginx is available in PATH
    }
    this.nginxServDir = utils.createTempDirectory(this.dotDir, "nginx");
    this.nginxStaticDir = this.installDir + "/src/main/web/static";
    String nginxRestartScript = utils.readFile(this.nginxDir + "/script/restart_nginx");
    File nginxRestartScriptFile = new File(this.nginxServDir + "/restart_nginx");
    utils.saveFile(nginxRestartScriptFile, nginxRestartScript);
    nginxRestartScriptFile.setExecutable(true, true);
    this.nginxExtraRules = "";

    String configDir = this.dotDir + "/config";
    utils.ensureDirectoryExists(configDir);

    final String configFile = configDir + "/beaker.conf.json";
    final String defaultConfigFile = this.installDir + "/config/beaker.conf.json";
    utils.ensureFileHasContent(configFile, defaultConfigFile);
    this.configFileUrl = configFile;

    final String prefDefaultNotebookUrl = pref.getDefaultNotebookUrl();
    final String mainDefaultNotebookPath = this.dotDir + "/config/default.bkr";
    final String defaultDefaultNotebookPath = this.installDir + "/config/default.bkr";
    if (prefDefaultNotebookUrl != null) {
      this.defaultNotebookUrl = prefDefaultNotebookUrl;
    } else {
      utils.ensureFileHasContent(mainDefaultNotebookPath, defaultDefaultNotebookPath);
      this.defaultNotebookUrl = mainDefaultNotebookPath;
    }

    String varDir = this.dotDir + "/var";
    utils.ensureDirectoryExists(varDir);
    this.recentNotebooksFileUrl = varDir + "/recentNotebooks";
    this.sessionBackupDir = varDir + "/sessionBackups";
    utils.ensureDirectoryExists(this.sessionBackupDir);

    this.pluginLocations = new HashMap<>();
    this.pluginOptions = pref.getPluginOptions();
    this.pluginEnvps = new HashMap<>();
  }

  @Override
  public String getInstallDirectory() {
    return this.installDir;
  }

  @Override
  public String getPluginDirectory() {
    return this.pluginDir;
  }

  @Override
  public String getDotDirectory() {
    return this.dotDir;
  }

  @Override
  public String getNginxDirectory() {
    return this.nginxDir;
  }

  @Override
  public String getNginxBinDirectory() {
    return this.nginxBinDir;
  }

  @Override
  public String getNginxStaticDirectory() {
    return this.nginxStaticDir;
  }

  @Override
  public String getNginxServDirectory() {
    return this.nginxServDir;
  }

  @Override
  public String getNginxExtraRules() {
    return this.nginxExtraRules;
  }

  @Override
  public Integer getPortBase() {
    return this.portBase;
  }

  @Override
  public Integer getReservedPortCount() {
    return this.reservedPortCount;
  }

  @Override
  public Boolean getUseKerberos() {
    return this.useKerberos;
  }

  @Override
  public String getConfigFileUrl() {
    return this.configFileUrl;
  }

  @Override
  public String getDefaultNotebookUrl() {
    return this.defaultNotebookUrl;
  }

  @Override
  public String getRecentNotebooksFileUrl() {
    return this.recentNotebooksFileUrl;
  }

  @Override
  public String getSessionBackupsDirectory() {
    return this.sessionBackupDir;
  }

  @Override
  public Map<String, String> getPluginLocations() {
    return this.pluginLocations;
  }

  @Override
  public Map<String, String> getPluginOptions() {
    return this.pluginOptions;
  }

  @Override
  public Map<String, String[]> getPluginEnvps() {
    return this.pluginEnvps;
  }

}
