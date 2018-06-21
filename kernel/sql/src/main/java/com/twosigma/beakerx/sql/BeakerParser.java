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
package com.twosigma.beakerx.sql;

import com.twosigma.beakerx.BeakerXClient;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;

public class BeakerParser {
  public static final String DB_URI_VAR = "beakerDB";
  public static final String INPUTS_VAR = "inputs";
  public static final String OUTPUTS_VAR = "outputs";

  public static final String SQL_SELECT = "SELECT";
  public static final String SQL_FROM = "FROM";
  public static final String SQL_INTO = "INTO";

  public static final String VAR_VALUE_START = "${";
  public static final String VAR_VALUE_END = "}";
  public static final String NO_DATASOURCES_ERROR = "No datasource";

  protected final JDBCClient jdbcClient;
  
  private BeakerXClient client;
  private ConnectionStringHolder dbURI;
  private Map<String, String> inputs = new HashMap<>();
  private Set<String> outputs = new HashSet<>();
  private Map<String, ConnectionStringHolder> namedConnectionString;
  private ConnectionStringHolder defaultConnectionString;

  private List<BeakerParseResult> results = new ArrayList<>();

  public BeakerParser(String script, BeakerXClient client, ConnectionStringHolder defaultConnectionString, Map<String, ConnectionStringHolder> namedConnectionString, JDBCClient jdbcClient) throws IOException, DBConnectionException {
    this.client = client;
    this.jdbcClient = jdbcClient;
    this.defaultConnectionString = defaultConnectionString;
    this.namedConnectionString = namedConnectionString;

    parseVar(script);
    List<String> queries = QueryParser.split(script);
    if (queries != null && !queries.isEmpty()) {
      for (String query : queries) {
        BeakerParseResult result = new BeakerParseResult(query);
        parseSelectInto(result);
        parseInputParam(result);
        results.add(result);
      }
    }
  }

  private void parseInputParam(BeakerParseResult result) {
    String sql = result.getResultQuery();
    String upper = sql.toUpperCase();
    int start = -1;
    int end = -1;
    do {
      start = upper.indexOf(VAR_VALUE_START, end);
      if (start >= 0) {
        end = upper.indexOf(VAR_VALUE_END, start);
        if (end < 0) break;
        String var = sql.substring(start + 2, end).trim();
        if (var != null && !var.isEmpty()) {
          sql = sql.substring(0, start) + "?" + sql.substring(end + 1);
          upper = sql.toUpperCase();
          end = start + 1;
          BeakerInputVar inputVar = new BeakerInputVar(var);
          inputVar.setType(inputs.get(var));
          result.getInputVars().add(inputVar);
        }
      }

    } while (start >= 0);

    result.setResultQuery(sql);
  }

  private void parseSelectInto(BeakerParseResult result) {
    String sql = result.getResultQuery();
    String upper = sql.toUpperCase();
    int select = -1;
    int from = -1;
    int into = -1;

    do {
      select = from;
      select = upper.indexOf(SQL_SELECT, select);
      if (select >= 0) {
        from = upper.indexOf(SQL_FROM, select);
        if (from < 0) break;
        into = upper.indexOf(SQL_INTO, select);

        if (into > select && into < from) {
          int start = upper.indexOf(VAR_VALUE_START, into);
          if (start > into && start < from) {
            int end = upper.indexOf(VAR_VALUE_END, into);
            if (end > into && end < from) {
              String var = sql.substring(start + 2, end);
              sql = sql.substring(0, into) + sql.substring(end + 1);
              upper = sql.toUpperCase();
              from = select;
              if (var != null && !var.isEmpty()) {
                result.setSelectInto(true);
                result.setSelectIntoVar(var);
              }
            }
          }
        }
      }
    } while (select >= 0);

    result.setResultQuery(sql);
  }

  private void parseVar(String script) throws IOException, DBConnectionException {
    List<String> vars = new ArrayList<>();
    Scanner scanner = new Scanner(script);
    StringBuffer sb = new StringBuffer();

    while (scanner.hasNextLine()) {

      String line = scanner.nextLine();
      line.trim();
      int commentIndex = line.indexOf("%%");
      if (commentIndex != -1 && line.startsWith("%%")) {
        vars.add(line);

        if (line.indexOf(DB_URI_VAR) > 0) {
          String value = line.substring(line.indexOf('=') + 1).trim();
          int start = value.indexOf(VAR_VALUE_START);
          int end = value.indexOf(VAR_VALUE_END, start);

          if (value.startsWith("\"") && value.endsWith("\"")) {
            dbURI = new ConnectionStringHolder(value.substring(1, value.length() - 1), jdbcClient);
          } else if (start >= 0 && end > 0) {
            String var = value.substring(start + 2, end).trim();
            dbURI = new ConnectionStringHolder(client.get(var).toString(), jdbcClient);
          } else {
            dbURI = namedConnectionString.get(value);
            if (dbURI == null)
              throw new DBConnectionException(value, new SQLException("Named connection witn name " + value + " not found"));
          }
        } else if (line.indexOf(OUTPUTS_VAR) > 0) {
          String outLine = line.substring(line.indexOf(':') + 1).trim();
          for (String out : outLine.split(";")) {
            outputs.add(out.trim());
          }
        } else if (line.indexOf(INPUTS_VAR) > 0) {
          String inLine = line.substring(line.indexOf(':') + 1).trim();
          for (String in : inLine.split(";")) {
            int d = in.indexOf('/');
            if (d > 0) {
              String var = in.substring(0, d).trim();
              String type = in.substring(d + 1, in.length()).trim();
              inputs.put(var, type);
            } else inputs.put(in.trim(), null);
          }
        }
      }
    }
    if (dbURI == null) {
      if (defaultConnectionString == null) {
        throw new RuntimeException(NO_DATASOURCES_ERROR);
      }
      dbURI = defaultConnectionString;
    }
  }

  public ConnectionStringHolder getDbURI() {
    return dbURI;
  }

  public List<BeakerParseResult> getResults() {
    return results;
  }

  public void setResults(List<BeakerParseResult> results) {
    this.results = results;
  }

  public Map<String, String> getInputs() {
    return inputs;
  }

  public void setInputs(Map<String, String> inputs) {
    this.inputs = inputs;
  }

  public Set<String> getOutputs() {
    return outputs;
  }

  public void setOutputs(Set<String> outputs) {
    this.outputs = outputs;
  }
}
