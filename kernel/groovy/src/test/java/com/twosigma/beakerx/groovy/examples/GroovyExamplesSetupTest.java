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
package com.twosigma.beakerx.groovy.examples;

import com.twosigma.beakerx.BeakerXCommRepositoryMock;
import com.twosigma.beakerx.BeakerXServerMock;
import com.twosigma.beakerx.KernelSocketsServiceTest;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.MagicCommandConfigurationMock;
import com.twosigma.beakerx.RuntimetoolsMock;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import com.twosigma.beakerx.groovy.kernel.Groovy;
import com.twosigma.beakerx.kernel.Configuration;
import com.twosigma.beakerx.kernel.CustomMagicCommandsEmptyImpl;
import com.twosigma.beakerx.kernel.KernelRunner;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.Widget;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.BeforeClass;

import java.io.Serializable;
import java.util.Map;

import static com.twosigma.beakerx.KernelCloseKernelAction.NO_ACTION;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getCacheFolderFactory;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getState;
import static org.junit.Assert.assertTrue;

public abstract class GroovyExamplesSetupTest {

  protected static Groovy kernel;
  protected static KernelSocketsServiceTest kernelSocketsService;
  private static Thread kernelThread;

  @BeforeClass
  public static void setUp() throws Exception {
    String sessionId = "sessionIdWidget";
    BaseEvaluator evaluator = TestGroovyEvaluator.groovyEvaluator();
    kernelSocketsService = new KernelSocketsServiceTest();
    kernel = new Groovy(sessionId,
            evaluator,
            new Configuration(
                    kernelSocketsService,
                    NO_ACTION,
                    getCacheFolderFactory(),
                    new CustomMagicCommandsEmptyImpl(),
                    new BeakerXCommRepositoryMock(),
                    BeakerXServerMock.create(),
                    new MagicCommandConfigurationMock(),
                    new KernelTest.BeakerXJsonMock(),
                    new RuntimetoolsMock()));
    kernelThread = new Thread(() -> KernelRunner.run(() -> kernel));
    kernelThread.start();
    kernelSocketsService.waitForSockets();
  }

  @AfterClass
  public static void tearDownClass() throws Exception {
    kernelSocketsService.shutdown();
    kernelThread.join();
  }

  @After
  public void tearDown() throws Exception {
    kernelSocketsService.clear();
  }

  public void assertMessageExists(final String errorMessage, final String viewNameValue) {
    assertTrue(errorMessage,
            kernelSocketsService.getPublishedMessages().stream()
                    .filter(x -> isWidget(x, viewNameValue))
                    .findFirst()
                    .isPresent());
  }

  private boolean isWidget(Message message, String viewNameValue) {
    if (message.getContent() != null) {
      Map<String, Serializable> data = getState(message);
      if (data != null) {
        Serializable easyForm = data.get(Widget.VIEW_NAME);
        if (easyForm != null) {
          return easyForm.equals(viewNameValue);
        }
      }
    }
    return false;
  }

}
