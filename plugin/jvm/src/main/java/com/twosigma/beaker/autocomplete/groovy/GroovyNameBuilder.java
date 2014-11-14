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

import com.twosigma.beaker.autocomplete.AutocompleteCandidate;
import com.twosigma.beaker.autocomplete.AutocompleteRegistry;
import com.twosigma.beaker.autocomplete.ClassUtils;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.AssignmentExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.DeclarationRuleContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.PathExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.TypeDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaCompletionTypes;

public class GroovyNameBuilder extends GroovyAbstractListener{
  private AutocompleteRegistry registry;
  private ClassUtils classUtils;
  
  public GroovyNameBuilder(AutocompleteRegistry r, ClassUtils cu) {
      registry = r;
      classUtils = cu;
  }
  
  @Override
  public void exitDeclarationRule(DeclarationRuleContext ctx) {
    if(ctx.getChildCount()==4 &&
        ctx.getChild(0) instanceof TypeDeclarationContext &&
        ctx.getChild(3) instanceof ExpressionContext &&
        ctx.getChild(3).getChildCount()>0) {
      if(!ctx.getChild(1).getText().contains(".")) {
        if(ctx.getChild(3).getChild(0) instanceof PathExpressionContext) {
          String typpen = ctx.getChild(3).getChild(0).getText().trim();
          AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.NAME, ctx.getChild(1).getText());
          registry.addCandidate(c);
          //System.out.println("define variable of type "+ctx.getChild(1).getText()+" "+typpen);
          if(classUtils.getVariableType(typpen)!=null) {
              classUtils.defineVariable(ctx.getChild(1).getText(), classUtils.getVariableType(typpen));
          }
        } else {
          //System.out.println(((ExpressionContext)ctx.getChild(3)).getStart().getType());
          
          String typpen = null;
          switch(((ExpressionContext)ctx.getChild(3)).getStart().getType()) {
          case GroovyLexer.STRING: typpen="String"; break;
          case GroovyLexer.INTEGER: typpen="Integer"; break;
          case GroovyLexer.DECIMAL: typpen="Double"; break;
          }
          AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.NAME, ctx.getChild(1).getText());
          registry.addCandidate(c);
          //System.out.println("define variable of type "+ctx.getChild(1).getText()+" "+typpen);
          if(typpen!=null)
            classUtils.defineVariable(ctx.getChild(1).getText(), typpen);
        }
      }
    }
  }

  @Override
  public void exitAssignmentExpression(AssignmentExpressionContext ctx) {
    if(ctx.getChildCount()==3 &&
        ctx.getChild(1).getText().equals("=") &&
        !ctx.getChild(0).getText().contains(".")) {
      
      if(ctx.getChild(2).getChild(0) instanceof PathExpressionContext) {
        String typpen = ctx.getChild(2).getChild(0).getText().trim();
        AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.NAME, ctx.getChild(0).getText());
        registry.addCandidate(c);
        //System.out.println("define variable of type "+ctx.getChild(0).getText()+" "+typpen);
        if(classUtils.getVariableType(typpen)!=null) {
            classUtils.defineVariable(ctx.getChild(0).getText(), classUtils.getVariableType(typpen));
        }
      } else {
        //System.out.println(((ExpressionContext)ctx.getChild(2)).getStart().getType());
        
        String typpen = null;
        switch(((ExpressionContext)ctx.getChild(2)).getStart().getType()) {
        case GroovyLexer.STRING: typpen="String"; break;
        case GroovyLexer.INTEGER: typpen="Integer"; break;
        case GroovyLexer.DECIMAL: typpen="Double"; break;
        }
        AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.NAME, ctx.getChild(0).getText());
        registry.addCandidate(c);
        //System.out.println("define variable of type "+ctx.getChild(0).getText()+" "+typpen);
        if(typpen!=null)
          classUtils.defineVariable(ctx.getChild(0).getText(), typpen);
      }
      
    }

  }
  
}
