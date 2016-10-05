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

import java.io.ByteArrayInputStream;

import javax.imageio.ImageIO;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BufferedImageDeserializer implements ObjectDeserializer {
  private final static Logger logger = LoggerFactory.getLogger(BufferedImageDeserializer.class.getName());
  
  public BufferedImageDeserializer(BeakerObjectConverter p) {
    p.addKnownBeakerType("ImageIcon");
  }

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
      logger.error("exception deserializing ImageIcon ", e);
    }
    return o;
  }

}
