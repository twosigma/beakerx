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
package com.twosigma.beaker.core;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.twosigma.beaker.shared.module.GuiceCometdModule;
import com.twosigma.beaker.core.module.SerializerModule;
import com.twosigma.beaker.core.module.URLConfigModule;
import com.twosigma.beaker.core.module.WebServerModule;
import com.twosigma.beaker.core.module.config.DefaultBeakerConfigModule;
import com.twosigma.beaker.core.module.config.BeakerConfigPref;
import com.twosigma.beaker.core.rest.PluginServiceLocatorRest;
import com.twosigma.beaker.shared.module.util.GeneralUtils;
import com.twosigma.beaker.shared.module.util.GeneralUtilsModule;
import com.twosigma.beaker.shared.module.config.DefaultWebServerConfigModule;
import com.twosigma.beaker.shared.module.config.WebAppConfigPref;
import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.eclipse.jetty.server.Server;

/**
 * In the main function, create modules and perform initialization.
 */
public class Main {

  private static final Logger GuiceComponentProviderFactoryLogger =
          Logger.getLogger(com.sun.jersey.guice.spi.container.GuiceComponentProviderFactory.class.getName());
  private static final Logger WebApplicationImplLogger =
          Logger.getLogger(com.sun.jersey.server.impl.application.WebApplicationImpl.class.getName());
  private static final Logger JerseyLogger = Logger.getLogger("com.sun.jersey");

  static {
    GuiceComponentProviderFactoryLogger.setLevel(Level.WARNING);
    WebApplicationImplLogger.setLevel(Level.WARNING);
    JerseyLogger.setLevel(Level.OFF);
  }

  private static final Integer PORT_BASE_START_DEFAULT = 8800;
  private static final Boolean OPEN_BROWSER_DEFAULT = Boolean.TRUE;
  private static final Boolean USE_HTTPS_DEFAULT = Boolean.FALSE;
  private static final Boolean USE_KERBEROS_DEFAULT = Boolean.FALSE;
  private static final Integer CLEAR_PORT_OFFSET = 1;
  private static final Integer BEAKER_SERVER_PORT_OFFSET = 2;

  public static void main(String[] args) throws Exception {
    final CliOptions cliOptions = new CliOptions(args);

    final Integer portBase = cliOptions.getPortBase() != null ?
        cliOptions.getPortBase() : findPortBase(PORT_BASE_START_DEFAULT);
    final Boolean useKerberos = cliOptions.getDisableKerberos() != null ?
        !cliOptions.getDisableKerberos() : USE_KERBEROS_DEFAULT;
    final Boolean openBrowser = cliOptions.getOpenBrowser() != null ?
        cliOptions.getOpenBrowser() : OPEN_BROWSER_DEFAULT;
    final Boolean useHttps = cliOptions.getUseHttps() != null ?
        cliOptions.getUseHttps() : USE_HTTPS_DEFAULT;

    // create preferences for beaker core from cli options and others
    // to be used by BeakerCoreConfigModule to initialize its config
    BeakerConfigPref beakerCorePref = createBeakerCoreConfigPref(
        useKerberos,
        portBase,
        cliOptions.getDefaultNotebookUrl(),
        cliOptions.getPluginOptions());

    WebAppConfigPref webAppPref = createWebAppConfigPref(
        portBase + BEAKER_SERVER_PORT_OFFSET,
        System.getProperty("user.dir") + "/src/main/web");

    Injector injector = Guice.createInjector(
        new DefaultBeakerConfigModule(beakerCorePref),
        new DefaultWebServerConfigModule(webAppPref),
        new GeneralUtilsModule(),
        new WebServerModule(),
        new URLConfigModule(),
        new SerializerModule(),
        new GuiceCometdModule());

    PluginServiceLocatorRest processStarter = injector.getInstance(PluginServiceLocatorRest.class);
    processStarter.start();

    Server server = injector.getInstance(Server.class);
    server.start();

    // openBrower and show connection instruction message
    final String initUrl = getInitUrl(useHttps, portBase, useKerberos);
    if (openBrowser) {
      injector.getInstance(GeneralUtils.class).openUrl(initUrl);
      System.out.println("\nConnecting to " + initUrl + "\n");
    } else {
      System.out.println("\nConnect to " + initUrl + "\n");
    }

  }

  private static String getInitUrl(Boolean useHttps, Integer portBase, Boolean useKerberos) throws UnknownHostException {
    String initUrl;

    final String localhostname = InetAddress.getLocalHost().getHostName();

    if (useHttps) {
      initUrl = "https://" + localhostname + ":" + portBase + "/beaker/";
    } else {
      initUrl = "http://" + (useKerberos ? (System.getProperty("user.name") + ".") : "")
              + localhostname + ":" + (portBase + CLEAR_PORT_OFFSET) + "/beaker/";
    }
    return initUrl;
  }

  private static BeakerConfigPref createBeakerCoreConfigPref(
      final Boolean useKerberos,
      final Integer portBase,
      final String defaultNotebookUrl,
      final Map<String, String> pluginOptions) {
    return new BeakerConfigPref() {

      @Override
      public Boolean getUseKerberos() {
        return useKerberos;
      }

      @Override
      public Integer getPortBase() {
        return portBase;
      }

      @Override
      public String getDefaultNotebookUrl() {
        return defaultNotebookUrl;
      }

      @Override
      public Map<String, String> getPluginOptions() {
        return pluginOptions;
      }
    };
  }

  private static WebAppConfigPref createWebAppConfigPref(final Integer port, final String staticDir) {
    return new WebAppConfigPref() {
      @Override
      public Integer getPort() {
        return port;
      }

      @Override
      public String getStaticDirectory() {
        return staticDir;
      }
    };
  }

  private static int findPortBase(Integer start) {
    int width = 3;
    int tries = 0;
    int base = start.intValue();
    while (!portRangeAvailable(base, width)) {
      System.out.println("Port range " + base + "-" + (base + width - 1) + " taken, searching...");
      base += width;
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

  private static class CliOptions {

    // This should reflect user pref so default should be null;
    // It is up to the ConfigModule to provide actual default when seeing null's.
    Boolean disableKerberosPref = null;
    Boolean openBrowserPref = null;
    String defaultNotebookUrl = null;
    Integer portBase = null;
    Map<String, String> pluginOptions = new HashMap<>();

    CliOptions(String[] args) {
      for (int i = 0; i < args.length; i++) {
        if (args[i].equals("--disable-kerberos")) {
          this.disableKerberosPref = Boolean.TRUE;
          break;
        } else if (args[i].startsWith("--open-browser")) {
          String value = args[i + 1].toLowerCase();
          switch (value) {
            case "true":
            case "t":
            case "yes":
            case "y":
              this.openBrowserPref = Boolean.TRUE;
              i++;
              break;
            case "false":
            case "f":
            case "no":
            case "n":
              this.openBrowserPref = Boolean.FALSE;
              i++;
              break;
            default:
              System.err.println("ignoring command line flag --open-browser: unrecognized value, possible values are: true or false");
              break;
          }
        } else if (args[i].equals("-port-base")) {
          if (i < (args.length - 1)) {
            this.portBase = Integer.parseInt(args[i + 1]);
            i++;
          } else {
            System.err.println("missing argument to --default-notebook, ignoring it");
          }
        } else if (args[i].equals("--default-notebook")) {
          if (i < (args.length - 1)) {
            this.defaultNotebookUrl = args[i + 1];
            i++;
          } else {
            System.err.println("missing argument to --default-notebook, ignoring it");
          }
        } else if (args[i].equals("--plugin-option")) {
          if (i < (args.length - 1)) {
            String param = args[i + 1];
            int x = param.indexOf(':');
            if (x < 0) {
              continue;
            }
            this.pluginOptions.put(param.substring(0, x), param.substring(x + 1, param.length()));
            i++;
          } else {
            System.err.println("missing argument to --plugin-option, ignoring it");
          }
        } else {
          System.err.println("ignoring unrecognized command line option: " + args[i]);
        }
      }
    }

    Boolean getDisableKerberos() {
      return this.disableKerberosPref;
    }

    Boolean getOpenBrowser() {
      return this.openBrowserPref;
    }

    Integer getPortBase() {
      return this.portBase;
    }

    Boolean getUseHttps() {
      return null;
    }

    String getDefaultNotebookUrl() {
      return this.defaultNotebookUrl;
    }

    Map<String, String> getPluginOptions() {
      return this.pluginOptions;
    }
  }
}
