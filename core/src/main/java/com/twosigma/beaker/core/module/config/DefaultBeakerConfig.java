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
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.UnknownHostException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

/**
 * DefaultBeakerConfig
 * holds the default beaker configuration which used by DefaultBeakerConfigModule who binds it
 * to BeakerConfig interface. The configuration is determined with both constant default
 * values and the input of BeakerConfigPref
 */
public class DefaultBeakerConfig implements BeakerConfig {

  private final String installDir;
  private final String pluginDir;
  private final String dotDir;
  private final String nginxDir;
  private final String nginxBinDir;
  private final String nginxServDir;
  private final String nginxExtraRules;
  private final Boolean useKerberos;
  private final Integer portBase;
  private final Integer reservedPortCount;
  private final String configFileUrl;
  private final String defaultNotebookUrl;
  private final String recentNotebooksFileUrl;
  private final String sessionBackupDir;
  private final Map<String, String> pluginOptions;
  private final Map<String, String[]> pluginEnvps;


  @Inject
  public DefaultBeakerConfig(BeakerConfigPref pref) throws UnknownHostException {

    this.installDir = System.getProperty("user.dir");
    this.useKerberos = pref.getUseKerberos();
    this.portBase = pref.getPortBase();
    this.reservedPortCount = 3;
    this.pluginDir = this.installDir + "/src/main/sh";
    this.dotDir = System.getProperty("user.home") + "/.beaker";
    ensureDirectoryExists(new File(this.dotDir));
    this.nginxDir = this.installDir + "/nginx";
    this.nginxBinDir = this.installDir + "/nginx/bin";
    this.nginxServDir = this.dotDir + "/nginx";
    this.nginxExtraRules = "";

    String configDir = this.dotDir + "/config";
    ensureDirectoryExists(new File(configDir));

    final String configFile = configDir + "/beaker.conf.json";
    final String defaultConfigFile = this.installDir + "/config/beaker.conf.json";
    ensureFile(new File(configFile), new File(defaultConfigFile));
    this.configFileUrl = configFile;

    final String prefDefaultNotebookUrl = pref.getDefaultNotebookUrl();
    final String mainDefaultNotebookPath = this.dotDir + "/config/default.bkr";
    final String defaultDefaultNotebookPath = this.installDir + "/config/default.bkr";
    if (prefDefaultNotebookUrl != null) {
      this.defaultNotebookUrl = prefDefaultNotebookUrl;
    } else {
      ensureFile(new File(mainDefaultNotebookPath), new File(defaultDefaultNotebookPath));
      this.defaultNotebookUrl = mainDefaultNotebookPath;
    }

    String varDir = this.dotDir + "/var";
    ensureDirectoryExists(new File(varDir));
    this.recentNotebooksFileUrl = varDir + "/recentNotebooks";
    this.sessionBackupDir = varDir + "/sessionBackups";
    ensureDirectoryExists(new File(this.sessionBackupDir));

    this.pluginOptions = pref.getPluginOptions();
    this.pluginEnvps = new HashMap<>();
  }
  private static void ensureDirectoryExists(File dir) {
    if (!dir.exists()) {
      if (!dir.mkdirs()) {
        System.out.println("failed to create " + dir.getPath());
      }
    }
  }
  private static void ensureFile(
      File target,
      File source) {
    if (readFile(target) == null) {
      // target has no content,
      // try copying from the source.
      if (readFile(source) != null) {
        try {
          Files.copy(source.toPath(), target.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
          System.out.println("ERROR copying file to" + target.getPath() + ", " + e);
        }
      } else {
        // the source also has no content?!
        System.out.println("Double bogey, the source (" + source.getPath() + " is empty.");
      }
    }
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
  public Map<String, String> getPluginOptions() {
    return this.pluginOptions;
  }

  @Override
  public Map<String, String[]> getPluginEnvps() {
    return this.pluginEnvps;
  }

  static private String readFile(File file) {
    try {
      FileInputStream fis = new FileInputStream(file);
      byte[] data = new byte[(int) file.length()];
      fis.read(data);
      fis.close();
      return new String(data, "UTF-8");
    } catch (FileNotFoundException e) {
      System.out.println("ERROR reading file" + file.getName() + ": " + e);
    } catch (IOException e) {
      System.out.println("ERROR reading file" + file.getName() + ": " + e);
    }
    return null;
  }

}
