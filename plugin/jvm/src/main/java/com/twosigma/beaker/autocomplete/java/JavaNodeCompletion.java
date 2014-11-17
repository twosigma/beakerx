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

package com.twosigma.beaker.autocomplete.java;

import org.antlr.v4.runtime.tree.ErrorNode;
import org.antlr.v4.runtime.tree.ParseTree;

import com.twosigma.beaker.autocomplete.AutocompleteCandidate;
import com.twosigma.beaker.autocomplete.AutocompleteRegistry;
import com.twosigma.beaker.autocomplete.ClassUtils;
import com.twosigma.beaker.autocomplete.java.JavaParser.BlockStatementContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ClassBodyContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ClassBodyDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.CompilationUnitContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.CreatedNameContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ExpressionContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.MemberDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.TypeContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.TypeDeclarationContext;

public class JavaNodeCompletion extends JavaAbstractListener {
	private AutocompleteRegistry registry;
	private int cursor;
	private String text;
	private ClassUtils classUtils;
	
	public JavaNodeCompletion(String t, int c, AutocompleteRegistry r, ClassUtils cu) {
		cursor = c;
		text = t;
		registry = r;
		classUtils = cu;
	}
	
	@Override
	public void visitErrorNode(ErrorNode arg0) {
		if(arg0.getSymbol().getStartIndex() < cursor && arg0.getSymbol().getStopIndex()+1 >= cursor) {
			//System.out.println("ERR: "+arg0.getSymbol().getStartIndex()+" "+arg0.getSymbol().getStopIndex()+" "+arg0.getSymbol().getText());
			if(arg0.getParent() instanceof CompilationUnitContext) {
				CompilationUnitContext cuc = (CompilationUnitContext) arg0.getParent();
				if(cuc.getChild(0).equals(arg0)) {
					AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.INITIAL, arg0.getText());
					addQuery(c);
				} else {
					AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, arg0.getText());
					addQuery(c);
				}
				return;
			}
			else if(arg0.getParent() instanceof BlockStatementContext) {
				if(!arg0.getSymbol().getText().equals(".")) {
					AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, arg0.getText());
					addQuery(c);
					c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, arg0.getText());
					addQuery(c);
					c = new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, arg0.getText());
					addQuery(c);
					c = new AutocompleteCandidate(JavaCompletionTypes.NAME, arg0.getText());
					addQuery(c);
				} else {
					BlockStatementContext bs = (BlockStatementContext)arg0.getParent();
					if(bs.getChildCount()>1) {
						addQuery(classUtils.expandExpression(bs.getText(), registry, classUtils.DO_ALL));
					}
				}
			}
			else if(arg0.getParent() instanceof ExpressionContext) {
				// we are the rightmost child of the expression
				ParseTree chld = arg0.getParent().getChild(arg0.getParent().getChildCount()-1);
				if(!chld.equals(arg0)) return;
				addQuery(classUtils.expandExpression(arg0.getParent().getText(), registry, classUtils.DO_NON_STATIC));
			}
            else if(arg0.getParent() instanceof TypeDeclarationContext &&
                arg0.getParent().getParent()!=null &&
                arg0.getParent().getParent() instanceof CompilationUnitContext) {
              AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, arg0.getText());
              addQuery(c);
            }
            else if(arg0.getParent() instanceof MemberDeclarationContext &&
                arg0.getParent().getParent()!=null &&
                arg0.getParent().getParent() instanceof ClassBodyDeclarationContext &&
                arg0.getParent().getParent().getParent()!=null &&
                arg0.getParent().getParent().getParent() instanceof ClassBodyContext &&
                arg0.getParent().getParent().getParent().getText().trim().startsWith("<missing '{'>")) {
              AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.CLASSLEVEL, arg0.getText());
              addQuery(c);
            }
            else if(arg0.getParent() instanceof MemberDeclarationContext &&
                arg0.getParent().getParent()!=null &&
                arg0.getParent().getParent() instanceof ClassBodyDeclarationContext &&
                arg0.getParent().getParent().getParent()!=null &&
                arg0.getParent().getParent().getParent() instanceof ClassBodyContext) {
              AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, arg0.getText());
              addQuery(c);
              c = new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, arg0.getText());
              addQuery(c);
            }
		}
	}

	@Override
	public void exitMemberDeclaration(MemberDeclarationContext ctx) {
		if(ctx.getStart().getStartIndex() < cursor && ctx.getStop().getStopIndex()+1 >= cursor) {
			String txt = ctx.getText();
			if(txt.contains(" "))
				return;
			AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.MEMBERDELC, txt);
			addQuery(c);

		}		
	}

	
	@Override
	public void exitType(TypeContext ctx) {
		if(ctx.getStart().getStartIndex() < cursor && ctx.getStop().getStopIndex()+1 >= cursor) {
			//System.out.println("TYPE: "+ctx.getStart().getStartIndex()+" "+ctx.getStart().getStopIndex()+" "+ctx.getStart().getText());
			String txt = ctx.getText();
			if(txt.contains(" "))
				return;
			if(txt.contains(".")) {
				String [] txtv = txt.split("\\.");
				AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, txtv);
				addQuery(c);
			} else {
				AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, txt);
				addQuery(c);
				c = new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, txt);
				addQuery(c);
			}
		}
	}

	@Override
	public void exitExpression(ExpressionContext ctx) {
		if(ctx.getStart().getStartIndex() < cursor && ctx.getStop().getStopIndex()+1 >= cursor) {
			if(ctx.getChildCount()==1) {
				//System.out.println("EXP: "+ctx.getStart().getStartIndex()+" "+ctx.getStart().getStopIndex()+" "+ctx.getStart().getText());
				String txt = ctx.getText();
				if(txt.contains(" "))
					return;
				if(text.charAt(cursor-1)=='.') {
					// TODO (do I need it?)
				} else {
					if(txt.contains(".")) {
						String [] txtv = txt.split("\\.");
						AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, txtv);
						addQuery(c);
					} else {
						AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.NAME, txt);
						addQuery(c);
                        c = new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, txt);
                        addQuery(c);
                        if(txt.startsWith("n")) {
                          c = new AutocompleteCandidate(JavaCompletionTypes.NEW, txt);
                          addQuery(c);
                        }
					}
				}
			} else {
				//System.out.println("EXP: "+ctx.getStart().getStartIndex()+" "+ctx.getStart().getStopIndex()+" "+ctx.getText());
				addQuery(classUtils.expandExpression(ctx.getText(), registry, classUtils.DO_ALL));
			}
		}
	}

	@Override
	public void exitCreatedName(CreatedNameContext ctx) {
		if(ctx.getStart().getStartIndex() < cursor && ctx.getStop().getStopIndex()+1 >= cursor) {
			//System.out.println("CN: "+ctx.getStart().getStartIndex()+" "+ctx.getStart().getStopIndex()+" "+ctx.getStart().getText());
			String txt = ctx.getText();
			if(txt.contains(" "))
				return;
			if(text.charAt(cursor-1)=='.') {
				// TODO (do I need it?)
			} else {
				if(txt.contains(".")) {
					String [] txtv = txt.split("\\.");
					AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, txtv);
					addQuery(c);
				} else {
					AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, txt);
					addQuery(c);
				}
			}
		}
		
	}

}
