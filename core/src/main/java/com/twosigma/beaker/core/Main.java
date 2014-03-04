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
import com.google.inject.Key;
import com.google.inject.name.Names;
import com.twosigma.beaker.shared.module.GuiceCometdModule;
import com.twosigma.beaker.shared.module.platform.PlatformModule;
import com.twosigma.beaker.core.module.SerializerModule;
import com.twosigma.beaker.core.module.URLConfigModule;
import com.twosigma.beaker.core.module.WebServerModule;
import com.twosigma.beaker.core.rest.StartProcessRest;
import com.twosigma.beaker.core.rest.UtilRest;
import com.twosigma.beaker.shared.module.platform.BasicUtils;
import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;
import org.eclipse.jetty.server.Server;

/**
 * In the main function, create modules and perform initialization.
 */
public class Main {

  static {
    Logger.getLogger(com.sun.jersey.guice.spi.container.GuiceComponentProviderFactory.class.getName())
        .setLevel(java.util.logging.Level.WARNING);
    Logger.getLogger(com.sun.jersey.server.impl.application.WebApplicationImpl.class.getName())
        .setLevel(java.util.logging.Level.WARNING);
  }

  public static void main(String[] args) throws Exception {

    Logger.getLogger("com.sun.jersey").setLevel(java.util.logging.Level.OFF);


    Boolean disableKerberosPref = Boolean.FALSE;
    Boolean openBrowserPref = null;
    String defaultNotebook = null;
    Map<String, String> pluginOptions = new HashMap<>();

    for (int i = 0; i < args.length; i++) {
      if (args[i].equals("--disable-kerberos")) {
        disableKerberosPref = Boolean.TRUE;
        break;
      } else if (args[i].equals("--default-notebook")) {
        if (i < (args.length - 1)) {
          defaultNotebook = args[i + 1];
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
          pluginOptions.put(param.substring(0, x), param.substring(x + 1, param.length()));
          i++;
        } else {
          System.err.println("missing argument to --plugin-option, ignoring it");
        }
      } else if (args[i].startsWith("--open-browser")) {
        String value = args[i + 1].toLowerCase();
        if (value.equals("true") || value.equals("t") || value.equals("yes") || value.equals("y")) {
          openBrowserPref = Boolean.TRUE;
          i++;
        } else if (value.equals("false") || value.equals("f") || value.equals("no") || value.equals("n")) {
          openBrowserPref = Boolean.FALSE;
          i++;
        } else {
          System.err.println("ignoring command line flag --open-browser: unrecognized value, possible values are: true or false");
        }
      } else {
        System.err.println("ignoring unrecognized command line option: " + args[i]);
      }
    }




    Injector injector = Guice.createInjector(
        new PlatformModule(disableKerberosPref, openBrowserPref),
        new WebServerModule(),
        new URLConfigModule(),
        new SerializerModule(),
        new GuiceCometdModule());

    final StartProcessRest processStarter = injector.getInstance(StartProcessRest.class);
    final UtilRest utilRest = injector.getInstance(UtilRest.class);

    for (Map.Entry<String, String> e: pluginOptions.entrySet()) {
      processStarter.addArg(e.getKey(), e.getValue());
    }

    utilRest.setDefaultNotebook(defaultNotebook);

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

    Boolean openBrowser = injector.getInstance(Key.get(Boolean.class, Names.named("open-browser")));
    String initUrl = injector.getInstance(Key.get(String.class, Names.named("init-url")));
    if (openBrowser) {
      injector.getInstance(BasicUtils.class).openUrl(initUrl);
    }

    String connectionMessage = injector.getInstance(Key.get(String.class, Names.named("connection-message")));
    System.out.println(connectionMessage);
  }

}
