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

import com.twosigma.beaker.easyform.EasyFormComponent;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public abstract class AbstractEasyFormComponentSerializer<T extends EasyFormComponent>
    extends JsonSerializer<T> {

  @Override
  public void serialize(final T component,
                        final JsonGenerator jgen,
                        final SerializerProvider serializerProvider) throws IOException {
    jgen.writeStartObject();
    jgen.writeObjectField("type", component.getClass().getSimpleName());
    if (component.getLabel() != null) {
      jgen.writeStringField("label", component.getLabel());
    }
    jgen.writeBooleanField("enabled", component.isEnabled());
    if (component.getValue() != null) {
      jgen.writeObjectField("value", component.getValue().toString());
    }
    writeSubclassFields(jgen, component);
    jgen.writeEndObject();
  }

  /**
   * Override to serialize fields from subclasses
   *
   * @param jgen
   * @param component
   */
  protected void writeSubclassFields(final JsonGenerator jgen,
                                     final T component) throws IOException {
  }
}
