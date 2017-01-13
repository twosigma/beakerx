package org.lappsgrid.jupyter.groovy.context;

import groovy.lang.ExpandoMetaClass;
import groovy.lang.MetaClass;
import org.codehaus.groovy.control.CompilerConfiguration;

/**
 * The DefaultGroovyContext implements the GroovyContext interface and returns default
 * CompilerConfiguration and ExpandoMetaClass objects.
 * <p>
 * Users implementing a Jupyter kernel for a custom Groovy DSL can extend the DefaultGroovyContext
 * if they only need/want to implement one of the methods.
 *
 * @author Keith Suderman
 */
public class DefaultGroovyContext implements GroovyContext {
    @Override
    public CompilerConfiguration getCompilerConfiguration() {
        return new CompilerConfiguration();
    }

    @Override
    public MetaClass getMetaClass(Class aClass) {
        MetaClass mc = new ExpandoMetaClass(aClass, false);
        ((ExpandoMetaClass) mc).initialize();
        return mc;
    }

}
