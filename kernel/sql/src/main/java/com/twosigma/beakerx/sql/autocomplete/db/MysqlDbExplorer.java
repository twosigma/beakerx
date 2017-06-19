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

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class MysqlDbExplorer extends DbExplorer {

  public MysqlDbExplorer(DataSource ds) {
    super(ds);
  }

  @Override
  public List<String> queryTableNames(final Connection conn, String shemaName, final String key) throws SQLException {
    String sql = "SELECT DISTINCT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='" + shemaName + "'";

    if (key != null && key.length() > 0) {
      sql += " and TABLE_NAME like('" + key + "%')";
    }

    try (final Statement stmt = conn.createStatement()) {
        final ResultSet resultSet = stmt.executeQuery(sql);

        final List<String> res = new ArrayList<>();

        while (resultSet.next()) {
          final String str = resultSet.getString("TABLE_NAME");
          res.add(str);
        }

        return res;
      }
  }

  @Override
  public List<String> queryFieldNames(final Connection conn, final String shemaName, String tableName, final String key) throws SQLException {
    String sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='" + shemaName
      + "' and TABLE_NAME LIKE ('" + tableName + "')";

    if (key != null && key.length() > 0) {
      sql += " and COLUMN_NAME LIKE('" + key + "%')";
    }

    try (final Statement stmt = conn.createStatement()) {
        final ResultSet resultSet = stmt.executeQuery(sql);

        final List<String> res = new ArrayList<>();

        while (resultSet.next()) {
          final String str = resultSet.getString("COLUMN_NAME");
          res.add(str);
        }

        return res;
      }
  }

}
