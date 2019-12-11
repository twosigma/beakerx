/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
import com.twosigma.beakerx.DefaultBeakerXJsonSerializer;
import com.twosigma.beakerx.KernelSetUpFixtureTest;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.MagicCommandConfigurationMock;
import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.NamespaceClientTest;
import com.twosigma.beakerx.RuntimetoolsMock;
import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.Configuration;
import com.twosigma.beakerx.kernel.CustomMagicCommandsEmptyImpl;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kotlin.evaluator.KotlinEvaluator;
import com.twosigma.beakerx.message.Message;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getCacheFolderFactory;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static org.assertj.core.api.Assertions.assertThat;

public class KotlinAutotranslationTest extends KernelSetUpFixtureTest {

  private NamespaceClientTest.AutotranslationServiceTestImpl autotranslationService;

  @Override
  protected KernelFunctionality createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    autotranslationService = new NamespaceClientTest.AutotranslationServiceTestImpl();
    NamespaceClient nc = new NamespaceClient(autotranslationService, new DefaultBeakerXJsonSerializer(), new BeakerXCommRepositoryMock());
    MagicCommandConfigurationMock magicCommandConfiguration = new MagicCommandConfigurationMock();
    KotlinEvaluator evaluator = new KotlinEvaluator(sessionId,
            sessionId,
            cellExecutor(),
            getTestTempFolderFactory(),
            getEvaluatorParameters(),
            nc,
            magicCommandConfiguration.patterns(),
            new ClasspathScannerMock());
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

  private EvaluatorParameters getEvaluatorParameters() {
    KotlinDefaultVariables defaultVariables = new KotlinDefaultVariables();
    HashMap kernelParameters = new HashMap();
    kernelParameters.put(defaultVariables.IMPORTS, defaultVariables.getImports());
    return new EvaluatorParameters(kernelParameters);
  }

  @Test
  public void getAndSetAutotranslation() throws InterruptedException {
    //given
    String code = "beakerx[\"bar\"]  = mapOf(\"name\" to \"John\", \"lastName\" to \"Smith\", \"age\" to \"32\")\n" +
            "(beakerx[\"bar\"] as Map<String, String>)[\"name\"]";
    String value = "John";
    //when
    Message message = getExecuteRequestMessage(code);
    kernelSocketsService.handleMsg(message);
    //then
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    Message result = waitForResult(kernelSocketsService.getKernelSockets()).get();
    verifyResultValue(result, value);
  }

  @Test
  public void kotlinAutotranslationSetValue() throws InterruptedException {
    //given
    String code = "beakerx[\"bar\"]  = mapOf(\"key\" to \"value\")";
    String serializedMap = "{\"type\":\"TableDisplay\",\"columnNames\":[\"Key\",\"Value\"],\"values\":[[\"key\",\"value\"]],\"subtype\":\"Dictionary\"}";
    //when
    Message message = getExecuteRequestMessage(code);
    kernelSocketsService.handleMsg(message);
    //then
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    String result = autotranslationService.get("bar");
    assertThat(result).isEqualTo(serializedMap);
  }

  @Test
  public void kotlinAutotranslationGetValue() throws InterruptedException {
    //given
    String code = "(beakerx[\"bar\"] as Map<String, String>)[\"key\"]";
    String serializedMap = "{\"type\":\"TableDisplay\",\"columnNames\":[\"Key\",\"Value\"],\"values\":[[\"key\",\"value\"]],\"subtype\":\"Dictionary\"}";
    String value = "value";
    //when
    autotranslationService.update("bar", serializedMap);
    Message message = getExecuteRequestMessage(code);
    kernelSocketsService.handleMsg(message);
    //then
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    Message result = waitForResult(kernelSocketsService.getKernelSockets()).get();
    verifyResultValue(result, value);

  }

  private void verifyResultValue(Message message, String value) {
    Map actual = ((Map) message.getContent().get(Comm.DATA));
    String result = (String) actual.get("text/plain");
    assertThat(result).isEqualTo(value);
  }
}
