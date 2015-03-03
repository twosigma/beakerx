package com.twosigma.beaker.jvm.object;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;

public interface ObjectSerializer {
  public boolean writeObject(Object obj, JsonGenerator jgen) throws IOException, JsonProcessingException;
  public String convertType(String tn);
  public boolean isPrimitiveType(String tn);
}
