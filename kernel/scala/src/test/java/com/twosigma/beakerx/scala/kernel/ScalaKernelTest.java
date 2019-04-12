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
package com.twosigma.beakerx.scala.kernel;

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
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.scala.evaluator.NoBeakerxObjectTestFactory;
import com.twosigma.beakerx.scala.evaluator.ScalaEvaluator;
import org.junit.Test;

import java.util.Map;
import java.util.Optional;

import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForErrorMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getCacheFolderFactory;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static org.assertj.core.api.Assertions.assertThat;

public class ScalaKernelTest extends KernelExecutionTest {

  @Override
  protected Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    MagicCommandConfigurationMock magicCommandConfiguration = new MagicCommandConfigurationMock();
    ScalaEvaluator evaluator = new ScalaEvaluator(
            sessionId,
            sessionId,
            cellExecutor(),
            new NoBeakerxObjectTestFactory(),
            getTestTempFolderFactory(),
            EvaluatorTest.KERNEL_PARAMETERS,
            new EvaluatorTest.BeakexClientTestImpl(),
            magicCommandConfiguration.patterns(),
            new ClasspathScannerMock());
    return new Scala(sessionId,
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
  protected String unimportErrorMessage() {
    return "not found: type";
  }

  @Test
  public void inputOutputProblem() throws Exception {
    //given
    //when
    runInputOutputStatement("line 1", "first input");
    addDemoJar();
    runInputOutputStatement("line 3", "third input");
    runInputOutputStatement("line 4", "fourth input");
    //then
  }

  private void runInputOutputStatement(String line, String input) throws InterruptedException {
    getKernelSocketsService().clear();
    String code = "println(\"" + line + "\"); \"" + input + "\"";
    Message message = getExecuteRequestMessage(code);
    getKernelSocketsService().handleMsg(message);
    Optional<Message> idleMessage = waitForIdleMessage(getKernelSocketsService().getKernelSockets());
    assertThat(idleMessage).isPresent();
    Optional<Message> result = waitForResult(getKernelSocketsService().getKernelSockets());
    assertThat(result).isPresent();
    verifyFirstInput(result.get(), input);
  }

  private void verifyFirstInput(Message message, String result) {
    Map actual = ((Map) message.getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(result).contains(value);
  }

  @Test
  public void noKeepVariablesWhenAddJar() throws Exception {
    //given
    //when
    runStatement("val aaa  = 1 ");
    addDemoJar();
    runStatement("aaa");
    //then
    Optional<Message> result = waitForErrorMessage(getKernelSocketsService().getKernelSockets());
    assertThat(result).isPresent();
    assertThat((String) result.get().getContent().get("text")).contains("not found");
  }

  private void runStatement(String code) throws InterruptedException {
    getKernelSocketsService().clear();
    Message message = getExecuteRequestMessage(code);
    getKernelSocketsService().handleMsg(message);
    Optional<Message> idleMessage = waitForIdleMessage(getKernelSocketsService().getKernelSockets());
    assertThat(idleMessage).isPresent();
  }

}