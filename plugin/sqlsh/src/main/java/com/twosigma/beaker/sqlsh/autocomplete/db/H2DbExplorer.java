package com.twosigma.beaker.sqlsh.autocomplete.db;

import java.sql.Connection;
import java.sql.SQLException;

import com.twosigma.beaker.sqlsh.utils.JDBCClient;

public class H2DbExplorer extends InfoSchemaDbExplorer {
	
	public static final String defaultSchemaName = "PUBLIC";
	
	public H2DbExplorer(String url, JDBCClient jdbcClient) {
		super(url, jdbcClient);
	}

	@Override
	public String getDefaultSchema(Connection conn) throws SQLException {
		String schemaName = conn.getSchema();
		
		if (schemaName == null) {
			schemaName = defaultSchemaName;
		}
		
		return schemaName;
	}
}
