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

import com.twosigma.beakerx.KernelCloseKernelAction;
import com.twosigma.beakerx.KernelExecutionTest;
import com.twosigma.beakerx.KernelSocketsServiceTest;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelRunner;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kotlin.evaluator.KotlinEvaluator;
import org.junit.AfterClass;
import org.junit.BeforeClass;

import static com.twosigma.beakerx.evaluator.EvaluatorTest.KERNEL_PARAMETERS;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;

public class KotlinKernelTest extends KernelExecutionTest {

  protected static KernelSocketsServiceTest kernelSocketsService;
  protected static Kernel kernel;
  private static Thread kernelThread;

  @BeforeClass
  public static void setUp() throws Exception {
    String sessionId = "sessionId2";
    kernelSocketsService = new KernelSocketsServiceTest();
    kernel = createKernel(sessionId, kernelSocketsService, KernelCloseKernelAction.NO_ACTION);
    kernelThread = new Thread(() -> KernelRunner.run(() -> kernel));
    kernelThread.start();
    kernelSocketsService.waitForSockets();
  }

  @AfterClass
  public static void tearDown() throws Exception {
    kernelSocketsService.shutdown();
    kernelThread.join();
  }

  public KernelSocketsServiceTest getKernelSocketsService() {
    return kernelSocketsService;
  }

  public Kernel getKernel() {
    return kernel;
  }

  static Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    KotlinEvaluator evaluator = new KotlinEvaluator(sessionId, sessionId, cellExecutor(), getTestTempFolderFactory(), KERNEL_PARAMETERS);
    return new Kotlin(sessionId, evaluator, kernelSocketsFactory, closeKernelAction);
  }

  @Override
  protected String codeForVerifyingAddedDemoJar() {
    return "import com.example.Demo\n" +
            "Demo().getObjectTest()";
  }

}
