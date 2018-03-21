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

package com.twosigma.beakerx.javash.autocomplete;

import com.twosigma.beakerx.autocomplete.AutocompleteCandidate;
import com.twosigma.beakerx.autocomplete.AutocompleteRegistry;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.ClassUtils;
import com.twosigma.beakerx.autocomplete.ClasspathScanner;
import com.twosigma.beakerx.kernel.Imports;
import org.antlr.v4.runtime.ANTLRInputStream;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.ParserRuleContext;
import org.antlr.v4.runtime.tree.ParseTreeWalker;

import java.util.ArrayList;
import java.util.List;

import static com.twosigma.beakerx.javash.autocomplete.AutocompleteRegistryFactory.setup;

public class JavaAutocomplete {

  AutocompleteRegistry registry;
  private JavaClasspathScanner cps;
  private List<String> imports;

  public JavaAutocomplete(JavaClasspathScanner _cps) {
    cps = _cps;
    registry = AutocompleteRegistryFactory.createRegistry(cps);
    imports = new ArrayList<>();
  }

  public AutocompleteResult doAutocomplete(String txt, int cur, ClassLoader l, Imports imports) {
    try {
      return find(txt, cur, l, imports);
    } catch (Exception e) {
      return new AutocompleteResult(new ArrayList<>(), 0);
    }
  }

  private AutocompleteResult find(String txt, int cur, ClassLoader l, Imports imports) {
    registry = AutocompleteRegistryFactory.createRegistry(cps);
    ClassUtils cu = createClassUtils(l);
    setup(cu, registry);
    AutocompleteRegistryFactory.addDefaultImports(cu, registry, imports.toListOfStrings(), cps);

    Lexer lexer = new JavaLexer(new ANTLRInputStream(txt));
    CommonTokenStream tokens = new CommonTokenStream(lexer);

    // Create a parser that reads from the scanner
    JavaParser parser = new JavaParser(tokens);
    parser.removeErrorListeners();

    // start parsing at the compilationUnit rule
    ParserRuleContext t = parser.compilationUnit();
    ParseTreeWalker walker = new ParseTreeWalker();
    List<AutocompleteCandidate> q = new ArrayList<AutocompleteCandidate>();

    JavaImportDeclarationCompletion extractor = new JavaImportDeclarationCompletion(txt, cur, registry, cps, cu);
    JavaNameBuilder extractor2 = new JavaNameBuilder(registry, cu);
    JavaNodeCompletion extractor3 = new JavaNodeCompletion(txt, cur, registry, cu);
    walker.walk(extractor, t);
    if (extractor.getQuery() != null)
      q.addAll(extractor.getQuery());
    walker.walk(extractor2, t);
    walker.walk(extractor3, t);
    if (extractor3.getQuery() != null)
      q.addAll(extractor3.getQuery());
    List<String> ret = registry.searchCandidates(q);


    if (!ret.isEmpty()) {
      return new AutocompleteResult(ret, getStartIndex(extractor, extractor2, extractor3));
    }
    return findAutocompleteResult(txt, cur, cu);
  }

  private AutocompleteResult findAutocompleteResult(String txt, int cur, ClassUtils cu) {
    List<AutocompleteCandidate> q = new ArrayList<>();
    List<String> ret = new ArrayList<>();
    int startIndex = 0;
    for (int i = cur - 1; i >= 0; i--) {
      if (i < txt.length() && Character.isWhitespace(txt.charAt(i))) {
        String tx = txt.substring(i + 1, cur).trim();
        if (!txt.isEmpty()) {
          if (tx.contains(".")) {
            q.add(cu.expandExpression(tx, registry, cu.DO_ALL));
          } else {
            q.add(new AutocompleteCandidate(JavaCompletionTypes.NAME, tx));
          }
          ret = registry.searchCandidates(q);
          startIndex = txt.indexOf(tx) + tx.length();
        }
        break;
      }
    }
    return new AutocompleteResult(ret, startIndex);
  }

  private int getStartIndex(JavaImportDeclarationCompletion extractor, JavaNameBuilder extractor2, JavaNodeCompletion extractor3) {
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

  public void addImport(String imp) {
    imports.add(imp);
  }

  protected ClassUtils createClassUtils(ClassLoader l) {
    return new JavaClassUtils(cps, l);
  }


}
