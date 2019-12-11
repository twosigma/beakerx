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
package com.twosigma.beakerx.javash.autotranslation;

import com.twosigma.beakerx.BeakerXCommRepositoryMock;
import com.twosigma.beakerx.BeakerXServerMock;
import com.twosigma.beakerx.DefaultBeakerXJsonSerializer;
import com.twosigma.beakerx.KernelSetUpFixtureTest;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.MagicCommandConfigurationMock;
import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.NamespaceClientTest;
import com.twosigma.beakerx.RuntimetoolsMock;
import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.javash.evaluator.JavaEvaluator;
import com.twosigma.beakerx.javash.kernel.Java;
import com.twosigma.beakerx.javash.kernel.JavaDefaultVariables;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.Configuration;
import com.twosigma.beakerx.kernel.CustomMagicCommandsEmptyImpl;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;
import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getCacheFolderFactory;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static org.assertj.core.api.Assertions.assertThat;

public class JavaAutotranslationTest extends KernelSetUpFixtureTest {

  private NamespaceClientTest.AutotranslationServiceTestImpl autotranslationService;

  @Override
  protected Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    autotranslationService = new NamespaceClientTest.AutotranslationServiceTestImpl();
    NamespaceClient nc = new NamespaceClient(autotranslationService, new DefaultBeakerXJsonSerializer(), new BeakerXCommRepositoryMock());
    MagicCommandConfigurationMock magicCommandConfiguration = new MagicCommandConfigurationMock();
    JavaEvaluator evaluator = new JavaEvaluator(
            sessionId,
            sessionId,
            cellExecutor(),
            getTestTempFolderFactory(),
            getKernelParameters(),
            nc,
            magicCommandConfiguration.patterns(),
            new ClasspathScannerMock());
    return new Java(sessionId,
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

  private EvaluatorParameters getKernelParameters() {
    HashMap<String, Object> kernelParameters = new HashMap<>();
    kernelParameters.put(IMPORTS, new JavaDefaultVariables().getImports());
    return new EvaluatorParameters(kernelParameters);
  }

  @Test
  public void transformFromJsonToJavaObject() throws Exception {
    //given
    autotranslationService.update("foo", "\"Hello\"");
    //when
    String code = "return " + NamespaceClient.NAMESPACE_CLIENT + ".get(\"foo\");";
    Message message = getExecuteRequestMessage(code);
    kernelSocketsService.handleMsg(message);
    //then
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    Optional<Message> result = waitForResult(kernelSocketsService.getKernelSockets());
    verifyJavaObject(result.get());
  }

  private void verifyJavaObject(Message message) {
    Map actual = ((Map) message.getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).isNotEmpty();
    assertThat(value).contains("Hello");
  }

}