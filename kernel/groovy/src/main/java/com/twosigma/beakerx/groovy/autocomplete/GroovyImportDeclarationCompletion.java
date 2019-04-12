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

package com.twosigma.beakerx.groovy.autocomplete;

import com.twosigma.beakerx.autocomplete.AutocompleteCandidate;
import com.twosigma.beakerx.autocomplete.AutocompleteRegistry;
import com.twosigma.beakerx.autocomplete.ClassUtils;
import com.twosigma.beakerx.autocomplete.AutocompleteClasspathScanner;
import com.twosigma.beakerx.groovy.autocomplete.GroovyParser.ImportStatementContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

import static com.twosigma.beakerx.autocomplete.AutocompleteCandidate.EMPTY_NODE;
import static com.twosigma.beakerx.groovy.autocomplete.AutocompleteRegistryFactory.createImportAutocompleteCandidate;

public class GroovyImportDeclarationCompletion extends GroovyAbstractListener {

  private static final Logger logger = LoggerFactory.getLogger(GroovyImportDeclarationCompletion.class.getName());

  private int cursor;
  private String text;
  private AutocompleteRegistry registry;
  private AutocompleteClasspathScanner cps;
  private ClassUtils classUtils;

  public GroovyImportDeclarationCompletion(String t, int c, AutocompleteRegistry r, AutocompleteClasspathScanner p, ClassUtils cu) {
    cursor = c;
    text = t;
    registry = r;
    cps = p;
    classUtils = cu;
  }

  /**
   * This is used to autocomplete IMPORT statements and to add to our type definitions every imported package and class
   *
   * @param ctx
   */
  @Override
  public void exitImportStatement(ImportStatementContext ctx) {
    if (isAutocompleteOfImportStatement(ctx)) {
      if (text.charAt(cursor - 1) == '.') {
        importPackageNameAfterDot(ctx);
      } else {
        importPackageName(ctx);
      }
    } else {
      String st = ctx.getText();
      st = removeImportWord(st);
      if (GroovyCompletionTypes.debug) logger.info("adding import for {}", st);
      if (isWildcard(st)) {
        importWithWildcard(st);
      } else {
        createImportAutocompleteCandidate(classUtils,registry,st);
      }
    }
  }

  private boolean isWildcard(String st) {
    return st.endsWith(".*");
  }

  private boolean isAutocompleteOfImportStatement(ImportStatementContext ctx) {
    return ctx.getStart().getStartIndex() < cursor && ctx.getStop().getStopIndex() + 1 >= cursor;
  }

  private String removeImportWord(String st) {
    if (st.startsWith("import")) {
      st = st.substring(6).trim();
    }
    return st;
  }

  private void importPackageNameAfterDot(ImportStatementContext ctx) {
    String st = ctx.getText();
    st = removeImportWord(st);
    if (GroovyCompletionTypes.debug) logger.info("wants next package name for {}", st);
    String[] txtv = (st + "X").split("\\.");
    txtv[txtv.length - 1] = EMPTY_NODE;
    AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.PACKAGE_NAME, txtv);
    addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx)+1);
    c = new AutocompleteCandidate(GroovyCompletionTypes.FQ_TYPE, txtv);
    addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx)+1);
  }

  private void importPackageName(ImportStatementContext ctx) {
    String st = ctx.getText();
    st = removeImportWord(st);
    if (GroovyCompletionTypes.debug) logger.info("wants to finish package name for {}", st);
    String[] txtv = st.split("\\.");
    AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.PACKAGE_NAME, txtv);
    addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx));
    c = new AutocompleteCandidate(GroovyCompletionTypes.FQ_TYPE, txtv);
    addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx));
  }

  private void importWithWildcard(String st) {
    String[] txtv = st.split("\\.");
    AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.PACKAGE_NAME, txtv);
    registry.addCandidate(c);
    st = st.substring(0, st.length() - 2);
    List<String> cls = cps.getClasses(st);
    if (cls != null) {
      c = new AutocompleteCandidate(GroovyCompletionTypes.FQ_TYPE, txtv);
      AutocompleteCandidate l = c.findLeaf();
      for (String s : cls) {
        l.addChildren(new AutocompleteCandidate(GroovyCompletionTypes.CUSTOM_TYPE, s));
        registry.addCandidate(new AutocompleteCandidate(GroovyCompletionTypes.CUSTOM_TYPE, s));
        classUtils.defineClassShortName(s, st + "." + s);
        if (GroovyCompletionTypes.debug) logger.info("define {} {}.{}", s, st, s);
      }
      registry.addCandidate(c);
    }
  }

}
