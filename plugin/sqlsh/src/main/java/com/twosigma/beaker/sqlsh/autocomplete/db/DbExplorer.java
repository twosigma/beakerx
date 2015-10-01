/*
 * Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

package com.twosigma.beaker.sqlsh.autocomplete.db;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import javax.sql.DataSource;

import com.twosigma.beaker.sqlsh.utils.DBConnectionException;
import com.twosigma.beaker.sqlsh.utils.JDBCClient;

public abstract class DbExplorer implements DbInfo {

  public static final int DB_REQUEST_TIMEOUT_MILLIS = 500;

  private String url;
  private JDBCClient jdbcClient;

  public DbExplorer(String url, JDBCClient jdbcClient) {
    super();
    this.url = url;
    this.jdbcClient = jdbcClient;
  }

  @Override
  public List<String> getTableNames(DbCache dbCache, String schemaName, final String key) {

    List<String> ret = dbCache.getTableNames(url, schemaName, key);

    if (ret != null) {
      return ret;
    }

    return runTableNames(dbCache, schemaName, key);
  }

  public List<String> runTableNames(DbCache dbCache, String schemaName, final String key) {
    List<String> ret = new ArrayList<String>();

    final ExecutorService executor = Executors.newSingleThreadExecutor();
    final Future<List<String>> future =
        executor.submit(new TableNamesRequest(dbCache, schemaName, key));

    try {
      ret = future.get(DB_REQUEST_TIMEOUT_MILLIS, TimeUnit.MILLISECONDS);
    } catch (InterruptedException | ExecutionException | TimeoutException e) {
      ret = null;
    }

    executor.shutdown();
    return ret;
  }


  @Override
  public List<String> getTableFieldNames(DbCache dbCache, String schemaName, final String tableName,
      final String key) {

    List<String> ret = dbCache.getTableFieldNames(url, schemaName, tableName, key);

    if (ret != null) {
      return ret;
    }

    return runTableFieldNames(dbCache, schemaName, tableName, key);
  }

  public List<String> runTableFieldNames(DbCache dbCache, String schemaName, final String tableName,
      final String key) {

    List<String> ret = new ArrayList<String>();

    final ExecutorService executor = Executors.newSingleThreadExecutor();
    final Future<List<String>> future =
        executor.submit(new TableFieldsRequest(dbCache, schemaName, tableName, key));

    try {
      ret = future.get(DB_REQUEST_TIMEOUT_MILLIS, TimeUnit.MILLISECONDS);
    } catch (InterruptedException | ExecutionException | TimeoutException e) {
      ret = null;
    }

    executor.shutdown();
    return ret;
  }

  private class TableNamesRequest implements Callable<List<String>> {

    private final DbCache dbCache;
    private String schemaName;
    private final String key;

    public TableNamesRequest(DbCache dbCache, String schemaName, String key) {
      super();
      this.dbCache = dbCache;
      this.schemaName = schemaName;
      this.key = key;
    }

    @Override
    public List<String> call() throws Exception {
      List<String> ret = new ArrayList<String>();

      try {
        final DataSource ds = jdbcClient.getDataSource(url);

        try (Connection conn = ds.getConnection();) {
          if (schemaName == null) {
            schemaName = getDefaultSchema(conn);
          }

          ret = queryTableNames(conn, schemaName, key);

        } catch (SQLException e) {
          System.out.print(e.getMessage() + "\n");
        }
      } catch (DBConnectionException dbConnEx) {
        System.out.print(dbConnEx.getMessage() + "\n");
      }

      if (ret != null) {
        dbCache.putTableNames(url, schemaName, key, ret);
        return ret;
      }

      return null;
    }


  }

  private class TableFieldsRequest implements Callable<List<String>> {

    private final DbCache dbCache;
    private String schemaName;
    private final String tableName;
    private final String key;

    public TableFieldsRequest(DbCache dbCache, String schemaName, String tableName, String key) {
      super();
      this.dbCache = dbCache;
      this.schemaName = schemaName;
      this.tableName = tableName;
      this.key = key;
    }

    @Override
    public List<String> call() throws Exception {
      List<String> ret = new ArrayList<String>();

      try {
        final DataSource ds = jdbcClient.getDataSource(url);

        try (Connection conn = ds.getConnection();) {
          if (schemaName == null) {
            schemaName = getDefaultSchema(conn);
          }

          ret = queryFieldNames(conn, schemaName, tableName, key);

        } catch (SQLException e) {
          System.out.print(e.getMessage() + "\n");
        }
      } catch (DBConnectionException dbConnEx) {
        System.out.print(dbConnEx.getMessage() + "\n");
      }

      if (ret != null) {
        dbCache.putTableFieldNames(url, schemaName, tableName, key, ret);
        return ret;
      }

      return null;
    }
  }

  public abstract String getDefaultSchema(final Connection conn) throws SQLException;

  public abstract List<String> queryTableNames(final Connection conn, final String shemaName,
      final String key) throws SQLException;

  public abstract List<String> queryFieldNames(final Connection conn, final String shemaName,
      final String tableName, final String key) throws SQLException;
}
