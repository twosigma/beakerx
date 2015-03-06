package com.twosigma.beaker.jvm.serialization;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class BufferedImageSerializer extends JsonSerializer<BufferedImage> {

  @Override
  public void serialize(BufferedImage v, JsonGenerator jgen, SerializerProvider provider)
      throws IOException, JsonProcessingException {
    synchronized(v) {
      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      ImageIO.write(v, "png", baos);
      byte [] data = baos.toByteArray();
      jgen.writeStartObject();
      jgen.writeStringField("type",  "ImageIcon");
      jgen.writeObjectField("imageData", data);
      jgen.writeNumberField("width", v.getWidth());
      jgen.writeNumberField("height", v.getHeight());
      jgen.writeEndObject();
    }
  }

}
