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

package com.twosigma.beakerx.fileloader;

import com.github.lwhite1.tablesaw.api.Table;
import org.apache.commons.lang3.math.NumberUtils;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class CsvPlotReader {

  public static String TIME_COLUMN = "time";

  public List<Map<?, ?>> convert(Table table) {
    List<Map<?, ?>> result = new ArrayList<>();
    for (int r = 0; r < table.rowCount(); r++) {
      Map<String, Object> entry = new HashMap<>();
      for (int c = 0; c < table.columnCount(); c++) {
        Object value = table.get(c, r);
        String headerName = table.columnNames().get(c);
        if (headerName.equals(TIME_COLUMN)) {
          entry.put(headerName, convertDate(value));
        } else {
          entry.put(headerName, convertToNumber(value));
        }
      }
      result.add(entry);
    }
    return result;
  }

  public Table read(String fileName) throws IOException {
    return Table.createFromCsv(fileName);
  }

  public List<Map<?, ?>> readAsList(String fileName) throws IOException {
    return convert(Table.createFromCsv(fileName));
  }

  private Object convertToNumber(Object value) {
    if (value instanceof String && NumberUtils.isNumber((String) value)) {
      return Float.parseFloat((String) value);
    } else {
      return value;
    }
  }

  private Object convertDate(Object x) {
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
