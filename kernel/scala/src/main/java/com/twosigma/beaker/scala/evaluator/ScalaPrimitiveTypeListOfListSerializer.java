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

class ScalaPrimitiveTypeListOfListSerializer implements ObjectSerializer {
  private final BeakerObjectConverter parent;

  public ScalaPrimitiveTypeListOfListSerializer(BeakerObjectConverter p) {
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
      if (!(o instanceof scala.collection.immutable.Seq))
        return false;

      Collection<?> col2 = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) o);
      for (Object o2 : col2) {
        if (!parent.isPrimitiveType(o2.getClass().getName()))
          return false;
      }
    }
    return true;
  }

  @Override
  public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand) throws JsonProcessingException, IOException {
    ScalaEvaluator.logger.debug("collection of collections");

    Collection<?> m = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) obj);
    int max = 0;

    for (Object entry : m) {
      Collection<?> e = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) entry);
      if (max < e.size())
        max = e.size();
    }
    List<String> columns = new ArrayList<String>();
    for (int i = 0; i < max; i++)
      columns.add("c" + i);
    List<List<?>> values = new ArrayList<List<?>>();
    for (Object entry : m) {
      Collection<?> e = scala.collection.JavaConversions.asJavaCollection((Iterable<?>) entry);
      List<Object> l2 = new ArrayList<Object>(e);
      if (l2.size() < max) {
        for (int i = l2.size(); i < max; i++)
          l2.add(null);
      }
      values.add(l2);
    }
    jgen.writeStartObject();
    jgen.writeObjectField("type", "TableDisplay");
    jgen.writeObjectField("columnNames", columns);
    jgen.writeObjectField("values", values);
    jgen.writeObjectField("subtype", TableDisplay.MATRIX_SUBTYPE);
    jgen.writeEndObject();
    return true;
  }
}
