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
import com.twosigma.beakerx.autocomplete.ClassUtils;
import com.twosigma.beakerx.javash.autocomplete.JavaParser.BlockStatementContext;
import com.twosigma.beakerx.javash.autocomplete.JavaParser.ClassBodyContext;
import com.twosigma.beakerx.javash.autocomplete.JavaParser.ClassBodyDeclarationContext;
import com.twosigma.beakerx.javash.autocomplete.JavaParser.CompilationUnitContext;
import com.twosigma.beakerx.javash.autocomplete.JavaParser.CreatedNameContext;
import com.twosigma.beakerx.javash.autocomplete.JavaParser.ExpressionContext;
import com.twosigma.beakerx.javash.autocomplete.JavaParser.MemberDeclarationContext;
import com.twosigma.beakerx.javash.autocomplete.JavaParser.TypeContext;
import com.twosigma.beakerx.javash.autocomplete.JavaParser.TypeDeclarationContext;
import org.antlr.v4.runtime.ParserRuleContext;
import org.antlr.v4.runtime.tree.ErrorNode;
import org.antlr.v4.runtime.tree.ParseTree;

import java.util.List;

import static com.twosigma.beakerx.autocomplete.AutocompleteCandidate.EMPTY_NODE;

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

    if (arg0.getText().equals("new")) {
      CompilationUnitContext cuc = (CompilationUnitContext) arg0.getParent();
      List<ParseTree> children = cuc.children;
      int tokenIndex = arg0.getSymbol().getTokenIndex();
      if (tokenIndex - 2 >= 0 && tokenIndex + 1 <= children.size()) {
        ParseTree variablePT = children.get(tokenIndex - 2);
        ParseTree typePT = children.get(tokenIndex + 1);
        String type = typePT.getText();
        String variable = variablePT.getText();
        AutocompleteCandidate c1 = new AutocompleteCandidate(JavaCompletionTypes.NAME, variable);
        registry.addCandidate(c1);
        if (type != null)
          classUtils.defineVariable(variable, type);
        return;
      }
    }

    if (arg0.getSymbol().getStartIndex() < cursor && arg0.getSymbol().getStopIndex() + 1 >= cursor) {
      //System.out.println("ERR: "+arg0.getSymbol().getStartIndex()+" "+arg0.getSymbol().getStopIndex()+" "+arg0.getSymbol().getText());
      if (arg0.getParent() instanceof CompilationUnitContext) {
        CompilationUnitContext cuc = (CompilationUnitContext) arg0.getParent();
        AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.INITIAL, arg0.getText());
        addQuery(c, cursor);
        AutocompleteCandidate c2 = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, arg0.getText());
        addQuery(c2, cursor);
        completeClassFromPath(cuc, arg0.getText());
        return;
      } else if (arg0.getParent() instanceof BlockStatementContext) {
        if (!arg0.getSymbol().getText().equals(".")) {
          AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.BLOCKLEVEL, arg0.getText());
          addQuery(c, cursor);
          c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, arg0.getText());
          addQuery(c, cursor);
          c = new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, arg0.getText());
          addQuery(c, cursor);
          c = new AutocompleteCandidate(JavaCompletionTypes.NAME, arg0.getText());
          addQuery(c, cursor);
        } else {
          BlockStatementContext bs = (BlockStatementContext) arg0.getParent();
          if (bs.getChildCount() > 1) {
            addQuery(classUtils.expandExpression(bs.getText(), registry, classUtils.DO_ALL), cursor);
          }
        }
      } else if (arg0.getParent() instanceof ExpressionContext) {
        // we are the rightmost child of the expression
        ParseTree chld = arg0.getParent().getChild(arg0.getParent().getChildCount() - 1);
        if (!chld.equals(arg0)) return;
        addQuery(classUtils.expandExpression(arg0.getParent().getText(), registry, classUtils.DO_NON_STATIC), cursor);
      } else if (arg0.getParent() instanceof TypeDeclarationContext &&
              arg0.getParent().getParent() != null &&
              arg0.getParent().getParent() instanceof CompilationUnitContext) {
        AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.TOPLEVEL, arg0.getText());
        addQuery(c, cursor);
      } else if (arg0.getParent() instanceof MemberDeclarationContext &&
              arg0.getParent().getParent() != null &&
              arg0.getParent().getParent() instanceof ClassBodyDeclarationContext &&
              arg0.getParent().getParent().getParent() != null &&
              arg0.getParent().getParent().getParent() instanceof ClassBodyContext &&
              arg0.getParent().getParent().getParent().getText().trim().startsWith("<missing '{'>")) {
        AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.CLASSLEVEL, arg0.getText());
        addQuery(c, cursor);
      } else if (arg0.getParent() instanceof MemberDeclarationContext &&
              arg0.getParent().getParent() != null &&
              arg0.getParent().getParent() instanceof ClassBodyDeclarationContext &&
              arg0.getParent().getParent().getParent() != null &&
              arg0.getParent().getParent().getParent() instanceof ClassBodyContext) {
        AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, arg0.getText());
        addQuery(c, cursor);
        c = new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, arg0.getText());
        addQuery(c, cursor);
      }
    }
  }

  private void completeClassFromPath(CompilationUnitContext ctx, String text) {
    text = text.substring(text.lastIndexOf(".") + 1, text.length());
    if (!text.isEmpty()) {
      AutocompleteCandidate cName = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, text);
      addQuery(cName, AutocompleteJavaResult.getStartIndex(ctx));
    }
  }

  @Override
  public void exitMemberDeclaration(MemberDeclarationContext ctx) {
    if (ctx.getStart().getStartIndex() < cursor && ctx.getStop().getStopIndex() + 1 >= cursor) {
      String txt = ctx.getText();
      if (txt.contains(" "))
        return;
      AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.MEMBERDELC, txt);
      addQuery(c, AutocompleteJavaResult.getStartIndex(ctx));

    }
  }


  @Override
  public void exitType(TypeContext ctx) {
    if (ctx.getStart().getStartIndex() < cursor && ctx.getStop().getStopIndex() + 1 >= cursor) {
      //System.out.println("TYPE: "+ctx.getStart().getStartIndex()+" "+ctx.getStart().getStopIndex()+" "+ctx.getStart().getText());
      String txt = ctx.getText();
      if (txt.contains(" "))
        return;
      if (txt.contains(".")) {
        String[] txtv = txt.split("\\.");
        AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, txtv);
        addQuery(c, AutocompleteJavaResult.getStartIndex(ctx));
      } else {
        AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.TYPE, txt);
        addQuery(c, AutocompleteJavaResult.getStartIndex(ctx));
        c = new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, txt);
        addQuery(c, AutocompleteJavaResult.getStartIndex(ctx));
      }
    }
  }

  @Override
  public void exitExpression(ExpressionContext ctx) {
    if (ctx.getStart().getStartIndex() < cursor && ctx.getStop().getStopIndex() + 1 >= cursor) {
      if (ctx.getChildCount() == 1) {
        //System.out.println("EXP: "+ctx.getStart().getStartIndex()+" "+ctx.getStart().getStopIndex()+" "+ctx.getStart().getText());
        String txt = ctx.getText();
        if (txt.contains(" "))
          return;
        if (text.charAt(cursor - 1) == '.') {
          // TODO (do I need it?)
        } else {
          if (txt.contains(".")) {
            String[] txtv = txt.split("\\.");
            AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, txtv);
            addQuery(c, AutocompleteJavaResult.getStartIndex(ctx));
          } else {
            AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.NAME, txt);
            addQuery(c, AutocompleteJavaResult.getStartIndex(ctx));
            c = new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, txt);
            addQuery(c, AutocompleteJavaResult.getStartIndex(ctx));
            if (txt.startsWith("n")) {
              c = new AutocompleteCandidate(JavaCompletionTypes.NEW, txt);
              addQuery(c, AutocompleteJavaResult.getStartIndex(ctx));
            }
          }
        }
      } else {
        //System.out.println("EXP: "+ctx.getStart().getStartIndex()+" "+ctx.getStart().getStopIndex()+" "+ctx.getText());
        addQuery(classUtils.expandExpression(ctx.getText(), registry, classUtils.DO_ALL), AutocompleteJavaResult.getStartIndex(ctx));
      }
    }
  }

  @Override
  public void exitCreatedName(CreatedNameContext ctx) {
    if (ctx.getStart().getStartIndex() < cursor && ctx.getStop().getStopIndex() + 1 >= cursor) {
      //System.out.println("CN: "+ctx.getStart().getStartIndex()+" "+ctx.getStart().getStopIndex()+" "+ctx.getStart().getText());
      String txt = ctx.getText();
      if (txt.contains(" "))
        return;
      if (text.charAt(cursor - 1) == '.') {
        // TODO (do I need it?)
      } else {
        if (txt.contains(".")) {
          String[] txtv = txt.split("\\.");
          AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, txtv);
          addQuery(c, AutocompleteJavaResult.getStartIndex(ctx));
        } else {
          AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.CUSTOM_TYPE, txt);
          addQuery(c, AutocompleteJavaResult.getStartIndex(ctx));
        }
      }
    }

  }

  @Override
  public void exitCompilationUnit(CompilationUnitContext ctx) {
    if (ctx.getStop() != null && ctx.getStop().getStopIndex() + 1 == cursor) {
      String t = ctx.getText();
      addQuery(classUtils.expandExpression(t, registry, classUtils.DO_ALL), calculateStartIndex(t, ctx));
      String[] txtv = splitByDot(t);
      AutocompleteCandidate c2 = new AutocompleteCandidate(JavaCompletionTypes.FQ_TYPE, txtv);
      addQuery(c2, calculateStartIndex(t, ctx));
    }

  }

  private String[] splitByDot(String t) {
    String[] txtv;
    if (t.endsWith(".")) {
      txtv = (t + "X").split("\\.");
      txtv[txtv.length - 1] = EMPTY_NODE;
    } else {
      txtv = (t).split("\\.");
    }
    return txtv;
  }

  private int calculateStartIndex(String t, ParserRuleContext ctx) {
    return AutocompleteJavaResult.getStartIndex(ctx) + (t.endsWith(".") ? 1 : 0);
  }
}
