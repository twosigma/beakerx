package com.twosigma.beaker.jvm.serialization;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class ImageIconSerializer extends JsonSerializer<ImageIcon> {

  @Override
  public void serialize(ImageIcon vi, JsonGenerator jgen, SerializerProvider provider)
      throws IOException, JsonProcessingException {
    synchronized(vi) {
      BufferedImage v = (BufferedImage) vi.getImage();
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
