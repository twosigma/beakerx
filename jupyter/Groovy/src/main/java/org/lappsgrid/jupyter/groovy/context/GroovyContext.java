package org.lappsgrid.jupyter.groovy.context;

import groovy.lang.MetaClass;
import org.codehaus.groovy.control.CompilerConfiguration;

/**
 * Objects that implement the GroovyContext interface are used to obtain CompilerConfiguration
 * and MetaClass object used by the Groovy compiler when compiler user scripts.
 *
 * @author Keith Suderman
 */
public interface GroovyContext {
    public abstract CompilerConfiguration getCompilerConfiguration();

    public abstract MetaClass getMetaClass(Class aClass);
}
