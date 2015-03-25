package com.twosigma.beaker.jvm.serialization;

import java.io.ByteArrayInputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.imageio.ImageIO;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

public class BufferedImageDeserializer implements ObjectDeserializer {
  private final static Logger logger = Logger.getLogger(BufferedImageDeserializer.class.getName());
  
  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.has("type") && n.get("type").asText().equals("ImageIcon");
  }

  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    Object o = null;
    try {
      if (n.has("imageData")) {
        byte [] data = n.get("imageData").getBinaryValue();
        ByteArrayInputStream bais = new ByteArrayInputStream(data);
        o = ImageIO.read(bais);
      }      
    } catch (Exception e) {
      logger.log(Level.SEVERE, "exception deserializing ImageIcon ", e);
    }
    return o;

  }

}
