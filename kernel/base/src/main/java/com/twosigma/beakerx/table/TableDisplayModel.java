/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.table;

import com.twosigma.beakerx.jvm.serialization.BasicObjectSerializer;
import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;

import java.util.List;

public abstract class TableDisplayModel {

  protected List<List<?>> values;
  protected List<String> columns;
  protected List<String> classes;
  protected String subtype;

  public abstract List<List<?>> takeNextPage();
  public abstract List<List<?>> takeAllData();
  public abstract void initValues();

  protected Object getValueForSerializer(Object value, BeakerObjectConverter serializer) {
    if (value != null) {
      String clazz = serializer.convertType(value.getClass().getName());
      if (BasicObjectSerializer.TYPE_LONG.equals(clazz) || BasicObjectSerializer.TYPE_BIGINT.equals(clazz)) {
        return value.toString();
      }
      return value;
    }
    return null;
  }

}
