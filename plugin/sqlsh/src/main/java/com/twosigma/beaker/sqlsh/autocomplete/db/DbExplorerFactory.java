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

package com.twosigma.beaker.sqlsh.autocomplete.db;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import javax.sql.DataSource;

import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.sqlsh.utils.BeakerParser;
import com.twosigma.beaker.sqlsh.utils.ConnectionStringHolder;
import com.twosigma.beaker.sqlsh.utils.DBConnectionException;
import com.twosigma.beaker.sqlsh.utils.JDBCClient;

public class DbExplorerFactory {

  private static final String VENDOR_JDBC_MYSQL = "jdbc:mysql:";
  // private static final String VENDOR_JDBC_ORACLE = "jdbc:oracle:";
  // private static final String VENDOR_JDBC_MSSQL = "jdbc:sqlserver:";

  public static DbInfo getDbInfo(String txt, JDBCClient jdbcClient, String sessionId, ConnectionStringHolder defaultConnectionString, Map<String, ConnectionStringHolder> namedConnectionString) {

    final NamespaceClient namespaceClient = NamespaceClient.getBeaker(sessionId);
    final BeakerParser beakerParser;
    try {
      beakerParser = new BeakerParser(txt, namespaceClient, defaultConnectionString, namedConnectionString, jdbcClient);

      final String uri = beakerParser.getDbURI().getActualConnectionString();

      if (uri != null) {
        final DataSource ds = jdbcClient.getDataSource(uri);

        if (uri.startsWith(VENDOR_JDBC_MYSQL)) {
          return new MysqlDbExplorer(ds);
        }
      }

    } catch (IOException e) {
      e.printStackTrace();
    } catch (DBConnectionException e) {
      e.printStackTrace();
    } catch (SQLException e) {
      e.printStackTrace();
    }

    return null;
  }

  public static DbCache getDbCache() {
    return new DbRequestCache();
  }
}