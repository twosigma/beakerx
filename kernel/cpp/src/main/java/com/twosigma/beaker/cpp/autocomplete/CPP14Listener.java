// Generated from CPP14.g4 by ANTLR 4.5
package com.twosigma.beaker.cpp.autocomplete;
import org.antlr.v4.runtime.misc.NotNull;
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link CPP14Parser}.
 */
public interface CPP14Listener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#translationunit}.
	 * @param ctx the parse tree
	 */
	void enterTranslationunit(CPP14Parser.TranslationunitContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#translationunit}.
	 * @param ctx the parse tree
	 */
	void exitTranslationunit(CPP14Parser.TranslationunitContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#primaryexpression}.
	 * @param ctx the parse tree
	 */
	void enterPrimaryexpression(CPP14Parser.PrimaryexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#primaryexpression}.
	 * @param ctx the parse tree
	 */
	void exitPrimaryexpression(CPP14Parser.PrimaryexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#idexpression}.
	 * @param ctx the parse tree
	 */
	void enterIdexpression(CPP14Parser.IdexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#idexpression}.
	 * @param ctx the parse tree
	 */
	void exitIdexpression(CPP14Parser.IdexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#unqualifiedid}.
	 * @param ctx the parse tree
	 */
	void enterUnqualifiedid(CPP14Parser.UnqualifiedidContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#unqualifiedid}.
	 * @param ctx the parse tree
	 */
	void exitUnqualifiedid(CPP14Parser.UnqualifiedidContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#qualifiedid}.
	 * @param ctx the parse tree
	 */
	void enterQualifiedid(CPP14Parser.QualifiedidContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#qualifiedid}.
	 * @param ctx the parse tree
	 */
	void exitQualifiedid(CPP14Parser.QualifiedidContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#nestednamespecifier}.
	 * @param ctx the parse tree
	 */
	void enterNestednamespecifier(CPP14Parser.NestednamespecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#nestednamespecifier}.
	 * @param ctx the parse tree
	 */
	void exitNestednamespecifier(CPP14Parser.NestednamespecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#lambdaexpression}.
	 * @param ctx the parse tree
	 */
	void enterLambdaexpression(CPP14Parser.LambdaexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#lambdaexpression}.
	 * @param ctx the parse tree
	 */
	void exitLambdaexpression(CPP14Parser.LambdaexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#lambdaintroducer}.
	 * @param ctx the parse tree
	 */
	void enterLambdaintroducer(CPP14Parser.LambdaintroducerContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#lambdaintroducer}.
	 * @param ctx the parse tree
	 */
	void exitLambdaintroducer(CPP14Parser.LambdaintroducerContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#lambdacapture}.
	 * @param ctx the parse tree
	 */
	void enterLambdacapture(CPP14Parser.LambdacaptureContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#lambdacapture}.
	 * @param ctx the parse tree
	 */
	void exitLambdacapture(CPP14Parser.LambdacaptureContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#capturedefault}.
	 * @param ctx the parse tree
	 */
	void enterCapturedefault(CPP14Parser.CapturedefaultContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#capturedefault}.
	 * @param ctx the parse tree
	 */
	void exitCapturedefault(CPP14Parser.CapturedefaultContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#capturelist}.
	 * @param ctx the parse tree
	 */
	void enterCapturelist(CPP14Parser.CapturelistContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#capturelist}.
	 * @param ctx the parse tree
	 */
	void exitCapturelist(CPP14Parser.CapturelistContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#capture}.
	 * @param ctx the parse tree
	 */
	void enterCapture(CPP14Parser.CaptureContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#capture}.
	 * @param ctx the parse tree
	 */
	void exitCapture(CPP14Parser.CaptureContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#simplecapture}.
	 * @param ctx the parse tree
	 */
	void enterSimplecapture(CPP14Parser.SimplecaptureContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#simplecapture}.
	 * @param ctx the parse tree
	 */
	void exitSimplecapture(CPP14Parser.SimplecaptureContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#initcapture}.
	 * @param ctx the parse tree
	 */
	void enterInitcapture(CPP14Parser.InitcaptureContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#initcapture}.
	 * @param ctx the parse tree
	 */
	void exitInitcapture(CPP14Parser.InitcaptureContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#lambdadeclarator}.
	 * @param ctx the parse tree
	 */
	void enterLambdadeclarator(CPP14Parser.LambdadeclaratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#lambdadeclarator}.
	 * @param ctx the parse tree
	 */
	void exitLambdadeclarator(CPP14Parser.LambdadeclaratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#postfixexpression}.
	 * @param ctx the parse tree
	 */
	void enterPostfixexpression(CPP14Parser.PostfixexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#postfixexpression}.
	 * @param ctx the parse tree
	 */
	void exitPostfixexpression(CPP14Parser.PostfixexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#expressionlist}.
	 * @param ctx the parse tree
	 */
	void enterExpressionlist(CPP14Parser.ExpressionlistContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#expressionlist}.
	 * @param ctx the parse tree
	 */
	void exitExpressionlist(CPP14Parser.ExpressionlistContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#pseudodestructorname}.
	 * @param ctx the parse tree
	 */
	void enterPseudodestructorname(CPP14Parser.PseudodestructornameContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#pseudodestructorname}.
	 * @param ctx the parse tree
	 */
	void exitPseudodestructorname(CPP14Parser.PseudodestructornameContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#unaryexpression}.
	 * @param ctx the parse tree
	 */
	void enterUnaryexpression(CPP14Parser.UnaryexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#unaryexpression}.
	 * @param ctx the parse tree
	 */
	void exitUnaryexpression(CPP14Parser.UnaryexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#unaryoperator}.
	 * @param ctx the parse tree
	 */
	void enterUnaryoperator(CPP14Parser.UnaryoperatorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#unaryoperator}.
	 * @param ctx the parse tree
	 */
	void exitUnaryoperator(CPP14Parser.UnaryoperatorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#newexpression}.
	 * @param ctx the parse tree
	 */
	void enterNewexpression(CPP14Parser.NewexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#newexpression}.
	 * @param ctx the parse tree
	 */
	void exitNewexpression(CPP14Parser.NewexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#newplacement}.
	 * @param ctx the parse tree
	 */
	void enterNewplacement(CPP14Parser.NewplacementContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#newplacement}.
	 * @param ctx the parse tree
	 */
	void exitNewplacement(CPP14Parser.NewplacementContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#newtypeid}.
	 * @param ctx the parse tree
	 */
	void enterNewtypeid(CPP14Parser.NewtypeidContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#newtypeid}.
	 * @param ctx the parse tree
	 */
	void exitNewtypeid(CPP14Parser.NewtypeidContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#newdeclarator}.
	 * @param ctx the parse tree
	 */
	void enterNewdeclarator(CPP14Parser.NewdeclaratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#newdeclarator}.
	 * @param ctx the parse tree
	 */
	void exitNewdeclarator(CPP14Parser.NewdeclaratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#noptrnewdeclarator}.
	 * @param ctx the parse tree
	 */
	void enterNoptrnewdeclarator(CPP14Parser.NoptrnewdeclaratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#noptrnewdeclarator}.
	 * @param ctx the parse tree
	 */
	void exitNoptrnewdeclarator(CPP14Parser.NoptrnewdeclaratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#newinitializer}.
	 * @param ctx the parse tree
	 */
	void enterNewinitializer(CPP14Parser.NewinitializerContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#newinitializer}.
	 * @param ctx the parse tree
	 */
	void exitNewinitializer(CPP14Parser.NewinitializerContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#deleteexpression}.
	 * @param ctx the parse tree
	 */
	void enterDeleteexpression(CPP14Parser.DeleteexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#deleteexpression}.
	 * @param ctx the parse tree
	 */
	void exitDeleteexpression(CPP14Parser.DeleteexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#noexceptexpression}.
	 * @param ctx the parse tree
	 */
	void enterNoexceptexpression(CPP14Parser.NoexceptexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#noexceptexpression}.
	 * @param ctx the parse tree
	 */
	void exitNoexceptexpression(CPP14Parser.NoexceptexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#castexpression}.
	 * @param ctx the parse tree
	 */
	void enterCastexpression(CPP14Parser.CastexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#castexpression}.
	 * @param ctx the parse tree
	 */
	void exitCastexpression(CPP14Parser.CastexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#pmexpression}.
	 * @param ctx the parse tree
	 */
	void enterPmexpression(CPP14Parser.PmexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#pmexpression}.
	 * @param ctx the parse tree
	 */
	void exitPmexpression(CPP14Parser.PmexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#multiplicativeexpression}.
	 * @param ctx the parse tree
	 */
	void enterMultiplicativeexpression(CPP14Parser.MultiplicativeexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#multiplicativeexpression}.
	 * @param ctx the parse tree
	 */
	void exitMultiplicativeexpression(CPP14Parser.MultiplicativeexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#additiveexpression}.
	 * @param ctx the parse tree
	 */
	void enterAdditiveexpression(CPP14Parser.AdditiveexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#additiveexpression}.
	 * @param ctx the parse tree
	 */
	void exitAdditiveexpression(CPP14Parser.AdditiveexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#shiftexpression}.
	 * @param ctx the parse tree
	 */
	void enterShiftexpression(CPP14Parser.ShiftexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#shiftexpression}.
	 * @param ctx the parse tree
	 */
	void exitShiftexpression(CPP14Parser.ShiftexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#relationalexpression}.
	 * @param ctx the parse tree
	 */
	void enterRelationalexpression(CPP14Parser.RelationalexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#relationalexpression}.
	 * @param ctx the parse tree
	 */
	void exitRelationalexpression(CPP14Parser.RelationalexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#equalityexpression}.
	 * @param ctx the parse tree
	 */
	void enterEqualityexpression(CPP14Parser.EqualityexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#equalityexpression}.
	 * @param ctx the parse tree
	 */
	void exitEqualityexpression(CPP14Parser.EqualityexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#andexpression}.
	 * @param ctx the parse tree
	 */
	void enterAndexpression(CPP14Parser.AndexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#andexpression}.
	 * @param ctx the parse tree
	 */
	void exitAndexpression(CPP14Parser.AndexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#exclusiveorexpression}.
	 * @param ctx the parse tree
	 */
	void enterExclusiveorexpression(CPP14Parser.ExclusiveorexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#exclusiveorexpression}.
	 * @param ctx the parse tree
	 */
	void exitExclusiveorexpression(CPP14Parser.ExclusiveorexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#inclusiveorexpression}.
	 * @param ctx the parse tree
	 */
	void enterInclusiveorexpression(CPP14Parser.InclusiveorexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#inclusiveorexpression}.
	 * @param ctx the parse tree
	 */
	void exitInclusiveorexpression(CPP14Parser.InclusiveorexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#logicalandexpression}.
	 * @param ctx the parse tree
	 */
	void enterLogicalandexpression(CPP14Parser.LogicalandexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#logicalandexpression}.
	 * @param ctx the parse tree
	 */
	void exitLogicalandexpression(CPP14Parser.LogicalandexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#logicalorexpression}.
	 * @param ctx the parse tree
	 */
	void enterLogicalorexpression(CPP14Parser.LogicalorexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#logicalorexpression}.
	 * @param ctx the parse tree
	 */
	void exitLogicalorexpression(CPP14Parser.LogicalorexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#conditionalexpression}.
	 * @param ctx the parse tree
	 */
	void enterConditionalexpression(CPP14Parser.ConditionalexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#conditionalexpression}.
	 * @param ctx the parse tree
	 */
	void exitConditionalexpression(CPP14Parser.ConditionalexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#assignmentexpression}.
	 * @param ctx the parse tree
	 */
	void enterAssignmentexpression(CPP14Parser.AssignmentexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#assignmentexpression}.
	 * @param ctx the parse tree
	 */
	void exitAssignmentexpression(CPP14Parser.AssignmentexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#assignmentoperator}.
	 * @param ctx the parse tree
	 */
	void enterAssignmentoperator(CPP14Parser.AssignmentoperatorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#assignmentoperator}.
	 * @param ctx the parse tree
	 */
	void exitAssignmentoperator(CPP14Parser.AssignmentoperatorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#expression}.
	 * @param ctx the parse tree
	 */
	void enterExpression(CPP14Parser.ExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#expression}.
	 * @param ctx the parse tree
	 */
	void exitExpression(CPP14Parser.ExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#constantexpression}.
	 * @param ctx the parse tree
	 */
	void enterConstantexpression(CPP14Parser.ConstantexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#constantexpression}.
	 * @param ctx the parse tree
	 */
	void exitConstantexpression(CPP14Parser.ConstantexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#statement}.
	 * @param ctx the parse tree
	 */
	void enterStatement(CPP14Parser.StatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#statement}.
	 * @param ctx the parse tree
	 */
	void exitStatement(CPP14Parser.StatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#labeledstatement}.
	 * @param ctx the parse tree
	 */
	void enterLabeledstatement(CPP14Parser.LabeledstatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#labeledstatement}.
	 * @param ctx the parse tree
	 */
	void exitLabeledstatement(CPP14Parser.LabeledstatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#expressionstatement}.
	 * @param ctx the parse tree
	 */
	void enterExpressionstatement(CPP14Parser.ExpressionstatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#expressionstatement}.
	 * @param ctx the parse tree
	 */
	void exitExpressionstatement(CPP14Parser.ExpressionstatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#compoundstatement}.
	 * @param ctx the parse tree
	 */
	void enterCompoundstatement(CPP14Parser.CompoundstatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#compoundstatement}.
	 * @param ctx the parse tree
	 */
	void exitCompoundstatement(CPP14Parser.CompoundstatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#statementseq}.
	 * @param ctx the parse tree
	 */
	void enterStatementseq(CPP14Parser.StatementseqContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#statementseq}.
	 * @param ctx the parse tree
	 */
	void exitStatementseq(CPP14Parser.StatementseqContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#selectionstatement}.
	 * @param ctx the parse tree
	 */
	void enterSelectionstatement(CPP14Parser.SelectionstatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#selectionstatement}.
	 * @param ctx the parse tree
	 */
	void exitSelectionstatement(CPP14Parser.SelectionstatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#condition}.
	 * @param ctx the parse tree
	 */
	void enterCondition(CPP14Parser.ConditionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#condition}.
	 * @param ctx the parse tree
	 */
	void exitCondition(CPP14Parser.ConditionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#iterationstatement}.
	 * @param ctx the parse tree
	 */
	void enterIterationstatement(CPP14Parser.IterationstatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#iterationstatement}.
	 * @param ctx the parse tree
	 */
	void exitIterationstatement(CPP14Parser.IterationstatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#forinitstatement}.
	 * @param ctx the parse tree
	 */
	void enterForinitstatement(CPP14Parser.ForinitstatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#forinitstatement}.
	 * @param ctx the parse tree
	 */
	void exitForinitstatement(CPP14Parser.ForinitstatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#forrangedeclaration}.
	 * @param ctx the parse tree
	 */
	void enterForrangedeclaration(CPP14Parser.ForrangedeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#forrangedeclaration}.
	 * @param ctx the parse tree
	 */
	void exitForrangedeclaration(CPP14Parser.ForrangedeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#forrangeinitializer}.
	 * @param ctx the parse tree
	 */
	void enterForrangeinitializer(CPP14Parser.ForrangeinitializerContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#forrangeinitializer}.
	 * @param ctx the parse tree
	 */
	void exitForrangeinitializer(CPP14Parser.ForrangeinitializerContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#jumpstatement}.
	 * @param ctx the parse tree
	 */
	void enterJumpstatement(CPP14Parser.JumpstatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#jumpstatement}.
	 * @param ctx the parse tree
	 */
	void exitJumpstatement(CPP14Parser.JumpstatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#declarationstatement}.
	 * @param ctx the parse tree
	 */
	void enterDeclarationstatement(CPP14Parser.DeclarationstatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#declarationstatement}.
	 * @param ctx the parse tree
	 */
	void exitDeclarationstatement(CPP14Parser.DeclarationstatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#declarationseq}.
	 * @param ctx the parse tree
	 */
	void enterDeclarationseq(CPP14Parser.DeclarationseqContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#declarationseq}.
	 * @param ctx the parse tree
	 */
	void exitDeclarationseq(CPP14Parser.DeclarationseqContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#declaration}.
	 * @param ctx the parse tree
	 */
	void enterDeclaration(CPP14Parser.DeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#declaration}.
	 * @param ctx the parse tree
	 */
	void exitDeclaration(CPP14Parser.DeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#blockdeclaration}.
	 * @param ctx the parse tree
	 */
	void enterBlockdeclaration(CPP14Parser.BlockdeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#blockdeclaration}.
	 * @param ctx the parse tree
	 */
	void exitBlockdeclaration(CPP14Parser.BlockdeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#aliasdeclaration}.
	 * @param ctx the parse tree
	 */
	void enterAliasdeclaration(CPP14Parser.AliasdeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#aliasdeclaration}.
	 * @param ctx the parse tree
	 */
	void exitAliasdeclaration(CPP14Parser.AliasdeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#simpledeclaration}.
	 * @param ctx the parse tree
	 */
	void enterSimpledeclaration(CPP14Parser.SimpledeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#simpledeclaration}.
	 * @param ctx the parse tree
	 */
	void exitSimpledeclaration(CPP14Parser.SimpledeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#static_assertdeclaration}.
	 * @param ctx the parse tree
	 */
	void enterStatic_assertdeclaration(CPP14Parser.Static_assertdeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#static_assertdeclaration}.
	 * @param ctx the parse tree
	 */
	void exitStatic_assertdeclaration(CPP14Parser.Static_assertdeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#emptydeclaration}.
	 * @param ctx the parse tree
	 */
	void enterEmptydeclaration(CPP14Parser.EmptydeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#emptydeclaration}.
	 * @param ctx the parse tree
	 */
	void exitEmptydeclaration(CPP14Parser.EmptydeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#attributedeclaration}.
	 * @param ctx the parse tree
	 */
	void enterAttributedeclaration(CPP14Parser.AttributedeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#attributedeclaration}.
	 * @param ctx the parse tree
	 */
	void exitAttributedeclaration(CPP14Parser.AttributedeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#declspecifier}.
	 * @param ctx the parse tree
	 */
	void enterDeclspecifier(CPP14Parser.DeclspecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#declspecifier}.
	 * @param ctx the parse tree
	 */
	void exitDeclspecifier(CPP14Parser.DeclspecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#declspecifierseq}.
	 * @param ctx the parse tree
	 */
	void enterDeclspecifierseq(CPP14Parser.DeclspecifierseqContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#declspecifierseq}.
	 * @param ctx the parse tree
	 */
	void exitDeclspecifierseq(CPP14Parser.DeclspecifierseqContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#storageclassspecifier}.
	 * @param ctx the parse tree
	 */
	void enterStorageclassspecifier(CPP14Parser.StorageclassspecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#storageclassspecifier}.
	 * @param ctx the parse tree
	 */
	void exitStorageclassspecifier(CPP14Parser.StorageclassspecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#functionspecifier}.
	 * @param ctx the parse tree
	 */
	void enterFunctionspecifier(CPP14Parser.FunctionspecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#functionspecifier}.
	 * @param ctx the parse tree
	 */
	void exitFunctionspecifier(CPP14Parser.FunctionspecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#typedefname}.
	 * @param ctx the parse tree
	 */
	void enterTypedefname(CPP14Parser.TypedefnameContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#typedefname}.
	 * @param ctx the parse tree
	 */
	void exitTypedefname(CPP14Parser.TypedefnameContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#typespecifier}.
	 * @param ctx the parse tree
	 */
	void enterTypespecifier(CPP14Parser.TypespecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#typespecifier}.
	 * @param ctx the parse tree
	 */
	void exitTypespecifier(CPP14Parser.TypespecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#trailingtypespecifier}.
	 * @param ctx the parse tree
	 */
	void enterTrailingtypespecifier(CPP14Parser.TrailingtypespecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#trailingtypespecifier}.
	 * @param ctx the parse tree
	 */
	void exitTrailingtypespecifier(CPP14Parser.TrailingtypespecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#typespecifierseq}.
	 * @param ctx the parse tree
	 */
	void enterTypespecifierseq(CPP14Parser.TypespecifierseqContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#typespecifierseq}.
	 * @param ctx the parse tree
	 */
	void exitTypespecifierseq(CPP14Parser.TypespecifierseqContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#trailingtypespecifierseq}.
	 * @param ctx the parse tree
	 */
	void enterTrailingtypespecifierseq(CPP14Parser.TrailingtypespecifierseqContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#trailingtypespecifierseq}.
	 * @param ctx the parse tree
	 */
	void exitTrailingtypespecifierseq(CPP14Parser.TrailingtypespecifierseqContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#simpletypespecifier}.
	 * @param ctx the parse tree
	 */
	void enterSimpletypespecifier(CPP14Parser.SimpletypespecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#simpletypespecifier}.
	 * @param ctx the parse tree
	 */
	void exitSimpletypespecifier(CPP14Parser.SimpletypespecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#typename}.
	 * @param ctx the parse tree
	 */
	void enterTypename(CPP14Parser.TypenameContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#typename}.
	 * @param ctx the parse tree
	 */
	void exitTypename(CPP14Parser.TypenameContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#decltypespecifier}.
	 * @param ctx the parse tree
	 */
	void enterDecltypespecifier(CPP14Parser.DecltypespecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#decltypespecifier}.
	 * @param ctx the parse tree
	 */
	void exitDecltypespecifier(CPP14Parser.DecltypespecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#elaboratedtypespecifier}.
	 * @param ctx the parse tree
	 */
	void enterElaboratedtypespecifier(CPP14Parser.ElaboratedtypespecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#elaboratedtypespecifier}.
	 * @param ctx the parse tree
	 */
	void exitElaboratedtypespecifier(CPP14Parser.ElaboratedtypespecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#enumname}.
	 * @param ctx the parse tree
	 */
	void enterEnumname(CPP14Parser.EnumnameContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#enumname}.
	 * @param ctx the parse tree
	 */
	void exitEnumname(CPP14Parser.EnumnameContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#enumspecifier}.
	 * @param ctx the parse tree
	 */
	void enterEnumspecifier(CPP14Parser.EnumspecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#enumspecifier}.
	 * @param ctx the parse tree
	 */
	void exitEnumspecifier(CPP14Parser.EnumspecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#enumhead}.
	 * @param ctx the parse tree
	 */
	void enterEnumhead(CPP14Parser.EnumheadContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#enumhead}.
	 * @param ctx the parse tree
	 */
	void exitEnumhead(CPP14Parser.EnumheadContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#opaqueenumdeclaration}.
	 * @param ctx the parse tree
	 */
	void enterOpaqueenumdeclaration(CPP14Parser.OpaqueenumdeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#opaqueenumdeclaration}.
	 * @param ctx the parse tree
	 */
	void exitOpaqueenumdeclaration(CPP14Parser.OpaqueenumdeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#enumkey}.
	 * @param ctx the parse tree
	 */
	void enterEnumkey(CPP14Parser.EnumkeyContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#enumkey}.
	 * @param ctx the parse tree
	 */
	void exitEnumkey(CPP14Parser.EnumkeyContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#enumbase}.
	 * @param ctx the parse tree
	 */
	void enterEnumbase(CPP14Parser.EnumbaseContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#enumbase}.
	 * @param ctx the parse tree
	 */
	void exitEnumbase(CPP14Parser.EnumbaseContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#enumeratorlist}.
	 * @param ctx the parse tree
	 */
	void enterEnumeratorlist(CPP14Parser.EnumeratorlistContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#enumeratorlist}.
	 * @param ctx the parse tree
	 */
	void exitEnumeratorlist(CPP14Parser.EnumeratorlistContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#enumeratordefinition}.
	 * @param ctx the parse tree
	 */
	void enterEnumeratordefinition(CPP14Parser.EnumeratordefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#enumeratordefinition}.
	 * @param ctx the parse tree
	 */
	void exitEnumeratordefinition(CPP14Parser.EnumeratordefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#enumerator}.
	 * @param ctx the parse tree
	 */
	void enterEnumerator(CPP14Parser.EnumeratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#enumerator}.
	 * @param ctx the parse tree
	 */
	void exitEnumerator(CPP14Parser.EnumeratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#namespacename}.
	 * @param ctx the parse tree
	 */
	void enterNamespacename(CPP14Parser.NamespacenameContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#namespacename}.
	 * @param ctx the parse tree
	 */
	void exitNamespacename(CPP14Parser.NamespacenameContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#originalnamespacename}.
	 * @param ctx the parse tree
	 */
	void enterOriginalnamespacename(CPP14Parser.OriginalnamespacenameContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#originalnamespacename}.
	 * @param ctx the parse tree
	 */
	void exitOriginalnamespacename(CPP14Parser.OriginalnamespacenameContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#namespacedefinition}.
	 * @param ctx the parse tree
	 */
	void enterNamespacedefinition(CPP14Parser.NamespacedefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#namespacedefinition}.
	 * @param ctx the parse tree
	 */
	void exitNamespacedefinition(CPP14Parser.NamespacedefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#namednamespacedefinition}.
	 * @param ctx the parse tree
	 */
	void enterNamednamespacedefinition(CPP14Parser.NamednamespacedefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#namednamespacedefinition}.
	 * @param ctx the parse tree
	 */
	void exitNamednamespacedefinition(CPP14Parser.NamednamespacedefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#originalnamespacedefinition}.
	 * @param ctx the parse tree
	 */
	void enterOriginalnamespacedefinition(CPP14Parser.OriginalnamespacedefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#originalnamespacedefinition}.
	 * @param ctx the parse tree
	 */
	void exitOriginalnamespacedefinition(CPP14Parser.OriginalnamespacedefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#extensionnamespacedefinition}.
	 * @param ctx the parse tree
	 */
	void enterExtensionnamespacedefinition(CPP14Parser.ExtensionnamespacedefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#extensionnamespacedefinition}.
	 * @param ctx the parse tree
	 */
	void exitExtensionnamespacedefinition(CPP14Parser.ExtensionnamespacedefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#unnamednamespacedefinition}.
	 * @param ctx the parse tree
	 */
	void enterUnnamednamespacedefinition(CPP14Parser.UnnamednamespacedefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#unnamednamespacedefinition}.
	 * @param ctx the parse tree
	 */
	void exitUnnamednamespacedefinition(CPP14Parser.UnnamednamespacedefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#namespacebody}.
	 * @param ctx the parse tree
	 */
	void enterNamespacebody(CPP14Parser.NamespacebodyContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#namespacebody}.
	 * @param ctx the parse tree
	 */
	void exitNamespacebody(CPP14Parser.NamespacebodyContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#namespacealias}.
	 * @param ctx the parse tree
	 */
	void enterNamespacealias(CPP14Parser.NamespacealiasContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#namespacealias}.
	 * @param ctx the parse tree
	 */
	void exitNamespacealias(CPP14Parser.NamespacealiasContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#namespacealiasdefinition}.
	 * @param ctx the parse tree
	 */
	void enterNamespacealiasdefinition(CPP14Parser.NamespacealiasdefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#namespacealiasdefinition}.
	 * @param ctx the parse tree
	 */
	void exitNamespacealiasdefinition(CPP14Parser.NamespacealiasdefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#qualifiednamespacespecifier}.
	 * @param ctx the parse tree
	 */
	void enterQualifiednamespacespecifier(CPP14Parser.QualifiednamespacespecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#qualifiednamespacespecifier}.
	 * @param ctx the parse tree
	 */
	void exitQualifiednamespacespecifier(CPP14Parser.QualifiednamespacespecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#usingdeclaration}.
	 * @param ctx the parse tree
	 */
	void enterUsingdeclaration(CPP14Parser.UsingdeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#usingdeclaration}.
	 * @param ctx the parse tree
	 */
	void exitUsingdeclaration(CPP14Parser.UsingdeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#usingdirective}.
	 * @param ctx the parse tree
	 */
	void enterUsingdirective(CPP14Parser.UsingdirectiveContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#usingdirective}.
	 * @param ctx the parse tree
	 */
	void exitUsingdirective(CPP14Parser.UsingdirectiveContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#asmdefinition}.
	 * @param ctx the parse tree
	 */
	void enterAsmdefinition(CPP14Parser.AsmdefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#asmdefinition}.
	 * @param ctx the parse tree
	 */
	void exitAsmdefinition(CPP14Parser.AsmdefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#linkagespecification}.
	 * @param ctx the parse tree
	 */
	void enterLinkagespecification(CPP14Parser.LinkagespecificationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#linkagespecification}.
	 * @param ctx the parse tree
	 */
	void exitLinkagespecification(CPP14Parser.LinkagespecificationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#attributespecifierseq}.
	 * @param ctx the parse tree
	 */
	void enterAttributespecifierseq(CPP14Parser.AttributespecifierseqContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#attributespecifierseq}.
	 * @param ctx the parse tree
	 */
	void exitAttributespecifierseq(CPP14Parser.AttributespecifierseqContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#attributespecifier}.
	 * @param ctx the parse tree
	 */
	void enterAttributespecifier(CPP14Parser.AttributespecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#attributespecifier}.
	 * @param ctx the parse tree
	 */
	void exitAttributespecifier(CPP14Parser.AttributespecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#alignmentspecifier}.
	 * @param ctx the parse tree
	 */
	void enterAlignmentspecifier(CPP14Parser.AlignmentspecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#alignmentspecifier}.
	 * @param ctx the parse tree
	 */
	void exitAlignmentspecifier(CPP14Parser.AlignmentspecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#attributelist}.
	 * @param ctx the parse tree
	 */
	void enterAttributelist(CPP14Parser.AttributelistContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#attributelist}.
	 * @param ctx the parse tree
	 */
	void exitAttributelist(CPP14Parser.AttributelistContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#attribute}.
	 * @param ctx the parse tree
	 */
	void enterAttribute(CPP14Parser.AttributeContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#attribute}.
	 * @param ctx the parse tree
	 */
	void exitAttribute(CPP14Parser.AttributeContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#attributetoken}.
	 * @param ctx the parse tree
	 */
	void enterAttributetoken(CPP14Parser.AttributetokenContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#attributetoken}.
	 * @param ctx the parse tree
	 */
	void exitAttributetoken(CPP14Parser.AttributetokenContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#attributescopedtoken}.
	 * @param ctx the parse tree
	 */
	void enterAttributescopedtoken(CPP14Parser.AttributescopedtokenContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#attributescopedtoken}.
	 * @param ctx the parse tree
	 */
	void exitAttributescopedtoken(CPP14Parser.AttributescopedtokenContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#attributenamespace}.
	 * @param ctx the parse tree
	 */
	void enterAttributenamespace(CPP14Parser.AttributenamespaceContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#attributenamespace}.
	 * @param ctx the parse tree
	 */
	void exitAttributenamespace(CPP14Parser.AttributenamespaceContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#attributeargumentclause}.
	 * @param ctx the parse tree
	 */
	void enterAttributeargumentclause(CPP14Parser.AttributeargumentclauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#attributeargumentclause}.
	 * @param ctx the parse tree
	 */
	void exitAttributeargumentclause(CPP14Parser.AttributeargumentclauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#balancedtokenseq}.
	 * @param ctx the parse tree
	 */
	void enterBalancedtokenseq(CPP14Parser.BalancedtokenseqContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#balancedtokenseq}.
	 * @param ctx the parse tree
	 */
	void exitBalancedtokenseq(CPP14Parser.BalancedtokenseqContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#balancedtoken}.
	 * @param ctx the parse tree
	 */
	void enterBalancedtoken(CPP14Parser.BalancedtokenContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#balancedtoken}.
	 * @param ctx the parse tree
	 */
	void exitBalancedtoken(CPP14Parser.BalancedtokenContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#initdeclaratorlist}.
	 * @param ctx the parse tree
	 */
	void enterInitdeclaratorlist(CPP14Parser.InitdeclaratorlistContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#initdeclaratorlist}.
	 * @param ctx the parse tree
	 */
	void exitInitdeclaratorlist(CPP14Parser.InitdeclaratorlistContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#initdeclarator}.
	 * @param ctx the parse tree
	 */
	void enterInitdeclarator(CPP14Parser.InitdeclaratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#initdeclarator}.
	 * @param ctx the parse tree
	 */
	void exitInitdeclarator(CPP14Parser.InitdeclaratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#declarator}.
	 * @param ctx the parse tree
	 */
	void enterDeclarator(CPP14Parser.DeclaratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#declarator}.
	 * @param ctx the parse tree
	 */
	void exitDeclarator(CPP14Parser.DeclaratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#ptrdeclarator}.
	 * @param ctx the parse tree
	 */
	void enterPtrdeclarator(CPP14Parser.PtrdeclaratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#ptrdeclarator}.
	 * @param ctx the parse tree
	 */
	void exitPtrdeclarator(CPP14Parser.PtrdeclaratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#noptrdeclarator}.
	 * @param ctx the parse tree
	 */
	void enterNoptrdeclarator(CPP14Parser.NoptrdeclaratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#noptrdeclarator}.
	 * @param ctx the parse tree
	 */
	void exitNoptrdeclarator(CPP14Parser.NoptrdeclaratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#parametersandqualifiers}.
	 * @param ctx the parse tree
	 */
	void enterParametersandqualifiers(CPP14Parser.ParametersandqualifiersContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#parametersandqualifiers}.
	 * @param ctx the parse tree
	 */
	void exitParametersandqualifiers(CPP14Parser.ParametersandqualifiersContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#trailingreturntype}.
	 * @param ctx the parse tree
	 */
	void enterTrailingreturntype(CPP14Parser.TrailingreturntypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#trailingreturntype}.
	 * @param ctx the parse tree
	 */
	void exitTrailingreturntype(CPP14Parser.TrailingreturntypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#ptroperator}.
	 * @param ctx the parse tree
	 */
	void enterPtroperator(CPP14Parser.PtroperatorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#ptroperator}.
	 * @param ctx the parse tree
	 */
	void exitPtroperator(CPP14Parser.PtroperatorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#cvqualifierseq}.
	 * @param ctx the parse tree
	 */
	void enterCvqualifierseq(CPP14Parser.CvqualifierseqContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#cvqualifierseq}.
	 * @param ctx the parse tree
	 */
	void exitCvqualifierseq(CPP14Parser.CvqualifierseqContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#cvqualifier}.
	 * @param ctx the parse tree
	 */
	void enterCvqualifier(CPP14Parser.CvqualifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#cvqualifier}.
	 * @param ctx the parse tree
	 */
	void exitCvqualifier(CPP14Parser.CvqualifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#refqualifier}.
	 * @param ctx the parse tree
	 */
	void enterRefqualifier(CPP14Parser.RefqualifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#refqualifier}.
	 * @param ctx the parse tree
	 */
	void exitRefqualifier(CPP14Parser.RefqualifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#declaratorid}.
	 * @param ctx the parse tree
	 */
	void enterDeclaratorid(CPP14Parser.DeclaratoridContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#declaratorid}.
	 * @param ctx the parse tree
	 */
	void exitDeclaratorid(CPP14Parser.DeclaratoridContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#typeid}.
	 * @param ctx the parse tree
	 */
	void enterTypeid(CPP14Parser.TypeidContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#typeid}.
	 * @param ctx the parse tree
	 */
	void exitTypeid(CPP14Parser.TypeidContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#abstractdeclarator}.
	 * @param ctx the parse tree
	 */
	void enterAbstractdeclarator(CPP14Parser.AbstractdeclaratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#abstractdeclarator}.
	 * @param ctx the parse tree
	 */
	void exitAbstractdeclarator(CPP14Parser.AbstractdeclaratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#ptrabstractdeclarator}.
	 * @param ctx the parse tree
	 */
	void enterPtrabstractdeclarator(CPP14Parser.PtrabstractdeclaratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#ptrabstractdeclarator}.
	 * @param ctx the parse tree
	 */
	void exitPtrabstractdeclarator(CPP14Parser.PtrabstractdeclaratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#noptrabstractdeclarator}.
	 * @param ctx the parse tree
	 */
	void enterNoptrabstractdeclarator(CPP14Parser.NoptrabstractdeclaratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#noptrabstractdeclarator}.
	 * @param ctx the parse tree
	 */
	void exitNoptrabstractdeclarator(CPP14Parser.NoptrabstractdeclaratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#abstractpackdeclarator}.
	 * @param ctx the parse tree
	 */
	void enterAbstractpackdeclarator(CPP14Parser.AbstractpackdeclaratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#abstractpackdeclarator}.
	 * @param ctx the parse tree
	 */
	void exitAbstractpackdeclarator(CPP14Parser.AbstractpackdeclaratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#noptrabstractpackdeclarator}.
	 * @param ctx the parse tree
	 */
	void enterNoptrabstractpackdeclarator(CPP14Parser.NoptrabstractpackdeclaratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#noptrabstractpackdeclarator}.
	 * @param ctx the parse tree
	 */
	void exitNoptrabstractpackdeclarator(CPP14Parser.NoptrabstractpackdeclaratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#parameterdeclarationclause}.
	 * @param ctx the parse tree
	 */
	void enterParameterdeclarationclause(CPP14Parser.ParameterdeclarationclauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#parameterdeclarationclause}.
	 * @param ctx the parse tree
	 */
	void exitParameterdeclarationclause(CPP14Parser.ParameterdeclarationclauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#parameterdeclarationlist}.
	 * @param ctx the parse tree
	 */
	void enterParameterdeclarationlist(CPP14Parser.ParameterdeclarationlistContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#parameterdeclarationlist}.
	 * @param ctx the parse tree
	 */
	void exitParameterdeclarationlist(CPP14Parser.ParameterdeclarationlistContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#parameterdeclaration}.
	 * @param ctx the parse tree
	 */
	void enterParameterdeclaration(CPP14Parser.ParameterdeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#parameterdeclaration}.
	 * @param ctx the parse tree
	 */
	void exitParameterdeclaration(CPP14Parser.ParameterdeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#functiondefinition}.
	 * @param ctx the parse tree
	 */
	void enterFunctiondefinition(CPP14Parser.FunctiondefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#functiondefinition}.
	 * @param ctx the parse tree
	 */
	void exitFunctiondefinition(CPP14Parser.FunctiondefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#functionbody}.
	 * @param ctx the parse tree
	 */
	void enterFunctionbody(CPP14Parser.FunctionbodyContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#functionbody}.
	 * @param ctx the parse tree
	 */
	void exitFunctionbody(CPP14Parser.FunctionbodyContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#initializer}.
	 * @param ctx the parse tree
	 */
	void enterInitializer(CPP14Parser.InitializerContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#initializer}.
	 * @param ctx the parse tree
	 */
	void exitInitializer(CPP14Parser.InitializerContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#braceorequalinitializer}.
	 * @param ctx the parse tree
	 */
	void enterBraceorequalinitializer(CPP14Parser.BraceorequalinitializerContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#braceorequalinitializer}.
	 * @param ctx the parse tree
	 */
	void exitBraceorequalinitializer(CPP14Parser.BraceorequalinitializerContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#initializerclause}.
	 * @param ctx the parse tree
	 */
	void enterInitializerclause(CPP14Parser.InitializerclauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#initializerclause}.
	 * @param ctx the parse tree
	 */
	void exitInitializerclause(CPP14Parser.InitializerclauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#initializerlist}.
	 * @param ctx the parse tree
	 */
	void enterInitializerlist(CPP14Parser.InitializerlistContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#initializerlist}.
	 * @param ctx the parse tree
	 */
	void exitInitializerlist(CPP14Parser.InitializerlistContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#bracedinitlist}.
	 * @param ctx the parse tree
	 */
	void enterBracedinitlist(CPP14Parser.BracedinitlistContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#bracedinitlist}.
	 * @param ctx the parse tree
	 */
	void exitBracedinitlist(CPP14Parser.BracedinitlistContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#classname}.
	 * @param ctx the parse tree
	 */
	void enterClassname(CPP14Parser.ClassnameContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#classname}.
	 * @param ctx the parse tree
	 */
	void exitClassname(CPP14Parser.ClassnameContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#classspecifier}.
	 * @param ctx the parse tree
	 */
	void enterClassspecifier(CPP14Parser.ClassspecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#classspecifier}.
	 * @param ctx the parse tree
	 */
	void exitClassspecifier(CPP14Parser.ClassspecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#classhead}.
	 * @param ctx the parse tree
	 */
	void enterClasshead(CPP14Parser.ClassheadContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#classhead}.
	 * @param ctx the parse tree
	 */
	void exitClasshead(CPP14Parser.ClassheadContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#classheadname}.
	 * @param ctx the parse tree
	 */
	void enterClassheadname(CPP14Parser.ClassheadnameContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#classheadname}.
	 * @param ctx the parse tree
	 */
	void exitClassheadname(CPP14Parser.ClassheadnameContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#classvirtspecifier}.
	 * @param ctx the parse tree
	 */
	void enterClassvirtspecifier(CPP14Parser.ClassvirtspecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#classvirtspecifier}.
	 * @param ctx the parse tree
	 */
	void exitClassvirtspecifier(CPP14Parser.ClassvirtspecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#classkey}.
	 * @param ctx the parse tree
	 */
	void enterClasskey(CPP14Parser.ClasskeyContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#classkey}.
	 * @param ctx the parse tree
	 */
	void exitClasskey(CPP14Parser.ClasskeyContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#memberspecification}.
	 * @param ctx the parse tree
	 */
	void enterMemberspecification(CPP14Parser.MemberspecificationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#memberspecification}.
	 * @param ctx the parse tree
	 */
	void exitMemberspecification(CPP14Parser.MemberspecificationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#memberdeclaration}.
	 * @param ctx the parse tree
	 */
	void enterMemberdeclaration(CPP14Parser.MemberdeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#memberdeclaration}.
	 * @param ctx the parse tree
	 */
	void exitMemberdeclaration(CPP14Parser.MemberdeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#memberdeclaratorlist}.
	 * @param ctx the parse tree
	 */
	void enterMemberdeclaratorlist(CPP14Parser.MemberdeclaratorlistContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#memberdeclaratorlist}.
	 * @param ctx the parse tree
	 */
	void exitMemberdeclaratorlist(CPP14Parser.MemberdeclaratorlistContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#memberdeclarator}.
	 * @param ctx the parse tree
	 */
	void enterMemberdeclarator(CPP14Parser.MemberdeclaratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#memberdeclarator}.
	 * @param ctx the parse tree
	 */
	void exitMemberdeclarator(CPP14Parser.MemberdeclaratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#virtspecifierseq}.
	 * @param ctx the parse tree
	 */
	void enterVirtspecifierseq(CPP14Parser.VirtspecifierseqContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#virtspecifierseq}.
	 * @param ctx the parse tree
	 */
	void exitVirtspecifierseq(CPP14Parser.VirtspecifierseqContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#virtspecifier}.
	 * @param ctx the parse tree
	 */
	void enterVirtspecifier(CPP14Parser.VirtspecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#virtspecifier}.
	 * @param ctx the parse tree
	 */
	void exitVirtspecifier(CPP14Parser.VirtspecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#purespecifier}.
	 * @param ctx the parse tree
	 */
	void enterPurespecifier(CPP14Parser.PurespecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#purespecifier}.
	 * @param ctx the parse tree
	 */
	void exitPurespecifier(CPP14Parser.PurespecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#baseclause}.
	 * @param ctx the parse tree
	 */
	void enterBaseclause(CPP14Parser.BaseclauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#baseclause}.
	 * @param ctx the parse tree
	 */
	void exitBaseclause(CPP14Parser.BaseclauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#basespecifierlist}.
	 * @param ctx the parse tree
	 */
	void enterBasespecifierlist(CPP14Parser.BasespecifierlistContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#basespecifierlist}.
	 * @param ctx the parse tree
	 */
	void exitBasespecifierlist(CPP14Parser.BasespecifierlistContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#basespecifier}.
	 * @param ctx the parse tree
	 */
	void enterBasespecifier(CPP14Parser.BasespecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#basespecifier}.
	 * @param ctx the parse tree
	 */
	void exitBasespecifier(CPP14Parser.BasespecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#classordecltype}.
	 * @param ctx the parse tree
	 */
	void enterClassordecltype(CPP14Parser.ClassordecltypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#classordecltype}.
	 * @param ctx the parse tree
	 */
	void exitClassordecltype(CPP14Parser.ClassordecltypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#basetypespecifier}.
	 * @param ctx the parse tree
	 */
	void enterBasetypespecifier(CPP14Parser.BasetypespecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#basetypespecifier}.
	 * @param ctx the parse tree
	 */
	void exitBasetypespecifier(CPP14Parser.BasetypespecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#accessspecifier}.
	 * @param ctx the parse tree
	 */
	void enterAccessspecifier(CPP14Parser.AccessspecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#accessspecifier}.
	 * @param ctx the parse tree
	 */
	void exitAccessspecifier(CPP14Parser.AccessspecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#conversionfunctionid}.
	 * @param ctx the parse tree
	 */
	void enterConversionfunctionid(CPP14Parser.ConversionfunctionidContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#conversionfunctionid}.
	 * @param ctx the parse tree
	 */
	void exitConversionfunctionid(CPP14Parser.ConversionfunctionidContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#conversiontypeid}.
	 * @param ctx the parse tree
	 */
	void enterConversiontypeid(CPP14Parser.ConversiontypeidContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#conversiontypeid}.
	 * @param ctx the parse tree
	 */
	void exitConversiontypeid(CPP14Parser.ConversiontypeidContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#conversiondeclarator}.
	 * @param ctx the parse tree
	 */
	void enterConversiondeclarator(CPP14Parser.ConversiondeclaratorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#conversiondeclarator}.
	 * @param ctx the parse tree
	 */
	void exitConversiondeclarator(CPP14Parser.ConversiondeclaratorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#ctorinitializer}.
	 * @param ctx the parse tree
	 */
	void enterCtorinitializer(CPP14Parser.CtorinitializerContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#ctorinitializer}.
	 * @param ctx the parse tree
	 */
	void exitCtorinitializer(CPP14Parser.CtorinitializerContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#meminitializerlist}.
	 * @param ctx the parse tree
	 */
	void enterMeminitializerlist(CPP14Parser.MeminitializerlistContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#meminitializerlist}.
	 * @param ctx the parse tree
	 */
	void exitMeminitializerlist(CPP14Parser.MeminitializerlistContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#meminitializer}.
	 * @param ctx the parse tree
	 */
	void enterMeminitializer(CPP14Parser.MeminitializerContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#meminitializer}.
	 * @param ctx the parse tree
	 */
	void exitMeminitializer(CPP14Parser.MeminitializerContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#meminitializerid}.
	 * @param ctx the parse tree
	 */
	void enterMeminitializerid(CPP14Parser.MeminitializeridContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#meminitializerid}.
	 * @param ctx the parse tree
	 */
	void exitMeminitializerid(CPP14Parser.MeminitializeridContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#operatorfunctionid}.
	 * @param ctx the parse tree
	 */
	void enterOperatorfunctionid(CPP14Parser.OperatorfunctionidContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#operatorfunctionid}.
	 * @param ctx the parse tree
	 */
	void exitOperatorfunctionid(CPP14Parser.OperatorfunctionidContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#literaloperatorid}.
	 * @param ctx the parse tree
	 */
	void enterLiteraloperatorid(CPP14Parser.LiteraloperatoridContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#literaloperatorid}.
	 * @param ctx the parse tree
	 */
	void exitLiteraloperatorid(CPP14Parser.LiteraloperatoridContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#templatedeclaration}.
	 * @param ctx the parse tree
	 */
	void enterTemplatedeclaration(CPP14Parser.TemplatedeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#templatedeclaration}.
	 * @param ctx the parse tree
	 */
	void exitTemplatedeclaration(CPP14Parser.TemplatedeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#templateparameterlist}.
	 * @param ctx the parse tree
	 */
	void enterTemplateparameterlist(CPP14Parser.TemplateparameterlistContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#templateparameterlist}.
	 * @param ctx the parse tree
	 */
	void exitTemplateparameterlist(CPP14Parser.TemplateparameterlistContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#templateparameter}.
	 * @param ctx the parse tree
	 */
	void enterTemplateparameter(CPP14Parser.TemplateparameterContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#templateparameter}.
	 * @param ctx the parse tree
	 */
	void exitTemplateparameter(CPP14Parser.TemplateparameterContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#typeparameter}.
	 * @param ctx the parse tree
	 */
	void enterTypeparameter(CPP14Parser.TypeparameterContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#typeparameter}.
	 * @param ctx the parse tree
	 */
	void exitTypeparameter(CPP14Parser.TypeparameterContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#simpletemplateid}.
	 * @param ctx the parse tree
	 */
	void enterSimpletemplateid(CPP14Parser.SimpletemplateidContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#simpletemplateid}.
	 * @param ctx the parse tree
	 */
	void exitSimpletemplateid(CPP14Parser.SimpletemplateidContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#templateid}.
	 * @param ctx the parse tree
	 */
	void enterTemplateid(CPP14Parser.TemplateidContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#templateid}.
	 * @param ctx the parse tree
	 */
	void exitTemplateid(CPP14Parser.TemplateidContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#templatename}.
	 * @param ctx the parse tree
	 */
	void enterTemplatename(CPP14Parser.TemplatenameContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#templatename}.
	 * @param ctx the parse tree
	 */
	void exitTemplatename(CPP14Parser.TemplatenameContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#templateargumentlist}.
	 * @param ctx the parse tree
	 */
	void enterTemplateargumentlist(CPP14Parser.TemplateargumentlistContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#templateargumentlist}.
	 * @param ctx the parse tree
	 */
	void exitTemplateargumentlist(CPP14Parser.TemplateargumentlistContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#templateargument}.
	 * @param ctx the parse tree
	 */
	void enterTemplateargument(CPP14Parser.TemplateargumentContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#templateargument}.
	 * @param ctx the parse tree
	 */
	void exitTemplateargument(CPP14Parser.TemplateargumentContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#typenamespecifier}.
	 * @param ctx the parse tree
	 */
	void enterTypenamespecifier(CPP14Parser.TypenamespecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#typenamespecifier}.
	 * @param ctx the parse tree
	 */
	void exitTypenamespecifier(CPP14Parser.TypenamespecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#explicitinstantiation}.
	 * @param ctx the parse tree
	 */
	void enterExplicitinstantiation(CPP14Parser.ExplicitinstantiationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#explicitinstantiation}.
	 * @param ctx the parse tree
	 */
	void exitExplicitinstantiation(CPP14Parser.ExplicitinstantiationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#explicitspecialization}.
	 * @param ctx the parse tree
	 */
	void enterExplicitspecialization(CPP14Parser.ExplicitspecializationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#explicitspecialization}.
	 * @param ctx the parse tree
	 */
	void exitExplicitspecialization(CPP14Parser.ExplicitspecializationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#tryblock}.
	 * @param ctx the parse tree
	 */
	void enterTryblock(CPP14Parser.TryblockContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#tryblock}.
	 * @param ctx the parse tree
	 */
	void exitTryblock(CPP14Parser.TryblockContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#functiontryblock}.
	 * @param ctx the parse tree
	 */
	void enterFunctiontryblock(CPP14Parser.FunctiontryblockContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#functiontryblock}.
	 * @param ctx the parse tree
	 */
	void exitFunctiontryblock(CPP14Parser.FunctiontryblockContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#handlerseq}.
	 * @param ctx the parse tree
	 */
	void enterHandlerseq(CPP14Parser.HandlerseqContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#handlerseq}.
	 * @param ctx the parse tree
	 */
	void exitHandlerseq(CPP14Parser.HandlerseqContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#handler}.
	 * @param ctx the parse tree
	 */
	void enterHandler(CPP14Parser.HandlerContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#handler}.
	 * @param ctx the parse tree
	 */
	void exitHandler(CPP14Parser.HandlerContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#exceptiondeclaration}.
	 * @param ctx the parse tree
	 */
	void enterExceptiondeclaration(CPP14Parser.ExceptiondeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#exceptiondeclaration}.
	 * @param ctx the parse tree
	 */
	void exitExceptiondeclaration(CPP14Parser.ExceptiondeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#throwexpression}.
	 * @param ctx the parse tree
	 */
	void enterThrowexpression(CPP14Parser.ThrowexpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#throwexpression}.
	 * @param ctx the parse tree
	 */
	void exitThrowexpression(CPP14Parser.ThrowexpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#exceptionspecification}.
	 * @param ctx the parse tree
	 */
	void enterExceptionspecification(CPP14Parser.ExceptionspecificationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#exceptionspecification}.
	 * @param ctx the parse tree
	 */
	void exitExceptionspecification(CPP14Parser.ExceptionspecificationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#dynamicexceptionspecification}.
	 * @param ctx the parse tree
	 */
	void enterDynamicexceptionspecification(CPP14Parser.DynamicexceptionspecificationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#dynamicexceptionspecification}.
	 * @param ctx the parse tree
	 */
	void exitDynamicexceptionspecification(CPP14Parser.DynamicexceptionspecificationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#typeidlist}.
	 * @param ctx the parse tree
	 */
	void enterTypeidlist(CPP14Parser.TypeidlistContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#typeidlist}.
	 * @param ctx the parse tree
	 */
	void exitTypeidlist(CPP14Parser.TypeidlistContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#noexceptspecification}.
	 * @param ctx the parse tree
	 */
	void enterNoexceptspecification(CPP14Parser.NoexceptspecificationContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#noexceptspecification}.
	 * @param ctx the parse tree
	 */
	void exitNoexceptspecification(CPP14Parser.NoexceptspecificationContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#rightShift}.
	 * @param ctx the parse tree
	 */
	void enterRightShift(CPP14Parser.RightShiftContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#rightShift}.
	 * @param ctx the parse tree
	 */
	void exitRightShift(CPP14Parser.RightShiftContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#rightShiftAssign}.
	 * @param ctx the parse tree
	 */
	void enterRightShiftAssign(CPP14Parser.RightShiftAssignContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#rightShiftAssign}.
	 * @param ctx the parse tree
	 */
	void exitRightShiftAssign(CPP14Parser.RightShiftAssignContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#operator}.
	 * @param ctx the parse tree
	 */
	void enterOperator(CPP14Parser.OperatorContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#operator}.
	 * @param ctx the parse tree
	 */
	void exitOperator(CPP14Parser.OperatorContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#literal}.
	 * @param ctx the parse tree
	 */
	void enterLiteral(CPP14Parser.LiteralContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#literal}.
	 * @param ctx the parse tree
	 */
	void exitLiteral(CPP14Parser.LiteralContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#booleanliteral}.
	 * @param ctx the parse tree
	 */
	void enterBooleanliteral(CPP14Parser.BooleanliteralContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#booleanliteral}.
	 * @param ctx the parse tree
	 */
	void exitBooleanliteral(CPP14Parser.BooleanliteralContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#pointerliteral}.
	 * @param ctx the parse tree
	 */
	void enterPointerliteral(CPP14Parser.PointerliteralContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#pointerliteral}.
	 * @param ctx the parse tree
	 */
	void exitPointerliteral(CPP14Parser.PointerliteralContext ctx);
	/**
	 * Enter a parse tree produced by {@link CPP14Parser#userdefinedliteral}.
	 * @param ctx the parse tree
	 */
	void enterUserdefinedliteral(CPP14Parser.UserdefinedliteralContext ctx);
	/**
	 * Exit a parse tree produced by {@link CPP14Parser#userdefinedliteral}.
	 * @param ctx the parse tree
	 */
	void exitUserdefinedliteral(CPP14Parser.UserdefinedliteralContext ctx);
}