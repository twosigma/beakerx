/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.groovy.comm;

import com.twosigma.jupyter.KernelFunctionality;

import com.twosigma.beaker.groovy.GroovyDefaultVariables;
import com.twosigma.beaker.jupyter.comm.KernelControlGetDefaultShellHandler;

public class GroovyCommKernelControlSetShellHandler extends KernelControlGetDefaultShellHandler{

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