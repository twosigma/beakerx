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

    private NamespaceClient client;
    private String dbURI;
    private String inputs;
    private Set<String> outputs = new HashSet<>();

    private List<BeakerParseResult> results = new ArrayList<>();

    public BeakerParser(String script, NamespaceClient client) throws IOException {
        this.client = client;
        parseVar(script);
        List<String> queries = QueryParser.split(script);
        if (queries != null && !queries.isEmpty()) {
            for (String query : queries) {
                BeakerParseResult result = new BeakerParseResult(query);
                parseSelectInto(result);
                results.add(result);
            }
        }
    }

    private void parseSelectInto(BeakerParseResult result) {
        String sql = result.getResultQuery();
        String upper = sql.toUpperCase();
        int select;
        int from = -1;
        int into = -1;

        do {
            select = from;
            select = upper.indexOf(SQL_SELECT, select);
            if (select >= 0) {
                from = upper.indexOf(SQL_FROM, select);
                into = upper.indexOf(SQL_INTO, select);

                if (into > select && into < from) {
                    int start = upper.indexOf("${", into);
                    if (start > into && start < from) {
                        int end = upper.indexOf("}", into);
                        if (end > into && end < from) {
                            String var = sql.substring(start + 2, end);
                            sql = sql.substring(0, into) + sql.substring(end + 1);
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
                    String s = line.substring(line.indexOf('=') + 1).trim();
                    if (s.startsWith("\"") && s.endsWith("\"")) {
                        dbURI = s.substring(1, s.length() - 1);
                    } else dbURI = client.get(s).toString();
                } else if (line.indexOf(OUTPUTS_VAR) > 0) {
                    String outLine = line.substring(line.indexOf(':') + 1).trim();
                    for (String out : outLine.split(",")) {
                        outputs.add(out.trim());
                    }
                }
            }
        }
    }

    public class BeakerParseResult {
        boolean selectInto;
        String resultQuery;
        String selectIntoVar;

        public BeakerParseResult(String resultQuery) {
            this.resultQuery = resultQuery;
        }

        public String getResultQuery() {
            return resultQuery;
        }

        public void setResultQuery(String resultQuery) {
            this.resultQuery = resultQuery;
        }

        public String getSelectIntoVar() {
            return selectIntoVar;
        }

        public void setSelectIntoVar(String selectIntoVar) {
            this.selectIntoVar = selectIntoVar;
        }

        public boolean isSelectInto() {
            return selectInto;
        }

        public void setSelectInto(boolean selectInto) {
            this.selectInto = selectInto;
        }
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

    public String getInputs() {
        return inputs;
    }

    public void setInputs(String inputs) {
        this.inputs = inputs;
    }

    public Set<String> getOutputs() {
        return outputs;
    }

    public void setOutputs(Set<String> outputs) {
        this.outputs = outputs;
    }
}
