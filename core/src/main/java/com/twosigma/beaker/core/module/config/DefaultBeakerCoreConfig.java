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
import com.twosigma.beaker.shared.module.config.BeakerConfig;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

/**
 * BeakerCoreConfigImpl
 *
 */
public class DefaultBeakerCoreConfig implements BeakerCoreConfig {

  private final String configDir;
  private final String pluginDir;
  private final String nginxPath;
  private final Boolean useKerberos;
  private final Integer portBase;
  private final String defaultNotebookUrl;
  private final Map<String, String> pluginOptions;
  private final Map<String, String[]> pluginEnvps;

  @Inject
  public DefaultBeakerCoreConfig(
      BeakerConfig bkConfig,
      BeakerCoreConfigPref pref)
      throws UnknownHostException {

    this.useKerberos = pref.getUseKerberos();
    this.portBase = pref.getPortBase();
    this.configDir = bkConfig.getInstallDirectory() + "/config";
    this.pluginDir = bkConfig.getInstallDirectory() + "/src/main/sh";
    this.nginxPath = "";

    final String prefDefaultNotebookUrl = pref.getDefaultNotebookUrl();
    final String mainDefaultNotebookPath = bkConfig.getDotDirectory() + "/default.bkr";
    final String defaultDefaultNotebookPath = bkConfig.getInstallDirectory() + "/config/default.bkr";

    if (prefDefaultNotebookUrl != null) {
      this.defaultNotebookUrl = prefDefaultNotebookUrl;
    } else {
      ensureMainDefaultNotebook(
          new File(mainDefaultNotebookPath),
          new File(defaultDefaultNotebookPath));
      this.defaultNotebookUrl = mainDefaultNotebookPath;
    }
    this.pluginOptions = pref.getPluginOptions();
    this.pluginEnvps = new HashMap<>();
  }

  private static void ensureMainDefaultNotebook(
      File mainDefaultNotebook,
      File defaultDefaultNotebook) {

    if (readFile(mainDefaultNotebook) == null) {
      // main default notebook has no content,
      // try copying from the default defaultNotebook.
      if (readFile(defaultDefaultNotebook) != null) {
        try {
          copyFile(defaultDefaultNotebook, mainDefaultNotebook);
        } catch (FileNotFoundException e) {
          System.out.println("ERROR writing main default notebook, " + e);
        }
      } else {
        // the default defaultNotebook also has no content?!
        System.out.println("Double bogey, default notebook is empty.");
      }
    }
  }

  private static void copyFile(File from, File to) throws FileNotFoundException {
    PrintWriter out = new PrintWriter(to);
    out.print(readFile(from));
    out.close();
  }

  @Override
  public String getConfigDirectory() {
    return this.configDir;
  }

  @Override
  public String getPluginDirectory() {
    return this.pluginDir;
  }

  @Override
  public String getNginxPath() {
    return this.nginxPath;
  }

  @Override
  public Integer getPortBase() {
    return this.portBase;
  }

  @Override
  public Boolean getUseKerberos() {
    return this.useKerberos;
  }

  @Override
  public String getDefaultNotebookUrl() {
    return this.defaultNotebookUrl;
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

  @Override
  public Map<String, String> getPluginOptions() {
    return this.pluginOptions;
  }

  @Override
  public Map<String, String[]> getPluginEnvps() {
    return this.pluginEnvps;
  }

}
