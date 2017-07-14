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
package com.twosigma.beakerx.sql.kernel;

import com.twosigma.beakerx.kernel.KernelParameters;

import java.util.Collection;
import java.util.Optional;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.twosigma.beakerx.DefaultJVMVariables.CLASSPATH;
import static com.twosigma.beakerx.kernel.Utils.getAsString;
import static com.twosigma.beakerx.kernel.commands.MagicCommand.DATASOURCES;
import static com.twosigma.beakerx.kernel.commands.MagicCommand.DEFAULT_DATASOURCE;

public class SQLKernelParameters {

  private KernelParameters kernelParameters;

  public SQLKernelParameters(KernelParameters kernelParameters) {
    this.kernelParameters = checkNotNull(kernelParameters);
  }

  public String getClassPathAsString() {
    Collection<String> listOfClassPath = (Collection<String>) kernelParameters.getParams().get(CLASSPATH);
    return getAsString(listOfClassPath);
  }
  
  public Optional<Collection<String>> getClassPath() {
    if(kernelParameters.getParams().containsKey(CLASSPATH)){
      return Optional.of((Collection<String>) kernelParameters.getParams().get(CLASSPATH));
    }
    return Optional.empty();
  }


  public Optional<String> defaultDatasource() {
    return kernelParameters.getParam(DEFAULT_DATASOURCE, String.class);
  }

  public Optional<String> datasources() {
    return kernelParameters.getParam(DATASOURCES, String.class);
  }

}
