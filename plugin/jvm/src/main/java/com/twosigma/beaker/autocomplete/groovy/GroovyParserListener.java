// Generated from GroovyParser.g4 by ANTLR 4.3
package com.twosigma.beaker.autocomplete.groovy;
import org.antlr.v4.runtime.misc.NotNull;
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link GroovyParser}.
 */
public interface GroovyParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link GroovyParser#newArrayRule}.
	 * @param ctx the parse tree
	 */
	void enterNewArrayRule(@NotNull GroovyParser.NewArrayRuleContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#newArrayRule}.
	 * @param ctx the parse tree
	 */
	void exitNewArrayRule(@NotNull GroovyParser.NewArrayRuleContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#enumMember}.
	 * @param ctx the parse tree
	 */
	void enterEnumMember(@NotNull GroovyParser.EnumMemberContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#enumMember}.
	 * @param ctx the parse tree
	 */
	void exitEnumMember(@NotNull GroovyParser.EnumMemberContext ctx);

	/**
	 * Enter a parse tree produced by the {@code newArrayStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterNewArrayStatement(@NotNull GroovyParser.NewArrayStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code newArrayStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitNewArrayStatement(@NotNull GroovyParser.NewArrayStatementContext ctx);

	/**
	 * Enter a parse tree produced by the {@code gstringExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterGstringExpression(@NotNull GroovyParser.GstringExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code gstringExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitGstringExpression(@NotNull GroovyParser.GstringExpressionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#annotationElementPair}.
	 * @param ctx the parse tree
	 */
	void enterAnnotationElementPair(@NotNull GroovyParser.AnnotationElementPairContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#annotationElementPair}.
	 * @param ctx the parse tree
	 */
	void exitAnnotationElementPair(@NotNull GroovyParser.AnnotationElementPairContext ctx);

	/**
	 * Enter a parse tree produced by the {@code annotationParamArrayExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void enterAnnotationParamArrayExpression(@NotNull GroovyParser.AnnotationParamArrayExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code annotationParamArrayExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void exitAnnotationParamArrayExpression(@NotNull GroovyParser.AnnotationParamArrayExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code constantDecimalExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterConstantDecimalExpression(@NotNull GroovyParser.ConstantDecimalExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code constantDecimalExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitConstantDecimalExpression(@NotNull GroovyParser.ConstantDecimalExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code annotationParamPathExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void enterAnnotationParamPathExpression(@NotNull GroovyParser.AnnotationParamPathExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code annotationParamPathExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void exitAnnotationParamPathExpression(@NotNull GroovyParser.AnnotationParamPathExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code variableExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterVariableExpression(@NotNull GroovyParser.VariableExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code variableExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitVariableExpression(@NotNull GroovyParser.VariableExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code genericsConcreteElement}
	 * labeled alternative in {@link GroovyParser#genericListElement}.
	 * @param ctx the parse tree
	 */
	void enterGenericsConcreteElement(@NotNull GroovyParser.GenericsConcreteElementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code genericsConcreteElement}
	 * labeled alternative in {@link GroovyParser#genericListElement}.
	 * @param ctx the parse tree
	 */
	void exitGenericsConcreteElement(@NotNull GroovyParser.GenericsConcreteElementContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#argumentList}.
	 * @param ctx the parse tree
	 */
	void enterArgumentList(@NotNull GroovyParser.ArgumentListContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#argumentList}.
	 * @param ctx the parse tree
	 */
	void exitArgumentList(@NotNull GroovyParser.ArgumentListContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#genericList}.
	 * @param ctx the parse tree
	 */
	void enterGenericList(@NotNull GroovyParser.GenericListContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#genericList}.
	 * @param ctx the parse tree
	 */
	void exitGenericList(@NotNull GroovyParser.GenericListContext ctx);

	/**
	 * Enter a parse tree produced by the {@code fieldAccessExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterFieldAccessExpression(@NotNull GroovyParser.FieldAccessExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code fieldAccessExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitFieldAccessExpression(@NotNull GroovyParser.FieldAccessExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code nullExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterNullExpression(@NotNull GroovyParser.NullExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code nullExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitNullExpression(@NotNull GroovyParser.NullExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code tryCatchFinallyStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterTryCatchFinallyStatement(@NotNull GroovyParser.TryCatchFinallyStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code tryCatchFinallyStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitTryCatchFinallyStatement(@NotNull GroovyParser.TryCatchFinallyStatementContext ctx);

	/**
	 * Enter a parse tree produced by the {@code annotationParamBoolExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void enterAnnotationParamBoolExpression(@NotNull GroovyParser.AnnotationParamBoolExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code annotationParamBoolExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void exitAnnotationParamBoolExpression(@NotNull GroovyParser.AnnotationParamBoolExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code expressionStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterExpressionStatement(@NotNull GroovyParser.ExpressionStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code expressionStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitExpressionStatement(@NotNull GroovyParser.ExpressionStatementContext ctx);

	/**
	 * Enter a parse tree produced by the {@code newArrayExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterNewArrayExpression(@NotNull GroovyParser.NewArrayExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code newArrayExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitNewArrayExpression(@NotNull GroovyParser.NewArrayExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code unaryExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterUnaryExpression(@NotNull GroovyParser.UnaryExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code unaryExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitUnaryExpression(@NotNull GroovyParser.UnaryExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code genericsWildcardElement}
	 * labeled alternative in {@link GroovyParser#genericListElement}.
	 * @param ctx the parse tree
	 */
	void enterGenericsWildcardElement(@NotNull GroovyParser.GenericsWildcardElementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code genericsWildcardElement}
	 * labeled alternative in {@link GroovyParser#genericListElement}.
	 * @param ctx the parse tree
	 */
	void exitGenericsWildcardElement(@NotNull GroovyParser.GenericsWildcardElementContext ctx);

	/**
	 * Enter a parse tree produced by the {@code constantIntegerExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterConstantIntegerExpression(@NotNull GroovyParser.ConstantIntegerExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code constantIntegerExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitConstantIntegerExpression(@NotNull GroovyParser.ConstantIntegerExpressionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#catchBlock}.
	 * @param ctx the parse tree
	 */
	void enterCatchBlock(@NotNull GroovyParser.CatchBlockContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#catchBlock}.
	 * @param ctx the parse tree
	 */
	void exitCatchBlock(@NotNull GroovyParser.CatchBlockContext ctx);

	/**
	 * Enter a parse tree produced by the {@code annotationParamStringExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void enterAnnotationParamStringExpression(@NotNull GroovyParser.AnnotationParamStringExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code annotationParamStringExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void exitAnnotationParamStringExpression(@NotNull GroovyParser.AnnotationParamStringExpressionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#classMember}.
	 * @param ctx the parse tree
	 */
	void enterClassMember(@NotNull GroovyParser.ClassMemberContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#classMember}.
	 * @param ctx the parse tree
	 */
	void exitClassMember(@NotNull GroovyParser.ClassMemberContext ctx);

	/**
	 * Enter a parse tree produced by the {@code boolExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterBoolExpression(@NotNull GroovyParser.BoolExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code boolExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitBoolExpression(@NotNull GroovyParser.BoolExpressionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#declarationRule}.
	 * @param ctx the parse tree
	 */
	void enterDeclarationRule(@NotNull GroovyParser.DeclarationRuleContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#declarationRule}.
	 * @param ctx the parse tree
	 */
	void exitDeclarationRule(@NotNull GroovyParser.DeclarationRuleContext ctx);

	/**
	 * Enter a parse tree produced by the {@code forColonStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterForColonStatement(@NotNull GroovyParser.ForColonStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code forColonStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitForColonStatement(@NotNull GroovyParser.ForColonStatementContext ctx);

	/**
	 * Enter a parse tree produced by the {@code parenthesisExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterParenthesisExpression(@NotNull GroovyParser.ParenthesisExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code parenthesisExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitParenthesisExpression(@NotNull GroovyParser.ParenthesisExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code assignmentExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterAssignmentExpression(@NotNull GroovyParser.AssignmentExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code assignmentExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitAssignmentExpression(@NotNull GroovyParser.AssignmentExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code annotationParamIntegerExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void enterAnnotationParamIntegerExpression(@NotNull GroovyParser.AnnotationParamIntegerExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code annotationParamIntegerExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void exitAnnotationParamIntegerExpression(@NotNull GroovyParser.AnnotationParamIntegerExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code newInstanceExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterNewInstanceExpression(@NotNull GroovyParser.NewInstanceExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code newInstanceExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitNewInstanceExpression(@NotNull GroovyParser.NewInstanceExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code commandExpressionStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterCommandExpressionStatement(@NotNull GroovyParser.CommandExpressionStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code commandExpressionStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitCommandExpressionStatement(@NotNull GroovyParser.CommandExpressionStatementContext ctx);

	/**
	 * Enter a parse tree produced by the {@code declarationStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterDeclarationStatement(@NotNull GroovyParser.DeclarationStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code declarationStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitDeclarationStatement(@NotNull GroovyParser.DeclarationStatementContext ctx);

	/**
	 * Enter a parse tree produced by the {@code binaryExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterBinaryExpression(@NotNull GroovyParser.BinaryExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code binaryExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitBinaryExpression(@NotNull GroovyParser.BinaryExpressionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#compilationUnit}.
	 * @param ctx the parse tree
	 */
	void enterCompilationUnit(@NotNull GroovyParser.CompilationUnitContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#compilationUnit}.
	 * @param ctx the parse tree
	 */
	void exitCompilationUnit(@NotNull GroovyParser.CompilationUnitContext ctx);

	/**
	 * Enter a parse tree produced by the {@code controlStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterControlStatement(@NotNull GroovyParser.ControlStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code controlStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitControlStatement(@NotNull GroovyParser.ControlStatementContext ctx);

	/**
	 * Enter a parse tree produced by the {@code callExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterCallExpression(@NotNull GroovyParser.CallExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code callExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitCallExpression(@NotNull GroovyParser.CallExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code closureExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterClosureExpression(@NotNull GroovyParser.ClosureExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code closureExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitClosureExpression(@NotNull GroovyParser.ClosureExpressionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#extendsClause}.
	 * @param ctx the parse tree
	 */
	void enterExtendsClause(@NotNull GroovyParser.ExtendsClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#extendsClause}.
	 * @param ctx the parse tree
	 */
	void exitExtendsClause(@NotNull GroovyParser.ExtendsClauseContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#annotationElement}.
	 * @param ctx the parse tree
	 */
	void enterAnnotationElement(@NotNull GroovyParser.AnnotationElementContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#annotationElement}.
	 * @param ctx the parse tree
	 */
	void exitAnnotationElement(@NotNull GroovyParser.AnnotationElementContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#cmdExpressionRule}.
	 * @param ctx the parse tree
	 */
	void enterCmdExpressionRule(@NotNull GroovyParser.CmdExpressionRuleContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#cmdExpressionRule}.
	 * @param ctx the parse tree
	 */
	void exitCmdExpressionRule(@NotNull GroovyParser.CmdExpressionRuleContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#argumentDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterArgumentDeclaration(@NotNull GroovyParser.ArgumentDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#argumentDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitArgumentDeclaration(@NotNull GroovyParser.ArgumentDeclarationContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#methodDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterMethodDeclaration(@NotNull GroovyParser.MethodDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#methodDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitMethodDeclaration(@NotNull GroovyParser.MethodDeclarationContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#methodBody}.
	 * @param ctx the parse tree
	 */
	void enterMethodBody(@NotNull GroovyParser.MethodBodyContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#methodBody}.
	 * @param ctx the parse tree
	 */
	void exitMethodBody(@NotNull GroovyParser.MethodBodyContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#classModifier}.
	 * @param ctx the parse tree
	 */
	void enterClassModifier(@NotNull GroovyParser.ClassModifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#classModifier}.
	 * @param ctx the parse tree
	 */
	void exitClassModifier(@NotNull GroovyParser.ClassModifierContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#importStatement}.
	 * @param ctx the parse tree
	 */
	void enterImportStatement(@NotNull GroovyParser.ImportStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#importStatement}.
	 * @param ctx the parse tree
	 */
	void exitImportStatement(@NotNull GroovyParser.ImportStatementContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#caseStatement}.
	 * @param ctx the parse tree
	 */
	void enterCaseStatement(@NotNull GroovyParser.CaseStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#caseStatement}.
	 * @param ctx the parse tree
	 */
	void exitCaseStatement(@NotNull GroovyParser.CaseStatementContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#gstringPathExpression}.
	 * @param ctx the parse tree
	 */
	void enterGstringPathExpression(@NotNull GroovyParser.GstringPathExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#gstringPathExpression}.
	 * @param ctx the parse tree
	 */
	void exitGstringPathExpression(@NotNull GroovyParser.GstringPathExpressionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#statementBlock}.
	 * @param ctx the parse tree
	 */
	void enterStatementBlock(@NotNull GroovyParser.StatementBlockContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#statementBlock}.
	 * @param ctx the parse tree
	 */
	void exitStatementBlock(@NotNull GroovyParser.StatementBlockContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#throwsClause}.
	 * @param ctx the parse tree
	 */
	void enterThrowsClause(@NotNull GroovyParser.ThrowsClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#throwsClause}.
	 * @param ctx the parse tree
	 */
	void exitThrowsClause(@NotNull GroovyParser.ThrowsClauseContext ctx);

	/**
	 * Enter a parse tree produced by the {@code methodCallExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterMethodCallExpression(@NotNull GroovyParser.MethodCallExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code methodCallExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitMethodCallExpression(@NotNull GroovyParser.MethodCallExpressionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#typeDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterTypeDeclaration(@NotNull GroovyParser.TypeDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#typeDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitTypeDeclaration(@NotNull GroovyParser.TypeDeclarationContext ctx);

	/**
	 * Enter a parse tree produced by the {@code returnStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterReturnStatement(@NotNull GroovyParser.ReturnStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code returnStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitReturnStatement(@NotNull GroovyParser.ReturnStatementContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#finallyBlock}.
	 * @param ctx the parse tree
	 */
	void enterFinallyBlock(@NotNull GroovyParser.FinallyBlockContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#finallyBlock}.
	 * @param ctx the parse tree
	 */
	void exitFinallyBlock(@NotNull GroovyParser.FinallyBlockContext ctx);

	/**
	 * Enter a parse tree produced by the {@code switchStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterSwitchStatement(@NotNull GroovyParser.SwitchStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code switchStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitSwitchStatement(@NotNull GroovyParser.SwitchStatementContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#mapEntry}.
	 * @param ctx the parse tree
	 */
	void enterMapEntry(@NotNull GroovyParser.MapEntryContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#mapEntry}.
	 * @param ctx the parse tree
	 */
	void exitMapEntry(@NotNull GroovyParser.MapEntryContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#classDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterClassDeclaration(@NotNull GroovyParser.ClassDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#classDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitClassDeclaration(@NotNull GroovyParser.ClassDeclarationContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#tryBlock}.
	 * @param ctx the parse tree
	 */
	void enterTryBlock(@NotNull GroovyParser.TryBlockContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#tryBlock}.
	 * @param ctx the parse tree
	 */
	void exitTryBlock(@NotNull GroovyParser.TryBlockContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#gstring}.
	 * @param ctx the parse tree
	 */
	void enterGstring(@NotNull GroovyParser.GstringContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#gstring}.
	 * @param ctx the parse tree
	 */
	void exitGstring(@NotNull GroovyParser.GstringContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#annotationClause}.
	 * @param ctx the parse tree
	 */
	void enterAnnotationClause(@NotNull GroovyParser.AnnotationClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#annotationClause}.
	 * @param ctx the parse tree
	 */
	void exitAnnotationClause(@NotNull GroovyParser.AnnotationClauseContext ctx);

	/**
	 * Enter a parse tree produced by the {@code prefixExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterPrefixExpression(@NotNull GroovyParser.PrefixExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code prefixExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitPrefixExpression(@NotNull GroovyParser.PrefixExpressionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#genericClassNameExpression}.
	 * @param ctx the parse tree
	 */
	void enterGenericClassNameExpression(@NotNull GroovyParser.GenericClassNameExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#genericClassNameExpression}.
	 * @param ctx the parse tree
	 */
	void exitGenericClassNameExpression(@NotNull GroovyParser.GenericClassNameExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code newInstanceStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterNewInstanceStatement(@NotNull GroovyParser.NewInstanceStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code newInstanceStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitNewInstanceStatement(@NotNull GroovyParser.NewInstanceStatementContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#objectInitializer}.
	 * @param ctx the parse tree
	 */
	void enterObjectInitializer(@NotNull GroovyParser.ObjectInitializerContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#objectInitializer}.
	 * @param ctx the parse tree
	 */
	void exitObjectInitializer(@NotNull GroovyParser.ObjectInitializerContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#genericDeclarationList}.
	 * @param ctx the parse tree
	 */
	void enterGenericDeclarationList(@NotNull GroovyParser.GenericDeclarationListContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#genericDeclarationList}.
	 * @param ctx the parse tree
	 */
	void exitGenericDeclarationList(@NotNull GroovyParser.GenericDeclarationListContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#classBody}.
	 * @param ctx the parse tree
	 */
	void enterClassBody(@NotNull GroovyParser.ClassBodyContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#classBody}.
	 * @param ctx the parse tree
	 */
	void exitClassBody(@NotNull GroovyParser.ClassBodyContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#classNameExpression}.
	 * @param ctx the parse tree
	 */
	void enterClassNameExpression(@NotNull GroovyParser.ClassNameExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#classNameExpression}.
	 * @param ctx the parse tree
	 */
	void exitClassNameExpression(@NotNull GroovyParser.ClassNameExpressionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#enumDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterEnumDeclaration(@NotNull GroovyParser.EnumDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#enumDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitEnumDeclaration(@NotNull GroovyParser.EnumDeclarationContext ctx);

	/**
	 * Enter a parse tree produced by the {@code postfixExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterPostfixExpression(@NotNull GroovyParser.PostfixExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code postfixExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitPostfixExpression(@NotNull GroovyParser.PostfixExpressionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#packageDefinition}.
	 * @param ctx the parse tree
	 */
	void enterPackageDefinition(@NotNull GroovyParser.PackageDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#packageDefinition}.
	 * @param ctx the parse tree
	 */
	void exitPackageDefinition(@NotNull GroovyParser.PackageDefinitionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#genericsDeclarationElement}.
	 * @param ctx the parse tree
	 */
	void enterGenericsDeclarationElement(@NotNull GroovyParser.GenericsDeclarationElementContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#genericsDeclarationElement}.
	 * @param ctx the parse tree
	 */
	void exitGenericsDeclarationElement(@NotNull GroovyParser.GenericsDeclarationElementContext ctx);

	/**
	 * Enter a parse tree produced by the {@code declarationExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterDeclarationExpression(@NotNull GroovyParser.DeclarationExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code declarationExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitDeclarationExpression(@NotNull GroovyParser.DeclarationExpressionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#blockStatement}.
	 * @param ctx the parse tree
	 */
	void enterBlockStatement(@NotNull GroovyParser.BlockStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#blockStatement}.
	 * @param ctx the parse tree
	 */
	void exitBlockStatement(@NotNull GroovyParser.BlockStatementContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#closureExpressionRule}.
	 * @param ctx the parse tree
	 */
	void enterClosureExpressionRule(@NotNull GroovyParser.ClosureExpressionRuleContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#closureExpressionRule}.
	 * @param ctx the parse tree
	 */
	void exitClosureExpressionRule(@NotNull GroovyParser.ClosureExpressionRuleContext ctx);

	/**
	 * Enter a parse tree produced by the {@code listConstructor}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterListConstructor(@NotNull GroovyParser.ListConstructorContext ctx);
	/**
	 * Exit a parse tree produced by the {@code listConstructor}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitListConstructor(@NotNull GroovyParser.ListConstructorContext ctx);

	/**
	 * Enter a parse tree produced by the {@code constantExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterConstantExpression(@NotNull GroovyParser.ConstantExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code constantExpression}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitConstantExpression(@NotNull GroovyParser.ConstantExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code throwStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterThrowStatement(@NotNull GroovyParser.ThrowStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code throwStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitThrowStatement(@NotNull GroovyParser.ThrowStatementContext ctx);

	/**
	 * Enter a parse tree produced by the {@code annotationParamNullExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void enterAnnotationParamNullExpression(@NotNull GroovyParser.AnnotationParamNullExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code annotationParamNullExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void exitAnnotationParamNullExpression(@NotNull GroovyParser.AnnotationParamNullExpressionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#fieldDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterFieldDeclaration(@NotNull GroovyParser.FieldDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#fieldDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitFieldDeclaration(@NotNull GroovyParser.FieldDeclarationContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#classInitializer}.
	 * @param ctx the parse tree
	 */
	void enterClassInitializer(@NotNull GroovyParser.ClassInitializerContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#classInitializer}.
	 * @param ctx the parse tree
	 */
	void exitClassInitializer(@NotNull GroovyParser.ClassInitializerContext ctx);

	/**
	 * Enter a parse tree produced by the {@code ifStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterIfStatement(@NotNull GroovyParser.IfStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ifStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitIfStatement(@NotNull GroovyParser.IfStatementContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#constructorDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterConstructorDeclaration(@NotNull GroovyParser.ConstructorDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#constructorDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitConstructorDeclaration(@NotNull GroovyParser.ConstructorDeclarationContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#implementsClause}.
	 * @param ctx the parse tree
	 */
	void enterImplementsClause(@NotNull GroovyParser.ImplementsClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#implementsClause}.
	 * @param ctx the parse tree
	 */
	void exitImplementsClause(@NotNull GroovyParser.ImplementsClauseContext ctx);

	/**
	 * Enter a parse tree produced by the {@code whileStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterWhileStatement(@NotNull GroovyParser.WhileStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code whileStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitWhileStatement(@NotNull GroovyParser.WhileStatementContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#newInstanceRule}.
	 * @param ctx the parse tree
	 */
	void enterNewInstanceRule(@NotNull GroovyParser.NewInstanceRuleContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#newInstanceRule}.
	 * @param ctx the parse tree
	 */
	void exitNewInstanceRule(@NotNull GroovyParser.NewInstanceRuleContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#argumentDeclarationList}.
	 * @param ctx the parse tree
	 */
	void enterArgumentDeclarationList(@NotNull GroovyParser.ArgumentDeclarationListContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#argumentDeclarationList}.
	 * @param ctx the parse tree
	 */
	void exitArgumentDeclarationList(@NotNull GroovyParser.ArgumentDeclarationListContext ctx);

	/**
	 * Enter a parse tree produced by the {@code mapConstructor}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterMapConstructor(@NotNull GroovyParser.MapConstructorContext ctx);
	/**
	 * Exit a parse tree produced by the {@code mapConstructor}
	 * labeled alternative in {@link GroovyParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitMapConstructor(@NotNull GroovyParser.MapConstructorContext ctx);

	/**
	 * Enter a parse tree produced by the {@code classicForStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterClassicForStatement(@NotNull GroovyParser.ClassicForStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code classicForStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitClassicForStatement(@NotNull GroovyParser.ClassicForStatementContext ctx);

	/**
	 * Enter a parse tree produced by the {@code forInStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterForInStatement(@NotNull GroovyParser.ForInStatementContext ctx);
	/**
	 * Exit a parse tree produced by the {@code forInStatement}
	 * labeled alternative in {@link GroovyParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitForInStatement(@NotNull GroovyParser.ForInStatementContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#memberModifier}.
	 * @param ctx the parse tree
	 */
	void enterMemberModifier(@NotNull GroovyParser.MemberModifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#memberModifier}.
	 * @param ctx the parse tree
	 */
	void exitMemberModifier(@NotNull GroovyParser.MemberModifierContext ctx);

	/**
	 * Enter a parse tree produced by the {@code annotationParamDecimalExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void enterAnnotationParamDecimalExpression(@NotNull GroovyParser.AnnotationParamDecimalExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code annotationParamDecimalExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void exitAnnotationParamDecimalExpression(@NotNull GroovyParser.AnnotationParamDecimalExpressionContext ctx);

	/**
	 * Enter a parse tree produced by {@link GroovyParser#pathExpression}.
	 * @param ctx the parse tree
	 */
	void enterPathExpression(@NotNull GroovyParser.PathExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GroovyParser#pathExpression}.
	 * @param ctx the parse tree
	 */
	void exitPathExpression(@NotNull GroovyParser.PathExpressionContext ctx);

	/**
	 * Enter a parse tree produced by the {@code annotationParamClassExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void enterAnnotationParamClassExpression(@NotNull GroovyParser.AnnotationParamClassExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code annotationParamClassExpression}
	 * labeled alternative in {@link GroovyParser#annotationParameter}.
	 * @param ctx the parse tree
	 */
	void exitAnnotationParamClassExpression(@NotNull GroovyParser.AnnotationParamClassExpressionContext ctx);
}