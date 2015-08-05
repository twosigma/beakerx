/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.cpp.utils;

import java.util.List;
import java.util.ArrayList;

import com.twosigma.beaker.cpp.autocomplete.CPP14Parser;
import com.twosigma.beaker.cpp.autocomplete.CPP14BaseListener;
import org.antlr.v4.runtime.tree.ParseTree;
import org.antlr.v4.runtime.ParserRuleContext;
import org.antlr.v4.runtime.misc.Interval;

public class Extractor extends CPP14BaseListener {
  public int beakerMainLastToken;
  public String returnType = "none";
  // Top level function declarations are at depth 4 in the AST
  // generated with the CPP14 grammar.
  private final int topFuncDepth = 4;

  private static String buildType(String declarator, String type) {
    StringBuilder builder = new StringBuilder(type);
    int i = 0;
    while ((i < declarator.length()) && (declarator.charAt(i) == '*')){
      builder.append('*');
      ++i;
    }
    return builder.toString();
  }

  private static boolean isSupported(String type) {
    // Validate primitives
    switch(type){
      case "int":
      case "double":
      case "float":
      case "bool":
      case "std::string":
      case "char*":
      case "void":
        return true;
      default:
        break;
    }
    // Validate containers
    int leftBrack = type.indexOf('<');
    int rightBrack = type.lastIndexOf('>');
    if ((leftBrack < 0) || (rightBrack < 0)) {
      return false;
    }
    String container = type.substring(0, leftBrack);
    String content = type.substring(leftBrack + 1, rightBrack);
    // Split contents into units
    ArrayList<String> contents = new ArrayList<String>();
    int bracketDepth = 0;
    int comma = -1;
    int i = 0;
    while (i < content.length()){
      switch (content.charAt(i)){
        case '<':
          bracketDepth++;
          break;
        case '>':
          bracketDepth--;
          break;
        case ',':
          if (bracketDepth == 0){
            String substr = content.substring(comma + 1, i);
            // System.out.println("Split off and got " + substr);
            contents.add(substr);
            comma = i;
          }
          break;
        default:
          break;
      }
      i++;
    }
    contents.add(content.substring(comma + 1, i));

    // System.out.println("Container is: " + container);
    // for (String s : contents) {
    //   System.out.println("It contains: " + s);
    // }
    // Support containers with 
    switch(container){
      case "std::vector":
      case "std::map":
        for (String contained : contents){
          if (!isSupported(contained)){
            return false;
          }
        }
        return true;
      default:
        break;
    }

    return false;
  }

  @Override public void exitFunctiondefinition(CPP14Parser.FunctiondefinitionContext ctx) {
    int depth = ctx.depth();
    CPP14Parser.DeclaratorContext decl = ctx.declarator();
    String declText = decl.getText();
    if((depth == topFuncDepth) && (decl != null) && (declText.contains("beaker_main"))) {
      ParserRuleContext declSpecSeq = ctx.declspecifierseq();
      CPP14Parser.ParameterdeclarationlistContext paramsList = 
        decl.ptrdeclarator().noptrdeclarator().parametersandqualifiers().parameterdeclarationclause()
            .parameterdeclarationlist();
      String type = "void";
      if (paramsList != null){
        type = paramsList.parameterdeclaration().declspecifierseq().getText();
      }

      ParserRuleContext params = decl.parametersandqualifiers();
      ParserRuleContext virtSpecSeq = ctx.virtspecifierseq();
      ParserRuleContext attrSpecSeq = ctx.attributespecifierseq();
      if ((paramsList != null) && (paramsList.parameterdeclarationlist() != null)) {
        System.out.println("The beaker_main function must have zero or one paramters.");
        return;
      } else if (attrSpecSeq != null) {
        System.out.println("The beaker_main function must not have attributes.");
        return;
      } else if (virtSpecSeq != null) {
        System.out.println("The beaker_main function cannot be virtual.");
        return;
      }

      if(declSpecSeq != null) {
        beakerMainLastToken = ctx.getSourceInterval().b;
        if (isSupported(type)){
          returnType = type;
        } else {
          System.out.println("Beaker cannot recognize the return type of your cell.");
        }
      }
    }
    return;
  }
}