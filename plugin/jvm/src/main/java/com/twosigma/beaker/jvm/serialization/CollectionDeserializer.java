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

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

/*
 * This class is used to deserialize output data that contain standard output or error in the notebook
 */

public class CollectionDeserializer implements ObjectDeserializer {
  private final static Logger logger = Logger.getLogger(CollectionDeserializer.class.getName());
  private final BeakerObjectConverter parent;

  public CollectionDeserializer(BeakerObjectConverter p) {
    parent = p;
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
        o.add(parent.deserialize(n.get(i), mapper));
      }
    } catch (Exception e) {
      logger.log(Level.SEVERE, "exception deserializing Collection ", e);
      o = null;
    }
    return o;
  }

}
