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

import com.twosigma.beakerx.BeakerXClient;
import com.twosigma.beakerx.BeakerXClientManager;
import com.twosigma.beakerx.sql.BeakerParser;
import com.twosigma.beakerx.sql.ConnectionStringHolder;
import com.twosigma.beakerx.sql.DBConnectionException;
import com.twosigma.beakerx.sql.JDBCClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.sql.DataSource;
import java.io.IOException;
import java.util.Map;

public class DbExplorerFactory {

  private final static Logger logger = LoggerFactory.getLogger(DbExplorerFactory.class);

  private static final String VENDOR_JDBC_MYSQL = "jdbc:mysql:";
  // private static final String VENDOR_JDBC_ORACLE = "jdbc:oracle:";
  // private static final String VENDOR_JDBC_MSSQL = "jdbc:sqlserver:";

  public static DbInfo getDbInfo(String txt, JDBCClient jdbcClient, String sessionId,
                                 ConnectionStringHolder defaultConnectionString, Map<String, ConnectionStringHolder> namedConnectionString) {

    final BeakerXClient namespaceClient = BeakerXClientManager.get();
    final BeakerParser beakerParser;
    try {
      beakerParser = new BeakerParser(txt, namespaceClient,
                                      defaultConnectionString, namedConnectionString, jdbcClient);

      final String uri = beakerParser.getDbURI().getActualConnectionString();

      if (uri != null) {
        final DataSource ds = jdbcClient.getDataSource(uri);

        if (uri.startsWith(VENDOR_JDBC_MYSQL)) {
          return new MysqlDbExplorer(ds);
        }
      }

    } catch (IOException | DBConnectionException e) {
      logger.error(e.getMessage());
    }

    return null;
  }

  public static DbCache getDbCache() {
    return new DbRequestCache();
  }
}
