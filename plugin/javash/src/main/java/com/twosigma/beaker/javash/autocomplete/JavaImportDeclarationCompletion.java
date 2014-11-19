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

package com.twosigma.beaker.javash.autocomplete;

import java.util.List;

import com.twosigma.beaker.autocomplete.AutocompleteCandidate;
import com.twosigma.beaker.autocomplete.AutocompleteRegistry;
import com.twosigma.beaker.autocomplete.ClassUtils;
import com.twosigma.beaker.autocomplete.ClasspathScanner;
import com.twosigma.beaker.javash.autocomplete.JavaParser.ImportDeclarationContext;
import com.twosigma.beaker.javash.autocomplete.JavaParser.QualifiedNameContext;

public class JavaImportDeclarationCompletion extends JavaAbstractListener {
	
	private int cursor;
	private String text;
	private AutocompleteRegistry registry;
	private ClasspathScanner cps;
	private ClassUtils classUtils;
	
	public JavaImportDeclarationCompletion(String t, int c, AutocompleteRegistry r, ClasspathScanner p, ClassUtils cu) {
		cursor = c;
		text = t;
		registry = r;
		cps = p;
		classUtils = cu;
	}
	
	@Override
	public void exitImportDeclaration(ImportDeclarationContext ctx) {
		if(cursor==0)
			return;

		/*
		 * This is used to autocomplete IMPORT statements and to add to our type definitions every imported package and class
		 */
		
		if(ctx.getStart().getStartIndex() < cursor && ctx.getStop().getStopIndex()+1 >= cursor) {
			// match... we are autocompleting this import declaration
			
			if(text.charAt(cursor-1)=='.') {
				// looking for next package name
				if(ctx.getChildCount() > 2 && (ctx.getChild(1) instanceof QualifiedNameContext)) {
					QualifiedNameContext qn = (QualifiedNameContext)ctx.getChild(1);
					String st = qn.getText();
					//System.out.println("wants next package name for "+st);
					String [] txtv = (st+".X").split("\\.");
					txtv[txtv.length-1] = "";
					AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.PACKAGE_NAME, txtv);
					addQuery(c);
					c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, txtv);
					addQuery(c);
				}
			} else {
				// looking to autocomplete a package name
				if(ctx.getChildCount() > 2 && (ctx.getChild(1) instanceof QualifiedNameContext)) {
					QualifiedNameContext qn = (QualifiedNameContext)ctx.getChild(1);
					String st = qn.getText();
					//System.out.println("wants to finish package name for "+qn.getText());
					String [] txtv = st.split("\\.");
					AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.PACKAGE_NAME, txtv);
					addQuery(c);
					c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, txtv);
					addQuery(c);
				}
			}
		} else {
			// add this import declaration
			if(ctx.getChildCount() > 2 && (ctx.getChild(1) instanceof QualifiedNameContext)) {
				QualifiedNameContext qn = (QualifiedNameContext)ctx.getChild(1);
				// this imports using '*'
				if(ctx.getChildCount() >= 4 && ctx.getChild(2).getText().equals(".") && ctx.getChild(3).getText().equals("*")) {
					//System.out.println("ADD ALL imports for "+qn.getText());
					String st = qn.getText();
					String [] txtv = st.split("\\.");
					AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.PACKAGE_NAME, txtv);
					registry.addCandidate(c);
					List<String> cls = cps.getClasses(st);
					if(cls!=null) {
						c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, txtv);
						AutocompleteCandidate l = c.findLeaf();
						for ( String s : cls) {
							l.addChildren(new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, s));
							registry.addCandidate(new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, s));
							classUtils.defineClassShortName(s, st+"."+s);
						}
						registry.addCandidate(c);
					}
				} else {
					// this imports a specific type
					//System.out.println("ADD import for "+qn.getText());
					String st = qn.getText();
					String [] txtv = st.split("\\.");
					AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.PACKAGE_NAME, txtv, txtv.length-1);
					registry.addCandidate(c);
					c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, txtv);
					registry.addCandidate(c);
					c = new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, txtv[txtv.length-1]);
					registry.addCandidate(c);
					classUtils.defineClassShortName(txtv[txtv.length-1], st);
				}
			}			
		}
	}

}
