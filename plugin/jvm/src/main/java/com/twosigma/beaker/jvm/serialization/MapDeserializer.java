package com.twosigma.beaker.jvm.serialization;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

import com.google.inject.Inject;
import com.google.inject.Provider;

/*
 * This class is used to deserialize output data that contain standard output or error in the notebook
 */

public class MapDeserializer implements ObjectDeserializer {
  private final static Logger logger = Logger.getLogger(MapDeserializer.class.getName());
  private final Provider<BeakerObjectConverter> objectSerializerProvider;

  @Inject
  public MapDeserializer(Provider<BeakerObjectConverter> osp) {
    objectSerializerProvider = osp;
  }

  private BeakerObjectConverter getObjectSerializer() {
    return objectSerializerProvider.get();
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.isObject();
  }

  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    HashMap<String, Object> o = new HashMap<String,Object>();
    try {
      logger.fine("using custom map deserializer");
      Iterator<Entry<String, JsonNode>> e = n.getFields();
      while(e.hasNext()) {
        Entry<String, JsonNode> ee = e.next();
        o.put(ee.getKey(), getObjectSerializer().deserialize(ee.getValue(),mapper));
      }
    } catch (Exception e) {
      logger.log(Level.SEVERE, "exception deserializing Map ", e);
      o = null;
    }
    return o;
  }

}
