package com.twosigma.beaker.jvm.serialization;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class TestSerializer extends JsonSerializer<Object> {

  @Override
  public void serialize(Object v, JsonGenerator jgen, SerializerProvider provider)
      throws IOException, JsonProcessingException {
    synchronized(v) {
      jgen.writeStartObject();
      jgen.writeStringField("type",  "test");
      jgen.writeObjectField("value", v);
      jgen.writeEndObject();
    }
  }

}