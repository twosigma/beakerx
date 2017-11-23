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
package com.twosigma.beakerx;

import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelRunner;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import org.junit.After;
import org.junit.Before;

public abstract class KernelSetUpFixtureTest {

  protected KernelSocketsServiceTest kernelSocketsService;
  protected Kernel kernel;
  private Thread kernelThread;

  @Before
  public void setUp() throws Exception {
    String sessionId = "sessionId2";
    kernelSocketsService = new KernelSocketsServiceTest();
    kernel = createKernel(sessionId, kernelSocketsService, KernelCloseKernelAction.NO_ACTION);
    kernelThread = new Thread(() -> KernelRunner.run(() -> kernel));
    kernelThread.start();
    kernelSocketsService.waitForSockets();
  }

  @After
  public void tearDown() throws Exception {
    kernelSocketsService.shutdown();
    kernelThread.join();
  }

  protected abstract Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction);

}
