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
package com.twosigma.beakerx.groovy;

import com.twosigma.beakerx.AutotranslationService;
import com.twosigma.beakerx.BeakerXClient;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.ClasspathScanner;
import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.evaluator.MagicCommandAutocompletePatternsMock;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.groovy.evaluator.GroovyEvaluator;
import com.twosigma.beakerx.groovy.kernel.GroovyDefaultVariables;
import com.twosigma.beakerx.kernel.EvaluatorParameters;

import java.util.HashMap;

import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;

public class TestGroovyEvaluator {

  public static AutotranslationService autotranslationService() {
    return new AutotranslationService() {
      @Override
      public String update(String name, String json) {
        return null;
      }

      @Override
      public String get(String name) {
        return null;
      }

      @Override
      public String close() {
        return null;
      }

      @Override
      public String getContextAsString() {
        return null;
      }
    };
  }

  public static BaseEvaluator groovyEvaluator(BeakerXClient client) {
    GroovyEvaluator evaluator = new GroovyEvaluator(
            "id",
            "sid",
            cellExecutor(),
            getTestTempFolderFactory(),
            getKernelParameters(),
            client,
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock());
    return evaluator;
  }


  public static BaseEvaluator groovyEvaluator() {
    return groovyEvaluator(new ClasspathScannerMock());
  }

  public static BaseEvaluator groovyEvaluator(ClasspathScanner classpathScanner) {
    GroovyEvaluator evaluator = new GroovyEvaluator(
            "id",
            "sid",
            cellExecutor(),
            getTestTempFolderFactory(),
            getKernelParameters(),
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            classpathScanner);
    return evaluator;
  }

  public static BaseEvaluator groovyEvaluator(TempFolderFactory tempFolderFactory) {
    GroovyEvaluator evaluator = new GroovyEvaluator(
            "id",
            "sid",
            cellExecutor(),
            tempFolderFactory,
            getKernelParameters(),
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock());
    return evaluator;
  }

  private static EvaluatorParameters getKernelParameters() {
    HashMap<String, Object> kernelParameters = new HashMap<>();
    kernelParameters.put(IMPORTS, new GroovyDefaultVariables().getImports());
    return new EvaluatorParameters(kernelParameters);
  }
}
