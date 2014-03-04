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

package com.twosigma.beaker.shared.module.platform;

import com.google.inject.AbstractModule;
import com.google.inject.name.Names;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.UnknownHostException;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * PlatformModule
 *
 */
public class PlatformModule extends AbstractModule {
  private static final String USERNAME = System.getProperty("user.name");
  private static final String INSTALL_DIR = System.getProperty("user.dir");
  private static final String STATIC_DIR = INSTALL_DIR + "/src/main/web";
  private static final String CONFIG_DIR = INSTALL_DIR + "/config";
  private static final String NGINX_PATH = "";
  private static final int PORT_BASE_START = 8800;
  private static final Boolean USE_KERBEROS_DEFAULT = Boolean.FALSE;
  private static final Boolean OPEN_BROWSER_DEFAULT = Boolean.TRUE;
  private static final Boolean USE_HTTPS = Boolean.FALSE;

  private final Boolean _useKerberos;
  private final Boolean _openBrowser;
  private final Integer _portBase;
  private final String _portBaseString;
  private final String _connectionMessage;
  private final String _initUrl;

  public PlatformModule(
          Boolean disableKerberosPref,
          Boolean openBrowserPref) throws UnknownHostException {
    if (disableKerberosPref) {
      _useKerberos = Boolean.FALSE;
    } else {
      _useKerberos = USE_KERBEROS_DEFAULT;
    }

    if (openBrowserPref == null) {
      _openBrowser = OPEN_BROWSER_DEFAULT;
    } else {
      _openBrowser = openBrowserPref;
    }

    _portBase = findPortBase();
    _portBaseString = Integer.toString(_portBase);

    String localhostname = java.net.InetAddress.getLocalHost().getHostName();
    StringBuilder sb = new StringBuilder("\n");
    if (USE_HTTPS) {
      _initUrl = "https://" + localhostname + ":" + _portBaseString + "/beaker/";
    } else {
      _initUrl = "http://" + (_useKerberos ? (System.getProperty("user.name") + ".") : "")
              + localhostname + ":" + (_portBase + 1) + "/beaker/";
    }
    if (_openBrowser) {
      sb.append("Connecting to ");
    } else {
      sb.append("Connect to ");
    }
    sb.append(_initUrl).append("\n");

    _connectionMessage = sb.toString();
  }

  @Override
  protected void configure() {

    // bind String configurations
    Map<String, String> properties = new LinkedHashMap<>();
    properties.put("username", USERNAME);
    properties.put("install-dir", INSTALL_DIR);
    properties.put("static-dir", STATIC_DIR);
    properties.put("config-dir", CONFIG_DIR);
    properties.put("nginx-path", NGINX_PATH);
    properties.put("port-base-string", _portBaseString);
    properties.put("connection-message", _connectionMessage);
    properties.put("init-url", _initUrl);

    Names.bindProperties(binder(), properties);

    // bind other type configurations
    bind(Integer.class).annotatedWith(Names.named("port-base")).toInstance(_portBase);
    bind(Boolean.class).annotatedWith(Names.named("use-kerberos")).toInstance(_useKerberos);
    bind(Boolean.class).annotatedWith(Names.named("open-browser")).toInstance(_openBrowser);

    // bind basic utilities
    bind(BasicUtils.class);
  }

  private static int findPortBase() {
    int width = 10; // currently we use 6
    int tries = 0;
    int base = PORT_BASE_START;
    while (!portRangeAvailable(base, width)) {
      System.out.println("Port range " + base + "-" + (base + width - 1) + " taken, searching...");
      base += width * (int) (1 + Math.random() * 100);
      if (tries++ > 10) {
        System.err.println("can't find open port.");
        System.exit(1);
      }
    }
    return base;
  }

  private static boolean portAvailable(int port) {

    ServerSocket ss = null;
    try {
      ss = new ServerSocket(port);
      ss.setReuseAddress(true);
      return true;
    } catch (IOException e) {
    } finally {
      if (ss != null) {
        try {
          ss.close();
        } catch (IOException e) {
          /* should not be thrown */
        }
      }
    }

    return false;
  }

  private static boolean portRangeAvailable(int port, int width) {
    for (int p = port; p < port + width; p++) {
      if (!portAvailable(p)) {
        return false;
      }
    }
    return true;
  }
}