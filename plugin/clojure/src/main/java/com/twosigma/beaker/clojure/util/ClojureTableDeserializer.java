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

package com.twosigma.beaker.clojure.util;

import com.twosigma.beaker.jvm.object.TableDisplay;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.serialization.ObjectDeserializer;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import clojure.lang.PersistentArrayMap;
import clojure.lang.PersistentVector;

public class ClojureTableDeserializer implements ObjectDeserializer {
  private final BeakerObjectConverter parent;

  public ClojureTableDeserializer(BeakerObjectConverter p) {
    parent = p;
    parent.addKnownBeakerType("TableDisplay");
  }

  @Override
  public boolean canBeUsed(JsonNode n) {
    return n.has("type") && n.get("type").asText().equals("TableDisplay");
  }

  @Override
  public Object deserialize(JsonNode n, ObjectMapper mapper) {
    Object o = null;
    try {
      List<List<?>> vals = null;
      List<String> cols = null;
      List<String> clas = null;
      String subtype = null;

      if (n.has("columnNames"))
        cols = mapper.readValue(n.get("columnNames"), List.class);
      if (n.has("types"))
        clas = mapper.readValue(n.get("types"), List.class);
      if (n.has("values")) {
        JsonNode nn = n.get("values");
        vals = new ArrayList<List<?>>();
        if (nn.isArray()) {
          for (JsonNode nno : nn) {
            if (nno.isArray()) {
              ArrayList<Object> val = new ArrayList<Object>();
              for (JsonNode nnoo : nno) {
                Object obj = parent.deserialize(nnoo, mapper);
                val.add(obj);
              }
              vals.add(val);
            }
          }
        }
      }
      if (n.has("subtype"))
        subtype = mapper.readValue(n.get("subtype"), String.class);
        /*
         * unfortunately the other 'side' of this is in the BeakerObjectSerializer
         */
      if (subtype != null && subtype.equals(TableDisplay.DICTIONARY_SUBTYPE)) {
        Map<String, Object> m = new HashMap<String, Object>();
        for (List<?> l : vals) {
          if (l.size() != 2)
            continue;
          m.put(l.get(0).toString(), l.get(1));
        }

        o = PersistentArrayMap.create(m);
      } else if (subtype != null && subtype.equals(TableDisplay.LIST_OF_MAPS_SUBTYPE) && cols != null && vals != null) {
        List<Object> oo = new ArrayList<Object>();
        for (int r = 0; r < vals.size(); r++) {
          Map<String, Object> m = new HashMap<String, Object>();
          List<?> row = vals.get(r);
          for (int c = 0; c < cols.size(); c++) {
            if (row.size() > c)
              m.put(cols.get(c), row.get(c));
          }
          oo.add(PersistentArrayMap.create(m));
        }
        o = PersistentVector.create(oo);
      } else if (subtype != null && subtype.equals(TableDisplay.MATRIX_SUBTYPE)) {
        ArrayList<Object> ll = new ArrayList<Object>();

        o = PersistentVector.create(vals);
      }
      if (o == null) {
        if (n.has("hasIndex") && mapper.readValue(n.get("hasIndex"), String.class).equals("true")) {
          cols.remove(0);
          clas.remove(0);
          for (List<?> v : vals) {
            v.remove(0);
          }
        }
        o = new TableDisplay(vals, cols, clas);
      }
    } catch (Exception e) {
      Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, null, e);
    }
    return o;
  }

}
