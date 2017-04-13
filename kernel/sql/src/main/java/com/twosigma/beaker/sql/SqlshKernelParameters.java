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
package com.twosigma.beaker.sql;

import com.twosigma.jupyter.KernelParameters;

import java.util.Collection;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.twosigma.beaker.jupyter.Utils.getAsString;
import static com.twosigma.beaker.jupyter.comm.KernelControlSetShellHandler.CLASSPATH;

public class SqlshKernelParameters {

  public static final String DEFAULT_DATASOURCE = "defaultDatasource";
  public static final String DATASOURCES = "datasources";

  private KernelParameters kernelParameters;

  public SqlshKernelParameters(KernelParameters kernelParameters) {
    this.kernelParameters = checkNotNull(kernelParameters);
  }

  public String getClassPathAsString() {
    Collection<String> listOfClassPath = (Collection<String>) kernelParameters.getParams().get(CLASSPATH);
    return getAsString(listOfClassPath);
  }

  public Optional<String> defaultDatasource() {
    return kernelParameters.getParam(DEFAULT_DATASOURCE, String.class);
  }

  public Optional<String> datasources() {
    return kernelParameters.getParam(DATASOURCES, String.class);
  }

}
