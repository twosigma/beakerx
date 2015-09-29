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

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class DbRequestCache implements DbCache {


	private final static String DEF_SCHEMA = "BKR_SHEMA_NULL";
	
	private final ConcurrentHashMap<String, Map<String, Map<String, Map<String, List<String>>>>> fieldsCache;
	private final ConcurrentHashMap<String, Map<String, Map<String, List<String>>>> tablesCache;
	/**
	 * 
	 */
	@SuppressWarnings("unused")
	private static final long serialVersionUID = -8164467511255046521L;

	public DbRequestCache() {
		super();
		fieldsCache = new ConcurrentHashMap<String, Map<String, Map<String, Map<String, List<String>>>>>();
		tablesCache = new ConcurrentHashMap<String, Map<String, Map<String, List<String>>>>();
	}

	private String checkSchema(Map<String, ?> map, final String schemaName) {
		if (schemaName == null) {
			if (map != null) {
				Set<String> keys = map.keySet();
				if (keys.size() == 1) {
					for (String schema : keys) {
						return schema;
					}
				}
			}
			
			return DEF_SCHEMA;
		}
		
		return schemaName;
	}
	
	@Override
	public List<String> getTableNames(final String url, String schemaName, String key) {
		final Map<String, Map<String, List<String>>> uriCache = tablesCache.get(url);

		if (uriCache == null) {
			return null;
		}
		
		final Map<String, List<String>> schemaCache =  uriCache.get(checkSchema(uriCache, schemaName));

		if (schemaCache == null) {
			return null;
		}
		
		return schemaCache.get(key);
	}

	@Override
	public void putTableNames(final String url, String schemaName, String key, List<String> values) {
		if (values != null) {
			Map<String, Map<String, List<String>>> uriCache = new ConcurrentHashMap<String, Map<String, List<String>>>();
			
			if (tablesCache.putIfAbsent(url, uriCache) != null) {
				uriCache = tablesCache.get(url);
			}
			
			Map<String, List<String>> schemaCache = new ConcurrentHashMap<String, List<String>>();
			
			schemaName = checkSchema(uriCache, schemaName);
			if (uriCache.putIfAbsent(schemaName, schemaCache) != null) {
				schemaCache = uriCache.get(schemaName);
			}
			
			schemaCache.put(key, values);
			
		}
	}


	@Override
	public List<String> getTableFieldNames(final String url, String schemaName, String tableName, String key) {
		final Map<String, Map<String, Map<String, List<String>>>> uriCache = fieldsCache.get(url);

		if (uriCache == null) {
			return null;
		}
		
		final Map<String, Map<String, List<String>>> schemaCache = uriCache.get(checkSchema(uriCache, schemaName));

		if (schemaCache == null) {
			return null;
		}
		
		final Map<String, List<String>> tablesCache =  schemaCache.get(tableName);
		
		if (tablesCache == null) {
			return null;
		}
		
		return tablesCache.get(key);
			
	}


	@Override
	public void putTableFieldNames(final String url, String schemaName, String tableName, String key, List<String> values) {
		if (values != null) {
			Map<String, Map<String, Map<String, List<String>>>> uriCache = new ConcurrentHashMap<String, Map<String, Map<String, List<String>>>>();
			
			if (fieldsCache.putIfAbsent(url, uriCache) != null) {
				uriCache = fieldsCache.get(url);
			}
			
			Map<String, Map<String, List<String>>> schemaCache = new ConcurrentHashMap<String, Map<String, List<String>>>();
			
			schemaName = checkSchema(uriCache, schemaName);
			if (uriCache.putIfAbsent(schemaName, schemaCache) != null) {
				schemaCache = uriCache.get(schemaName);
			}
			
			Map<String, List<String>> tableCache = new ConcurrentHashMap<String, List<String>>();
			
			if (schemaCache.putIfAbsent(tableName, tableCache) != null) {
				tableCache = schemaCache.get(tableName);
			}
			
			tableCache.put(key, values);
		}
	}
}
