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

package com.twosigma.beaker.shared.module.config;

import com.google.inject.Inject;
import java.net.UnknownHostException;

/**
 * BeakerConfigImpl
 *
 */
public class BeakerConfigImpl implements BeakerConfig {
  private static final Boolean USE_KERBEROS_DEFAULT = Boolean.FALSE;
  private static final Boolean OPEN_BROWSER_DEFAULT = Boolean.TRUE;
  private static final Boolean USE_HTTPS_DEFAULT = Boolean.FALSE;

  private final String username;
  private final String installDir;
  private final String staticDir;
  private final String configDir;
  private final String nginxPath;
  private final Boolean useKerberos;
  private final Boolean openBrowser;
  private final Integer portBase;
  private final String connectionMessage;
  private final String initUrl;

  @Inject
  public BeakerConfigImpl(BeakerConfigPref pref) throws UnknownHostException {
    this.useKerberos = pref.getDisableKerberos() == null ?
        USE_KERBEROS_DEFAULT : !pref.getDisableKerberos();
    this.openBrowser = pref.getOpenBrowser() == null ?
        OPEN_BROWSER_DEFAULT : pref.getOpenBrowser();
    this.portBase = pref.getPortBase();
    this.username = System.getProperty("user.name");
    this.installDir = System.getProperty("user.dir");
    this.staticDir = installDir + "/src/main/web";
    this.configDir = installDir + "/config";
    this.nginxPath = "";

    final Boolean useHttps = pref.getUseHttps() == null ?
            USE_HTTPS_DEFAULT : pref.getUseHttps();

    String localhostname = java.net.InetAddress.getLocalHost().getHostName();
    StringBuilder sb = new StringBuilder("\n");
    if (useHttps) {
      this.initUrl = "https://" + localhostname + ":" + portBase + "/beaker/";
    } else {
      this.initUrl = "http://" + (useKerberos ? (System.getProperty("user.name") + ".") : "")
              + localhostname + ":" + (portBase + 1) + "/beaker/";
    }
    if (openBrowser) {
      sb.append("Connecting to ");
    } else {
      sb.append("Connect to ");
    }
    sb.append(this.initUrl).append("\n");

    this.connectionMessage = sb.toString();
  }

  @Override
  public String getUserName() {
    return this.username;
  }

  @Override
  public String getInstallDirectory() {
    return this.installDir;
  }

  @Override
  public String getStaticDirectory() {
    return this.staticDir;
  }

  @Override
  public String getConfigDirectory() {
    return this.configDir;
  }

  @Override
  public String getNginxPath() {
    return this.nginxPath;
  }

  @Override
  public String getConnectionMessage() {
    return this.connectionMessage;
  }

  @Override
  public String getInitUrl() {
    return this.initUrl;
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
  public Boolean getOpenBrowser() {
    return this.openBrowser;
  }

}
