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
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.sql.*;
import java.util.*;
import java.util.Date;

public class QueryExecutor {

  protected final JDBCClient jdbcClient;

  private Connection connection;
  private PreparedStatement statement;

  public QueryExecutor(JDBCClient jdbcClient) {
    this.jdbcClient = jdbcClient;
  }

  public synchronized Object executeQuery(String script, NamespaceClient namespaceClient, String defaultConnectionString, Map<String, String> namedConnectionString) throws SQLException, IOException, ReadVariableException {

    BeakerParser beakerParser = new BeakerParser(script, namespaceClient, defaultConnectionString, namedConnectionString);

    DataSource ds = jdbcClient.getDataSource(beakerParser.getDbURI());

    try (Connection connection = ds.getConnection();) {
      this.connection = connection;
      connection.setAutoCommit(false);
      List<Object> resultsForOutputCell = new ArrayList<>();
      Map<String, List<Object>> resultsForNamspace = new HashMap<>();

      for (BeakerParseResult queryLine : beakerParser.getResults()) {

        BeakerInputVar basicIterationArray = null;
        for (BeakerInputVar parameter : queryLine.getInputVars()) {
          if (parameter.isAll()) {
            basicIterationArray = parameter;
            if(parameter.getErrorMessage() != null) throw new ReadVariableException(parameter.getErrorMessage());
            //ToDo make recursively iteration over several arrays
            break;
          }
        }

        if (basicIterationArray != null) {
          int l;
          Object obj;
          try {
            obj = namespaceClient.get(basicIterationArray.objectName);
          } catch (Exception e) {
            throw new ReadVariableException(basicIterationArray.objectName, e);
          }
          if (obj instanceof List) {
            l = ((List) obj).size();
          } else if (obj.getClass().isArray()) {
            l = Array.getLength(obj);
          } else break;

          for (int i = 0; i < l; i++) {
            QueryResult queryResult = executeQuery(i, queryLine, connection, namespaceClient);
            adoptResult(queryLine, queryResult, resultsForOutputCell, resultsForNamspace);
          }
        } else {
          QueryResult queryResult = executeQuery(-1, queryLine, connection, namespaceClient);
          adoptResult(queryLine, queryResult, resultsForOutputCell, resultsForNamspace);
        }
      }
      connection.commit();

      for (String output : resultsForNamspace.keySet()) {
        if (resultsForNamspace.get(output).size() > 1) {
          OutputContainer outputContainer = new OutputContainer(resultsForNamspace.get(output));
          namespaceClient.set(output, outputContainer);
        } else if (!resultsForNamspace.get(output).isEmpty()) {
          namespaceClient.set(output, resultsForNamspace.get(output).get(0));
        } else {
          namespaceClient.set(output, null);
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

    } finally {
      statement = null;
    }
  }

  private void adoptResult(BeakerParseResult queryLine, QueryResult queryResult, List<Object> resultsForOutputCell, Map<String, List<Object>> resultsForNamspace) {
    if (queryLine.isSelectInto() && resultsForNamspace.get(queryLine.selectIntoVar) == null) {
      resultsForNamspace.put(queryLine.selectIntoVar, new ArrayList<>());
    }
    if (queryResult.getValues().size() > 1) {
      TableDisplay tableDisplay = new TableDisplay(queryResult.getValues(), queryResult.getColumns(), queryResult.getTypes());
      if (!queryLine.isSelectInto()) {
        resultsForOutputCell.add(tableDisplay);
      } else {
        resultsForNamspace.get(queryLine.selectIntoVar).add(tableDisplay);
      }
    } else if (queryResult.getValues().size() == 1) {
      List<Object> row = ((List<Object>) queryResult.getValues().get(0));
      if (row.size() == 1) {
        if (!queryLine.isSelectInto()) {
          resultsForOutputCell.add(row.get(0));
        } else {
          resultsForNamspace.get(queryLine.selectIntoVar).add(row.get(0));
        }
      } else if (row.size() > 1) {
        Map<String, Object> map = new LinkedHashMap<>();
        for (int i = 0; i < row.size(); i++) {
          map.put(queryResult.getColumns().get(i), row.get(i));
        }
        if (!queryLine.isSelectInto()) {
          resultsForOutputCell.add(map);
        } else {
          resultsForNamspace.get(queryLine.selectIntoVar).add(map);
        }
      }
    }
  }

  private QueryResult executeQuery(int currentIterationIndex, BeakerParseResult queryLine, Connection conn, NamespaceClient namespaceClient) throws SQLException, ReadVariableException {

    QueryResult queryResult = new QueryResult();

    try (PreparedStatement statement = conn.prepareStatement(queryLine.getResultQuery())) {
      this.statement = statement;
      int n = 1;
      for (BeakerInputVar parameter : queryLine.getInputVars()) {
        if(parameter.getErrorMessage() != null) throw new ReadVariableException(parameter.getErrorMessage());
        Object obj;
        try {
          obj = namespaceClient.get(parameter.objectName);

          if (!parameter.isArray() && !parameter.isObject()) {
            statement.setObject(n, obj);
          } else if (!parameter.isArray() && parameter.isObject()) {
            statement.setObject(n, getValue(obj, parameter.getFieldName()));
          } else if (parameter.isArray()) {
            int index;
            if (currentIterationIndex > 0 && parameter.isAll()) {
              index = currentIterationIndex;
            } else {
              index = parameter.index;
            }
            if (!parameter.isObject()) {
              if (obj instanceof List) {
                statement.setObject(n, ((List) obj).get(index));
              } else if (obj.getClass().isArray()) {
                Object arrayElement = Array.get(obj, index);
                statement.setObject(n, arrayElement);
              }
            } else {
              if (obj instanceof List) {
                statement.setObject(n, getValue(((List) obj).get(index), parameter.getFieldName()));
              } else if (obj.getClass().isArray()) {
                Object arrayElement = Array.get(obj, index);
                statement.setObject(n, getValue(arrayElement, parameter.getFieldName()));
              }
            }
          }
          n++;
        } catch (Exception e) {
          throw new ReadVariableException(parameter.objectName, e);
        }
      }

      boolean hasResultSet = statement.execute();
      if (hasResultSet) {
        ResultSet rs = statement.getResultSet();

        for (int i = 1; i <= rs.getMetaData().getColumnCount(); i++) {
          queryResult.getColumns().add(rs.getMetaData().getColumnName(i));
          queryResult.getTypes().add(rs.getMetaData().getColumnClassName(i));
        }

        while (rs.next()) {
          if (rs.getMetaData().getColumnCount() != 0) {
            List<Object> row = new ArrayList<Object>();
            queryResult.getValues().add(row);

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
      //Logger.getLogger(QueryExecutor.class.getName()).log(Level.SEVERE, null, e);
      try {
        conn.rollback();
      } catch (Exception e1) {
        //Logger.getLogger(QueryExecutor.class.getName()).log(Level.SEVERE, null, e1);
      }

      throw e;
    }
    return queryResult;
  }

  private Object getValue(Object obj, String fieldName) throws NoSuchFieldException, IllegalAccessException {
    if (obj instanceof Map) {
      return ((Map) obj).get(fieldName);
    } else {
      Class<?> clazz = obj.getClass();
      Field field = clazz.getField(fieldName);
      return field.get(obj);
    }
  }

  private class QueryResult {
    List<List<?>> values = new ArrayList<>();
    List<String> columns = new ArrayList<>();
    List<String> types = new ArrayList<>();

    public List<List<?>> getValues() {
      return values;
    }

    public void setValues(List<List<?>> values) {
      this.values = values;
    }

    public List<String> getColumns() {
      return columns;
    }

    public void setColumns(List<String> columns) {
      this.columns = columns;
    }

    public List<String> getTypes() {
      return types;
    }

    public void setTypes(List<String> types) {
      this.types = types;
    }
  }

  public void cancel() {
    try {
      if (statement != null && !statement.isClosed()) {
        statement.cancel();
        connection.rollback();
      }
    } catch (SQLException e) {
      //do nothing
    }
  }

}
