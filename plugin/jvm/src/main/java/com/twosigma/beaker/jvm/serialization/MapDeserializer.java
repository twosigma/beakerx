package com.twosigma.beaker.jvm.serialization;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

/*
 * This class is used to deserialize output data that contain standard output or error in the notebook
 */

public class MapDeserializer implements ObjectDeserializer {
  private final static Logger logger = Logger.getLogger(MapDeserializer.class.getName());
  private final BeakerObjectConverter parent;

  public MapDeserializer(BeakerObjectConverter p) {
    parent = p;
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.isObject() && (!n.has("type") || !parent.isKnownBeakerType(n.get("type").asText()));
  }

  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    HashMap<String, Object> o = new HashMap<String,Object>();
    try {
      logger.fine("using custom map deserializer");
      Iterator<Entry<String, JsonNode>> e = n.getFields();
      while(e.hasNext()) {
        Entry<String, JsonNode> ee = e.next();
        o.put(ee.getKey(), parent.deserialize(ee.getValue(),mapper));
      }
    } catch (Exception e) {
      logger.log(Level.SEVERE, "exception deserializing Map ", e);
      o = null;
    }
    return o;
  }

}
