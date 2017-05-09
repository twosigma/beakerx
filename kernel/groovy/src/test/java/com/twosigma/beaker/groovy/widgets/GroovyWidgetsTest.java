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
package com.twosigma.beaker.groovy.widgets;

import com.twosigma.beaker.KernelSocketsServiceTest;
import com.twosigma.beaker.easyform.EasyFormView;
import com.twosigma.beaker.groovy.GroovyDefaultVariables;
import com.twosigma.beaker.groovy.GroovyKernel;
import com.twosigma.beaker.groovy.evaluator.GroovyEvaluator;
import com.twosigma.jupyter.KernelParameters;
import com.twosigma.jupyter.KernelRunner;
import com.twosigma.jupyter.message.Message;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.twosigma.beaker.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beaker.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beaker.jupyter.comm.KernelControlSetShellHandler.CLASSPATH;
import static com.twosigma.beaker.jupyter.comm.KernelControlSetShellHandler.IMPORTS;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;

public class GroovyWidgetsTest {

  private static GroovyKernel kernel;
  private static KernelSocketsServiceTest kernelSocketsService;

  @BeforeClass
  public static void setUp() throws Exception {
    String sessionId = "sessionIdWidget";
    GroovyEvaluator evaluator = new GroovyEvaluator(sessionId, sessionId);
    evaluator.setShellOptions(kernelParameters());
    kernelSocketsService = new KernelSocketsServiceTest();
    kernel = new GroovyKernel(sessionId, evaluator, kernelSocketsService);
    new Thread(() -> KernelRunner.run(() -> kernel)).start();
    kernelSocketsService.waitForSockets();
  }

  @AfterClass
  public static void tearDown() throws Exception {
    kernelSocketsService.shutdown();
  }

  @Test
  public void evaluateEasyForm() throws Exception {
    //given
    String code = "" +
            "f = new EasyForm(\"Form and Run\")\n" +
            "f.addTextField(\"first\", 250)\n" +
            "f['first'] = \"First\"\n" +
            "f.addTextField(\"last\", 250)\n" +
            "f['last'] = \"Last\"\n" +
            "f.addButton(\"Go!\", \"run\")\n" +
            "f";
    Message message = getExecuteRequestMessage(code);
    //when
    kernelSocketsService.handleMsg(message);
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    //then
    assertThat(idleMessage).isPresent();
    verifyEasyFormView(kernelSocketsService);
  }

  private void verifyEasyFormView(KernelSocketsServiceTest kernelSocketsService) {
    assertTrue("Easy form widget was not found.",
            kernelSocketsService.getPublishedMessages().stream()
                    .filter(this::isEasyForm)
                    .findFirst()
                    .isPresent());
  }

  private boolean isEasyForm(Message message) {
    if (message.getContent() != null) {
      Map<String, Serializable> data = (Map<String, Serializable>) message.getContent().get("data");
      if (data != null) {
        Serializable easyForm = data.get(EasyFormView.VIEW_NAME);
        if (easyForm != null) {
          return easyForm.equals(EasyFormView.VIEW_NAME_VALUE);
        }
      }
    }
    return false;
  }

  private static KernelParameters kernelParameters() {
    GroovyDefaultVariables groovyDefaultVariables = new GroovyDefaultVariables();
    Map<String, Object> params = new HashMap<>();
    params.put(IMPORTS, groovyDefaultVariables.getImports());
    params.put(CLASSPATH, groovyDefaultVariables.getClassPath());
    return new KernelParameters(params);
  }
}
