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
package com.twosigma.beaker.core.module;

import com.google.inject.AbstractModule;
import com.google.inject.Injector;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.twosigma.beaker.shared.json.serializer.StringObject;
import com.twosigma.beaker.core.rest.SessionBackupRest;
import org.codehaus.jackson.Version;
import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.map.module.SimpleModule;

/**
 * The Guice module as the registry of mapping from classes to serializers
 */
public class SerializerModule
        extends AbstractModule {

  @Override
  protected void configure() {
    bind(StringObject.Serializer.class);
    bind(SessionBackupRest.PluginSerializer.class);
    bind(SessionBackupRest.SessionSerializer.class);
  }

  @Provides
  @Singleton
  public ObjectMapper getObjectMapper(Injector injector) {
    ObjectMapper mapper = new ObjectMapper();

    SimpleModule module =
            new SimpleModule("MySerializer", new Version(1, 0, 0, null));

    module.addSerializer(StringObject.class,
        injector.getInstance(StringObject.Serializer.class));
    module.addSerializer(SessionBackupRest.Plugin.class,
        injector.getInstance(SessionBackupRest.PluginSerializer.class));
    module.addSerializer(SessionBackupRest.Session.class,
        injector.getInstance(SessionBackupRest.SessionSerializer.class));

    mapper.registerModule(module);

    SerializationConfig config = mapper.getSerializationConfig();

    // Pretty
    mapper.enable(SerializationConfig.Feature.INDENT_OUTPUT);

    // Manually serialize everything, either through mixin or serializer
    mapper.disable(SerializationConfig.Feature.AUTO_DETECT_GETTERS);
    mapper.disable(SerializationConfig.Feature.AUTO_DETECT_IS_GETTERS);
    mapper.disable(SerializationConfig.Feature.AUTO_DETECT_FIELDS);

    return mapper;
  }

  @Provides
  @Singleton
  public JacksonJsonProvider getJackson(ObjectMapper mapper) {
    return new JacksonJsonProvider(mapper);
  }
}
