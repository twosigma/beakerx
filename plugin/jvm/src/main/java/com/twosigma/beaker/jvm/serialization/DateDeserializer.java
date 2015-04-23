package com.twosigma.beaker.jvm.serialization;

import java.util.Date;
import java.util.TimeZone;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

public class DateDeserializer implements ObjectDeserializer {
  private final static Logger logger = Logger.getLogger(DateDeserializer.class.getName());
  
  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.has("type") && n.get("type").asText().equals("Date");
  }

  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    Object o = null;
    try {
      if (n.has("timestamp"))
        o = new Date(n.get("timestamp").asLong() + TimeZone.getDefault().getRawOffset());
    } catch (Exception e) {
      logger.log(Level.SEVERE, "exception deserializing Date ", e);
    }
    return o;

  }

}
