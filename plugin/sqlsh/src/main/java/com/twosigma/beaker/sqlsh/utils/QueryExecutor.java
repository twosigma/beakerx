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

import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.jvm.object.OutputContainer;
import com.twosigma.beaker.jvm.object.TableDisplay;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class QueryExecutor {

    public Object executeQuery(String script, NamespaceClient namespaceClient) throws SQLException, IOException {

        BeakerParser beakerParser = new BeakerParser(script, namespaceClient);
        DataSource ds = JDBCClient.getDataSource(beakerParser.getDbURI());

        try (Connection conn = ds.getConnection();) {

            conn.setAutoCommit(false);
            List<Object> resultsForOutputCell = new ArrayList<>();
            Map<String, List<Object>> resultsForNamspace = new HashMap<>();

            for (BeakerParser.BeakerParseResult queryLine : beakerParser.getResults()) {

                List<List<?>> values = new ArrayList<>();
                List<String> columns = new ArrayList<>();
                List<String> types = new ArrayList<>();

                try (PreparedStatement statement = conn.prepareStatement(queryLine.getResultQuery())) {

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

                if (queryLine.isSelectInto() && resultsForNamspace.get(queryLine.selectIntoVar) == null) {
                    resultsForNamspace.put(queryLine.selectIntoVar, new ArrayList<>());
                }
                if (values.size() > 1) {
                    TableDisplay tableDisplay = new TableDisplay(values, columns, types);
                    if (!queryLine.isSelectInto()) {
                        resultsForOutputCell.add(tableDisplay);
                    } else {
                        resultsForNamspace.get(queryLine.selectIntoVar).add(tableDisplay);
                    }
                } else if (values.size() == 1) {
                    List<Object> row = ((List<Object>) values.get(0));
                    if (row.size() == 1) {
                        if (!queryLine.isSelectInto()) {
                            resultsForOutputCell.add(row.get(0));
                        } else {
                            resultsForNamspace.get(queryLine.selectIntoVar).add(row.get(0));
                        }
                    } else if (row.size() > 1) {
                        Map<String, Object> map = new LinkedHashMap<>();
                        for (int i = 0; i < row.size(); i++) {
                            map.put(columns.get(i), row.get(i));
                        }
                        if (!queryLine.isSelectInto()) {
                            resultsForOutputCell.add(map);
                        } else {
                            resultsForNamspace.get(queryLine.selectIntoVar).add(map);
                        }
                    }
                }
            }

            for (String output : resultsForNamspace.keySet()) {
                if (beakerParser.getOutputs() != null && beakerParser.getOutputs().contains(output)) {
                    if (resultsForNamspace.get(output).size() > 1) {
                        OutputContainer outputContainer = new OutputContainer(resultsForNamspace.get(output));
                        namespaceClient.set(output, outputContainer);
                    } else if (!resultsForNamspace.get(output).isEmpty()) {
                        namespaceClient.set(output, resultsForNamspace.get(output).get(0));
                    } else {
                        namespaceClient.set(output, null);
                    }
                }
            }

            if (resultsForOutputCell.size() > 1) {
                OutputContainer outputContainer = new OutputContainer(resultsForOutputCell);
                return outputContainer;
            } else if (!resultsForOutputCell.isEmpty()) {
                return resultsForOutputCell.get(0);
            } else {
                return null;
            }

        }
    }


}
