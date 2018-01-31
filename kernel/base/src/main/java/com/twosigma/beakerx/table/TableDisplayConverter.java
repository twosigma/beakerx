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
package com.twosigma.beakerx.table;

import org.apache.commons.lang3.math.NumberUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class TableDisplayConverter {

  public static List<Map<String, Object>> convert(int rowCount, int columnCount, List<String> columnNames, TableDisplay.Element tableElement) {
    List<Map<String, Object>> result = new ArrayList<>();
    for (int r = 0; r < rowCount; r++) {
      Map<String, Object> entry = new LinkedHashMap<>();
      for (int c = 0; c < columnCount; c++) {
        Object value = tableElement.get(c, r);
        String headerName = columnNames.get(c);
        if (headerName.equals("time")) {
          entry.put(headerName, convertDate(value));
        } else {
          entry.put(headerName, convertToNumber(value));
        }
      }
      result.add(entry);
    }
    return result;
  }

  private static Object convertToNumber(Object value) {
    if (value instanceof String && NumberUtils.isNumber((String) value)) {
      return Double.parseDouble((String) value);
    } else {
      return value;
    }
  }

  private static Object convertDate(Object x) {
    if (x instanceof Number) {
      return x;
    } else if (x instanceof Date) {
      Date date = (Date) x;
      return date;
    } else if (x instanceof String) {
      Date inputDate = null;
      try {
        inputDate = new SimpleDateFormat("yyyy-MM-dd").parse((String) x);
      } catch (ParseException e) {
        throw new IllegalArgumentException("time column accepts String date in a following format yyyy-MM-dd");
      }
      return inputDate;
    } else {
      throw new IllegalArgumentException("time column accepts numbers or java.util.Date objects or String date in a following format yyyy-MM-dd");
    }
  }
}
