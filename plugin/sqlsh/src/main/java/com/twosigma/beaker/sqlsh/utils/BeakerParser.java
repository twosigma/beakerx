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

import java.io.IOException;
import java.util.*;

public class BeakerParser {
    public static final String DB_URI_VAR = "beakerDB";
    public static final String INPUTS_VAR = "inputs";
    public static final String OUTPUTS_VAR = "outputs";

    public static final String SQL_SELECT = "SELECT";
    public static final String SQL_FROM = "FROM";
    public static final String SQL_INTO = "INTO";

    public static final String VAR_VALUE_START = "${";
    public static final String VAR_VALUE_END = "}";

    private NamespaceClient client;
    private String dbURI;
    private Map<String, String> inputs = new HashMap<>();
    private Set<String> outputs = new HashSet<>();
    private Map<String, String> namedConnectionString;
    private String defaultConnectionString;

    private List<BeakerParseResult> results = new ArrayList<>();

    public BeakerParser(String script, NamespaceClient client, String defaultConnectionString, Map<String, String> namedConnectionString) throws IOException {
        this.client = client;
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
                // && inputs.keySet().contains(var) #2524 sql should not require %%inputs %%outputs
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
                if(from < 0) break;
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

    private void parseVar(String script) throws IOException {
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
                        dbURI = value.substring(1, value.length() - 1);
                    } else if(start >= 0 && end > 0) {
                        String var = value.substring(start + 2, end).trim();
                        dbURI = client.get(var).toString();
                    } else {
                        dbURI = namedConnectionString.get(value);
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
        if(dbURI == null) dbURI = defaultConnectionString;
    }

    public String getDbURI() {
        return dbURI;
    }

    public void setDbURI(String dbURI) {
        this.dbURI = dbURI;
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
