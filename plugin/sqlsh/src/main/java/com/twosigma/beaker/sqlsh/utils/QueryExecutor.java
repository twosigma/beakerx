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
package com.twosigma.beaker.sqlsh.utils;

import com.google.inject.Inject;
import com.twosigma.beaker.jvm.object.OutputContainer;
import com.twosigma.beaker.jvm.object.TableDisplay;

import javax.sql.DataSource;
import java.sql.*;
import java.util.*;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

public class QueryExecutor {


    public Object executeQuery(String script) throws SQLException {

        DataSource ds = JDBCClient.getDataSource();

        try (Connection conn = ds.getConnection();) {

            conn.setAutoCommit(false);

            List<String> queries = QueryParser.split(script);
            if (queries == null || queries.isEmpty()) return null;

            List<Object> results = new ArrayList<>();

            for (String query : queries) {

                List<List<?>> values = new ArrayList<>();
                List<String> columns = new ArrayList<>();
                List<String> types = new ArrayList<>();

                try (PreparedStatement statement = conn.prepareStatement(query)) {

                    boolean hasResultSet = statement.execute();
                    if (hasResultSet) {
                        ResultSet rs = statement.getResultSet();

                        for (int i = 1; i <= rs.getMetaData().getColumnCount(); i++) {
                            columns.add(rs.getMetaData().getColumnName(i));
                            types.add(rs.getMetaData().getColumnClassName(i));
                        }

                        while (rs.next()) {
                            if (rs.getMetaData().getColumnCount() != 0) {
                                List<Object> row = new ArrayList<Object>();
                                values.add(row);

                                for (int i = 1; i <= rs.getMetaData().getColumnCount(); i++) {
                                    if (java.sql.Date.class.getName().equals(rs.getMetaData().getColumnClassName(i))) {
                                        java.sql.Date sqlDate = rs.getDate(i);
                                        row.add(sqlDate == null ? null : new Date(sqlDate.getTime()));
                                    } else {
                                        row.add(rs.getObject(i));
                                    }
                                }
                            }
                        }
                    }

                } catch (SQLException e) {
                    Logger.getLogger(QueryExecutor.class.getName()).log(Level.SEVERE, null, e);
                    try {
                        conn.rollback();
                    } catch (Exception e1) {
                        Logger.getLogger(QueryExecutor.class.getName()).log(Level.SEVERE, null, e1);
                    }

                    throw e;
                }


                if (values.size() > 1) {
                    TableDisplay tableDisplay = new TableDisplay(values, columns, types);
                    results.add(tableDisplay);
                } else if (values.size() == 1) {
                    List<Object> row = ((List<Object>) values.get(0));
                    if (row.size() == 1) {
                        results.add(row.get(0));
                    } else if (row.size() > 1) {
                        Map<String, Object> map = new LinkedHashMap<>();
                        for (int i = 0; i < row.size(); i++) {
                            map.put(columns.get(i), row.get(i));
                        }
                        results.add(map);
                    }
                }
            }

            if (results.size() > 1) {
                OutputContainer outputContainer = new OutputContainer(results);
                return outputContainer;
            } else if (!results.isEmpty()) {
                return results.get(0);
            } else {
                return null;
            }

        }
    }


}
