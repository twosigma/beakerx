package com.twosigma.beaker.jvm.serialization;

import java.io.IOException;
import java.util.Date;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class DateSerializer extends JsonSerializer<Date> {

  @Override
  public void serialize(Date v, JsonGenerator jgen, SerializerProvider provider)
      throws IOException, JsonProcessingException {
    synchronized(v) {
      jgen.writeStartObject();
      jgen.writeStringField("type",  "Date");      
      jgen.writeNumberField("timestamp", v.getTime());
      jgen.writeEndObject();
    }
  }

}
