/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.scala.evaluator;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.serialization.ObjectSerializer;
import com.twosigma.beaker.table.TableDisplay;
import scala.collection.Iterable;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

class ScalaListOfPrimitiveTypeMapsSerializer implements ObjectSerializer {
  private final BeakerObjectConverter parent;

  public ScalaListOfPrimitiveTypeMapsSerializer(BeakerObjectConverter p) {
    parent = p;
  }

  @Override
  public boolean canBeUsed(Object obj, boolean expand) {
    if (!expand)
      return false;

    if (!(obj instanceof scala.collection.immutable.Seq<?>))
      return false;

    Collection<?> col = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) obj);
    if (col.isEmpty())
      return false;

    for (Object o : col) {
      if (!(o instanceof scala.collection.Map<?, ?>))
        return false;

      Map<?, ?> m = scala.collection.JavaConversions.mapAsJavaMap((scala.collection.Map<?, ?>) o);
      Set<?> keys = m.keySet();
      for (Object key : keys) {
        if (key != null && !parent.isPrimitiveType(key.getClass().getName()))
          return false;
        Object val = m.get(key);
        if (val != null && !parent.isPrimitiveType(val.getClass().getName()))
          return false;
      }
    }
    return true;
  }

  @Override
  public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
    ScalaEvaluator.logger.debug("list of maps");
    // convert this 'on the fly' to a datatable
    Collection<?> col = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) obj);
    List<Map<?, ?>> tab = new ArrayList<Map<?, ?>>();
    for (Object o : col) {
      Map<?, ?> row = scala.collection.JavaConversions.mapAsJavaMap((scala.collection.Map<?, ?>) o);
      tab.add(row);
    }
    TableDisplay t = new TableDisplay(tab, parent);
    jgen.writeObject(t);
    return true;
  }
}
