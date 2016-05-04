/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.twosigma.beaker.jvm.serialization;

import java.awt.Graphics;
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
    synchronized (vi) {

      BufferedImage v = new BufferedImage(
        vi.getIconWidth(),
        vi.getIconHeight(),
        BufferedImage.TYPE_INT_RGB);
      Graphics g = v.createGraphics();
      // paint the Icon to the BufferedImage.
      vi.paintIcon(null, g, 0, 0);
      g.dispose();

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
