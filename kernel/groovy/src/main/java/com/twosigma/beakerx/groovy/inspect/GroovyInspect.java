package com.twosigma.beakerx.groovy.inspect;

import com.twosigma.beakerx.autocomplete.AutocompleteCandidate;
import com.twosigma.beakerx.autocomplete.AutocompleteRegistry;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.ClassUtils;
import com.twosigma.beakerx.groovy.autocomplete.*;
import com.twosigma.beakerx.inspect.InspectResult;
import com.twosigma.beakerx.kernel.Imports;
import groovy.lang.GroovyClassLoader;
import org.antlr.v4.runtime.ANTLRInputStream;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.ParserRuleContext;
import org.antlr.v4.runtime.tree.ParseTreeWalker;

import java.util.ArrayList;
import java.util.List;

import static com.twosigma.beakerx.autocomplete.AutocompleteCandidate.EMPTY_NODE;
import static com.twosigma.beakerx.groovy.autocomplete.AutocompleteRegistryFactory.setup;

public class GroovyInspect {
    AutocompleteRegistry registry;
    private GroovyClasspathScanner cps;

    public GroovyInspect(GroovyClasspathScanner _cps) {
        cps = _cps;
        registry = AutocompleteRegistryFactory.createRegistry(cps);
    }
    /*
     * These are meant to be extended by personalized plugin versions.
     */
    private void moreSetup(AutocompleteRegistry r) {
    }

    private GroovyClassUtils createClassUtils(ClassLoader l) {
        return new GroovyClassUtils(cps, l);
    }

    public InspectResult doInspect(String code, int caretPosition, GroovyClassLoader groovyClassLoader, Imports imports) {
        registry = AutocompleteRegistryFactory.createRegistry(cps);
        GroovyClassUtils cu = createClassUtils(groovyClassLoader);
        setup(cu, registry);
        AutocompleteRegistryFactory.addDefaultImports(cu, registry, imports.toListOfStrings(), cps);
        AutocompleteRegistryFactory.moreSetup(cu);
        moreSetup(registry);

        Lexer lexer = new GroovyLexer(new ANTLRInputStream(code));
        lexer.removeErrorListeners();
        CommonTokenStream tokens = new CommonTokenStream(lexer);

        // Create a parser that reads from the scanner
        GroovyParser parser = new GroovyParser(tokens);
        parser.removeErrorListeners();

        // start parsing at the compilationUnit rule
        ParserRuleContext t = parser.compilationUnit();
        ParseTreeWalker walker = new ParseTreeWalker();
        List<AutocompleteCandidate> q = new ArrayList<>();

/*        GroovyImportDeclarationCompletion extractor = new GroovyImportDeclarationCompletion(code, caretPosition, registry, cps, cu);
        GroovyNameBuilder extractor2 = new GroovyNameBuilder(registry, cu);
        GroovyNodeCompletion extractor3 = new GroovyNodeCompletion(code, caretPosition, registry, cu);*/
        GroovyObjectType extractor3 = new GroovyObjectType(code, caretPosition, registry, cu);
/*
        walker.walk(extractor, t);
        if (extractor.getQuery() != null)
            q.addAll(extractor.getQuery());
        walker.walk(extractor2, t);*/
        walker.walk(extractor3, t);
        if (extractor3.getQuery() != null)
            q.addAll(extractor3.getQuery());
        List<String> ret = registry.searchCandidates(q);
        return new InspectResult("", caretPosition);
        /*if (!ret.isEmpty()) {
            return new AutocompleteResult(ret, getStartIndex(extractor, extractor2, extractor3));
        }
        return findAutocompleteResult(txt, cur, cu);*/
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
                        q.add(new AutocompleteCandidate(GroovyCompletionTypes.NAME, tx));
                    }
                    ret = registry.searchCandidates(q);
                    startIndex = txt.indexOf(tx) + tx.length();
                }
                break;
            }
        }
        return new AutocompleteResult(ret, startIndex);



    }


}
