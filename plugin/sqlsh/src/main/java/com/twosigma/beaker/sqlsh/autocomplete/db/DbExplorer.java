package com.twosigma.beaker.sqlsh.autocomplete.db;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.sql.DataSource;

public abstract class DbExplorer implements DbInfo {
	
	private DataSource ds;

	public DbExplorer(DataSource ds) {
		super();
		this.ds = ds;
	}

	private List<String> findTableNames(DbCache dbCache, final Connection conn, String schemaName, final String key) throws SQLException {
		
		List<String> ret = dbCache.getTableNames(conn, schemaName, key);
		
		if (ret != null){
			return ret;
		}
		
		ret = queryTableNames(conn, schemaName, key);
		
		if (ret != null) {
			
			dbCache.putTableNames(conn, schemaName, key, ret);
			
			return ret;
		}
		
		return null;
	}
	
	
	@Override
	public List<String> getTableNames(DbCache dbCache, String schemaName, final String key) {
		try (Connection conn = ds.getConnection();) {
			
			if (schemaName == null) {
				schemaName = conn.getSchema();
				
				if (schemaName == null) {
					schemaName = conn.getCatalog();
				}
			}
			
			return findTableNames(dbCache, conn, schemaName, key);
		} catch (SQLException e) {
			// Do nothing
		}
		return null;
	}
	
	private List<String> findTableFieldNames(DbCache dbCache, final Connection conn, String schemaName, final String tableName, final String key) throws SQLException {
		List<String> ret = dbCache.getTableFieldNames(conn, schemaName, tableName, key);
		
		if (ret != null){
			return ret;
		}
		
		ret = queryFieldNames(conn, schemaName, tableName, key);
		
		if (ret != null) {
			
			dbCache.putTableFieldNames(conn, schemaName, tableName, key, ret);
			
			return ret;
		}
		
		return null;
	}
	

	@Override
	public List<String> getTableFieldNames(DbCache dbCache, String schemaName, final String tableName, final String key) {
		try (Connection conn = ds.getConnection();) {
			
			if (schemaName == null) {
				schemaName = conn.getSchema();
				
				if (schemaName == null) {
					schemaName = conn.getCatalog();
				}
			}

			return findTableFieldNames(dbCache, conn, schemaName, tableName, key);

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public abstract List<String> queryTableNames(final Connection conn, final String shemaName, final String key) throws SQLException;
	public abstract List<String> queryFieldNames(final Connection conn, final String shemaName, final String tableName, final String key) throws SQLException;
}
