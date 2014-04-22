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
package com.twosigma.beaker.jvm.object;

import java.awt.image.BufferedImage;
import java.awt.Graphics;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

/*
 * Wire format as png for images.
 */
public class ImageIconSerializer extends JsonSerializer<ImageIcon> {

  public ImageIconSerializer() {
  }

  @Override
  public void serialize(ImageIcon value, JsonGenerator jgen, SerializerProvider provider)
      throws IOException, JsonProcessingException {

    synchronized (value) {

      BufferedImage image = new BufferedImage(value.getIconWidth(),
              value.getIconHeight(),
              BufferedImage.TYPE_INT_RGB);
      Graphics g = image.createGraphics();
      value.paintIcon(null, g, 0, 0);
      g.dispose();
      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      ImageIO.write(image, "png", baos);
      byte[] dataToEncode = baos.toByteArray();
      jgen.writeStartObject();
      jgen.writeObjectField("type", value.getClass().getSimpleName());
      jgen.writeObjectField("imageData", dataToEncode);
      jgen.writeEndObject();
      
    }
  }
}
