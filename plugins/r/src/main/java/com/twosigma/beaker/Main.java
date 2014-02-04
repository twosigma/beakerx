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
import com.google.inject.Injector;
import com.twosigma.beaker.r.module.GuiceCometdModule;
import com.twosigma.beaker.r.module.SerializerModule;
import com.twosigma.beaker.module.URLConfigModule;
import com.twosigma.beaker.module.WebServerModule;
import com.twosigma.beaker.r.plugin.r.StartRPlugin;
import org.eclipse.jetty.server.Server;


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
            throws Exception
    {
        java.util.logging.Logger.getLogger("com.sun.jersey").setLevel(java.util.logging.Level.OFF);

        Injector injector = Guice.createInjector(new WebServerModule(8803), // XXX this has 2 added to it
                                                 new URLConfigModule(),
                                                 new SerializerModule(),
                                                 new GuiceCometdModule());
        // Hack to prevent jersey from trying to contact the prod US
        // jms server. This is set in ts/messagingjms properties.
        // See BEAKER-402.
        System.clearProperty("java.naming.provider.url");

        Platform.setInjector(injector);

        StartRPlugin.StartRserve(injector);

        Server server = injector.getInstance(Server.class);
        server.start();
        System.out.println("Server started");
    }
}
