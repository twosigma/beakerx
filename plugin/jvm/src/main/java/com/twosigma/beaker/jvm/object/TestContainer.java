package com.twosigma.beaker.jvm.object;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class TestContainer {

  private final Map<String,Object> thecontent = new HashMap<String,Object>();
  
  public TestContainer() { }
  
  public void add(String n, Object o) { thecontent.put(n,o); }
  
  public static class Serializer extends JsonSerializer<TestContainer> {

    @Override
    public void serialize(TestContainer value,
        JsonGenerator jgen,
        SerializerProvider provider)
        throws IOException, JsonProcessingException {

      synchronized (value) {
        jgen.writeStartObject();
        jgen.writeObjectField("type", "TestContainer");
        jgen.writeObjectField("items", value.thecontent);
        jgen.writeEndObject();
      }
    }
  }

}
