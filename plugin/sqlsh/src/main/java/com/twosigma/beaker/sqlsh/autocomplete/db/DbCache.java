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

public interface DbCache {

  public List<String> getTableNames(final String url, final String schemaName, final String key);

  public void putTableNames(final String url, final String schemaName, final String key,
      final List<String> values);

  public List<String> getTableFieldNames(final String url, final String schemaName,
      final String tableName, final String key);

  public void putTableFieldNames(final String url, final String schemaName, final String tableName,
      final String key, final List<String> values);

}
