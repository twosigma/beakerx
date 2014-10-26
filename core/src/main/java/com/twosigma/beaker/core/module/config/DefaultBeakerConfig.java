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

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.twosigma.beaker.shared.module.util.GeneralUtils;
import com.twosigma.beaker.core.rest.StreamGobbler;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.UnknownHostException;
import java.net.InetAddress;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.RandomStringUtils;

/**
 * DefaultBeakerConfig
 * holds the default beaker configuration which used by DefaultBeakerConfigModule who binds it
 * to BeakerConfig interface. The configuration is determined with both constant default
 * values and the input of BeakerConfigPref
 */
@Singleton
public class DefaultBeakerConfig implements BeakerConfig {

  private final String installDir;
  private final String [] searchDirs;
  private final String pluginDir;
  private final String dotDir;
  private final String nginxDir;
  private final String nginxBinDir;
  private final String nginxStaticDir;
  private final String nginxServDir;
  private final String nginxExtraRules;
  private final Map<String, String> nginxPluginRules;
  private final Boolean useKerberos;
  private final Boolean publicServer;
  private final Boolean noPasswordAllowed;
  private final String authCookie;
  private final String passwordHash;
  private final String password;
  private final Integer portBase;
  private final Integer reservedPortCount;
  private final String configFileUrl;
  private final String preferenceFileUrl;
  private final String defaultNotebookUrl;
  private final String recentNotebooksFileUrl;
  private final String sessionBackupDir;
  private final Map<String, String> pluginLocations;
  private final Map<String, String> pluginOptions;
  private final Map<String, String[]> pluginEnvps;
  private final String version;
  private final String buildTime;
  private final String hash;

  private String hash(String password) {
    return DigestUtils.sha512Hex(password + getPasswordSalt());
  }

  @Inject
  public DefaultBeakerConfig(BeakerConfigPref pref, GeneralUtils utils)
    throws UnknownHostException, IOException, InterruptedException
  {

    this.installDir = System.getProperty("user.dir");
    this.searchDirs = new String [1];
    this.searchDirs[0] = this.installDir;
    this.useKerberos = pref.getUseKerberos();
    this.portBase = pref.getPortBase();
    this.reservedPortCount = 4;
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
    this.nginxExtraRules = "";
    this.nginxPluginRules = new HashMap<>();

    String configDir = this.dotDir + "/config";
    utils.ensureDirectoryExists(configDir);

    final String defaultConfigFile = this.installDir + "/config/beaker.conf.json";
    this.configFileUrl = defaultConfigFile;

    final String defaultPreferenceFile = this.installDir + "/config/beaker.pref.json";
    final String preferenceFile = configDir + "/beaker.pref.json";
    utils.ensureFileHasContent(preferenceFile, defaultPreferenceFile);
    this.preferenceFileUrl = preferenceFile;

    final String prefDefaultNotebookUrl = pref.getDefaultNotebookUrl();
    final String mainDefaultNotebookPath = this.dotDir + "/config/default.bkr";
    final String defaultDefaultNotebookPath = this.installDir + "/config/default.bkr";
    if (prefDefaultNotebookUrl != null) {
      this.defaultNotebookUrl = prefDefaultNotebookUrl;
    } else {
      File f = new File(mainDefaultNotebookPath);
      if(f.exists())
        this.defaultNotebookUrl = mainDefaultNotebookPath;
      else
        this.defaultNotebookUrl = defaultDefaultNotebookPath;
    }

    String varDir = this.dotDir + "/var";
    utils.ensureDirectoryExists(varDir);
    this.recentNotebooksFileUrl = varDir + "/recentNotebooks";
    this.sessionBackupDir = varDir + "/sessionBackups";
    utils.ensureDirectoryExists(this.sessionBackupDir);

    this.pluginLocations = new HashMap<>();
    this.pluginOptions = pref.getPluginOptions();
    this.pluginEnvps = new HashMap<>();

    this.publicServer = pref.getPublicServer();
    this.noPasswordAllowed = pref.getNoPasswordAllowed();
    this.authCookie = RandomStringUtils.random(40, true, true);
    // XXX user might provide their own hash in beaker.config.json
    String password = RandomStringUtils.random(15, true, true);
    this.passwordHash = hash(password);
    this.password = password;

    if (this.publicServer) {
      String cert = this.nginxServDir + "/ssl_cert.pem";
      String tmp = this.nginxServDir + "/cert.tmp";
      PrintWriter pw = new PrintWriter(tmp);
      for (int i = 0; i < 10; i++)
        pw.printf("\n");
      pw.close();
      // XXX I am baffled as to why using sh and this pipe is
      // necessary, but if you just exec openssl and write into its
      // stdin then it hangs.
      String[] cmd = {"sh", "-c",
                      "cat " + tmp +
                      " | openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout "
                      + cert + " -out " + cert};
      Process proc = Runtime.getRuntime().exec(cmd);
      proc.waitFor();
    }

    this.version = utils.readFile(this.installDir + "/config/version");
    this.buildTime = utils.readFile(this.installDir + "/config/build_time");
    this.hash = utils.readFile(this.installDir + "/config/hash");
  }

  @Override
  public String getInstallDirectory() {
    return this.installDir;
  }

  @Override
  public String [] getFileSearchDirs() {
    return this.searchDirs;
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
  public Map<String, String> getNginxPluginRules() {
    return this.nginxPluginRules;
  }

  @Override
  public Boolean getPublicServer() {
    return this.publicServer;
  }

  @Override
  public Boolean getNoPasswordAllowed() {
    return this.noPasswordAllowed;
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
  public String getPreferenceFileUrl() {
    return this.preferenceFileUrl;
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

  @Override
  public String getAuthCookie() {
    return this.authCookie;
  }

  /* When the hash can be stored in a file, need to generate salt randomly.
     See github Issue #319 */
  @Override
  public String getPasswordSalt() {
    return ".beaker.N0tebook";
  }

  @Override
  public String getPasswordHash() {
    return this.passwordHash;
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getBaseURL()
    throws UnknownHostException
  {
    String initUrl;
    String hostname = this.publicServer ? InetAddress.getLocalHost().getHostName() : "127.0.0.1";

    boolean useHttps = this.publicServer; // XXX should be independently setable

    if (useHttps) {
      initUrl = "https://" + hostname + ":" + this.portBase + "/";
    } else {
      initUrl = "http://" + (this.useKerberos ? (System.getProperty("user.name") + ".") : "")
              + hostname + ":" + (portBase + 1) + "/";
    }
    return initUrl;
  }

  @Override
  public String getVersion() {
    return this.version;
  }

  @Override
  public String getBuildTime() {
    return this.buildTime;
  }

  @Override
  public String getHash() {
    return this.hash;
  }
  
  @Override
  public String getMainPageFileName() {
      return this.installDir + "/src/main/web/app/template/index_template.html";
  }
}
