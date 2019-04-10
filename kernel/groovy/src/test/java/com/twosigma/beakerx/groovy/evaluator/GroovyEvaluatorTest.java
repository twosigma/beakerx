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

import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.evaluator.MagicCommandAutocompletePatternsMock;
import com.twosigma.beakerx.groovy.kernel.GroovyDefaultVariables;
import com.twosigma.beakerx.groovy.kernel.GroovyKernelMock;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.KernelManager;
import groovy.lang.Binding;
import groovy.lang.GroovyClassLoader;
import groovy.lang.Script;
import org.codehaus.groovy.control.customizers.ImportCustomizer;
import org.junit.AfterClass;
import org.junit.BeforeClass;

import java.io.IOException;
import java.util.HashMap;

import static com.twosigma.beakerx.DefaultJVMVariables.CLASSPATH;
import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static com.twosigma.beakerx.groovy.evaluator.GroovyClassLoaderFactory.newEvaluator;
import static com.twosigma.beakerx.groovy.evaluator.GroovyClassLoaderFactory.newParentClassLoader;

public class GroovyEvaluatorTest {

  static GroovyClassLoader groovyClassLoader;
  static GroovyKernelMock groovyKernel;
  static Binding scriptBinding;
  static ImportCustomizer icz = new ImportCustomizer();

  @BeforeClass
  public static void initClassStubData() throws IOException {
    GroovyDefaultVariables var = new GroovyDefaultVariables();
    HashMap<String, Object> params = new HashMap<>();
    params.put(IMPORTS, var.getImports());
    params.put(CLASSPATH, var.getClassPath());
    EvaluatorParameters kernelParameters = new EvaluatorParameters(params);

    GroovyEvaluator groovyEvaluator = new GroovyEvaluator("123",
            "345",
            cellExecutor(),
            getTestTempFolderFactory(),
            kernelParameters,
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock());
    groovyEvaluator.updateEvaluatorParameters(kernelParameters);
    groovyClassLoader = newEvaluator(groovyEvaluator.getImports(), groovyEvaluator.getClasspath(), groovyEvaluator.getOutDir(), icz, newParentClassLoader(groovyEvaluator.getClasspath()));
    scriptBinding = new Binding();
    scriptBinding.setVariable("beaker", groovyEvaluator.getBeakerX());
    groovyKernel = new GroovyKernelMock("groovyEvaluatorTest", groovyEvaluator);
    KernelManager.register(groovyKernel);
  }

  @AfterClass
  public static void tearDown() throws Exception {
    KernelManager.register(null);
    groovyKernel.exit();
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
