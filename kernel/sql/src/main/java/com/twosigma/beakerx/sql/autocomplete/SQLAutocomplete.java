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

package com.twosigma.beakerx.sql.autocomplete;

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.AutocompleteServiceBeakerx;
import com.twosigma.beakerx.autocomplete.AutocompleteClasspathScanner;
import com.twosigma.beakerx.autocomplete.MagicCommandAutocompletePatterns;
import com.twosigma.beakerx.sql.ConnectionStringHolder;
import com.twosigma.beakerx.sql.JDBCClient;
import com.twosigma.beakerx.sql.autocomplete.db.DbCache;
import com.twosigma.beakerx.sql.autocomplete.db.DbExplorerFactory;
import com.twosigma.beakerx.sql.autocomplete.db.DbInfo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Map;

public class SQLAutocomplete extends AutocompleteServiceBeakerx {

  private static final String[] SQL_KEYS = {
          "ABORT", "ACTION", "ADD", "AFTER", "ALL", "ALTER", "ANALYZE", "AND",
          "AS", "ASC", "ATTACH", "AUTOINCREMENT", "BEFORE", "BEGIN", "BETWEEN", "BY", "CASCADE", "CASE", "CAST",
          "CHECK", "COLLATE", "COLUMN", "COMMIT", "CONFLICT", "CONSTRAINT", "CREATE", "CROSS", "CURRENT_DATE",
          "CURRENT_TIME", "CURRENT_TIMESTAMP", "DATABASE", "DEFAULT", "DEFERRABLE", "DEFERRED", "DELETE", "DESC",
          "DETACH", "DISTINCT", "DROP", "EACH", "ELSE", "END", "ESCAPE", "EXCEPT", "EXCLUSIVE", "EXISTS", "EXPLAIN",
          "FAIL", "FOR", "FOREIGN", "FROM", "FULL", "GLOB", "GROUP", "HAVING", "IF", "IGNORE", "IMMEDIATE", "IN",
          "INDEX", "INDEXED", "INITIALLY", "INNER", "INSERT", "INSTEAD", "INTERSECT", "INTO", "IS", "ISNULL", "JOIN",
          "KEY", "LEFT", "LIKE", "LIMIT", "MATCH", "NATURAL", "NO", "NOT", "NOTNULL", "NULL", "OF", "OFFSET", "ON",
          "OR", "ORDER", "OUTER", "PLAN", "PRAGMA", "PRIMARY", "QUERY", "RAISE", "RECURSIVE", "REFERENCES", "REGEXP",
          "REINDEX", "RELEASE", "RENAME", "REPLACE", "RESTRICT", "RIGHT", "ROLLBACK", "ROW", "SAVEPOINT", "SELECT",
          "SET", "TABLE", "TEMP", "TEMPORARY", "THEN", "TO", "TRANSACTION", "TRIGGER", "UNION", "UNIQUE", "UPDATE",
          "USING", "VACUUM", "VALUES", "VIEW", "VIRTUAL", "WHEN", "WHERE", "WITH", "WITHOUT"};

  private static final String PARAM_CHAR = "%";

  private static final String[] PARAM_KEYS = {PARAM_CHAR + PARAM_CHAR + "beakerDB", PARAM_CHAR + PARAM_CHAR + "inputs"};

  private final JDBCClient jdbcClient;
  private final String sessionId;
  private ConnectionStringHolder defaultConnectionString;
  private final Map<String, ConnectionStringHolder> namedConnectionString;
  private final DbCache cache;


  public SQLAutocomplete(AutocompleteClasspathScanner _cps,
                         JDBCClient jdbcClient,
                         String sessionId,
                         ConnectionStringHolder defaultConnectionString,
                         Map<String, ConnectionStringHolder> namedConnectionString,
                         MagicCommandAutocompletePatterns autocompletePatterns) {
    super(autocompletePatterns);
    this.jdbcClient = jdbcClient;
    this.sessionId = sessionId;
    this.defaultConnectionString = defaultConnectionString;
    this.namedConnectionString = namedConnectionString;

    this.cache = DbExplorerFactory.getDbCache();
  }

  @Override
  protected AutocompleteResult doAutocomplete(final String txt, final int cur) {
    List<String> matches = findMatches(txt, cur);
    KeyWithIndex key = findKey(txt, cur);
    return new AutocompleteResult(matches, key.getIndex());
  }

  private List<String> findKeys(final String key, final String[] keys) {
    final List<String> ret = new ArrayList<>();

    if (key == null || key.trim().length() == 0) {
      ret.addAll(Arrays.asList(keys));
    } else {
      final String lowerTxt = key.toLowerCase(Locale.ROOT);

      for (String str : Arrays.asList(keys)) {
        if (str.toLowerCase(Locale.ROOT).startsWith(lowerTxt)) {
          ret.add(str);
        }
      }
    }

    return ret;
  }

  private List<String> findSqlKeys(final String key) {
    return findKeys(key, SQL_KEYS);
  }

  private List<String> findParamKeys(final String key) {
    return findKeys(key, PARAM_KEYS);
  }

  private KeyWithIndex findKey(final String txt, final int cur) {
    if (cur <= 0 || Character.isWhitespace(txt.charAt(cur - 1))) {
      return new KeyWithIndex("", txt.length());
    } else {
      String res = "";

      int eos = cur - 1;

      for (int i = eos; i >= 0; i--) {

        final boolean isIdentifier = Character.isUnicodeIdentifierPart(txt.charAt(i)) || PARAM_CHAR.charAt(0) == txt.charAt(i);

        if (isIdentifier) {
          eos = i;
        }


        if (!isIdentifier || i == 0) {

          res = new String(txt.substring(eos, cur));
          break;
        }
      }

      return new KeyWithIndex(res, eos);
    }
  }

  private List<String> findMatches(String txt, int cur) {
    List<String> ret = new LinkedList<>();

    if (cur == 0) {
      return findParamKeys(null);
    }

    final String key = findKey(txt, cur).getKey();

    if (key != null && key.length() > 0 && key.startsWith(PARAM_CHAR)) {
      return findParamKeys(key);
    } else {
      ret.addAll(findSqlKeys(key));
    }

    final DbInfo dbInfo = DbExplorerFactory.getDbInfo(txt, jdbcClient, sessionId, defaultConnectionString, namedConnectionString);
    if (dbInfo != null) {

      List<String> dbRet = null;

      if (cur > key.length() + 1 && (txt.charAt(cur - key.length() - 1) == '.' || ".".equals(key))) {

        String fieldKey = key;
        int searchTableIndex = cur - key.length() - 1;

        if (".".equals(key)) {
          fieldKey = "";
          searchTableIndex = cur - 1;
        }

        final String tableName = findKey(txt, searchTableIndex).getKey();

        if (tableName != null) {
          return dbInfo.getTableFieldNames(cache, null, tableName, fieldKey);
        }

      } else {
        dbRet = dbInfo.getTableNames(cache, null, key);
      }

      if (dbRet != null) {
        ret.addAll(0, dbRet);
      }
    }

    return ret;
  }
}
