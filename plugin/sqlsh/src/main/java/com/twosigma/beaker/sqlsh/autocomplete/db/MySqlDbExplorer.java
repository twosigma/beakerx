package com.twosigma.beaker.sqlsh.autocomplete.db;

import java.sql.Connection;
import java.sql.SQLException;

import com.twosigma.beaker.sqlsh.utils.JDBCClient;

public class MySqlDbExplorer extends InfoSchemaDbExplorer {


	public MySqlDbExplorer(String url, JDBCClient jdbcClient) {
		super(url, jdbcClient);
	}

	@Override
	public String getDefaultSchema(Connection conn) throws SQLException {
		return conn.getCatalog();
	}

}
