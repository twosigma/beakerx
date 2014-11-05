package com.twosigma.beaker.autocomplete.java;

import java.util.List;

import com.twosigma.beaker.autocomplete.AutocompleteCandidate;
import com.twosigma.beaker.autocomplete.AutocompleteRegistry;
import com.twosigma.beaker.autocomplete.ClassUtils;
import com.twosigma.beaker.autocomplete.java.JavaParser.ClassOrInterfaceTypeContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.FieldDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.LocalVariableDeclarationContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.PrimitiveTypeContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.TypeContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.VariableDeclaratorContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.VariableDeclaratorIdContext;
import com.twosigma.beaker.autocomplete.java.JavaParser.VariableDeclaratorsContext;

public class NameBuilder extends AbstractListener {
	
	private AutocompleteRegistry registry;
	private ClassUtils classUtils;
	
	public NameBuilder(AutocompleteRegistry r, ClassUtils cu) {
		registry = r;
		classUtils = cu;
	}
	
	
	@Override
	public void exitFieldDeclaration(FieldDeclarationContext ctx) {
		String type = null;
		TypeContext ty = ctx.getRuleContext(TypeContext.class, 0);
		if(ty!=null) {
			ClassOrInterfaceTypeContext t = ty.getRuleContext(ClassOrInterfaceTypeContext.class, 0);
			if(t!=null) {
				type=t.getText();
			} else {
				PrimitiveTypeContext pt = ty.getRuleContext(PrimitiveTypeContext.class, 0);
				if(pt!=null)
					type=pt.getText();
			}
		}
		List<VariableDeclaratorsContext> vars = ctx.getRuleContexts(VariableDeclaratorsContext.class);
		VariableDeclaratorContext v;
		for(VariableDeclaratorsContext vc : vars) {
			v = vc.getRuleContext(VariableDeclaratorContext.class, 0);
			if(v!=null) {
				VariableDeclaratorIdContext vi = v.getRuleContext(VariableDeclaratorIdContext.class, 0);
				if(vi.getChildCount()>0) {
					//System.out.println("VAR "+vi.getChild(0).getText()+" of type "+type);
					AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.NAME, vi.getChild(0).getText());
					registry.addCandidate(c);
					if(type!=null) {
						classUtils.defineVariable(vi.getChild(0).getText(), type);
					}
				}
			}
		}
	}

	@Override
	public void exitLocalVariableDeclaration(LocalVariableDeclarationContext ctx) {
		String type = null;
		TypeContext ty = ctx.getRuleContext(TypeContext.class, 0);
		if(ty!=null) {
			ClassOrInterfaceTypeContext t = ty.getRuleContext(ClassOrInterfaceTypeContext.class, 0);
			if(t!=null) {
				type=t.getText();
			} else {
				PrimitiveTypeContext pt = ty.getRuleContext(PrimitiveTypeContext.class, 0);
				if(pt!=null)
					type=pt.getText();
			}
		}
		List<VariableDeclaratorsContext> vars = ctx.getRuleContexts(VariableDeclaratorsContext.class);
		for(VariableDeclaratorsContext vc : vars) {
			List<VariableDeclaratorContext> v = vc.getRuleContexts(VariableDeclaratorContext.class);
			if(v!=null) {
				for(VariableDeclaratorContext v2 : v) {
					VariableDeclaratorIdContext vi = v2.getRuleContext(VariableDeclaratorIdContext.class, 0);
					if(vi.getChildCount()>0) {
						//System.out.println("VAR "+vi.getChild(0).getText()+" of type "+type);
						AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.NAME, vi.getChild(0).getText());
						registry.addCandidate(c);
						if(type!=null) {
							classUtils.defineVariable(vi.getChild(0).getText(), type);
						}
					}
				}
			}
		}
	}
}
