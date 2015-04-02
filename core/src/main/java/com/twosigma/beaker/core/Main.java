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
import com.twosigma.beaker.core.module.CometdModule;
import com.twosigma.beaker.core.module.SerializerModule;
import com.twosigma.beaker.core.module.URLConfigModule;
import com.twosigma.beaker.core.module.WebServerModule;
import com.twosigma.beaker.core.module.config.DefaultBeakerConfigModule;
import com.twosigma.beaker.core.module.config.BeakerConfig;
import com.twosigma.beaker.core.module.config.BeakerConfigPref;
import com.twosigma.beaker.core.rest.PluginServiceLocatorRest;
import com.twosigma.beaker.shared.module.util.GeneralUtils;
import com.twosigma.beaker.shared.module.util.GeneralUtilsModule;
import com.twosigma.beaker.shared.module.config.DefaultWebServerConfigModule;
import com.twosigma.beaker.shared.module.config.WebAppConfigPref;

import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.lang.management.ManagementFactory;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.cli.GnuParser;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;
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
    JerseyLogger.setLevel(Level.ALL);
  }

  private static final Integer PORT_BASE_START_DEFAULT = 8800;
  private static final Boolean OPEN_BROWSER_DEFAULT = Boolean.TRUE;
  private static final Boolean USE_HTTPS_DEFAULT = Boolean.FALSE;
  private static final Boolean PUBLIC_SERVER_DEFAULT = Boolean.FALSE;
  private static final Boolean NO_PASSWORD_DEFAULT = Boolean.FALSE;
  private static final Boolean USE_KERBEROS_DEFAULT = Boolean.FALSE;
  private static final Integer CLEAR_PORT_OFFSET = 1;
  private static final Integer BEAKER_SERVER_PORT_OFFSET = 2;

  private static CommandLine parseCommandLine(String[] args)
    throws ParseException
  {
    CommandLineParser parser = new GnuParser();
    Options opts = new Options();
    opts.addOption("h", "help", false, "print this message");
    opts.addOption(null, "disable-kerberos", false, "do not require kerberos authentication");
    opts.addOption(null, "open-browser", true, "open a web browser connected to the Beaker server");
    opts.addOption(null, "port-base", true, "main port number to use, other ports are allocated starting here");
    opts.addOption(null, "default-notebook", true, "file name to find default notebook");
    opts.addOption(null, "plugin-option", true, "pass option on to plugin");
    opts.addOption(null, "public-server", false, "allow connections from external computers");
    opts.addOption(null, "no-password", false, "do not require a password from external connections " +
                   "(warning: for advanced users only!)");
    CommandLine line = parser.parse(opts, args);
    if (line.hasOption("help")) {
      new HelpFormatter().printHelp("beaker.command", opts);
      System.exit(0);
    }
    return line;
  }

  private static boolean parseBoolean(String arg) {
    switch (arg.toLowerCase()) {
      case "true":
      case "t":
      case "yes":
      case "y":
        return true;
      case "false":
      case "f":
      case "no":
      case "n":
        return false;
      default:
        throw new RuntimeException("unrecognized boolean command line argument: " + arg);
    }
  }

  private static Map<String, List<String>> getPluginOptions(CommandLine options) {
    Map<String, List<String>> result = new HashMap<>();
    if (options.hasOption("plugin-option")) {
      for (String param: options.getOptionValues("plugin-option")) {
        int x = param.indexOf(':');
        if (x < 0) {
          throw new RuntimeException("plugin option requires colon (':')");
        }
        String key = param.substring(0, x);
        String val = param.substring(x + 1, param.length());
        List<String> current = result.get(key);
        if (null == current) {
          current = new ArrayList<>();
          result.put(key, current);
        } 
        current.add(val);
      }
    }
    return result;
  }

  private static void writePID(BeakerConfig bkConfig)
    throws FileNotFoundException
  {

    String name = ManagementFactory.getRuntimeMXBean().getName();
    int at = name.indexOf("@");
    if (at > 0) {
      String pid = name.substring(0, at);
      String dir = bkConfig.getNginxServDirectory();
      PrintWriter out = new PrintWriter(dir + "/pid");
      out.println(pid);
      out.close();
    } else {
      System.err.println("warning, could not determine PID");
    }
  }

  public static void main(String[] args) throws Exception {
    CommandLine options = parseCommandLine(args);

    final Integer portBase = options.hasOption("port-base") ?
      Integer.parseInt(options.getOptionValue("port-base")) : findPortBase(PORT_BASE_START_DEFAULT);
    final Boolean useKerberos = options.hasOption("disable-kerberos") ?
      !parseBoolean(options.getOptionValue("disable-kerberos")) : USE_KERBEROS_DEFAULT;
    final Boolean openBrowser = options.hasOption("open-browser") ?
      parseBoolean(options.getOptionValue("open-browser")) : OPEN_BROWSER_DEFAULT;
    final Boolean useHttps = options.hasOption("use-https") ?
      parseBoolean(options.getOptionValue("use-https")) : USE_HTTPS_DEFAULT;
    final Boolean publicServer = options.hasOption("public-server");

    // create preferences for beaker core from cli options and others
    // to be used by BeakerCoreConfigModule to initialize its config
    BeakerConfigPref beakerCorePref = createBeakerCoreConfigPref(
        useKerberos,
        publicServer,
        false,
        portBase,
        options.getOptionValue("default-notebook"),
        getPluginOptions(options));

    WebAppConfigPref webAppPref = createWebAppConfigPref(
        portBase + BEAKER_SERVER_PORT_OFFSET,
        System.getProperty("user.dir") + "/src/main/web");

    Injector injector = Guice.createInjector(
        new DefaultBeakerConfigModule(beakerCorePref),
        new DefaultWebServerConfigModule(webAppPref),
        new GeneralUtilsModule(),
        new WebServerModule(),
        new SerializerModule(),
        new GuiceCometdModule(),
        new URLConfigModule());

    PluginServiceLocatorRest processStarter = injector.getInstance(PluginServiceLocatorRest.class);
    processStarter.start();

    BeakerConfig bkConfig = injector.getInstance(BeakerConfig.class);

    writePID(bkConfig);

    Server server = injector.getInstance(Server.class);
    server.start();

    // openBrower and show connection instruction message
    final String initUrl = bkConfig.getBaseURL();
    if (openBrowser) {
      injector.getInstance(GeneralUtils.class).openUrl(initUrl);
      System.out.println("\nConnecting to " + initUrl);
    } else {
      System.out.println("\nConnect to " + initUrl);
    }
    if (publicServer) {
      System.out.println("Submit this password: " + bkConfig.getPassword());
    }
    System.out.println("");
  }

  private static BeakerConfigPref createBeakerCoreConfigPref(
      final Boolean useKerberos,
      final Boolean publicServer,
      final Boolean noPasswordAllowed,
      final Integer portBase,
      final String defaultNotebookUrl,
      final Map<String, List<String>> pluginOptions) {
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
      public Boolean getPublicServer() {
        return publicServer;
      }

      @Override
      public Boolean getNoPasswordAllowed() {
        return noPasswordAllowed;
      }

      @Override
      public String getDefaultNotebookUrl() {
        return defaultNotebookUrl;
      }

      @Override
      public Map<String, List<String>> getPluginOptions() {
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
    int width = 4;
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
      InetAddress address = InetAddress.getByName("127.0.0.1");
      ss = new ServerSocket(port, 1, address);
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
