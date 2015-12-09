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
package com.twosigma.beaker.jvm.serialization;

import com.google.inject.Provider;
import com.twosigma.beaker.jvm.object.OutputContainerLayoutManager;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public abstract class OutputContainerLayoutManagerSerializer<T extends OutputContainerLayoutManager> extends
                                                                                                     JsonSerializer<T> {

  private final Provider<BeakerObjectConverter> objectSerializerProvider;

  public OutputContainerLayoutManagerSerializer(Provider<BeakerObjectConverter> osp) {
    objectSerializerProvider = osp;
  }

  protected BeakerObjectConverter getObjectSerializer() {
    return objectSerializerProvider.get();
  }

  @Override
  public void serialize(T value,
                        JsonGenerator jgen,
                        SerializerProvider provider)
    throws IOException, JsonProcessingException {

    synchronized (value) {
      jgen.writeStartObject();
      jgen.writeObjectField("type", value.getClass().getSimpleName());
      jgen.writeObjectField("borderDisplayed", value.isBorderDisplayed());
      serialize(value, jgen);
      jgen.writeEndObject();
    }
  }

  protected abstract void serialize(T value, JsonGenerator jgen) throws IOException;
}
