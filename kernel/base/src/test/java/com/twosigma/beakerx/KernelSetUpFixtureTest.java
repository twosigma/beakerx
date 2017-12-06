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

import com.twosigma.beakerx.kernel.Kernel;
import org.junit.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class KernelSetUpFixtureTest {

  protected final Logger logger = LoggerFactory.getLogger(KernelSetUpFixtureTest.class.getName());

  public abstract KernelSocketsServiceTest getKernelSocketsService();

  public abstract Kernel getKernel();

  @Before
  public void setUpBeforeTest() throws Exception {
    logger.info("setUpBeforeTest-> clear");
    getKernelSocketsService().clear();
  }
}
