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

package com.twosigma.beakerx.sql.autocomplete.db;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class DbRequestCache implements DbCache {


  private final ConcurrentHashMap<String, Map<String, Map<String, Map<String, List<String>>>>> fieldsCache;
  private final ConcurrentHashMap<String, Map<String, Map<String, List<String>>>> tablesCache;
  /**
   * 
   */
  @SuppressWarnings("unused")
  private static final long serialVersionUID = -8164467511255046521L;

  public DbRequestCache() {
    super();
    fieldsCache = new ConcurrentHashMap<String, Map<String, Map<String, Map<String, List<String>>>>>();
    tablesCache = new ConcurrentHashMap<String, Map<String, Map<String, List<String>>>>();
  }


  @Override
  public List<String> getTableNames(Connection conn, String schemaName, String key) throws SQLException {
    final String uri = conn.getMetaData().getURL();
    final Map<String, Map<String, List<String>>> uriCache = tablesCache.get(uri);

    if (uriCache == null) {
      return null;
    }

    final Map<String, List<String>> schemaCache =  uriCache.get(schemaName);

    if (schemaCache == null) {
      return null;
    }

    return schemaCache.get(key);
  }

  @Override
  public void putTableNames(Connection conn, String schemaName, String key, List<String> values) throws SQLException {
    if (values != null) {
      final String uri = conn.getMetaData().getURL();

      Map<String, Map<String, List<String>>> uriCache = new ConcurrentHashMap<String, Map<String, List<String>>>();

      if (tablesCache.putIfAbsent(uri, uriCache) != null) {
        uriCache = tablesCache.get(uri);
      }

      Map<String, List<String>> schemaCache = new ConcurrentHashMap<String, List<String>>();

      if (((ConcurrentHashMap<String, Map<String, List<String>>>)uriCache).putIfAbsent(schemaName, schemaCache) != null) {
        schemaCache = uriCache.get(schemaName);
      }

      schemaCache.put(key, values);

    }
  }


  @Override
  public List<String> getTableFieldNames(Connection conn, String schemaName, String tableName, String key) throws SQLException {
    final String uri = conn.getMetaData().getURL();
    final Map<String, Map<String, Map<String, List<String>>>> uriCache = fieldsCache.get(uri);

    if (uriCache == null) {
      return null;
    }

    final Map<String, Map<String, List<String>>> schemaCache =  uriCache.get(schemaName);

    if (schemaCache == null) {
      return null;
    }

    final Map<String, List<String>> tablesCache =  schemaCache.get(tableName);

    if (tablesCache == null) {
      return null;
    }

    return tablesCache.get(key);

  }


  @Override
  public void putTableFieldNames(Connection conn, String schemaName, String tableName, String key, List<String> values) throws SQLException {
    if (values != null) {
      final String uri = conn.getMetaData().getURL();

      Map<String, Map<String, Map<String, List<String>>>> uriCache = new ConcurrentHashMap<String, Map<String, Map<String, List<String>>>>();

      if (fieldsCache.putIfAbsent(uri, uriCache) != null) {
        uriCache = fieldsCache.get(uri);
      }

      Map<String, Map<String, List<String>>> schemaCache = new ConcurrentHashMap<String, Map<String, List<String>>>();

      if (((ConcurrentHashMap<String, Map<String, Map<String, List<String>>>>)uriCache).putIfAbsent(schemaName, schemaCache) != null) {
        schemaCache = uriCache.get(schemaName);
      }

      Map<String, List<String>> tableCache = new ConcurrentHashMap<String, List<String>>();

      if (((ConcurrentHashMap<String, Map<String, List<String>>>)schemaCache).putIfAbsent(tableName, tableCache) != null) {
        tableCache = schemaCache.get(tableName);
      }

      tableCache.put(key, values);
    }
  }
}
