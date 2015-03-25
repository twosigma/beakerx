package com.twosigma.beaker.jvm.serialization;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

import com.google.inject.Inject;
import com.google.inject.Provider;

/*
 * This class is used to deserialize output data that contain standard output or error in the notebook
 */

public class CollectionDeserializer implements ObjectDeserializer {
  private final static Logger logger = Logger.getLogger(CollectionDeserializer.class.getName());
  private final Provider<BeakerObjectConverter> objectSerializerProvider;

  @Inject
  public CollectionDeserializer(Provider<BeakerObjectConverter> osp) {
    objectSerializerProvider = osp;
  }

  private BeakerObjectConverter getObjectSerializer() {
    return objectSerializerProvider.get();
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.isArray();
  }

  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    List<Object> o = new ArrayList<Object>();
    try {
      logger.fine("using custom array deserializer");
      for(int i=0; i<n.size(); i++) {
        o.add(getObjectSerializer().deserialize(n.get(i), mapper));
      }
    } catch (Exception e) {
      logger.log(Level.SEVERE, "exception deserializing Collection ", e);
      o = null;
    }
    return o;
  }

}
