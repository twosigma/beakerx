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

import com.opencsv.CSVReader;
import org.apache.commons.lang3.math.NumberUtils;

import java.io.FileReader;
import java.io.IOException;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class CSV {

  public static String TIME_COLUMN = "time";

  public class CSVIterator implements Iterator<Map<String, Object>>, AutoCloseable {
    private CSVReader reader;
    private String[] header;
    private Iterator<String[]> rows;

    public CSVIterator(String fileName) throws IOException {
      this(new CSVReader(new FileReader(fileName)));
    }

    CSVIterator(CSVReader csvReader) {
      reader = csvReader;
      rows = reader.iterator();
      header = rows.next();
    }

    @Override
    public boolean hasNext() {
      return rows.hasNext();
    }

    @Override
    public Map<String, Object> next() {
      if (!hasNext()) return null;
      else {
        String[] row = rows.next();
        if (rowIsEmpty(row, header)) {
          return null;
        }
        Map<String, Object> entry = new LinkedHashMap<>();
        int index = 0;
        for (String hc : header) {
          if (hc.equals(TIME_COLUMN)) {
            entry.put(hc, convertDate(row[index++]));
          } else {
            entry.put(hc, convertToNumber(row[index++]));
          }
        }
        return entry;
      }
    }

    private boolean rowIsEmpty(String[] row, String[] header) {
      return (header.length > row.length) && row.length == 1 && row[0].isEmpty();
    }

    @Override
    public void close() throws Exception {
      reader.close();
    }
  }

  public List<Map<String, Object>> read(String fileName) throws IOException {
    List<Map<String, Object>> result = new ArrayList<>();
    CSVIterator iterator = new CSVIterator(fileName);
    while (iterator.hasNext()) {
      Map<String, Object> next = iterator.next();
      if (next!=null){
        result.add(next);
      }
    }
    return result;
  }

  public Iterable<Map<String, Object>> readIterable(String fileName) throws IOException {
    CSVReader reader = new CSVReader(new FileReader(fileName));
    return () -> new CSVIterator(reader);
  }

  private Object convertToNumber(Object value) {
    if (value instanceof String && NumberUtils.isCreatable((String) value)) {
      try {
        return Integer.parseInt((String) value);
      } catch (Exception ignored) {
      }
      try {
        return new BigInteger((String) value);
      } catch (Exception ignored) {
      }
      return Double.parseDouble((String) value);
    }
    return value;
  }

  private Object convertDate(Object x) {
    if (x instanceof Number) {
      return x;
    } else if (x instanceof Date) {
      Date date = (Date) x;
      return date;
    } else if (x instanceof String) {
      return parseToDate((String) x);
    } else {
      throw new IllegalArgumentException("time column accepts numbers or java.util.Date objects or String date in a following format yyyy-MM-dd");
    }
  }

  private Object parseToDate(String x) {
    Date inputDate = getDateWithTimezone(x);
    if (inputDate == null) {
      try {
        inputDate = new SimpleDateFormat("yyyy-MM-dd").parse(x);
      } catch (ParseException e) {
        throw new IllegalArgumentException("time column accepts String date in a following format yyyy-MM-dd");
      }
    }
    return inputDate;
  }

  private Date getDateWithTimezone(String x) {
    Date inputDate = null;
    try {
      inputDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS Z").parse(x);
    } catch (ParseException e) {
    }
    return inputDate;
  }

}
