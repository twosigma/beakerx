package com.twosigma.beaker.jvm.serialization;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.imageio.ImageIO;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;
import org.codehaus.jackson.map.ObjectMapper;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beaker.BeakerCodeCell;

/*
 * This class is used to deserialize output data that contain standard output or error in the notebook
 */

public class ResultsDeserializer implements ObjectDeserializer {
  private final static Logger logger = Logger.getLogger(ResultsDeserializer.class.getName());
  private final Provider<BeakerObjectConverter> objectSerializerProvider;

  @Inject
  public ResultsDeserializer(Provider<BeakerObjectConverter> osp) {
    objectSerializerProvider = osp;
  }

  private BeakerObjectConverter getObjectSerializer() {
    return objectSerializerProvider.get();
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
        o = getObjectSerializer().deserialize(n.get("payload"), mapper);
      }      
    } catch (Exception e) {
      logger.log(Level.SEVERE, "exception deserializing Results ", e);
    }
    return o;

  }

}
