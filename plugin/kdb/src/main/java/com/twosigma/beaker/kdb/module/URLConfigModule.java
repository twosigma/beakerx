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
package com.twosigma.beaker.kdb.module;

import com.google.inject.servlet.ServletModule;
import com.sun.jersey.guice.spi.container.servlet.GuiceContainer;
import com.twosigma.beaker.kdb.rest.KdbRest;
import com.twosigma.beaker.shared.servlet.GuiceCometdServlet;
import org.cometd.server.JacksonJSONContextServer;

import java.util.HashMap;

/**
 * The module for configuring servlets, REST binding.
 */
public class URLConfigModule extends ServletModule {
  @SuppressWarnings("serial")
  @Override
  protected void configureServlets() {
    bind(GuiceContainer.class);
    serve("/rest/*").with(GuiceContainer.class, new HashMap<String, String>());

    bind(GuiceCometdServlet.class);
    serve("/cometd/*").with(GuiceCometdServlet.class, new HashMap<String, String>() {{
        put("jsonContext", JacksonJSONContextServer.class.getCanonicalName());
    }});

    // REST binding
    bind(KdbRest.class);
  }
}
