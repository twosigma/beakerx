package com.twosigma.beaker.sqlsh.autocomplete.db;

import java.util.List;

public interface DbInfo {

	public List<String> getTableNames(final String schemaName, final String key);
	public List<String> getTableFieldNames(final String schemaName, final String tableName, final String key);
}
