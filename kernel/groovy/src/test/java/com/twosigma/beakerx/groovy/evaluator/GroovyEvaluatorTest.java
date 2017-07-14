/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beakerx.groovy.evaluator;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.groovy.kernel.GroovyDefaultVariables;
import com.twosigma.beakerx.groovy.kernel.GroovyKernelMock;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.KernelParameters;
import groovy.lang.Binding;
import groovy.lang.GroovyClassLoader;
import groovy.lang.Script;
import org.junit.AfterClass;
import org.junit.BeforeClass;

import java.io.IOException;
import java.util.HashMap;

import static com.twosigma.beakerx.DefaultJVMVariables.CLASSPATH;
import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;

public class GroovyEvaluatorTest {

  static GroovyClassLoader groovyClassLoader;
  static GroovyKernelMock groovyKernel;
  static Binding scriptBinding;

  @BeforeClass
  public static void initClassStubData() throws IOException {
    GroovyEvaluator groovyEvaluator = new GroovyEvaluator("123", "345", cellExecutor());

    GroovyDefaultVariables var = new GroovyDefaultVariables();
    HashMap<String, Object> params = new HashMap<>();
    params.put(IMPORTS, var.getImports());
    params.put(CLASSPATH, var.getClassPath());
    KernelParameters kernelParameters = new KernelParameters(params);

    groovyEvaluator.setShellOptions(kernelParameters);
    groovyClassLoader = groovyEvaluator.newEvaluator();
    scriptBinding = new Binding();
    scriptBinding.setVariable("beaker", NamespaceClient.getBeaker("345"));
    groovyKernel = new GroovyKernelMock();
    KernelManager.register(groovyKernel);
  }

  @AfterClass
  public static void tearDown() throws Exception {
    KernelManager.register(null);
  }

  public Object parseClassFromScript(String script) {
    Class<?> parsedClass = groovyClassLoader.parseClass(script);
    Script instance = null;
    try {
      instance = (Script) parsedClass.newInstance();
      instance.setBinding(scriptBinding);
    } catch (InstantiationException e) {
      e.printStackTrace();
    } catch (IllegalAccessException e) {
      e.printStackTrace();
    }
    return instance.run();
  }
}
