package com.twosigma.beaker.groovy.comm;

import org.lappsgrid.jupyter.KernelFunctionality;

import com.twosigma.beaker.groovy.GroovyDefaultVariables;
import com.twosigma.beaker.jupyter.CommKernelControlGetDefaultShellHandler;

public class GroovyCommKernelControlSetShellHandler extends CommKernelControlGetDefaultShellHandler{

  public GroovyCommKernelControlSetShellHandler(KernelFunctionality kernel) {
    super(kernel);
  }
  
  @Override
  public String[] getDefaultImports() {
    return GroovyDefaultVariables.IMPORTS;
  }

  @Override
  public String[] getDefaultClassPath() {
    return GroovyDefaultVariables.CLASS_PATH;
  }

}