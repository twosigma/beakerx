package com.twosigma.beaker.sqlsh.autocomplete.db;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

public abstract class DbExplorer implements DbInfo {

	private DataSource ds;

	public DbExplorer(DataSource ds) {
		super();
		this.ds = ds;
	}

	@Override
	public List<String> getTableNames(String schemaName, final String key) {
		try (Connection conn = ds.getConnection();) {

			if (schemaName == null) {
				schemaName = conn.getSchema();

				if (schemaName == null) {
					schemaName = conn.getCatalog();
				}
			}

			return queryTableNames(conn, schemaName, key);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<String> getTableFieldNames(String schemaName, final String tableName, final String key) {
		try (Connection conn = ds.getConnection();) {

			if (schemaName == null) {
				schemaName = conn.getSchema();

				if (schemaName == null) {
					schemaName = conn.getCatalog();
				}
			}

			return queryFieldNames(conn, schemaName, tableName, key);

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public abstract List<String> queryTableNames(final Connection conn, final String shemaName, final String key) throws SQLException;
	public abstract List<String> queryFieldNames(final Connection conn, final String shemaName, final String tableName, final String key) throws SQLException;
}
