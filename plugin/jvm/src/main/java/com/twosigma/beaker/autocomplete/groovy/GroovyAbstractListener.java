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

import org.antlr.v4.runtime.ParserRuleContext;
import org.antlr.v4.runtime.tree.ErrorNode;
import org.antlr.v4.runtime.tree.TerminalNode;

import com.twosigma.beaker.autocomplete.AutocompleteCandidate;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.AnnotationClauseContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.AnnotationElementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.AnnotationElementPairContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.AnnotationParamArrayExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.AnnotationParamBoolExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.AnnotationParamClassExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.AnnotationParamDecimalExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.AnnotationParamIntegerExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.AnnotationParamNullExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.AnnotationParamPathExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.AnnotationParamStringExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ArgumentDeclarationContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ArgumentDeclarationListContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ArgumentListContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.AssignmentExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.BinaryExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.BlockStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.BoolExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.CallExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.CaseStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.CatchBlockContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ClassBodyContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ClassDeclarationContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ClassInitializerContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ClassMemberContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ClassModifierContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ClassNameExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ClassicForStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ClosureExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ClosureExpressionRuleContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.CmdExpressionRuleContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.CommandExpressionStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.CompilationUnitContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ConstantDecimalExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ConstantExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ConstantIntegerExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ConstructorDeclarationContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ControlStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.DeclarationExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.DeclarationRuleContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.DeclarationStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.EnumDeclarationContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.EnumMemberContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ExpressionStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ExtendsClauseContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.FieldAccessExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.FieldDeclarationContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.FinallyBlockContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ForColonStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ForInStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.GenericClassNameExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.GenericDeclarationListContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.GenericListContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.GenericsConcreteElementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.GenericsDeclarationElementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.GenericsWildcardElementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.GstringContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.GstringExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.GstringPathExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.IfStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ImplementsClauseContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ImportStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ListConstructorContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.MapConstructorContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.MapEntryContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.MemberModifierContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.MethodBodyContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.MethodCallExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.MethodDeclarationContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.NewArrayExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.NewArrayRuleContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.NewArrayStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.NewInstanceExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.NewInstanceRuleContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.NewInstanceStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.NullExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ObjectInitializerContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.PackageDefinitionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ParenthesisExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.PathExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.PostfixExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.PrefixExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ReturnStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.StatementBlockContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.SwitchStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ThrowStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.ThrowsClauseContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.TryBlockContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.TryCatchFinallyStatementContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.TypeDeclarationContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.UnaryExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.VariableExpressionContext;
import com.twosigma.beaker.autocomplete.groovy.GroovyParser.WhileStatementContext;

public class GroovyAbstractListener implements GroovyParserListener {
  protected List<AutocompleteCandidate> query;
  
  protected void addQuery(AutocompleteCandidate c) {
      if(c==null)
          return;
      if (query==null)
          query = new ArrayList<AutocompleteCandidate>();
      query.add(c);
  }
  
  public List<AutocompleteCandidate> getQuery() { return query; }

  @Override
  public void enterEveryRule(ParserRuleContext arg0) {

    
  }

  @Override
  public void exitEveryRule(ParserRuleContext arg0) {
    
    
  }

  @Override
  public void visitErrorNode(ErrorNode arg0) {
    
    
  }

  @Override
  public void visitTerminal(TerminalNode arg0) {
    
    
  }

  @Override
  public void enterNewArrayRule(NewArrayRuleContext ctx) {
    
    
  }

  @Override
  public void exitNewArrayRule(NewArrayRuleContext ctx) {
    
    
  }

  @Override
  public void enterEnumMember(EnumMemberContext ctx) {
    
    
  }

  @Override
  public void exitEnumMember(EnumMemberContext ctx) {
    
    
  }

  @Override
  public void enterNewArrayStatement(NewArrayStatementContext ctx) {
    
    
  }

  @Override
  public void exitNewArrayStatement(NewArrayStatementContext ctx) {
    
    
  }

  @Override
  public void enterGstringExpression(GstringExpressionContext ctx) {
    
    
  }

  @Override
  public void exitGstringExpression(GstringExpressionContext ctx) {
    
    
  }

  @Override
  public void enterAnnotationElementPair(AnnotationElementPairContext ctx) {
    
    
  }

  @Override
  public void exitAnnotationElementPair(AnnotationElementPairContext ctx) {
    
    
  }

  @Override
  public void enterAnnotationParamArrayExpression(
      AnnotationParamArrayExpressionContext ctx) {
    
    
  }

  @Override
  public void exitAnnotationParamArrayExpression(
      AnnotationParamArrayExpressionContext ctx) {
    
    
  }

  @Override
  public void enterConstantDecimalExpression(
      ConstantDecimalExpressionContext ctx) {
    
    
  }

  @Override
  public void exitConstantDecimalExpression(ConstantDecimalExpressionContext ctx) {
    
    
  }

  @Override
  public void enterAnnotationParamPathExpression(
      AnnotationParamPathExpressionContext ctx) {
    
    
  }

  @Override
  public void exitAnnotationParamPathExpression(
      AnnotationParamPathExpressionContext ctx) {
    
    
  }

  @Override
  public void enterVariableExpression(VariableExpressionContext ctx) {
    
    
  }

  @Override
  public void exitVariableExpression(VariableExpressionContext ctx) {
    
    
  }

  @Override
  public void enterGenericsConcreteElement(GenericsConcreteElementContext ctx) {
    
    
  }

  @Override
  public void exitGenericsConcreteElement(GenericsConcreteElementContext ctx) {
    
    
  }

  @Override
  public void enterArgumentList(ArgumentListContext ctx) {
    
    
  }

  @Override
  public void exitArgumentList(ArgumentListContext ctx) {
    
    
  }

  @Override
  public void enterGenericList(GenericListContext ctx) {
    
    
  }

  @Override
  public void exitGenericList(GenericListContext ctx) {
    
    
  }

  @Override
  public void enterFieldAccessExpression(FieldAccessExpressionContext ctx) {
    
    
  }

  @Override
  public void exitFieldAccessExpression(FieldAccessExpressionContext ctx) {
    
    
  }

  @Override
  public void enterNullExpression(NullExpressionContext ctx) {
    
    
  }

  @Override
  public void exitNullExpression(NullExpressionContext ctx) {
    
    
  }

  @Override
  public void enterTryCatchFinallyStatement(TryCatchFinallyStatementContext ctx) {
    
    
  }

  @Override
  public void exitTryCatchFinallyStatement(TryCatchFinallyStatementContext ctx) {
    
    
  }

  @Override
  public void enterAnnotationParamBoolExpression(
      AnnotationParamBoolExpressionContext ctx) {
    
    
  }

  @Override
  public void exitAnnotationParamBoolExpression(
      AnnotationParamBoolExpressionContext ctx) {
    
    
  }

  @Override
  public void enterExpressionStatement(ExpressionStatementContext ctx) {
    
    
  }

  @Override
  public void exitExpressionStatement(ExpressionStatementContext ctx) {
    
    
  }

  @Override
  public void enterNewArrayExpression(NewArrayExpressionContext ctx) {
    
    
  }

  @Override
  public void exitNewArrayExpression(NewArrayExpressionContext ctx) {
    
    
  }

  @Override
  public void enterUnaryExpression(UnaryExpressionContext ctx) {
    
    
  }

  @Override
  public void exitUnaryExpression(UnaryExpressionContext ctx) {
    
    
  }

  @Override
  public void enterGenericsWildcardElement(GenericsWildcardElementContext ctx) {
    
    
  }

  @Override
  public void exitGenericsWildcardElement(GenericsWildcardElementContext ctx) {
    
    
  }

  @Override
  public void enterConstantIntegerExpression(
      ConstantIntegerExpressionContext ctx) {
    
    
  }

  @Override
  public void exitConstantIntegerExpression(ConstantIntegerExpressionContext ctx) {
    
    
  }

  @Override
  public void enterCatchBlock(CatchBlockContext ctx) {
    
    
  }

  @Override
  public void exitCatchBlock(CatchBlockContext ctx) {
    
    
  }

  @Override
  public void enterAnnotationParamStringExpression(
      AnnotationParamStringExpressionContext ctx) {
    
    
  }

  @Override
  public void exitAnnotationParamStringExpression(
      AnnotationParamStringExpressionContext ctx) {
    
    
  }

  @Override
  public void enterClassMember(ClassMemberContext ctx) {
    
    
  }

  @Override
  public void exitClassMember(ClassMemberContext ctx) {
    
    
  }

  @Override
  public void enterBoolExpression(BoolExpressionContext ctx) {
    
    
  }

  @Override
  public void exitBoolExpression(BoolExpressionContext ctx) {
    
    
  }

  @Override
  public void enterDeclarationRule(DeclarationRuleContext ctx) {
    
    
  }

  @Override
  public void exitDeclarationRule(DeclarationRuleContext ctx) {
    
    
  }

  @Override
  public void enterForColonStatement(ForColonStatementContext ctx) {
    
    
  }

  @Override
  public void exitForColonStatement(ForColonStatementContext ctx) {
    
    
  }

  @Override
  public void enterParenthesisExpression(ParenthesisExpressionContext ctx) {
    
    
  }

  @Override
  public void exitParenthesisExpression(ParenthesisExpressionContext ctx) {
    
    
  }

  @Override
  public void enterAssignmentExpression(AssignmentExpressionContext ctx) {
    
    
  }

  @Override
  public void exitAssignmentExpression(AssignmentExpressionContext ctx) {
    
    
  }

  @Override
  public void enterAnnotationParamIntegerExpression(
      AnnotationParamIntegerExpressionContext ctx) {
    
    
  }

  @Override
  public void exitAnnotationParamIntegerExpression(
      AnnotationParamIntegerExpressionContext ctx) {
    
    
  }

  @Override
  public void enterNewInstanceExpression(NewInstanceExpressionContext ctx) {
    
    
  }

  @Override
  public void exitNewInstanceExpression(NewInstanceExpressionContext ctx) {
    
    
  }

  @Override
  public void enterCommandExpressionStatement(
      CommandExpressionStatementContext ctx) {
    
    
  }

  @Override
  public void exitCommandExpressionStatement(
      CommandExpressionStatementContext ctx) {
    
    
  }

  @Override
  public void enterDeclarationStatement(DeclarationStatementContext ctx) {
    
    
  }

  @Override
  public void exitDeclarationStatement(DeclarationStatementContext ctx) {
    
    
  }

  @Override
  public void enterBinaryExpression(BinaryExpressionContext ctx) {
    
    
  }

  @Override
  public void exitBinaryExpression(BinaryExpressionContext ctx) {
    
    
  }

  @Override
  public void enterCompilationUnit(CompilationUnitContext ctx) {
    
    
  }

  @Override
  public void exitCompilationUnit(CompilationUnitContext ctx) {
    
    
  }

  @Override
  public void enterControlStatement(ControlStatementContext ctx) {
    
    
  }

  @Override
  public void exitControlStatement(ControlStatementContext ctx) {
    
    
  }

  @Override
  public void enterCallExpression(CallExpressionContext ctx) {
    
    
  }

  @Override
  public void exitCallExpression(CallExpressionContext ctx) {
    
    
  }

  @Override
  public void enterClosureExpression(ClosureExpressionContext ctx) {
    
    
  }

  @Override
  public void exitClosureExpression(ClosureExpressionContext ctx) {
    
    
  }

  @Override
  public void enterExtendsClause(ExtendsClauseContext ctx) {
    
    
  }

  @Override
  public void exitExtendsClause(ExtendsClauseContext ctx) {
    
    
  }

  @Override
  public void enterAnnotationElement(AnnotationElementContext ctx) {
    
    
  }

  @Override
  public void exitAnnotationElement(AnnotationElementContext ctx) {
    
    
  }

  @Override
  public void enterCmdExpressionRule(CmdExpressionRuleContext ctx) {
    
    
  }

  @Override
  public void exitCmdExpressionRule(CmdExpressionRuleContext ctx) {
    
    
  }

  @Override
  public void enterArgumentDeclaration(ArgumentDeclarationContext ctx) {
    
    
  }

  @Override
  public void exitArgumentDeclaration(ArgumentDeclarationContext ctx) {
    
    
  }

  @Override
  public void enterMethodDeclaration(MethodDeclarationContext ctx) {
    
    
  }

  @Override
  public void exitMethodDeclaration(MethodDeclarationContext ctx) {
    
    
  }

  @Override
  public void enterMethodBody(MethodBodyContext ctx) {
    
    
  }

  @Override
  public void exitMethodBody(MethodBodyContext ctx) {
    
    
  }

  @Override
  public void enterClassModifier(ClassModifierContext ctx) {
    
    
  }

  @Override
  public void exitClassModifier(ClassModifierContext ctx) {
    
    
  }

  @Override
  public void enterImportStatement(ImportStatementContext ctx) {
    
    
  }

  @Override
  public void exitImportStatement(ImportStatementContext ctx) {
    
    
  }

  @Override
  public void enterCaseStatement(CaseStatementContext ctx) {
    
    
  }

  @Override
  public void exitCaseStatement(CaseStatementContext ctx) {
    
    
  }

  @Override
  public void enterGstringPathExpression(GstringPathExpressionContext ctx) {
    
    
  }

  @Override
  public void exitGstringPathExpression(GstringPathExpressionContext ctx) {
    
    
  }

  @Override
  public void enterStatementBlock(StatementBlockContext ctx) {
    
    
  }

  @Override
  public void exitStatementBlock(StatementBlockContext ctx) {
    
    
  }

  @Override
  public void enterThrowsClause(ThrowsClauseContext ctx) {
    
    
  }

  @Override
  public void exitThrowsClause(ThrowsClauseContext ctx) {
    
    
  }

  @Override
  public void enterMethodCallExpression(MethodCallExpressionContext ctx) {
    
    
  }

  @Override
  public void exitMethodCallExpression(MethodCallExpressionContext ctx) {
    
    
  }

  @Override
  public void enterTypeDeclaration(TypeDeclarationContext ctx) {
    
    
  }

  @Override
  public void exitTypeDeclaration(TypeDeclarationContext ctx) {
    
    
  }

  @Override
  public void enterReturnStatement(ReturnStatementContext ctx) {
    
    
  }

  @Override
  public void exitReturnStatement(ReturnStatementContext ctx) {
    
    
  }

  @Override
  public void enterFinallyBlock(FinallyBlockContext ctx) {
    
    
  }

  @Override
  public void exitFinallyBlock(FinallyBlockContext ctx) {
    
    
  }

  @Override
  public void enterSwitchStatement(SwitchStatementContext ctx) {
    
    
  }

  @Override
  public void exitSwitchStatement(SwitchStatementContext ctx) {
    
    
  }

  @Override
  public void enterMapEntry(MapEntryContext ctx) {
    
    
  }

  @Override
  public void exitMapEntry(MapEntryContext ctx) {
    
    
  }

  @Override
  public void enterClassDeclaration(ClassDeclarationContext ctx) {
    
    
  }

  @Override
  public void exitClassDeclaration(ClassDeclarationContext ctx) {
    
    
  }

  @Override
  public void enterTryBlock(TryBlockContext ctx) {
    
    
  }

  @Override
  public void exitTryBlock(TryBlockContext ctx) {
    
    
  }

  @Override
  public void enterGstring(GstringContext ctx) {
    
    
  }

  @Override
  public void exitGstring(GstringContext ctx) {
    
    
  }

  @Override
  public void enterAnnotationClause(AnnotationClauseContext ctx) {
    
    
  }

  @Override
  public void exitAnnotationClause(AnnotationClauseContext ctx) {
    
    
  }

  @Override
  public void enterPrefixExpression(PrefixExpressionContext ctx) {
    
    
  }

  @Override
  public void exitPrefixExpression(PrefixExpressionContext ctx) {
    
    
  }

  @Override
  public void enterGenericClassNameExpression(
      GenericClassNameExpressionContext ctx) {
    
    
  }

  @Override
  public void exitGenericClassNameExpression(
      GenericClassNameExpressionContext ctx) {
    
    
  }

  @Override
  public void enterNewInstanceStatement(NewInstanceStatementContext ctx) {
    
    
  }

  @Override
  public void exitNewInstanceStatement(NewInstanceStatementContext ctx) {
    
    
  }

  @Override
  public void enterObjectInitializer(ObjectInitializerContext ctx) {
    
    
  }

  @Override
  public void exitObjectInitializer(ObjectInitializerContext ctx) {
    
    
  }

  @Override
  public void enterGenericDeclarationList(GenericDeclarationListContext ctx) {
    
    
  }

  @Override
  public void exitGenericDeclarationList(GenericDeclarationListContext ctx) {
    
    
  }

  @Override
  public void enterClassBody(ClassBodyContext ctx) {
    
    
  }

  @Override
  public void exitClassBody(ClassBodyContext ctx) {
    
    
  }

  @Override
  public void enterClassNameExpression(ClassNameExpressionContext ctx) {
    
    
  }

  @Override
  public void exitClassNameExpression(ClassNameExpressionContext ctx) {
    
    
  }

  @Override
  public void enterEnumDeclaration(EnumDeclarationContext ctx) {
    
    
  }

  @Override
  public void exitEnumDeclaration(EnumDeclarationContext ctx) {
    
    
  }

  @Override
  public void enterPostfixExpression(PostfixExpressionContext ctx) {
    
    
  }

  @Override
  public void exitPostfixExpression(PostfixExpressionContext ctx) {
    
    
  }

  @Override
  public void enterPackageDefinition(PackageDefinitionContext ctx) {
    
    
  }

  @Override
  public void exitPackageDefinition(PackageDefinitionContext ctx) {
    
    
  }

  @Override
  public void enterGenericsDeclarationElement(
      GenericsDeclarationElementContext ctx) {
    
    
  }

  @Override
  public void exitGenericsDeclarationElement(
      GenericsDeclarationElementContext ctx) {
    
    
  }

  @Override
  public void enterDeclarationExpression(DeclarationExpressionContext ctx) {
    
    
  }

  @Override
  public void exitDeclarationExpression(DeclarationExpressionContext ctx) {
    
    
  }

  @Override
  public void enterBlockStatement(BlockStatementContext ctx) {
    
    
  }

  @Override
  public void exitBlockStatement(BlockStatementContext ctx) {
    
    
  }

  @Override
  public void enterClosureExpressionRule(ClosureExpressionRuleContext ctx) {
    
    
  }

  @Override
  public void exitClosureExpressionRule(ClosureExpressionRuleContext ctx) {
    
    
  }

  @Override
  public void enterListConstructor(ListConstructorContext ctx) {
    
    
  }

  @Override
  public void exitListConstructor(ListConstructorContext ctx) {
    
    
  }

  @Override
  public void enterConstantExpression(ConstantExpressionContext ctx) {
    
    
  }

  @Override
  public void exitConstantExpression(ConstantExpressionContext ctx) {
    
    
  }

  @Override
  public void enterThrowStatement(ThrowStatementContext ctx) {
    
    
  }

  @Override
  public void exitThrowStatement(ThrowStatementContext ctx) {
    
    
  }

  @Override
  public void enterAnnotationParamNullExpression(
      AnnotationParamNullExpressionContext ctx) {
    
    
  }

  @Override
  public void exitAnnotationParamNullExpression(
      AnnotationParamNullExpressionContext ctx) {
    
    
  }

  @Override
  public void enterFieldDeclaration(FieldDeclarationContext ctx) {
    
    
  }

  @Override
  public void exitFieldDeclaration(FieldDeclarationContext ctx) {
    
    
  }

  @Override
  public void enterClassInitializer(ClassInitializerContext ctx) {
    
    
  }

  @Override
  public void exitClassInitializer(ClassInitializerContext ctx) {
    
    
  }

  @Override
  public void enterIfStatement(IfStatementContext ctx) {
    
    
  }

  @Override
  public void exitIfStatement(IfStatementContext ctx) {
    
    
  }

  @Override
  public void enterConstructorDeclaration(ConstructorDeclarationContext ctx) {
    
    
  }

  @Override
  public void exitConstructorDeclaration(ConstructorDeclarationContext ctx) {
    
    
  }

  @Override
  public void enterImplementsClause(ImplementsClauseContext ctx) {
    
    
  }

  @Override
  public void exitImplementsClause(ImplementsClauseContext ctx) {
    
    
  }

  @Override
  public void enterWhileStatement(WhileStatementContext ctx) {
    
    
  }

  @Override
  public void exitWhileStatement(WhileStatementContext ctx) {
    
    
  }

  @Override
  public void enterNewInstanceRule(NewInstanceRuleContext ctx) {
    
    
  }

  @Override
  public void exitNewInstanceRule(NewInstanceRuleContext ctx) {
    
    
  }

  @Override
  public void enterArgumentDeclarationList(ArgumentDeclarationListContext ctx) {
    
    
  }

  @Override
  public void exitArgumentDeclarationList(ArgumentDeclarationListContext ctx) {
    
    
  }

  @Override
  public void enterMapConstructor(MapConstructorContext ctx) {
    
    
  }

  @Override
  public void exitMapConstructor(MapConstructorContext ctx) {
    
    
  }

  @Override
  public void enterClassicForStatement(ClassicForStatementContext ctx) {
    
    
  }

  @Override
  public void exitClassicForStatement(ClassicForStatementContext ctx) {
    
    
  }

  @Override
  public void enterForInStatement(ForInStatementContext ctx) {
    
    
  }

  @Override
  public void exitForInStatement(ForInStatementContext ctx) {
    
    
  }

  @Override
  public void enterMemberModifier(MemberModifierContext ctx) {
    
    
  }

  @Override
  public void exitMemberModifier(MemberModifierContext ctx) {
    
    
  }

  @Override
  public void enterAnnotationParamDecimalExpression(
      AnnotationParamDecimalExpressionContext ctx) {
    
    
  }

  @Override
  public void exitAnnotationParamDecimalExpression(
      AnnotationParamDecimalExpressionContext ctx) {
    
    
  }

  @Override
  public void enterPathExpression(PathExpressionContext ctx) {
    
    
  }

  @Override
  public void exitPathExpression(PathExpressionContext ctx) {
    
    
  }

  @Override
  public void enterAnnotationParamClassExpression(
      AnnotationParamClassExpressionContext ctx) {
    
    
  }

  @Override
  public void exitAnnotationParamClassExpression(
      AnnotationParamClassExpressionContext ctx) {
    
    
  }

}
