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

package com.twosigma.beaker.groovy.autocomplete;

import java.util.List;

import com.twosigma.beaker.autocomplete.AutocompleteCandidate;
import com.twosigma.beaker.autocomplete.AutocompleteRegistry;
import com.twosigma.beaker.autocomplete.ClassUtils;
import com.twosigma.beaker.autocomplete.ClasspathScanner;
import com.twosigma.beaker.groovy.autocomplete.GroovyParser.ImportStatementContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GroovyImportDeclarationCompletion extends GroovyAbstractListener {

  private static final Logger logger = LoggerFactory.getLogger(GroovyImportDeclarationCompletion.class.getName());

  private int cursor;
  private String text;
  private AutocompleteRegistry registry;
  private ClasspathScanner cps;
  private ClassUtils classUtils;

  public GroovyImportDeclarationCompletion(String t, int c, AutocompleteRegistry r, ClasspathScanner p, ClassUtils cu) {
    cursor = c;
    text = t;
    registry = r;
    cps = p;
    classUtils = cu;
  }

  @Override
  public void exitImportStatement(ImportStatementContext ctx) {
    if(cursor==0)
      return;

    /*
     * This is used to autocomplete IMPORT statements and to add to our type definitions every imported package and class
     */

    if(ctx.getStart().getStartIndex() < cursor && ctx.getStop().getStopIndex()+1 >= cursor) {
      // match... we are autocompleting this import declaration

      if(text.charAt(cursor-1)=='.') {
        // looking for next package name
        String st = ctx.getText();
        if(st.startsWith("import"))
          st = st.substring(6).trim();
        if(GroovyCompletionTypes.debug) logger.info("wants next package name for {}", st);
        String [] txtv = (st+"X").split("\\.");
        txtv[txtv.length-1] = "";
        AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.PACKAGE_NAME, txtv);
        addQuery(c);
        c = new AutocompleteCandidate(GroovyCompletionTypes.FQ_TYPE, txtv);
        addQuery(c);
      } else {
        // looking to autocomplete a package name
        String st = ctx.getText();
        if(st.startsWith("import"))
          st = st.substring(6).trim();
        if(GroovyCompletionTypes.debug) logger.info("wants to finish package name for {}", st);
        String [] txtv = st.split("\\.");
        AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.PACKAGE_NAME, txtv);
        addQuery(c);
        c = new AutocompleteCandidate(GroovyCompletionTypes.FQ_TYPE, txtv);
        addQuery(c);
      }
    } else {
      // add this import declaration
      String st = ctx.getText();
      if(st.startsWith("import"))
        st = st.substring(6).trim();
      if(GroovyCompletionTypes.debug) logger.info("adding import for {}", st);
      // is this imports using '*' ?
      if (st.endsWith(".*")) {
        String [] txtv = st.split("\\.");
        AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.PACKAGE_NAME, txtv);
        registry.addCandidate(c);
        st = st.substring(0,st.length()-2);
        List<String> cls = cps.getClasses(st);
        if(cls!=null) {
          c = new AutocompleteCandidate(GroovyCompletionTypes.FQ_TYPE, txtv);
          AutocompleteCandidate l = c.findLeaf();
          for ( String s : cls) {
            l.addChildren(new AutocompleteCandidate(GroovyCompletionTypes.CUSTOM_TYPE, s));
            registry.addCandidate(new AutocompleteCandidate(GroovyCompletionTypes.CUSTOM_TYPE, s));
            classUtils.defineClassShortName(s, st+"."+s);
            if(GroovyCompletionTypes.debug)  logger.info("define {} {}.{}", s, st, s);
          }
          registry.addCandidate(c);
        }
      } else {
        // this imports a specific type
        String [] txtv = st.split("\\.");
        AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.PACKAGE_NAME, txtv, txtv.length-1);
        registry.addCandidate(c);
        c = new AutocompleteCandidate(GroovyCompletionTypes.FQ_TYPE, txtv);
        registry.addCandidate(c);
        c = new AutocompleteCandidate(GroovyCompletionTypes.CUSTOM_TYPE, txtv[txtv.length-1]);
        registry.addCandidate(c);
        classUtils.defineClassShortName(txtv[txtv.length-1], st);

      }
    }
  }

}
