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
package com.twosigma.beaker.shared.servlet;

import javax.servlet.ServletException;

import com.google.inject.Inject;
import com.google.inject.Injector;
import com.google.inject.Singleton;
import org.cometd.annotation.AnnotationCometdServlet;
import org.cometd.annotation.ServerAnnotationProcessor;
import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.server.BayeuxServerImpl;
import org.eclipse.jetty.util.Loader;

/**
 * Taken from
 * https://github.com/Ovea/cometd-contrib/blob/master/src/main/java/com/ovea/cometd/guice/GuiceCometdServlet.java
 *
 * Didn't release because of baggage (ovea-json) Created: Oct 16, 2012
 */
@Singleton
public class GuiceCometdServlet
        extends AnnotationCometdServlet {

  private static final long serialVersionUID = -7354582894239989530L;
  private final Injector injector;

  @Inject
  public GuiceCometdServlet(Injector injector) {
    this.injector = injector;
  }

  @Override
  public void init() throws ServletException {
    getServletContext().setAttribute(BayeuxServer.ATTRIBUTE, newBayeuxServer());
    super.init();
  }

  @Override
  protected BayeuxServerImpl newBayeuxServer() {
    return injector.getInstance(BayeuxServerImpl.class);
  }

  @Override
  protected ServerAnnotationProcessor newServerAnnotationProcessor(BayeuxServer bayeuxServer) {
    return injector.getInstance(ServerAnnotationProcessor.class);
  }

  @SuppressWarnings({"unchecked"})
  @Override
  protected Object newService(String serviceClassName) throws Exception {
    return injector.getInstance(Loader.loadClass(getClass(), serviceClassName));
  }
}
