package com.twosigma.beaker.sqlsh.autocomplete.db;

import java.util.List;

public interface DbInfo {

	public List<String> getTableNames(DbCache dbCache, final String schemaName, final String key);
	public List<String> getTableFieldNames(DbCache dbCache, final String schemaName, final String tableName, final String key);
}
