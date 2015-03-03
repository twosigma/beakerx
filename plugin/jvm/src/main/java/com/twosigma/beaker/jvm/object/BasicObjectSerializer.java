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

import com.twosigma.beaker.BeakerCodeCell;
import com.twosigma.beaker.BeakerProgressUpdate;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.swing.ImageIcon;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;

public class BasicObjectSerializer implements ObjectSerializer {

  protected Map<String,String> types;
  
  private static boolean isListOfMaps(Object o) {
    if (! (o instanceof Collection<?>))
      return false;
    Collection<?> c = (Collection<?>) o;
    if (c.isEmpty())
      return false;
    for (Object obj : c) {
      if (!(obj instanceof Map<?,?>)) {        
        return false;
      }
    }
    return true;
  }
  
  public BasicObjectSerializer() {
    types = new HashMap<String,String>();
    types.put("java.lang.Integer", "integer");
    // TODO
  }
  
  public String convertType(String tn) {
    if (types.containsKey(tn))
      return types.get(tn);
    return "";
  }
  
  public boolean isPrimitiveType(String tn) {
    return types.containsKey(tn);
  }

  public boolean writeObject(Object obj, JsonGenerator jgen)
      throws IOException, JsonProcessingException  {

    try {
      if (obj == null) {
        jgen.writeObject("null");
      } else if ( (obj instanceof TableDisplay)  ||
                  (obj instanceof EvaluationResult)||
                  (obj instanceof OutputContainer) ||   
                  (obj instanceof BeakerProgressUpdate) ||
                  (obj instanceof UpdatableEvaluationResult) ||
                  (obj instanceof BeakerCodeCell) ||
                  (obj instanceof ImageIcon) ||
                  (obj instanceof BufferedImage) ||
                  (obj instanceof OutputContainer)  ||
                  (obj instanceof BeakerProgressUpdate) ) {
        jgen.writeObject(obj);
      } else if (isListOfMaps(obj)) {
        // convert this 'on the fly' to a datatable
        @SuppressWarnings("unchecked")
        Collection<Map<?, ?>> co = (Collection<Map<?, ?>>) obj;
        TableDisplay t = new TableDisplay(co,this);
        jgen.writeObject(t);
      } else if (obj instanceof Collection<?>) {
        // convert this 'on the fly' to an array of objects
        Collection<?> c = (Collection<?>) obj;
        jgen.writeStartArray();
        for(Object o : c)
          writeObject(o, jgen);
        jgen.writeEndArray();
      } else if (obj instanceof Map<?,?>) {
        // convert this 'on the fly' to a map of objects
        Map<?,?> m = (Map<?,?>) obj;

        Set<?> kset = m.keySet();
        if (kset.size()==0 || !(kset.iterator().next() instanceof String))
          jgen.writeObject(obj.toString());
        else {
          jgen.writeStartObject();
          for (Object k : kset) {
            jgen.writeFieldName(k.toString());
            writeObject(m.get(k),jgen);
          }
          jgen.writeEndObject();
        }
      } else {
        return false;
      }
    } catch (Exception e) {
      System.err.println(e);
      return false;
    }
    return true;
  }
}
