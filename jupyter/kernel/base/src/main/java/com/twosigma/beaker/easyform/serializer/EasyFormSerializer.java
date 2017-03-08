/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.easyform.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.google.inject.Singleton;
import com.twosigma.beaker.easyform.EasyForm;
import com.twosigma.beaker.easyform.EasyFormComponent;

import java.io.IOException;

@Singleton
public class EasyFormSerializer extends JsonSerializer<EasyForm> {

  @Override
  public void serialize(final EasyForm easyForm,
                        final JsonGenerator jgen,
                        final SerializerProvider serializerProvider) throws IOException {
    synchronized (easyForm) {
      jgen.writeStartObject();
      jgen.writeObjectField("update_time", System.currentTimeMillis());
      jgen.writeObjectField("type", easyForm.getClass().getSimpleName());
      jgen.writeStringField("caption", easyForm.getCaption());
      if (easyForm.hasComponents()) {
        jgen.writeArrayFieldStart("components");
        for (EasyFormComponent component : easyForm.getComponentMap().values()) {
          jgen.writeObject(component);
        }
        if (easyForm.hasSaveValuesButton()) {
          jgen.writeObject(easyForm.getSaveValuesButton());
        }
        if (easyForm.hasLoadValuesButton()) {
          jgen.writeObject(easyForm.getLoadValuesButton());
        }
        jgen.writeEndArray();
      }
      jgen.writeEndObject();
    }
  }
}
