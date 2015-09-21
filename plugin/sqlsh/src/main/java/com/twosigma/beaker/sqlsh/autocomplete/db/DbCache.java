package com.twosigma.beaker.sqlsh.autocomplete.db;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface DbCache {

	public List<String> getTableNames(Connection conn, final String schemaName, final String key) throws SQLException;
	public void putTableNames(Connection conn, final String schemaName, final String key, final List<String> values) throws SQLException;

	public List<String> getTableFieldNames(Connection conn, final String schemaName, final String tableName, final String key) throws SQLException;
	public void putTableFieldNames(Connection conn, final String schemaName, final String tableName, final String key, final List<String> values) throws SQLException;
	
}
