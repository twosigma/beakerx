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

package com.twosigma.beaker.groovy.evaluator;

import com.twosigma.beaker.KernelSocketsServiceTest;
import com.twosigma.beaker.groovy.GroovyDefaultVariables;
import com.twosigma.beaker.groovy.GroovyKernel;
import com.twosigma.jupyter.KernelParameters;
import com.twosigma.jupyter.KernelRunner;
import com.twosigma.jupyter.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.twosigma.beaker.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beaker.evaluator.EvaluatorResultTestWatcher.waitForResultAndReturnIdleMessage;
import static com.twosigma.beaker.jupyter.comm.KernelControlSetShellHandler.CLASSPATH;
import static com.twosigma.beaker.jupyter.comm.KernelControlSetShellHandler.IMPORTS;
import static org.assertj.core.api.Assertions.assertThat;

public class GroovyEvaluatorAutotranslationTest {

  private GroovyKernel kernel;
  private KernelSocketsServiceTest kernelSocketsService;

  @Before
  public void setUp() throws Exception {
    String sessionId = "sessionId2";
    GroovyEvaluator evaluator = new GroovyEvaluator(sessionId, sessionId);
    kernelSocketsService = new KernelSocketsServiceTest();
    kernel = new GroovyKernel(sessionId, evaluator, kernelSocketsService);
    kernel.setShellOptions(kernelParameters());
    new Thread(() -> KernelRunner.run(() -> kernel)).start();
    kernelSocketsService.waitForSockets();
  }

  @After
  public void tearDown() throws Exception {
    kernelSocketsService.shutdown();
  }

  @Test
  public void parseSetBeakerObjectScript_returnBeakerObjectValue() throws Exception {
    //given
    String code = "beaker.x = 10 ";
    runCode(code);
    kernelSocketsService.clear();
    //when
    String code2 = "beaker.x";
    runCode(code2);
    //then

  }

  @Test
  public void parseGetBeakerObjectScript_graph() throws InterruptedException {
    String code ="  def r = new Random()\n" +
            "  def nnodes = 100\n" +
            "  def nodes = []\n" +
            "  def links = []\n" +
            "\n" +
            "  for (x in (0..nnodes)){\n" +
            "    nodes.add(name:\"\" + x, group:((int) x*7/nnodes))\n" +
            "  }\n" +
            "\n" +
            "for (x in (0..(int) nnodes*1.15)) {\n" +
            "    source = x % nnodes\n" +
            "    target = ((int) log(1 + r.nextInt(nnodes))/log(1.3))\n" +
            "    value = 10.0 / (1 + abs(source - target))\n" +
            "    links.add(source: source, target: target, value: value*value)\n" +
            "  }\n" +
            "\n" +
            "beaker.graph = [nodes: nodes, links: links] \n";
    runCode(code);
    kernelSocketsService.clear();
    //when
    String code2 = "beaker.graph";
    runCode(code2);
    //then

  }

  private void runCode(String code) throws InterruptedException {
    Message message = getExecuteRequestMessage(code);
    kernelSocketsService.handleMsg(message);
    Optional<Message> idleMessage = waitForResultAndReturnIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
  }

  private KernelParameters kernelParameters() {
    GroovyDefaultVariables value = new GroovyDefaultVariables();
    Map<String, Object> params = new HashMap<>();
    params.put(IMPORTS, value.getImports());
    params.put(CLASSPATH, value.getClassPath());
    return new KernelParameters(params);
  }
}
