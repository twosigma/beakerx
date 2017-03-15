package com.twosigma.beaker.groovy.comm;

import com.twosigma.jupyter.KernelFunctionality;

import com.twosigma.beaker.groovy.GroovyDefaultVariables;
import com.twosigma.beaker.jupyter.CommKernelControlGetDefaultShellHandler;

public class GroovyCommKernelControlSetShellHandler extends CommKernelControlGetDefaultShellHandler{

  protected GroovyDefaultVariables var = new GroovyDefaultVariables();
  
  public GroovyCommKernelControlSetShellHandler(KernelFunctionality kernel) {
    super(kernel);
  }
  
  @Override
  public String[] getDefaultImports() {
    return var.getImportsAsArray();
  }

  @Override
  public String[] getDefaultClassPath() {
    return var.getClassPathAsArray();
  }

}