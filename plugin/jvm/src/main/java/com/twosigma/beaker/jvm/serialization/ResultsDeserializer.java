package com.twosigma.beaker.jvm.serialization;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

/*
 * This class is used to deserialize output data that contain standard output or error in the notebook
 */

public class ResultsDeserializer implements ObjectDeserializer {
  private final static Logger logger = Logger.getLogger(ResultsDeserializer.class.getName());
  private final BeakerObjectConverter parent;

  public ResultsDeserializer(BeakerObjectConverter p) {
    parent = p;
    parent.addKnownBeakerType("Results");
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.has("type") && n.get("type").asText().equals("Results");
  }

  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    Object o = null;
    try {
      if (n.has("payload")) {
        o = parent.deserialize(n.get("payload"), mapper);
      }      
    } catch (Exception e) {
      logger.log(Level.SEVERE, "exception deserializing Results ", e);
    }
    return o;

  }

}
