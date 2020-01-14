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

import org.apache.commons.collections.map.ListOrderedMap;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public class TableDisplayUtils {

  static List<Map<String, Object>> transformToIndex(Collection<Map<String, Object>> v, int columnIndex) {
    List<Map<String, Object>> result = new ArrayList<>();
    for (Map<String, Object> item : v) {
      ListOrderedMap listOrderedMap = new ListOrderedMap();
      listOrderedMap.putAll(item);
      Object key = listOrderedMap.get(columnIndex);
      Object value = listOrderedMap.getValue(columnIndex);
      listOrderedMap.remove(columnIndex);
      listOrderedMap.put(0, key, value);
      result.add(listOrderedMap);
    }
    return result;
  }
}
