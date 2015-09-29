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
import java.util.Map;

import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.sqlsh.utils.BeakerParser;
import com.twosigma.beaker.sqlsh.utils.JDBCClient;

public class DbExplorerFactory {
	
	private static final String VENDOR_JDBC_MYSQL = "jdbc:mysql:";
	private static final String VENDOR_JDBC_H2 = "jdbc:h2:";
	private static final String VENDOR_JDBC_ORACLE = "jdbc:oracle:";
	private static final String VENDOR_JDBC_MSSQL = "jdbc:sqlserver:";

	public static DbInfo getDbInfo(String txt, JDBCClient jdbcClient, String sessionId, String defaultConnectionString, Map<String, String> namedConnectionString) {
		
		final NamespaceClient namespaceClient = NamespaceClient.getBeaker(sessionId);
		final BeakerParser beakerParser;
		try {
			beakerParser = new BeakerParser(txt, namespaceClient, defaultConnectionString, namedConnectionString);
			
			final String uri = beakerParser.getDbURI();
			
			if (uri != null) {

				if (uri.startsWith(VENDOR_JDBC_MYSQL)) {
					return new MySqlDbExplorer(uri, jdbcClient);
				} else if (uri.startsWith(VENDOR_JDBC_H2)) {
					return new H2DbExplorer(uri, jdbcClient);
				} else if (uri.startsWith(VENDOR_JDBC_ORACLE)) {
					return new OracleDbExplorer(uri, jdbcClient);
				} else if (uri.startsWith(VENDOR_JDBC_MSSQL)) {
					return new MsSqlDbExplorer(uri, jdbcClient);
				} 
			} 

		} catch (IOException e) {
			System.out.print(e.getMessage() + "\n");
		}	

		return null;
	}

	public static DbCache getDbCache() {
		return new DbRequestCache();
	}
}
