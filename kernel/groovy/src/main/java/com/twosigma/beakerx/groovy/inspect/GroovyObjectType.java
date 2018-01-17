package com.twosigma.beakerx.groovy.inspect;

import com.twosigma.beakerx.autocomplete.AutocompleteRegistry;
import com.twosigma.beakerx.autocomplete.ClassUtils;
import com.twosigma.beakerx.groovy.autocomplete.GroovyAbstractListener;
import com.twosigma.beakerx.groovy.autocomplete.GroovyParser;

public class GroovyObjectType extends GroovyAbstractListener{
    private AutocompleteRegistry registry;
    private int cursor;
    @SuppressWarnings("unused")
    private String text;
    private ClassUtils classUtils;

    public GroovyObjectType (String t, int c, AutocompleteRegistry r, ClassUtils cu) {
        cursor = c;
        text = t;
        registry = r;
        classUtils = cu;
    }

    @Override
    public void enterNewInstanceRule(GroovyParser.NewInstanceRuleContext ctx) {
        text = ctx.getText();
        //super.enterNewInstanceRule(ctx);
    }

    @Override
    public void exitNewInstanceRule(GroovyParser.NewInstanceRuleContext ctx) {
        text = ctx.getText();
        //super.exitNewInstanceRule(ctx);
    }
}
