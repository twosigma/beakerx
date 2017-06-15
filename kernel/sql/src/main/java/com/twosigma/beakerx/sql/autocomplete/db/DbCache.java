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

package com.twosigma.beakerx.sql.autocomplete.db;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface DbCache {

  public List<String> getTableNames(Connection conn, final String schemaName, final String key)
    throws SQLException;

  public void putTableNames(Connection conn, final String schemaName,
                            final String key, final List<String> values)
    throws SQLException;

  public List<String> getTableFieldNames(Connection conn, final String schemaName,
                                         final String tableName, final String key)
    throws SQLException;

  public void putTableFieldNames(Connection conn, final String schemaName,
                                 final String tableName, final String key,
                                 final List<String> values)
    throws SQLException;
}
