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
package com.twosigma.beakerx.kotlin.kernel;

import com.twosigma.beakerx.BeakerXCommRepositoryMock;
import com.twosigma.beakerx.BeakerXServerMock;
import com.twosigma.beakerx.KernelExecutionTest;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.MagicCommandConfigurationMock;
import com.twosigma.beakerx.RuntimetoolsMock;
import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.Configuration;
import com.twosigma.beakerx.kernel.CustomMagicCommandsEmptyImpl;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kotlin.evaluator.KotlinEvaluator;

import static com.twosigma.beakerx.evaluator.EvaluatorTest.KERNEL_PARAMETERS;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getCacheFolderFactory;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;

public class KotlinKernelTest extends KernelExecutionTest {

  @Override
  protected Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    MagicCommandConfigurationMock magicCommandConfiguration = new MagicCommandConfigurationMock();
    KotlinEvaluator evaluator = new KotlinEvaluator(sessionId,
            sessionId,
            cellExecutor(),
            getTestTempFolderFactory(),
            KERNEL_PARAMETERS,
            new EvaluatorTest.BeakexClientTestImpl(),
            magicCommandConfiguration.patterns(),
            new ClasspathScannerMock()
    );
    return new Kotlin(sessionId,
            evaluator,
            new Configuration(
                    kernelSocketsFactory,
                    closeKernelAction,
                    getCacheFolderFactory(),
                    new CustomMagicCommandsEmptyImpl(),
                    new BeakerXCommRepositoryMock(),
                    BeakerXServerMock.create(),
                    magicCommandConfiguration,
                    new KernelTest.BeakerXJsonMock(),
                    new RuntimetoolsMock()));
  }

  @Override
  protected String codeForVerifyingAddedDemoJar() {
    return "import com.example.Demo\n" +
            "Demo().getObjectTest()";
  }

  @Override
  protected String getObjectTestMethodFromAddedDemoJar() {
    return "Demo().getObjectTest()";
  }

  @Override
  protected String unimportErrorMessage() {
    return "unresolved reference";
  }
}
