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
import com.twosigma.beakerx.groovy.autocomplete.GroovyParser.ClassNameExpressionContext;
import com.twosigma.beakerx.groovy.autocomplete.GroovyParser.CommandExpressionStatementContext;
import com.twosigma.beakerx.groovy.autocomplete.GroovyParser.CompilationUnitContext;
import com.twosigma.beakerx.groovy.autocomplete.GroovyParser.PathExpressionContext;
import com.twosigma.beakerx.groovy.autocomplete.GroovyParser.StatementContext;
import org.antlr.v4.runtime.RuleContext;
import org.antlr.v4.runtime.tree.ErrorNode;
import org.antlr.v4.runtime.tree.ParseTree;

public class GroovyNodeCompletion extends GroovyAbstractListener {
  private AutocompleteRegistry registry;
  private int cursor;
  @SuppressWarnings("unused")
  private String text;
  private ClassUtils classUtils;

  public GroovyNodeCompletion(String t, int c, AutocompleteRegistry r, ClassUtils cu) {
    cursor = c;
    text = t;
    registry = r;
    classUtils = cu;
  }

  @Override
  public void exitClassNameExpression(ClassNameExpressionContext ctx) {
//    if(ctx.getStart().getStartIndex() < cursor && ctx.getStop().getStopIndex()+1 >= cursor) {
//      if(ctx.getText().contains(".")) {
//        addQuery(classUtils.expandExpression(ctx.getText(), registry, classUtils.DO_STATIC), AutocompleteGroovyResult.getStartIndex(ctx));
//        // complete with standard groovy extension functions
//        AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.STDFUNCS, ctx.getText().substring(ctx.getText().lastIndexOf(".")+1));
//        addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx));
//      } else {
//        AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.NAME, ctx.getText());
//        addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx));
//        c = new AutocompleteCandidate(GroovyCompletionTypes.CUSTOM_TYPE, ctx.getText());
//        addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx));
//      }
//    }
  }

  @Override
  public void exitPathExpression(PathExpressionContext ctx) {
    if (ctx.getStart().getStartIndex() < cursor && ctx.getStop().getStopIndex() + 1 >= cursor) {
//        // is this the start of a compilation unit?
//        // it might be package
        if(ctx.getParent().getParent()!=null &&  ctx.getParent().getParent() instanceof StatementContext && ctx.getParent().getParent().getChildCount()==1 &&
            ctx.getParent().getParent().getParent()!=null &&  ctx.getParent().getParent().getParent() instanceof CompilationUnitContext &&
            ctx.getParent().getParent().getParent().getChild(0).equals(ctx.getParent().getParent())) {
          AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.INITIAL, ctx.getText());
          addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx));
        }
////
//        // is this leftmost part of an statement?
//        // it might be import
      if (ctx.getParent().getChild(0).equals(ctx) &&
              ctx.getParent().getParent() != null && ctx.getParent().getParent() instanceof StatementContext &&
              ctx.getParent().getParent().getChild(0).equals(ctx.getParent())) {
        AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, ctx.getText());
        addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx));
      }

//        // check out for implements and/or extends
//        CommandExpressionStatementContext st = (CommandExpressionStatementContext) findParentNode(ctx,CommandExpressionStatementContext.class);
//        if(st!=null && st.getParent()!=null) {
//          ParseTree left = findLeftSibling(st);
//          if(left!=null && left.getText().trim().equals("class")) {
//            AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.CLASSLEVEL, ctx.getText());
//            addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx));
//          }
//        }
////
//        // try to expand this as a path expression
      if (ctx.getText().contains(".")) {
//          addQuery(classUtils.expandExpression(ctx.getText(), registry, classUtils.DO_NON_STATIC), AutocompleteGroovyResult.getStartIndex(ctx));
//          // complete with standard groovy extension functions
//          AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.STDFUNCS, ctx.getText().substring(ctx.getText().lastIndexOf(".")+1));
//          addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx));
        addQuery(classUtils.expandExpression(ctx.getText(), registry, classUtils.DO_ALL), AutocompleteGroovyResult.getStartIndex(ctx));
      } else {
        AutocompleteCandidate c;//= new AutocompleteCandidate(GroovyCompletionTypes.NAME, ctx.getText());
//          addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx));
        c = new AutocompleteCandidate(GroovyCompletionTypes.CUSTOM_TYPE, ctx.getText());
        addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx));
      }
    }
  }


  @Override
  public void visitErrorNode(ErrorNode arg0) {
//    if(arg0.getSymbol().getStartIndex() < cursor && arg0.getSymbol().getStopIndex()+1 >= cursor) {
//      //System.out.println("ERR: "+arg0.getSymbol().getStartIndex()+" "+arg0.getSymbol().getStopIndex()+" "+arg0.getSymbol().getText());
//      ParseTree cuc = arg0.getParent();
//      if(cuc.getChild(0).equals(arg0)) {
//        AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.INITIAL, arg0.getText());
//        addQuery(c, 0);
//      } else {
//        AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, arg0.getText());
//        addQuery(c, 0);
//      }
//      if(cuc instanceof StatementContext && ((StatementContext) cuc).getStop().getStopIndex()+1 == cursor) {
//        if(cuc.getText().contains(".")) {
//          addQuery(classUtils.expandExpression(cuc.getText(), registry, classUtils.DO_ALL), 0);
//          // complete with standard groovy extension functions
//          AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.STDFUNCS, cuc.getText().substring(cuc.getText().lastIndexOf(".")+1));
//          addQuery(c,0);
//        } else {
//          AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.NAME, cuc.getText());
//          addQuery(c,0);
//          c = new AutocompleteCandidate(GroovyCompletionTypes.CUSTOM_TYPE, cuc.getText());
//          addQuery(c,0);
//        }
//      }
//    }
  }


  private RuleContext findParentNode(RuleContext ctx, Class<?> classtype) {
    RuleContext p = ctx.getParent();
    while (p != null) {
      if (p.getClass().equals(classtype)) {
        return p;
      }
      p = p.getParent();
    }
    return null;
  }

  private ParseTree findLeftSibling(RuleContext ctx) {
    RuleContext p = ctx.getParent();
    if (p != null) {
      for (int i = 0; i < p.getChildCount(); i++) {
        if (p.getChild(i).equals(ctx)) {
          if (i > 0)
            return p.getChild(i - 1);
          break;
        }
      }
    }
    return null;
  }


  @Override
  public void exitCompilationUnit(CompilationUnitContext ctx) {
    if (ctx.getStop().getStopIndex() + 1 == cursor) {
      if (ctx.getChildCount() > 0) {
        String t = ctx.getChild(ctx.getChildCount() - 2).getText();
        if (t.endsWith("\n")) {
          String txt = ctx.getChild(ctx.getChildCount() - 1).getText();
          if (txt.contains(".")) {
//            addQuery(classUtils.expandExpression(txt, registry, classUtils.DO_ALL), AutocompleteGroovyResult.getStartIndex(ctx));
          } else {
//            AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.TOPLEVEL, txt);
//            addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx));
//            c = new AutocompleteCandidate(GroovyCompletionTypes.NAME, txt);
//            addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx));
          }
        } else {
          for (int i = ctx.getChildCount() - 1; i >= 0; i--) {
            if (!ctx.getChild(i).getText().isEmpty() && !ctx.getChild(i).getText().equals("<EOF>")) {
              String txt = ctx.getChild(i).getText();
              if (txt.contains(".")) {
//              addQuery(classUtils.expandExpression(txt, registry, classUtils.DO_ALL), AutocompleteGroovyResult.getStartIndex(ctx));
              } else {
                AutocompleteCandidate c = new AutocompleteCandidate(GroovyCompletionTypes.NAME, txt);
                addQuery(c, AutocompleteGroovyResult.getStartIndex(ctx));
              }
              break;
            }
          }
        }
      }
    }
  }
}
