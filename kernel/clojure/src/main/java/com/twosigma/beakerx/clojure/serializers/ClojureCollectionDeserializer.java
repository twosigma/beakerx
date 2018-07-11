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
package com.twosigma.beakerx.clojure.serializers;

import clojure.lang.PersistentVector;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beakerx.jvm.serialization.ObjectDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class ClojureCollectionDeserializer implements ObjectDeserializer {

  private final static Logger logger = LoggerFactory.getLogger(ClojureCollectionDeserializer.class.getName());

  private final BeakerObjectConverter parent;

  public ClojureCollectionDeserializer(BeakerObjectConverter p) {
    parent = p;
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.isArray();
  }

  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    List list = new ArrayList<>();
    for (int i = 0; i < n.size(); i++) {
      try {
        list.add(parent.deserialize(n.get(i), mapper));
      } catch (Exception e) {
        logger.error(e.getMessage());
      }
    }
    Collection collection = PersistentVector.create(list);
    return collection;
  }

}
