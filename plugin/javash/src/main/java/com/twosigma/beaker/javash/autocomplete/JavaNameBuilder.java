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

import org.antlr.v4.runtime.tree.TerminalNodeImpl;

import com.twosigma.beaker.autocomplete.AutocompleteCandidate;
import com.twosigma.beaker.autocomplete.AutocompleteRegistry;
import com.twosigma.beaker.autocomplete.ClassUtils;
import com.twosigma.beaker.javash.autocomplete.JavaParser.ClassOrInterfaceTypeContext;
import com.twosigma.beaker.javash.autocomplete.JavaParser.FieldDeclarationContext;
import com.twosigma.beaker.javash.autocomplete.JavaParser.LocalVariableDeclarationContext;
import com.twosigma.beaker.javash.autocomplete.JavaParser.MethodDeclarationContext;
import com.twosigma.beaker.javash.autocomplete.JavaParser.PrimitiveTypeContext;
import com.twosigma.beaker.javash.autocomplete.JavaParser.TypeContext;
import com.twosigma.beaker.javash.autocomplete.JavaParser.VariableDeclaratorContext;
import com.twosigma.beaker.javash.autocomplete.JavaParser.VariableDeclaratorIdContext;
import com.twosigma.beaker.javash.autocomplete.JavaParser.VariableDeclaratorsContext;

public class JavaNameBuilder extends JavaAbstractListener {
	
	private AutocompleteRegistry registry;
	private ClassUtils classUtils;
	
	public JavaNameBuilder(AutocompleteRegistry r, ClassUtils cu) {
		registry = r;
		classUtils = cu;
	}
	
	
	@Override
	public void exitFieldDeclaration(FieldDeclarationContext ctx) {
		String type = null;
		TypeContext ty = ctx.getRuleContext(TypeContext.class, 0);
		if(ty!=null) {
			ClassOrInterfaceTypeContext t = ty.getRuleContext(ClassOrInterfaceTypeContext.class, 0);
			if(t!=null) {
				type=t.getText();
			} else {
				PrimitiveTypeContext pt = ty.getRuleContext(PrimitiveTypeContext.class, 0);
				if(pt!=null)
					type=pt.getText();
			}
		}
		List<VariableDeclaratorsContext> vars = ctx.getRuleContexts(VariableDeclaratorsContext.class);
		VariableDeclaratorContext v;
		for(VariableDeclaratorsContext vc : vars) {
			v = vc.getRuleContext(VariableDeclaratorContext.class, 0);
			if(v!=null) {
				VariableDeclaratorIdContext vi = v.getRuleContext(VariableDeclaratorIdContext.class, 0);
				if(vi.getChildCount()>0) {
					//System.out.println("VAR "+vi.getChild(0).getText()+" of type "+type);
					AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.NAME, vi.getChild(0).getText());
					registry.addCandidate(c);
					if(type!=null) {
						classUtils.defineVariable(vi.getChild(0).getText(), type);
					}
				}
			}
		}
	}

	@Override
	public void exitLocalVariableDeclaration(LocalVariableDeclarationContext ctx) {
		String type = null;
		TypeContext ty = ctx.getRuleContext(TypeContext.class, 0);
		if(ty!=null) {
			ClassOrInterfaceTypeContext t = ty.getRuleContext(ClassOrInterfaceTypeContext.class, 0);
			if(t!=null) {
				type=t.getText();
			} else {
				PrimitiveTypeContext pt = ty.getRuleContext(PrimitiveTypeContext.class, 0);
				if(pt!=null)
					type=pt.getText();
			}
		}
		List<VariableDeclaratorsContext> vars = ctx.getRuleContexts(VariableDeclaratorsContext.class);
		for(VariableDeclaratorsContext vc : vars) {
			List<VariableDeclaratorContext> v = vc.getRuleContexts(VariableDeclaratorContext.class);
			if(v!=null) {
				for(VariableDeclaratorContext v2 : v) {
					VariableDeclaratorIdContext vi = v2.getRuleContext(VariableDeclaratorIdContext.class, 0);
					if(vi.getChildCount()>0) {
						//System.out.println("VAR "+vi.getChild(0).getText()+" of type "+type);
						AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.NAME, vi.getChild(0).getText());
						registry.addCandidate(c);
						if(type!=null) {
							classUtils.defineVariable(vi.getChild(0).getText(), type);
						}
					}
				}
			}
		}
	}
	
	@Override
	public void exitMethodDeclaration(MethodDeclarationContext ctx) {
	  if(ctx.getChildCount()>=3 && ctx.getChild(1) instanceof TerminalNodeImpl) {
	    String type = null;
	    TypeContext ty = ctx.getRuleContext(TypeContext.class, 0);
	    if(ty!=null) {
	      ClassOrInterfaceTypeContext t = ty.getRuleContext(ClassOrInterfaceTypeContext.class, 0);
	      if(t!=null) {
	        type=t.getText();
	      } else {
	        PrimitiveTypeContext pt = ty.getRuleContext(PrimitiveTypeContext.class, 0);
	        if(pt!=null)
	          type=pt.getText();
	      }
	    }
	    AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.NAME, ctx.getChild(1).getText());
	    registry.addCandidate(c);
	    if(type!=null) {
	      classUtils.defineVariable(ctx.getChild(1).getText(), type);
	    }
	  }
	}
}
