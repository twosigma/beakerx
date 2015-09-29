package com.twosigma.beaker.sqlsh.autocomplete.db;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.twosigma.beaker.sqlsh.utils.JDBCClient;

public class OracleDbExplorer extends DbExplorer {



	public OracleDbExplorer(String url, JDBCClient jdbcClient) {
		super(url, jdbcClient);
	}

	@Override
	public String getDefaultSchema(Connection conn) throws SQLException {
		return null;
	}

	@Override
	public List<String> queryTableNames(Connection conn, String shemaName, String key) throws SQLException {
		String sql = "Select distinct TABLE_NAME from user_tab_columns";
		
		if ((key != null && key.length() > 0) || (shemaName != null && shemaName.length() > 0)) {
			sql += " where";
			
			boolean isKeyUsed = false;
			
			if (key != null && key.length() > 0) {
				sql += " TABLE_NAME like('" + key + "%')";
				isKeyUsed = true;
			}
			
			if (shemaName != null && shemaName.length() > 0) {
				if (isKeyUsed) {
					sql += " and";
				}
				
				
				sql += " SCHEMA_NAME like('" + shemaName + "')";
			}
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
	public List<String> queryFieldNames(Connection conn, String shemaName, String tableName, String key) throws SQLException {
		String sql = "Select COLUMN_NAME from user_tab_columns where table_name='" + tableName + "'";
		
			if (key != null && key.length() > 0) {
				sql += " AND COLUMN_NAME like('" + key + "%')";
			}
			
			if (shemaName != null && shemaName.length() > 0) {
				sql += " AND SCHEMA_NAME like('" + shemaName + "')";
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
