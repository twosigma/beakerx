package com.twosigma.beaker.autocomplete.java;

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

public class JavaAutocomplete {
	AutocompleteRegistry registry;
	private ClasspathScanner cps;
	
	public JavaAutocomplete(ClasspathScanner _cps) {
		registry = new AutocompleteRegistry(JavaCompletionTypes.NUM_TYPES);	
		setup(registry);
		cps = _cps;
		
		for ( String pkg : cps.getPackages()) {
			String[] pkgv = pkg.split("\\.");
			AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.PACKAGE_NAME, pkgv);
			registry.addCandidate(c);
			List<String> cls = cps.getClasses(pkg);
			if(cls!=null && !cls.isEmpty()) {
				c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, pkgv);
				AutocompleteCandidate l = c;
				while(l.hasChildren()) { l = l.getChildrens().get(0); }
				for ( String cl : cls) {
					l.addChildren(new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, cl));
				}
				registry.addCandidate(c);
			}
		}

	}
	
	private void setup(AutocompleteRegistry r) {
		AutocompleteCandidate c;
		
		c = new AutocompleteCandidate(JavaCompletionTypes.INITIAL, "package");
		r.addCandidate(c);
		
		c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "import");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "public");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "class");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "abstract");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "enum");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "final");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "interface");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "private");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "protected");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, "static");
		r.addCandidate(c);

		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "if");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "for");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "while");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "do");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "else");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "try");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "catch");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "switch");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "return");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "throw");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "break");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "continue");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "synchronized");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "finally");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, "default");
		r.addCandidate(c);

		c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "int");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "float");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "char");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "byte");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "void");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "boolean");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "short");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "long");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, "double");
		r.addCandidate(c);
		
		c = new AutocompleteCandidate(JavaCompletionTypes.MEMBERDELC, "public");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.MEMBERDELC, "abstract");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.MEMBERDELC, "final");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.MEMBERDELC, "private");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.MEMBERDELC, "protected");
		r.addCandidate(c);
		c = new AutocompleteCandidate(JavaCompletionTypes.MEMBERDELC, "static");
		r.addCandidate(c);
	}
		
	private void setup(ClassUtils cu) {	
		cu.defineClassShortName("Boolean", "java.lang.Boolean");
		cu.defineClassShortName("Byte	", "java.lang.Byte");
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
	
	public List<String> doAutocomplete(String txt, int cur) {
		ClassUtils cu = new ClassUtils();
		setup(cu);
		registry.clearForType(JavaCompletionTypes.CUSTOM_TYPE);
		registry.clearForType(JavaCompletionTypes.FIELD);
		registry.clearForType(JavaCompletionTypes.NAME);
		Lexer lexer = new JavaLexer(new ANTLRInputStream(txt));
		CommonTokenStream tokens = new CommonTokenStream(lexer);

		// Create a parser that reads from the scanner
		JavaParser parser = new JavaParser(tokens);
		parser.removeErrorListeners();
		
		// start parsing at the compilationUnit rule
		ParserRuleContext t = parser.compilationUnit();
		ParseTreeWalker walker = new ParseTreeWalker();
		List<AutocompleteCandidate> q = new ArrayList<AutocompleteCandidate>();
					
		ImportDeclarationCompletion extractor = new ImportDeclarationCompletion(txt,cur,registry,cps,cu);
		NameBuilder extractor2 = new NameBuilder(registry,cu );
		NodeCompletion extractor3 = new NodeCompletion(txt,cur, registry, cu);
		walker.walk(extractor, t);
		if(extractor.getQuery()!=null)
			q.addAll(extractor.getQuery());
		walker.walk(extractor2, t);
		walker.walk(extractor3, t);
		if(extractor3.getQuery()!=null)
			q.addAll(extractor3.getQuery());
		List<String> ret = registry.searchCandidates(q);

		// this shows the GUI
		//t.inspect(parser);
		return ret;
	}
	
}
