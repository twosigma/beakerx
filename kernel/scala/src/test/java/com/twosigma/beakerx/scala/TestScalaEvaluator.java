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
package com.twosigma.beakerx.scala;

import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.evaluator.MagicCommandAutocompletePatternsMock;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.scala.evaluator.NoBeakerxObjectTestFactory;
import com.twosigma.beakerx.scala.evaluator.ScalaEvaluator;
import com.twosigma.beakerx.scala.kernel.ScalaDefaultVariables;

import java.util.HashMap;

import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;

public class TestScalaEvaluator {

  public static ScalaEvaluator evaluator() {
    ScalaEvaluator evaluator = new ScalaEvaluator(
            "id",
            "sid",
            cellExecutor(),
            new NoBeakerxObjectTestFactory(),
            getTestTempFolderFactory(),
            getKernelParameters(),
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock());
    return evaluator;
  }

  public static ScalaEvaluator evaluator(TempFolderFactory tempFolderFactory) {
    ScalaEvaluator evaluator = new ScalaEvaluator(
            "id",
            "sid",
            cellExecutor(),
            new NoBeakerxObjectTestFactory(),
            tempFolderFactory,
            getKernelParameters(),
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock());
    return evaluator;
  }

  public static EvaluatorParameters getKernelParameters() {
    HashMap<String, Object> kernelParameters = new HashMap<>();
    kernelParameters.put(IMPORTS, new ScalaDefaultVariables().getImports());
    return new EvaluatorParameters(kernelParameters);
  }
}
