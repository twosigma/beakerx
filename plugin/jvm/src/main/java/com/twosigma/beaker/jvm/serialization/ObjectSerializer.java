package com.twosigma.beaker.jvm.serialization;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;

public interface ObjectSerializer {
  public boolean canBeUsed(Object obj, boolean expand);
  public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand)  throws JsonProcessingException, IOException;
}
