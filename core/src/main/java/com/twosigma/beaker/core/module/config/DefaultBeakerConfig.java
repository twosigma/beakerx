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
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.Exception;
import java.math.BigInteger;
import java.net.UnknownHostException;
import java.net.InetAddress;
import java.nio.file.attribute.PosixFilePermission;
import java.security.SecureRandom;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

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
  private final String userFolder;
  private final Map<String, String> nginxPluginRules;
  private final Boolean useKerberos;
  private final Boolean publicServer;
  private final String authCookie;
  private final String passwordHash;
  private final String password;
  private final Integer portBase;
  private final Integer reservedPortCount;
  private final String configFileUrl;
  private final String preferenceFileUrl;
  private final String preferencesDefaultNotebook;
  private final String recentNotebooksFileUrl;
  private final String sessionBackupDir;
  private final Map<String, String> pluginLocations;
  private final Map<String, List<String>> pluginOptions;
  private final Map<String, String[]> pluginEnvps;
  private final String version;
  private final String buildTime;
  private final String hash;
  private final String gist_server;
  private final String sharing_server;
  private JSONObject prefs;
  private final String useHttpsCert;
  private final String useHttpsKey;
  private final Boolean requirePassword;
  private final String listenInterface;
  private final String connectHost;
  private SecureRandom random;
  private Boolean showZombieLogging;

  private String hash(String password) {
    return DigestUtils.sha512Hex(password + getPasswordSalt());
  }

  private String randomString(int nbits) {
    return new BigInteger(nbits, this.random).toString(32);
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


    if (pref.getPortable()){
      //get parent for the 'core' folder
      this.dotDir =  Paths.get("").toAbsolutePath().getParent().toString() + "/.beaker/v1";
    }else {
      this.dotDir = System.getProperty("user.home") + "/.beaker/v1";
    }
    this.pluginDir = this.installDir + "/config/plugins/eval";
    utils.ensureDirectoryExists(this.dotDir);
    this.nginxDir = this.installDir + "/nginx";
    if (System.getProperty("beaker.nginx.bin.dir") != null) {
      this.nginxBinDir = System.getProperty("beaker.nginx.bin.dir");
    } else {
      this.nginxBinDir = ""; // assuming nginx is available in PATH
    }
    this.nginxServDir = utils.createTempDirectory(this.dotDir, "nginx");
    this.nginxStaticDir = this.installDir + "/src/main/web";
    this.nginxExtraRules = "";
    this.nginxPluginRules = new HashMap<>();

    String configDir = this.dotDir + "/config";
    utils.ensureDirectoryExists(configDir);

    String cffile = System.getenv("BEAKER_CONFIG_FILE");
    if (cffile == null) {
      final String defaultConfigFile = this.installDir + "/config/beaker.conf.json";
      this.configFileUrl = defaultConfigFile;
    } else {
      this.configFileUrl = cffile;
    }

    final String defaultPreferenceFile = this.installDir + "/config/beaker.pref.json";
    final String preferenceFile = configDir + "/beaker.pref.json";
    utils.ensureFileHasContent(preferenceFile, defaultPreferenceFile);
    this.preferenceFileUrl = preferenceFile;

    String content = utils.readFile(this.preferenceFileUrl);
    
    JSONObject obj = (JSONObject)JSONValue.parse(content);
    if (obj.get("gist_server") != null)
        this.gist_server = (String)obj.get("gist_server");
    else
        this.gist_server = "https://api.github.com/gists";
        
    if (obj.get("sharing_server") != null)
        this.sharing_server = (String)obj.get("sharing_server");
    else
        this.sharing_server = "http://sharing.beakernotebook.com/gist/anonymous";
    this.prefs = obj;

    this.userFolder = this.dotDir + "/web";
    utils.ensureDirectoryExists(userFolder);
    utils.setPermissions(this.userFolder, PosixFilePermission.OWNER_READ,
                                          PosixFilePermission.OWNER_WRITE,
                                          PosixFilePermission.OWNER_EXECUTE);

    this.preferencesDefaultNotebook = pref.getDefaultNotebookUrl();

    String varDir = this.dotDir + "/var";
    utils.ensureDirectoryExists(varDir);
    utils.setPermissions(varDir, PosixFilePermission.OWNER_READ,
                                 PosixFilePermission.OWNER_WRITE,
                                 PosixFilePermission.OWNER_EXECUTE);
    this.recentNotebooksFileUrl = varDir + "/recentNotebooks";
    this.sessionBackupDir = varDir + "/sessionBackups";
    utils.ensureDirectoryExists(this.sessionBackupDir);
    utils.setPermissions(this.sessionBackupDir, PosixFilePermission.OWNER_READ,
                                                PosixFilePermission.OWNER_WRITE,
                                                PosixFilePermission.OWNER_EXECUTE);

    this.pluginLocations = new HashMap<>();
    this.pluginOptions = pref.getPluginOptions();
    this.pluginEnvps = new HashMap<>();

    augmentPluginOptions();

    this.publicServer = pref.getPublicServer();
    this.useHttpsCert = pref.getUseHttpsCert();
    this.useHttpsKey = pref.getUseHttpsKey();
    this.requirePassword = pref.getRequirePassword();
    this.listenInterface = pref.getListenInterface();
    this.connectHost = pref.getConnectHost();
    this.showZombieLogging = pref.getShowZombieLogging();
    
    this.random = new SecureRandom();
    // protect the core server
    this.authCookie = randomString(255);
    String userPassword = pref.getPassword();
    String password = StringUtils.isEmpty(userPassword) ? randomString(100) : userPassword;
    this.passwordHash = hash(password);
    this.password = password;

    if (this.publicServer && (this.useHttpsCert == null || this.useHttpsKey == null))  {
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
  public String getUserFolder() {
    return this.userFolder;
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
  public Boolean getRequirePassword() {
    return requirePassword;
  }
  
  @Override
  public String getUseHttpsCert() {
    return useHttpsCert;
  }
  
  @Override
  public String getUseHttpsKey() {
    return useHttpsKey;
  }
  
  @Override
  public String getListenInterface() {
    return listenInterface;
  }

  @Override
  public String getConnectHost() {
    return connectHost;
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
    if (this.preferencesDefaultNotebook != null) {
      return this.preferencesDefaultNotebook;
    }
    final String mainDefaultNotebookPath = this.dotDir + "/config/default-notebook.bkr";
    final String defaultDefaultNotebookPath = this.installDir + "/config/default-notebook.bkr";
    File f = new File(mainDefaultNotebookPath);
    if(f.exists()) {
      return mainDefaultNotebookPath;
    } else {
      return defaultDefaultNotebookPath;
    }
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
  public Map<String, List<String>> getPluginOptions() {
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
    String hostname;
    if (this.connectHost != null) {
      hostname = this.connectHost;
    } else if (this.listenInterface != null) {
      if (this.listenInterface.equals("*"))
        hostname = InetAddress.getLocalHost().getHostName();
      else
        hostname = this.listenInterface;
    } else if (this.publicServer)
      hostname = InetAddress.getLocalHost().getHostName();
    else
      hostname = "127.0.0.1";

    boolean useHttps = this.publicServer || (this.useHttpsCert!=null && this.useHttpsKey!=null);

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
      return this.installDir + "/src/main/web/app/dist/index_template.html";
  }
  
  @Override
  public String getGistServerUrl() {
    return this.gist_server;
  }

  @Override
  public String getSharingServerUrl() {
    return this.sharing_server;      
  }

  @Override
  public String getPluginPath(String plugin) {
    String result = null;
    try {
      JSONObject plugins = (JSONObject) this.prefs.get("languages");
      JSONObject pprefs = (JSONObject) plugins.get(plugin);
      result = (String) pprefs.get("path");
    } catch (Exception e) {
      // ignore
    }
    return result;
  }

  public Object getPluginPrefs() {
    return this.prefs.get("languages");
  }

  public void setPluginPrefs(JSONObject newPrefs) {
    this.prefs = newPrefs;
  }

  @Override
  public Boolean getShowZombieLogging() {
    return this.showZombieLogging;
  }

  private void addOption(String plugin, String option) {
    List<String> current = this.pluginOptions.get(plugin);
    if (null == current) {
      current = new ArrayList<>();
      this.pluginOptions.put(plugin, current);
    } 
    current.add(option);
  }

  @SuppressWarnings("unchecked")
  private void augmentPluginOptions() {
    try {
      Map<String, JSONObject> plugins = (Map<String, JSONObject>) this.prefs.get("languages");
      for (Map.Entry<String, JSONObject> entry: plugins.entrySet()) {
        Object options = entry.getValue().get("options");
        String key = entry.getKey();
        if (options != null) {
          if (options instanceof String) {
            addOption(key, (String) options);
          } else {
            for (String o : (List<String>) options) {
              addOption(key, o);
            }
          }
        }
      }
    } catch (Exception e) {
      // ignore
    }
  }
}
