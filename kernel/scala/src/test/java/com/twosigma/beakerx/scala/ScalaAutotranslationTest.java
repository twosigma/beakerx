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
package com.twosigma.beakerx.scala;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.BeakerXCommRepositoryMock;
import com.twosigma.beakerx.BeakerXServerMock;
import com.twosigma.beakerx.KernelSetUpFixtureTest;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.MagicCommandConfigurationMock;
import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.NamespaceClientTest;
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
import com.twosigma.beakerx.scala.evaluator.BeakerxObjectFactoryImpl;
import com.twosigma.beakerx.scala.evaluator.ScalaEvaluator;
import com.twosigma.beakerx.scala.kernel.Scala;
import com.twosigma.beakerx.scala.kernel.ScalaBeakerXJsonSerializer;
import org.junit.Test;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getCacheFolderFactory;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static org.assertj.core.api.Assertions.assertThat;

public class ScalaAutotranslationTest extends KernelSetUpFixtureTest {

  private NamespaceClientTest.AutotranslationServiceTestImpl autotranslationService;

  @Override
  protected Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    autotranslationService = new NamespaceClientTest.AutotranslationServiceTestImpl();
    NamespaceClient nc = new NamespaceClient(autotranslationService, new ScalaBeakerXJsonSerializer(), new BeakerXCommRepositoryMock());

    MagicCommandConfigurationMock magicCommandConfiguration = new MagicCommandConfigurationMock();
    ScalaEvaluator evaluator = new ScalaEvaluator(
            sessionId,
            sessionId,
            cellExecutor(),
            new BeakerxObjectFactoryImpl(),
            getTestTempFolderFactory(),
            EvaluatorTest.KERNEL_PARAMETERS,
            nc,
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


  @Test
  public void transformFromJsonToScalaObject() throws Exception {
    //given
    autotranslationService.update("bar", list());
    //when
    String code = "beakerx.bar";
    Message message = getExecuteRequestMessage(code);
    kernelSocketsService.handleMsg(message);
    //then
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    Optional<Message> result = waitForResult(kernelSocketsService.getKernelSockets());
    verifyScalaObject(result.get());
  }

  private void verifyScalaObject(Message message) {
    Map actual = ((Map) message.getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).isNotEmpty();
    assertThat(value).contains("2");
  }

  @Test
  public void transformFromJsonToScalaListHead() throws Exception {
    //given
    autotranslationService.update("bar", list());
    //when
    String code = "beakerx.bar.as[List[Any]].head";
    Message message = getExecuteRequestMessage(code);
    kernelSocketsService.handleMsg(message);
    //then
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    Optional<Message> result = waitForResult(kernelSocketsService.getKernelSockets());
    verifyScalaListHead(result.get());
  }

  private void verifyScalaListHead(Message message) {
    Map actual = ((Map) message.getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).isNotEmpty();
    assertThat(value).isEqualTo("1");
  }


  private String list() {
    List<Integer> maps = new LinkedList<>();
    maps.add(1);
    maps.add(2);
    maps.add(3);
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      return objectMapper.writeValueAsString(maps);
    } catch (JsonProcessingException e) {
      throw new RuntimeException();
    }

  }


}
