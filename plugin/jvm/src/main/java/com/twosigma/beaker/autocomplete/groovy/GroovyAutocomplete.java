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

package com.twosigma.beaker.autocomplete.groovy;

import java.util.ArrayList;
import java.util.List;

import org.antlr.v4.runtime.ANTLRInputStream;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.ParserRuleContext;
import org.antlr.v4.runtime.tree.ParseTreeWalker;

import com.twosigma.beaker.autocomplete.AutocompleteCandidate;
import com.twosigma.beaker.autocomplete.AutocompleteRegistry;
import com.twosigma.beaker.autocomplete.ClassUtils;
import com.twosigma.beaker.autocomplete.ClasspathScanner;

public class GroovyAutocomplete {
	AutocompleteRegistry registry;
	private ClasspathScanner cps;
	private List<String> imports;
	
	public GroovyAutocomplete(ClasspathScanner _cps) {
	  this(_cps,GroovyCompletionTypes.NUM_TYPES);
	}
	
	public GroovyAutocomplete(ClasspathScanner _cps, int num) {
		registry = new AutocompleteRegistry(num);	
		setup(registry);
		cps = _cps;
		
		for ( String pkg : cps.getPackages()) {
			String[] pkgv = pkg.split("\\.");
			AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.PACKAGE_NAME, pkgv);
			registry.addCandidate(c);
			List<String> cls = cps.getClasses(pkg);
			if(cls!=null && !cls.isEmpty()) {
				c = new AutocompleteCandidate(GroovyCompletionTypes.FQ_TYPE, pkgv);
				AutocompleteCandidate l = c;
				while(l.hasChildren()) { l = l.getChildrens().get(0); }
				for ( String cl : cls) {
					l.addChildren(new AutocompleteCandidate(GroovyCompletionTypes.FQ_TYPE, cl));
				}
				registry.addCandidate(c);
			}
		}
		imports = new ArrayList<String>();
	}
	
	/*
	 * These are meant to be extended by personalized plugin versions.
	 */
	protected void moreSetup(AutocompleteRegistry r) {
	  
	}
	
	protected void moreSetup(ClassUtils cu) {    
	  
	}
	
	public void addImport(String imp) {
	  imports.add(imp);
	}	  

	private void setup(AutocompleteRegistry r) {
		AutocompleteCandidate c;
		
		c = new AutocompleteCandidate(GroovyCompletionTypes.INITIAL, "package");
		r.addCandidate(c);
		
		c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, "import");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, "class");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, "enum");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, "interface");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, "def");
		r.addCandidate(c);
        c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, "assert");
        r.addCandidate(c);
        c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, "if");
        r.addCandidate(c);
        c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, "switch");
        r.addCandidate(c);
        c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, "while");
        r.addCandidate(c);
        c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, "for");
        r.addCandidate(c);
        c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, "try");
        r.addCandidate(c);
        c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, "extends");
        r.addCandidate(c);
        c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, "implements");
        r.addCandidate(c);

        c = new AutocompleteCandidate(GroovyCompletionTypes.CLASSLEVEL, "extends");
        r.addCandidate(c);
        c = new AutocompleteCandidate(GroovyCompletionTypes.CLASSLEVEL, "implements");
        r.addCandidate(c);
        
		c = new AutocompleteCandidate(GroovyCompletionTypes.STDFUNCS, "any");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.STDFUNCS, "collect");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.STDFUNCS, "each");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.STDFUNCS, "eachWithIndex");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.STDFUNCS, "every");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.STDFUNCS, "find");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.STDFUNCS, "findAll");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.STDFUNCS, "findIndexOf");
		r.addCandidate(c);
		
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "int");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "float");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "char");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "byte");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "void");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "boolean");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "short");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "long");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "double");
		r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Boolean");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Byte");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Character");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Double");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Float");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Integer");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Long");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Math");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Number");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Object");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Package");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Process");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "ProcessBuilder");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Runtime");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "RuntimePermission");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "SecurityManager");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Short");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "StackTraceElement");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "StrictMath");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "String");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "StringBuffer");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "StringBuilder");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "System");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Thread");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "ThreadGroup");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Throwable");
        r.addCandidate(c);
		c = new AutocompleteCandidate(GroovyCompletionTypes.TYPE, "Void");
        r.addCandidate(c);		
		
//		c = new AutocompleteCandidate(GroovyCompletionTypes.MEMBERDELC, "public");
//		r.addCandidate(c);
//		c = new AutocompleteCandidate(GroovyCompletionTypes.MEMBERDELC, "abstract");
//		r.addCandidate(c);
//		c = new AutocompleteCandidate(GroovyCompletionTypes.MEMBERDELC, "final");
//		r.addCandidate(c);
//		c = new AutocompleteCandidate(GroovyCompletionTypes.MEMBERDELC, "private");
//		r.addCandidate(c);
//		c = new AutocompleteCandidate(GroovyCompletionTypes.MEMBERDELC, "protected");
//		r.addCandidate(c);
//		c = new AutocompleteCandidate(GroovyCompletionTypes.MEMBERDELC, "static");
//		r.addCandidate(c);

		c = new AutocompleteCandidate(GroovyCompletionTypes.NEW, "new");
		r.addCandidate(c);		
	}
		
	private void setup(ClassUtils cu) {	
		cu.defineClassShortName("Boolean", "java.lang.Boolean");
		cu.defineClassShortName("Byte", "java.lang.Byte");
		cu.defineClassShortName("Character", "java.lang.Character");
		cu.defineClassShortName("Double", "java.lang.Double");
		cu.defineClassShortName("Float", "java.lang.Float");
		cu.defineClassShortName("Integer", "java.lang.Integer");
		cu.defineClassShortName("Long", "java.lang.Long");
		cu.defineClassShortName("Math", "java.lang.Math");
		cu.defineClassShortName("Number", "java.lang.Number");
		cu.defineClassShortName("Object", "java.lang.Object");
		cu.defineClassShortName("Package", "java.lang.Package");
		cu.defineClassShortName("Process", "java.lang.Process");
		cu.defineClassShortName("ProcessBuilder", "java.lang.ProcessBuilder");
		cu.defineClassShortName("Runtime", "java.lang.Runtime");
		cu.defineClassShortName("RuntimePermission", "java.lang.RuntimePermission");
		cu.defineClassShortName("SecurityManager", "java.lang.SecurityManager");
		cu.defineClassShortName("Short", "java.lang.Short");
		cu.defineClassShortName("StackTraceElement", "java.lang.StackTraceElement");
		cu.defineClassShortName("StrictMath", "java.lang.StrictMath");
		cu.defineClassShortName("String", "java.lang.String");
		cu.defineClassShortName("StringBuffer", "java.lang.StringBuffer");
		cu.defineClassShortName("StringBuilder", "java.lang.StringBuilder");
		cu.defineClassShortName("System", "java.lang.System");
		cu.defineClassShortName("Thread","java.lang.Thread");
		cu.defineClassShortName("ThreadGroup", "java.lang.ThreadGroup");
		cu.defineClassShortName("Throwable", "java.lang.Throwable");
		cu.defineClassShortName("Void", "java.lang.Void");
	}
	
	private void addDefaultImports(ClassUtils cu) {
	  for(String imp : imports) {
        // this imports using '*'
        if(imp.endsWith(".*")) {
            String st = imp.substring(0, imp.length()-2);
            String [] txtv = st.split("\\.");
            AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.PACKAGE_NAME, txtv);
            registry.addCandidate(c);
            List<String> cls = cps.getClasses(st);
            if(cls!=null) {
                c = new AutocompleteCandidate(GroovyCompletionTypes.FQ_TYPE, txtv);
                AutocompleteCandidate l = c.findLeaf();
                for ( String s : cls) {
                    l.addChildren(new AutocompleteCandidate(GroovyCompletionTypes.CUSTOM_TYPE, s));
                    registry.addCandidate(new AutocompleteCandidate(GroovyCompletionTypes.CUSTOM_TYPE, s));
                    cu.defineClassShortName(s, st+"."+s);
                }
                registry.addCandidate(c);
            }
        } else {
          String [] txtv = imp.split("\\.");
          AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.PACKAGE_NAME, txtv, txtv.length-1);
          registry.addCandidate(c);
          c = new AutocompleteCandidate(GroovyCompletionTypes.FQ_TYPE, txtv);
          registry.addCandidate(c);
          c = new AutocompleteCandidate(GroovyCompletionTypes.CUSTOM_TYPE, txtv[txtv.length-1]);
          registry.addCandidate(c);
          cu.defineClassShortName(txtv[txtv.length-1], imp);
        }
      }
	}
	
	public List<String> doAutocomplete(String txt, int cur) {
		ClassUtils cu = new ClassUtils();
		setup(cu);
		registry.clearForType(GroovyCompletionTypes.CUSTOM_TYPE);
		registry.clearForType(GroovyCompletionTypes.FIELD);
		registry.clearForType(GroovyCompletionTypes.NAME);
		addDefaultImports(cu);
		moreSetup(cu);
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
		List<AutocompleteCandidate> q = new ArrayList<AutocompleteCandidate>();
					
		GroovyImportDeclarationCompletion extractor = new GroovyImportDeclarationCompletion(txt,cur,registry,cps,cu);
		GroovyNameBuilder extractor2 = new GroovyNameBuilder(registry,cu );
		GroovyNodeCompletion extractor3 = new GroovyNodeCompletion(txt,cur, registry, cu);
		walker.walk(extractor, t);
		if(extractor.getQuery()!=null)
			q.addAll(extractor.getQuery());
		walker.walk(extractor2, t);
		walker.walk(extractor3, t);
		if(extractor3.getQuery()!=null)
			q.addAll(extractor3.getQuery());
		List<String> ret = registry.searchCandidates(q);

		if(ret.isEmpty()) {
		  q.clear();
		  for (int i=cur-1; i>=0; i--) {
		      if(i<txt.length() && Character.isWhitespace(txt.charAt(i))) {
              String tx = txt.substring(i+1, cur).trim();
              if(!txt.isEmpty()) {
                  if(tx.contains(".")) {
                    q.add(cu.expandExpression(tx, registry, cu.DO_ALL));
                  } else {
                    q.add(new AutocompleteCandidate(GroovyCompletionTypes.NAME, tx));
                  }
                  ret = registry.searchCandidates(q);
              }
              break;
		    }
		  }
		}
		
		// this shows the GUI
		if(GroovyCompletionTypes.debug)
		  t.inspect(parser);
		return ret;
	}
	
}
