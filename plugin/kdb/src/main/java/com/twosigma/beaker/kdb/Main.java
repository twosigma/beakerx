/*
 *  Copyright 2015 Michael Pymm
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
package com.twosigma.beaker.kdb;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.sun.jersey.guice.spi.container.GuiceComponentProviderFactory;
import com.sun.jersey.server.impl.application.WebApplicationImpl;
import com.twosigma.beaker.jvm.module.SerializerModule;
import com.twosigma.beaker.jvm.module.WebServerModule;
import com.twosigma.beaker.jvm.threads.BeakerStdOutErrHandler;
import com.twosigma.beaker.kdb.module.URLConfigModule;
import com.twosigma.beaker.kdb.rest.KdbRest;
import com.twosigma.beaker.shared.module.GuiceCometdModule;
import com.twosigma.beaker.shared.module.config.DefaultWebAppConfigPref;
import com.twosigma.beaker.shared.module.config.DefaultWebServerConfigModule;
import com.twosigma.beaker.shared.module.config.WebAppConfigPref;
import org.eclipse.jetty.server.Server;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.logging.LogManager;
import java.util.logging.Logger;

import static java.util.logging.Level.*;

/**
 * Run the kdb plugin.
 */
public class Main {
    private static final Logger guiceLogger = Logger.getLogger(GuiceComponentProviderFactory.class.getName());
    private static final Logger webLogger   = Logger.getLogger(WebApplicationImpl.class.getName());

    static {
        guiceLogger .setLevel(WARNING);
        webLogger   .setLevel(WARNING);
    }

    private static final LogManager logManager = LogManager.getLogManager();

    /**
     * Entry point. Takes one argument, the port to listen on.
     *
     * @param args
     */
    public static void main(String[] args) throws Exception {
        // Parse args.
        if (args.length != 1) {
            System.out.println("usage: " + Main.class.getName() + " <listen port>");
        }

        if (System.getenv("beaker_logger_file") != null) {
            try {
                logManager.readConfiguration(new FileInputStream(System.getenv("beaker_logger_file")));
            } catch (IOException exception) {
                System.err.println("Error in loading configuration: " + exception);
            }
        } else {
            Logger.getLogger("com.sun.jersey").setLevel(OFF);
            Logger.getLogger("com.twosigma.beaker").setLevel(SEVERE);
        }

        final int port = Integer.parseInt(args[0]);
        WebAppConfigPref webAppPref = new DefaultWebAppConfigPref(port);
        Injector injector = Guice.createInjector(
                new DefaultWebServerConfigModule(webAppPref),
                new WebServerModule(),
                new URLConfigModule(),
                new SerializerModule(),
                new GuiceCometdModule());

        // Configure the rest endpoint.
        final int corePort = Integer.parseInt(System.getenv("beaker_core_port"));
        final KdbRest rest = injector.getInstance(KdbRest.class);
        rest.setCorePort(corePort);

        Server server = injector.getInstance(Server.class);
        server.start();
        System.out.println("Server started");
        BeakerStdOutErrHandler.init();
    }
}
