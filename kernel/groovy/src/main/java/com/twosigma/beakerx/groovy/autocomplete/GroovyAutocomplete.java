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
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.ClassUtils;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import org.antlr.v4.runtime.ANTLRInputStream;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.ParserRuleContext;
import org.antlr.v4.runtime.tree.ParseTreeWalker;

import java.util.ArrayList;
import java.util.List;

import static com.twosigma.beakerx.evaluator.Evaluator.BEAKER_VARIABLE_NAME;
import static com.twosigma.beakerx.groovy.autocomplete.AutocompleteRegistryFactory.addDefaultImports;
import static com.twosigma.beakerx.groovy.autocomplete.AutocompleteRegistryFactory.setup;

public class GroovyAutocomplete {
  AutocompleteRegistry registry;
  private GroovyClasspathScanner cps;

  public GroovyAutocomplete(GroovyClasspathScanner _cps) {
    cps = _cps;
    registry = AutocompleteRegistryFactory.createRegistry(cps);
  }

  /*
   * These are meant to be extended by personalized plugin versions.
   */
  private void moreSetup(AutocompleteRegistry r) {
  }

  private ClassUtils createClassUtils(ClassLoader l) {
    return new GroovyClassUtils(cps, l);
  }

  public AutocompleteResult doAutocomplete(String txt, int cur, ClassLoader l, Imports imports) {
    ClassUtils cu = createClassUtils(l);
    registry = AutocompleteRegistryFactory.createRegistry(cps);
    setup(cu, registry);
//    registry.clearForType(GroovyCompletionTypes.CUSTOM_TYPE);
//    registry.clearForType(GroovyCompletionTypes.FIELD);
    //registry.clearForType(GroovyCompletionTypes.NAME);
    AutocompleteRegistryFactory.addDefaultImports(cu, registry, imports.toListOfStrings(), cps);
    AutocompleteRegistryFactory.moreSetup(cu);
    moreSetup(registry);

    Lexer lexer = new GroovyLexer(new ANTLRInputStream(txt));
    lexer.removeErrorListeners();
    CommonTokenStream tokens = new CommonTokenStream(lexer);

    // Create a parser that reads from the scanner
    GroovyParser parser = new GroovyParser(tokens);
    parser.removeErrorListeners();

    // start parsing at the compilationUnit rule
    ParserRuleContext t = parser.compilationUnit();
    ParseTreeWalker walker = new ParseTreeWalker();
    List<AutocompleteCandidate> q = new ArrayList<>();

    GroovyImportDeclarationCompletion extractor = new GroovyImportDeclarationCompletion(txt, cur, registry, cps, cu);
    GroovyNameBuilder extractor2 = new GroovyNameBuilder(registry, cu);
    GroovyNodeCompletion extractor3 = new GroovyNodeCompletion(txt, cur, registry, cu);

    walker.walk(extractor, t);
    if (extractor.getQuery() != null)
      q.addAll(extractor.getQuery());
    walker.walk(extractor2, t);
    walker.walk(extractor3, t);
    if (extractor3.getQuery() != null)
      q.addAll(extractor3.getQuery());
    List<String> ret = registry.searchCandidates(q);

//    if (ret.isEmpty()) {
//      q.clear();
//      for (int i=cur-1; i>=0; i--) {
//        if(i<txt.length() && Character.isWhitespace(txt.charAt(i))) {
//          String tx = txt.substring(i+1, cur).trim();
//          if(!txt.isEmpty()) {
//            if(tx.contains(".")) {
//              q.add(cu.expandExpression(tx, registry, cu.DO_ALL));
//            } else {
//              q.add(new AutocompleteCandidate(GroovyCompletionTypes.NAME, tx));
//            }
//            ret = registry.searchCandidates(q);
//          }
//          break;
//        }
//      }
//    }

//    if (txt.charAt(cur - 1) == '.') {
//      for (int i = 0; i < ret.size(); i++) {
//        String s = ret.get(i);
//        if (s.startsWith("."))
//          ret.set(i, s.substring(1));
//      }
//    }

    // this shows the GUI
    if (GroovyCompletionTypes.debug)
      t.inspect(parser);
    return new AutocompleteResult(ret, getStartIndex(extractor, extractor2, extractor3));
  }

  private int getStartIndex(GroovyImportDeclarationCompletion extractor, GroovyNameBuilder extractor2, GroovyNodeCompletion extractor3) {
    if (extractor.getQuery() != null) {
      return extractor.getStartIndex();
    }
    if (extractor2.getQuery() != null) {
      return extractor2.getStartIndex();
    }
    if (extractor3.getQuery() != null) {
      return extractor3.getStartIndex();
    }
    return 0;
  }

}
