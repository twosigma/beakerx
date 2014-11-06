package com.twosigma.beaker.autocomplete.java;

import java.util.ArrayList;
import java.util.List;

import org.antlr.v4.runtime.ParserRuleContext;
import org.antlr.v4.runtime.tree.ErrorNode;
import org.antlr.v4.runtime.tree.TerminalNode;

import com.twosigma.beaker.autocomplete.AutocompleteCandidate;
import com.twosigma.beaker.autocomplete.java.JavaParser.AnnotationConstantRestContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.AnnotationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.AnnotationMethodOrConstantRestContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.AnnotationMethodRestContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.AnnotationNameContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.AnnotationTypeBodyContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.AnnotationTypeDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.AnnotationTypeElementDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.AnnotationTypeElementRestContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ArgumentsContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ArrayCreatorRestContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ArrayInitializerContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.BlockContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.BlockStatementContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.CatchClauseContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.CatchTypeContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ClassBodyContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ClassBodyDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ClassCreatorRestContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ClassDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ClassOrInterfaceModifierContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ClassOrInterfaceTypeContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.CompilationUnitContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ConstDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ConstantDeclaratorContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ConstantExpressionContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ConstructorBodyContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ConstructorDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.CreatedNameContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.CreatorContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.DefaultValueContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ElementValueArrayInitializerContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ElementValueContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ElementValuePairContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ElementValuePairsContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.EnhancedForControlContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.EnumBodyDeclarationsContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.EnumConstantContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.EnumConstantNameContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.EnumConstantsContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.EnumDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ExplicitGenericInvocationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ExplicitGenericInvocationSuffixContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ExpressionContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ExpressionListContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.FieldDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.FinallyBlockContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ForControlContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ForInitContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ForUpdateContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.FormalParameterContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.FormalParameterListContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.FormalParametersContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.GenericConstructorDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.GenericInterfaceMethodDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.GenericMethodDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ImportDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.InnerCreatorContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.InterfaceBodyContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.InterfaceBodyDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.InterfaceDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.InterfaceMemberDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.InterfaceMethodDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.LastFormalParameterContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.LiteralContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.LocalVariableDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.LocalVariableDeclarationStatementContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.MemberDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.MethodBodyContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.MethodDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ModifierContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.NonWildcardTypeArgumentsContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.NonWildcardTypeArgumentsOrDiamondContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.PackageDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ParExpressionContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.PrimaryContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.PrimitiveTypeContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.QualifiedNameContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.QualifiedNameListContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ResourceContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ResourceSpecificationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.ResourcesContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.StatementContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.StatementExpressionContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.SuperSuffixContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.SwitchBlockStatementGroupContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.SwitchLabelContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.TypeArgumentContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.TypeArgumentsContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.TypeArgumentsOrDiamondContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.TypeBoundContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.TypeContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.TypeDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.TypeListContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.TypeParameterContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.TypeParametersContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.VariableDeclaratorContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.VariableDeclaratorIdContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.VariableDeclaratorsContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.VariableInitializerContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.VariableModifierContext;

public class AbstractListener implements JavaListener {

	protected List<AutocompleteCandidate> query;
	
	protected void addQuery(AutocompleteCandidate c) {
		if(c==null)
			return;
		if (query==null)
			query = new ArrayList<AutocompleteCandidate>();
		query.add(c);
	}
	
	public List<AutocompleteCandidate> getQuery() { return query; }
	
	public AbstractListener() {
	}

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
	public void enterMemberDeclaration(MemberDeclarationContext ctx) {

		
	}

	@Override
	public void exitMemberDeclaration(MemberDeclarationContext ctx) {

		
	}

	@Override
	public void enterDefaultValue(DefaultValueContext ctx) {

		
	}

	@Override
	public void exitDefaultValue(DefaultValueContext ctx) {

		
	}

	@Override
	public void enterAnnotationTypeElementDeclaration(
			AnnotationTypeElementDeclarationContext ctx) {

		
	}

	@Override
	public void exitAnnotationTypeElementDeclaration(
			AnnotationTypeElementDeclarationContext ctx) {

		
	}

	@Override
	public void enterType(TypeContext ctx) {

		
	}

	@Override
	public void exitType(TypeContext ctx) {

		
	}

	@Override
	public void enterAnnotationTypeBody(AnnotationTypeBodyContext ctx) {

		
	}

	@Override
	public void exitAnnotationTypeBody(AnnotationTypeBodyContext ctx) {

		
	}

	@Override
	public void enterGenericInterfaceMethodDeclaration(
			GenericInterfaceMethodDeclarationContext ctx) {

		
	}

	@Override
	public void exitGenericInterfaceMethodDeclaration(
			GenericInterfaceMethodDeclarationContext ctx) {

		
	}

	@Override
	public void enterClassBodyDeclaration(ClassBodyDeclarationContext ctx) {

		
	}

	@Override
	public void exitClassBodyDeclaration(ClassBodyDeclarationContext ctx) {

		
	}

	@Override
	public void enterBlock(BlockContext ctx) {

		
	}

	@Override
	public void exitBlock(BlockContext ctx) {

		
	}

	@Override
	public void enterEnumBodyDeclarations(EnumBodyDeclarationsContext ctx) {

		
	}

	@Override
	public void exitEnumBodyDeclarations(EnumBodyDeclarationsContext ctx) {

		
	}

	@Override
	public void enterForUpdate(ForUpdateContext ctx) {

		
	}

	@Override
	public void exitForUpdate(ForUpdateContext ctx) {

		
	}

	@Override
	public void enterEnhancedForControl(EnhancedForControlContext ctx) {

		
	}

	@Override
	public void exitEnhancedForControl(EnhancedForControlContext ctx) {

		
	}

	@Override
	public void enterAnnotationConstantRest(AnnotationConstantRestContext ctx) {

		
	}

	@Override
	public void exitAnnotationConstantRest(AnnotationConstantRestContext ctx) {

		
	}

	@Override
	public void enterExplicitGenericInvocation(
			ExplicitGenericInvocationContext ctx) {

		
	}

	@Override
	public void exitExplicitGenericInvocation(
			ExplicitGenericInvocationContext ctx) {

		
	}

	@Override
	public void enterNonWildcardTypeArgumentsOrDiamond(
			NonWildcardTypeArgumentsOrDiamondContext ctx) {

		
	}

	@Override
	public void exitNonWildcardTypeArgumentsOrDiamond(
			NonWildcardTypeArgumentsOrDiamondContext ctx) {

		
	}

	@Override
	public void enterExpressionList(ExpressionListContext ctx) {

		
	}

	@Override
	public void exitExpressionList(ExpressionListContext ctx) {

		
	}

	@Override
	public void enterAnnotationTypeElementRest(
			AnnotationTypeElementRestContext ctx) {

		
	}

	@Override
	public void exitAnnotationTypeElementRest(
			AnnotationTypeElementRestContext ctx) {

		
	}

	@Override
	public void enterClassOrInterfaceType(ClassOrInterfaceTypeContext ctx) {

		
	}

	@Override
	public void exitClassOrInterfaceType(ClassOrInterfaceTypeContext ctx) {

		
	}

	@Override
	public void enterTypeBound(TypeBoundContext ctx) {

		
	}

	@Override
	public void exitTypeBound(TypeBoundContext ctx) {

		
	}

	@Override
	public void enterVariableDeclaratorId(VariableDeclaratorIdContext ctx) {

		
	}

	@Override
	public void exitVariableDeclaratorId(VariableDeclaratorIdContext ctx) {

		
	}

	@Override
	public void enterPrimary(PrimaryContext ctx) {

		
	}

	@Override
	public void exitPrimary(PrimaryContext ctx) {

		
	}

	@Override
	public void enterClassCreatorRest(ClassCreatorRestContext ctx) {

		
	}

	@Override
	public void exitClassCreatorRest(ClassCreatorRestContext ctx) {

		
	}

	@Override
	public void enterInterfaceBodyDeclaration(
			InterfaceBodyDeclarationContext ctx) {

		
	}

	@Override
	public void exitInterfaceBodyDeclaration(InterfaceBodyDeclarationContext ctx) {

		
	}

	@Override
	public void enterTypeArguments(TypeArgumentsContext ctx) {

		
	}

	@Override
	public void exitTypeArguments(TypeArgumentsContext ctx) {

		
	}

	@Override
	public void enterAnnotationName(AnnotationNameContext ctx) {

		
	}

	@Override
	public void exitAnnotationName(AnnotationNameContext ctx) {

		
	}

	@Override
	public void enterFinallyBlock(FinallyBlockContext ctx) {

		
	}

	@Override
	public void exitFinallyBlock(FinallyBlockContext ctx) {

		
	}

	@Override
	public void enterTypeParameters(TypeParametersContext ctx) {

		
	}

	@Override
	public void exitTypeParameters(TypeParametersContext ctx) {

		
	}

	@Override
	public void enterLastFormalParameter(LastFormalParameterContext ctx) {

		
	}

	@Override
	public void exitLastFormalParameter(LastFormalParameterContext ctx) {

		
	}

	@Override
	public void enterConstructorBody(ConstructorBodyContext ctx) {

		
	}

	@Override
	public void exitConstructorBody(ConstructorBodyContext ctx) {

		
	}

	@Override
	public void enterLiteral(LiteralContext ctx) {

		
	}

	@Override
	public void exitLiteral(LiteralContext ctx) {

		
	}

	@Override
	public void enterAnnotationMethodOrConstantRest(
			AnnotationMethodOrConstantRestContext ctx) {

		
	}

	@Override
	public void exitAnnotationMethodOrConstantRest(
			AnnotationMethodOrConstantRestContext ctx) {

		
	}

	@Override
	public void enterCatchClause(CatchClauseContext ctx) {

		
	}

	@Override
	public void exitCatchClause(CatchClauseContext ctx) {

		
	}

	@Override
	public void enterVariableDeclarator(VariableDeclaratorContext ctx) {

		
	}

	@Override
	public void exitVariableDeclarator(VariableDeclaratorContext ctx) {

		
	}

	@Override
	public void enterTypeList(TypeListContext ctx) {

		
	}

	@Override
	public void exitTypeList(TypeListContext ctx) {

		
	}

	@Override
	public void enterEnumConstants(EnumConstantsContext ctx) {

		
	}

	@Override
	public void exitEnumConstants(EnumConstantsContext ctx) {

		
	}

	@Override
	public void enterClassBody(ClassBodyContext ctx) {

		
	}

	@Override
	public void exitClassBody(ClassBodyContext ctx) {

		
	}

	@Override
	public void enterCreatedName(CreatedNameContext ctx) {

		
	}

	@Override
	public void exitCreatedName(CreatedNameContext ctx) {

		
	}

	@Override
	public void enterEnumDeclaration(EnumDeclarationContext ctx) {

		
	}

	@Override
	public void exitEnumDeclaration(EnumDeclarationContext ctx) {

		
	}

	@Override
	public void enterFormalParameter(FormalParameterContext ctx) {

		
	}

	@Override
	public void exitFormalParameter(FormalParameterContext ctx) {

		
	}

	@Override
	public void enterParExpression(ParExpressionContext ctx) {

		
	}

	@Override
	public void exitParExpression(ParExpressionContext ctx) {

		
	}

	@Override
	public void enterAnnotation(AnnotationContext ctx) {

		
	}

	@Override
	public void exitAnnotation(AnnotationContext ctx) {

		
	}

	@Override
	public void enterVariableInitializer(VariableInitializerContext ctx) {

		
	}

	@Override
	public void exitVariableInitializer(VariableInitializerContext ctx) {

		
	}

	@Override
	public void enterElementValueArrayInitializer(
			ElementValueArrayInitializerContext ctx) {

		
	}

	@Override
	public void exitElementValueArrayInitializer(
			ElementValueArrayInitializerContext ctx) {

		
	}

	@Override
	public void enterCreator(CreatorContext ctx) {

		
	}

	@Override
	public void exitCreator(CreatorContext ctx) {

		
	}

	@Override
	public void enterArrayCreatorRest(ArrayCreatorRestContext ctx) {

		
	}

	@Override
	public void exitArrayCreatorRest(ArrayCreatorRestContext ctx) {

		
	}

	@Override
	public void enterExpression(ExpressionContext ctx) {

		
	}

	@Override
	public void exitExpression(ExpressionContext ctx) {

		
	}

	@Override
	public void enterConstantExpression(ConstantExpressionContext ctx) {

		
	}

	@Override
	public void exitConstantExpression(ConstantExpressionContext ctx) {

		
	}

	@Override
	public void enterQualifiedNameList(QualifiedNameListContext ctx) {

		
	}

	@Override
	public void exitQualifiedNameList(QualifiedNameListContext ctx) {

		
	}

	@Override
	public void enterConstructorDeclaration(ConstructorDeclarationContext ctx) {

		
	}

	@Override
	public void exitConstructorDeclaration(ConstructorDeclarationContext ctx) {

		
	}

	@Override
	public void enterForControl(ForControlContext ctx) {

		
	}

	@Override
	public void exitForControl(ForControlContext ctx) {

		
	}

	@Override
	public void enterSuperSuffix(SuperSuffixContext ctx) {

		
	}

	@Override
	public void exitSuperSuffix(SuperSuffixContext ctx) {

		
	}

	@Override
	public void enterVariableDeclarators(VariableDeclaratorsContext ctx) {

		
	}

	@Override
	public void exitVariableDeclarators(VariableDeclaratorsContext ctx) {

		
	}

	@Override
	public void enterCatchType(CatchTypeContext ctx) {

		
	}

	@Override
	public void exitCatchType(CatchTypeContext ctx) {

		
	}

	@Override
	public void enterClassOrInterfaceModifier(
			ClassOrInterfaceModifierContext ctx) {

		
	}

	@Override
	public void exitClassOrInterfaceModifier(ClassOrInterfaceModifierContext ctx) {

		
	}

	@Override
	public void enterEnumConstantName(EnumConstantNameContext ctx) {

		
	}

	@Override
	public void exitEnumConstantName(EnumConstantNameContext ctx) {

		
	}

	@Override
	public void enterModifier(ModifierContext ctx) {

		
	}

	@Override
	public void exitModifier(ModifierContext ctx) {

		
	}

	@Override
	public void enterInnerCreator(InnerCreatorContext ctx) {

		
	}

	@Override
	public void exitInnerCreator(InnerCreatorContext ctx) {

		
	}

	@Override
	public void enterExplicitGenericInvocationSuffix(
			ExplicitGenericInvocationSuffixContext ctx) {

		
	}

	@Override
	public void exitExplicitGenericInvocationSuffix(
			ExplicitGenericInvocationSuffixContext ctx) {

		
	}

	@Override
	public void enterVariableModifier(VariableModifierContext ctx) {

		
	}

	@Override
	public void exitVariableModifier(VariableModifierContext ctx) {

		
	}

	@Override
	public void enterElementValuePair(ElementValuePairContext ctx) {

		
	}

	@Override
	public void exitElementValuePair(ElementValuePairContext ctx) {

		
	}

	@Override
	public void enterArrayInitializer(ArrayInitializerContext ctx) {

		
	}

	@Override
	public void exitArrayInitializer(ArrayInitializerContext ctx) {

		
	}

	@Override
	public void enterElementValue(ElementValueContext ctx) {

		
	}

	@Override
	public void exitElementValue(ElementValueContext ctx) {

		
	}

	@Override
	public void enterConstDeclaration(ConstDeclarationContext ctx) {

		
	}

	@Override
	public void exitConstDeclaration(ConstDeclarationContext ctx) {

		
	}

	@Override
	public void enterResource(ResourceContext ctx) {

		
	}

	@Override
	public void exitResource(ResourceContext ctx) {

		
	}

	@Override
	public void enterQualifiedName(QualifiedNameContext ctx) {

		
	}

	@Override
	public void exitQualifiedName(QualifiedNameContext ctx) {

		
	}

	@Override
	public void enterResourceSpecification(ResourceSpecificationContext ctx) {

		
	}

	@Override
	public void exitResourceSpecification(ResourceSpecificationContext ctx) {

		
	}

	@Override
	public void enterFormalParameterList(FormalParameterListContext ctx) {

		
	}

	@Override
	public void exitFormalParameterList(FormalParameterListContext ctx) {

		
	}

	@Override
	public void enterAnnotationTypeDeclaration(
			AnnotationTypeDeclarationContext ctx) {

		
	}

	@Override
	public void exitAnnotationTypeDeclaration(
			AnnotationTypeDeclarationContext ctx) {

		
	}

	@Override
	public void enterCompilationUnit(CompilationUnitContext ctx) {

		
	}

	@Override
	public void exitCompilationUnit(CompilationUnitContext ctx) {

		
	}

	@Override
	public void enterAnnotationMethodRest(AnnotationMethodRestContext ctx) {

		
	}

	@Override
	public void exitAnnotationMethodRest(AnnotationMethodRestContext ctx) {

		
	}

	@Override
	public void enterSwitchBlockStatementGroup(
			SwitchBlockStatementGroupContext ctx) {

		
	}

	@Override
	public void exitSwitchBlockStatementGroup(
			SwitchBlockStatementGroupContext ctx) {

		
	}

	@Override
	public void enterTypeParameter(TypeParameterContext ctx) {

		
	}

	@Override
	public void exitTypeParameter(TypeParameterContext ctx) {

		
	}

	@Override
	public void enterInterfaceBody(InterfaceBodyContext ctx) {

		
	}

	@Override
	public void exitInterfaceBody(InterfaceBodyContext ctx) {

		
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
	public void enterTypeArgument(TypeArgumentContext ctx) {

		
	}

	@Override
	public void exitTypeArgument(TypeArgumentContext ctx) {

		
	}

	@Override
	public void enterTypeDeclaration(TypeDeclarationContext ctx) {

		
	}

	@Override
	public void exitTypeDeclaration(TypeDeclarationContext ctx) {

		
	}

	@Override
	public void enterGenericConstructorDeclaration(
			GenericConstructorDeclarationContext ctx) {

		
	}

	@Override
	public void exitGenericConstructorDeclaration(
			GenericConstructorDeclarationContext ctx) {

		
	}

	@Override
	public void enterClassDeclaration(ClassDeclarationContext ctx) {

		
	}

	@Override
	public void exitClassDeclaration(ClassDeclarationContext ctx) {

		
	}

	@Override
	public void enterEnumConstant(EnumConstantContext ctx) {

		
	}

	@Override
	public void exitEnumConstant(EnumConstantContext ctx) {

		
	}

	@Override
	public void enterStatement(StatementContext ctx) {

		
	}

	@Override
	public void exitStatement(StatementContext ctx) {

		
	}

	@Override
	public void enterImportDeclaration(ImportDeclarationContext ctx) {

	}

	@Override
	public void exitImportDeclaration(ImportDeclarationContext ctx) {
	}

	@Override
	public void enterPrimitiveType(PrimitiveTypeContext ctx) {

		
	}

	@Override
	public void exitPrimitiveType(PrimitiveTypeContext ctx) {

		
	}

	@Override
	public void enterInterfaceDeclaration(InterfaceDeclarationContext ctx) {

		
	}

	@Override
	public void exitInterfaceDeclaration(InterfaceDeclarationContext ctx) {

		
	}

	@Override
	public void enterLocalVariableDeclarationStatement(
			LocalVariableDeclarationStatementContext ctx) {

		
	}

	@Override
	public void exitLocalVariableDeclarationStatement(
			LocalVariableDeclarationStatementContext ctx) {

		
	}

	@Override
	public void enterBlockStatement(BlockStatementContext ctx) {

		
	}

	@Override
	public void exitBlockStatement(BlockStatementContext ctx) {

		
	}

	@Override
	public void enterFieldDeclaration(FieldDeclarationContext ctx) {

		
	}

	@Override
	public void exitFieldDeclaration(FieldDeclarationContext ctx) {

		
	}

	@Override
	public void enterConstantDeclarator(ConstantDeclaratorContext ctx) {

		
	}

	@Override
	public void exitConstantDeclarator(ConstantDeclaratorContext ctx) {

		
	}

	@Override
	public void enterResources(ResourcesContext ctx) {

		
	}

	@Override
	public void exitResources(ResourcesContext ctx) {

		
	}

	@Override
	public void enterStatementExpression(StatementExpressionContext ctx) {

		
	}

	@Override
	public void exitStatementExpression(StatementExpressionContext ctx) {

		
	}

	@Override
	public void enterInterfaceMethodDeclaration(
			InterfaceMethodDeclarationContext ctx) {

		
	}

	@Override
	public void exitInterfaceMethodDeclaration(
			InterfaceMethodDeclarationContext ctx) {

		
	}

	@Override
	public void enterPackageDeclaration(PackageDeclarationContext ctx) {

		
	}

	@Override
	public void exitPackageDeclaration(PackageDeclarationContext ctx) {

		
	}

	@Override
	public void enterElementValuePairs(ElementValuePairsContext ctx) {

		
	}

	@Override
	public void exitElementValuePairs(ElementValuePairsContext ctx) {

		
	}

	@Override
	public void enterLocalVariableDeclaration(
			LocalVariableDeclarationContext ctx) {

		
	}

	@Override
	public void exitLocalVariableDeclaration(LocalVariableDeclarationContext ctx) {

		
	}

	@Override
	public void enterNonWildcardTypeArguments(
			NonWildcardTypeArgumentsContext ctx) {

		
	}

	@Override
	public void exitNonWildcardTypeArguments(NonWildcardTypeArgumentsContext ctx) {

		
	}

	@Override
	public void enterInterfaceMemberDeclaration(
			InterfaceMemberDeclarationContext ctx) {

		
	}

	@Override
	public void exitInterfaceMemberDeclaration(
			InterfaceMemberDeclarationContext ctx) {

		
	}

	@Override
	public void enterSwitchLabel(SwitchLabelContext ctx) {

		
	}

	@Override
	public void exitSwitchLabel(SwitchLabelContext ctx) {

		
	}

	@Override
	public void enterForInit(ForInitContext ctx) {

		
	}

	@Override
	public void exitForInit(ForInitContext ctx) {

		
	}

	@Override
	public void enterFormalParameters(FormalParametersContext ctx) {

		
	}

	@Override
	public void exitFormalParameters(FormalParametersContext ctx) {

		
	}

	@Override
	public void enterArguments(ArgumentsContext ctx) {

		
	}

	@Override
	public void exitArguments(ArgumentsContext ctx) {

		
	}

	@Override
	public void enterGenericMethodDeclaration(
			GenericMethodDeclarationContext ctx) {

		
	}

	@Override
	public void exitGenericMethodDeclaration(GenericMethodDeclarationContext ctx) {

		
	}

	@Override
	public void enterTypeArgumentsOrDiamond(TypeArgumentsOrDiamondContext ctx) {

		
	}

	@Override
	public void exitTypeArgumentsOrDiamond(TypeArgumentsOrDiamondContext ctx) {

		
	}

}
