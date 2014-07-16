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
package com.twosigma.beaker.shared.module;

import com.google.inject.AbstractModule;
import com.google.inject.Provider;
import com.google.inject.Provides;
import com.google.inject.Scopes;
import com.google.inject.Singleton;
import com.google.inject.TypeLiteral;
import com.google.inject.matcher.AbstractMatcher;
import com.google.inject.spi.InjectionListener;
import com.google.inject.spi.TypeEncounter;
import com.google.inject.spi.TypeListener;
import org.codehaus.jackson.map.ObjectMapper;
import org.cometd.annotation.ServerAnnotationProcessor;
import org.cometd.annotation.Service;
import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.server.BayeuxServerImpl;
import org.cometd.server.JacksonJSONContextServer;

// Should load from cometd-contrib
public class GuiceCometdModule extends AbstractModule {

  @Override
  protected final void configure() {
    bind(BayeuxServer.class).to(BayeuxServerImpl.class).in(Scopes.SINGLETON);
    if (discoverBindings()) {
      // automatically add services
      bindListener(new AbstractMatcher<TypeLiteral<?>>() {
        @Override
        public boolean matches(TypeLiteral<?> o) {
          return o.getRawType().isAnnotationPresent(Service.class);
        }
      }, new TypeListener() {
        @Override
        public <I> void hear(TypeLiteral<I> type, TypeEncounter<I> encounter) {
          final Provider<ServerAnnotationProcessor> processor =
                  encounter.getProvider(ServerAnnotationProcessor.class);
          encounter.register(new InjectionListener<I>() {
            @Override
            public void afterInjection(I injectee) {
              processor.get().process(injectee);
            }
          });
        }
      });
      // automatically add extensions
      bindListener(new AbstractMatcher<TypeLiteral<?>>() {
        @Override
        public boolean matches(TypeLiteral<?> o) {
          return BayeuxServer.Extension.class.isAssignableFrom(o.getRawType());
        }
      }, new TypeListener() {
        @Override
        public <I> void hear(TypeLiteral<I> type, TypeEncounter<I> encounter) {
          final Provider<BayeuxServer> server = encounter.getProvider(BayeuxServer.class);
          encounter.register(new InjectionListener<I>() {
            @Override
            public void afterInjection(I injectee) {
              server.get().addExtension(BayeuxServer.Extension.class.cast(injectee));
            }
          });
        }
      });
      // automatically add session listeners
      bindListener(new AbstractMatcher<TypeLiteral<?>>() {
        @Override
        public boolean matches(TypeLiteral<?> o) {
          return BayeuxServer.BayeuxServerListener.class.isAssignableFrom(o.getRawType());
        }
      }, new TypeListener() {
        @Override
        public <I> void hear(TypeLiteral<I> type, TypeEncounter<I> encounter) {
          final Provider<BayeuxServer> server = encounter.getProvider(BayeuxServer.class);
          encounter.register(new InjectionListener<I>() {
            @Override
            public void afterInjection(I injectee) {
              server.get().addListener(BayeuxServer.BayeuxServerListener.class.cast(injectee));
            }
          });
        }
      });
    }
    applicationBindings();
  }

  protected void applicationBindings() {
  }

  @Singleton
  @Provides
  public final BayeuxServerImpl getBayeuxServer(final ObjectMapper om) {
    BayeuxServerImpl server = new BayeuxServerImpl();
    server.setOption(BayeuxServerImpl.JSON_CONTEXT, new JacksonJSONContextServer() {
      @Override
      public ObjectMapper getObjectMapper() {
        return om;
      }
    });
    configure(server);
    try {
      server.start();
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage(), e);
    }
    return server;
  }

  protected boolean discoverBindings() {
    return true;
  }

  protected void configure(BayeuxServerImpl server) {
//	server.setOption("jsonContext", JacksonJSONContextServer.class.getCanonicalName());
  }

  @Provides
  @Singleton
  ServerAnnotationProcessor annotationProcessor(BayeuxServer server) {
    return new ServerAnnotationProcessor(server);
  }
}
