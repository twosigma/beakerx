package com.twosigma.beaker.cpp.utils;

import java.util.List;

import com.twosigma.beaker.cpp.autocomplete.CPP14Parser;
import com.twosigma.beaker.cpp.autocomplete.CPP14BaseListener;
import org.antlr.v4.runtime.tree.ParseTree;
import org.antlr.v4.runtime.ParserRuleContext;
import org.antlr.v4.runtime.misc.Interval;

public class Extractor extends CPP14BaseListener {
  public int beakerMainStart;
  public String returnType = "none";
  // Top level function declarations are at depth 4 in the AST
  // generated with the CPP14 grammar.
  private final int topFuncDepth = 4;

  @Override public void exitFunctiondefinition(CPP14Parser.FunctiondefinitionContext ctx) {
    int depth = ctx.depth();
    CPP14Parser.DeclaratorContext decl = ctx.declarator();
    if((depth == topFuncDepth) && (decl != null) && (decl.getText().equals("beaker_main()"))) {
      ParserRuleContext virtSpecSeq = ctx.virtspecifierseq();
      ParserRuleContext declSpecSeq = ctx.declspecifierseq();
      ParserRuleContext attrSpecSeq = ctx.attributespecifierseq();

      ParserRuleContext params = decl.parametersandqualifiers();

      if (params != null) {
        System.out.println("The beaker_main function must not have parameters.");
        return;
      } else if (attrSpecSeq != null) {
        System.out.println("The beaker_main function must not have attributes.");
        return;
      } else if (virtSpecSeq != null) {
        System.out.println("The beaker_main function cannot be virtual.");
        return;
      }

      if(declSpecSeq != null) {
        beakerMainStart = ctx.getSourceInterval().a;
        String type = declSpecSeq.getText();
        switch(type) {
          case "int":
          case "double":
          case "float":
          case "bool":
          case "std::string":
            if (!returnType.equals("none")){
              System.out.println("There can only be one definition of beaker_main."); 
              returnType = "none";
              return;
            }
            returnType = type;
            break;
          default:
            System.out.println("Beaker cannot recognize the return type of your cell.");
            returnType = "none";
            break;
        }
      }
    }
    return;
  }
}