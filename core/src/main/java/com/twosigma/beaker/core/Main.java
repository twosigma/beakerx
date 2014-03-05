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
package com.twosigma.beaker.core;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.twosigma.beaker.shared.module.GuiceCometdModule;
import com.twosigma.beaker.core.module.SerializerModule;
import com.twosigma.beaker.core.module.URLConfigModule;
import com.twosigma.beaker.core.module.WebServerModule;
import com.twosigma.beaker.core.rest.StartProcessRest;
import com.twosigma.beaker.core.rest.UtilRest;
import com.twosigma.beaker.shared.module.basicutils.BasicUtils;
import com.twosigma.beaker.shared.module.basicutils.BasicUtilsModule;
import com.twosigma.beaker.shared.module.config.BeakerConfig;
import com.twosigma.beaker.shared.module.config.BeakerConfigModule;
import com.twosigma.beaker.shared.module.config.BeakerConfigPref;
import com.twosigma.beaker.shared.module.config.WebAppConfigModule;
import com.twosigma.beaker.shared.module.config.WebAppConfigPref;
import java.io.File;
import java.io.IOException;
import java.net.ServerSocket;
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

  final static Integer DEFAULT_PORT_BASE = 8800;

  public static void main(String[] args) throws Exception {
    final CliOptions cliOptions = new CliOptions(args);
    final Integer portBase = cliOptions.getPortBase() != null ?
        cliOptions.getPortBase() : findPortBase(DEFAULT_PORT_BASE);

    BeakerConfigPref beakerPref = createBeakerConfigPref(cliOptions, portBase);
    WebAppConfigPref webAppPref = createWebAppConfigPref(portBase + 2);

    Injector injector = Guice.createInjector(
        new BeakerConfigModule(beakerPref),
        new WebAppConfigModule(webAppPref),
        new BasicUtilsModule(),
        new WebServerModule(),
        new URLConfigModule(),
        new SerializerModule(),
        new GuiceCometdModule());

    final StartProcessRest processStarter = injector.getInstance(StartProcessRest.class);
    final UtilRest utilRest = injector.getInstance(UtilRest.class);

    for (Map.Entry<String, String> e: cliOptions.getPluginOptions().entrySet()) {
      processStarter.addArg(e.getKey(), e.getValue());
    }

    utilRest.setDefaultNotebook(cliOptions.getDefaultNotebookUrl());

    // Add shutdown hook
    Runtime.getRuntime().addShutdownHook(new Thread() {
      @Override
      public void run() {
        System.out.println("\nshutting down beaker");
        processStarter.shutdownPlugins();
        System.out.println("done, exiting");
      }
    });


    String dotDir = System.getProperty("user.home") + "/.beaker";

    File dotFile = new File(dotDir);
    if (!dotFile.exists()) {
      if (!dotFile.mkdir()) {
        System.out.println("failed to create " + dotDir);
      }
    }
    processStarter.setDotDir(dotDir);
    utilRest.setDotDir(dotDir);
    utilRest.resetConfig();


    processStarter.readPluginConfig();
    processStarter.setPluginLocation("IPython", "src/main/sh");
    processStarter.setPluginLocation("Julia", "src/main/sh");
    processStarter.setPluginLocation("R", "src/main/sh");
    processStarter.setPluginLocation("Groovy", "src/main/sh");

    processStarter.startReverseProxy();

    Server server = injector.getInstance(Server.class);
    server.start();

    BeakerConfig bkConfig = injector.getInstance(BeakerConfig.class);
    Boolean openBrowser = bkConfig.getOpenBrowser();
    String initUrl = bkConfig.getInitUrl();
    if (openBrowser) {
      injector.getInstance(BasicUtils.class).openUrl(initUrl);
    }

    String connectionMessage = bkConfig.getConnectionMessage();
    System.out.println(connectionMessage);
  }

  private static BeakerConfigPref createBeakerConfigPref(
      final CliOptions cliOptions,
      final Integer portBase) {
    return new BeakerConfigPref() {

      @Override
      public Boolean getDisableKerberos() {
        return cliOptions.getDisableKerberos();
      }

      @Override
      public Boolean getOpenBrowser() {
        return cliOptions.getOpenBrowser();
      }

      @Override
      public Integer getPortBase() {
        return portBase;
      }

      @Override
      public Boolean getUseHttps() {
        return cliOptions.getUseHttps();
      }
    };
  }

  private static WebAppConfigPref createWebAppConfigPref(final Integer port) {
    return new WebAppConfigPref() {
      @Override
      public Integer getPort() {
        return port;
      }
    };
  }

  private static int findPortBase(Integer start) {
    int width = 10; // currently we use 6
    int tries = 0;
    int base = start.intValue();
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

  private static class CliOptions implements BeakerConfigPref {

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

    @Override
    public Boolean getDisableKerberos() {
      return this.disableKerberosPref;
    }

    @Override
    public Boolean getOpenBrowser() {
      return this.openBrowserPref;
    }

    @Override
    public Integer getPortBase() {
      return this.portBase;
    }

    @Override
    public Boolean getUseHttps() {
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
