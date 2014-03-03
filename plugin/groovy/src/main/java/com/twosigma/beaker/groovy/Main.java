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
package com.twosigma.beaker.groovy;

import com.twosigma.beaker.shared.Platform;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.twosigma.beaker.groovy.module.URLConfigModule;
import com.twosigma.beaker.jvm.module.GuiceCometdModule;
import com.twosigma.beaker.jvm.module.SerializerModule;
import com.twosigma.beaker.jvm.module.WebServerModule;
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

  static {
    GuiceComponentProviderFactoryLogger.setLevel(java.util.logging.Level.WARNING);
    WebApplicationImplLogger.setLevel(java.util.logging.Level.WARNING);
  }

  public static void main(String[] args)
          throws Exception {
    java.util.logging.Logger.getLogger("com.sun.jersey").setLevel(java.util.logging.Level.OFF);

    if (args.length != 1) {
      System.out.println("usage: groovyPlugin <port>");
    }
    int port = Integer.parseInt(args[0]);

    Injector injector = Guice.createInjector(new WebServerModule(port),
            new URLConfigModule(),
            new SerializerModule(),
            new GuiceCometdModule());
    // Hack to prevent jersey from trying to contact the prod US
    // jms server. This is set in ts/messagingjms properties.
    // See BEAKER-402.
    System.clearProperty("java.naming.provider.url");

    Platform.setInjector(injector);

    Server server = injector.getInstance(Server.class);
    server.start();
    System.out.println("Server started");
  }
}
