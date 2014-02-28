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
package com.twosigma.beaker;

import com.google.inject.Guice;
import com.twosigma.beaker.module.GuiceCometdModule;
import com.twosigma.beaker.module.SerializerModule;
import com.twosigma.beaker.module.URLConfigModule;
import com.twosigma.beaker.module.WebServerModule;
import com.twosigma.beaker.rest.StartProcessRest;

/**
 * In the main function, create modules and perform initialization.
 */
public class Main {

  private static final java.util.logging.Logger GuiceComponentProviderFactoryLogger =
          java.util.logging.Logger.getLogger(com.sun.jersey.guice.spi.container.GuiceComponentProviderFactory.class.getName());
  private static final java.util.logging.Logger WebApplicationImplLogger =
          java.util.logging.Logger.getLogger(com.sun.jersey.server.impl.application.WebApplicationImpl.class.getName());

  static {
    GuiceComponentProviderFactoryLogger.setLevel(java.util.logging.Level.WARNING);
    WebApplicationImplLogger.setLevel(java.util.logging.Level.WARNING);
  }

  public static void main(String[] args)
          throws Exception {
    java.util.logging.Logger.getLogger("com.sun.jersey").setLevel(java.util.logging.Level.OFF);

    Init.portBase = Init.findPortBase();

    Init.injector = Guice.createInjector(new WebServerModule(Init.portBase),
            new URLConfigModule(),
            new SerializerModule(),
            new GuiceCometdModule());
    Init.init();

    final StartProcessRest processStarter = Init.injector.getInstance(StartProcessRest.class);
    String beakerCore = Platform.getBeakerCoreDirectory();
    processStarter.readPluginConfig(Platform.getConfigDir() + "/plugins");
    processStarter.setPluginLocation("IPython", "src/main/sh");
    processStarter.setPluginLocation("Julia", "src/main/sh");
    processStarter.setPluginLocation("R", "src/main/sh");
    processStarter.setPluginLocation("Groovy", "src/main/sh");

    Init.run(args);

  }
}
