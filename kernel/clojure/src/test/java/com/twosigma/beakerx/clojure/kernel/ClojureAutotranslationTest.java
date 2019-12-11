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
package com.twosigma.beakerx.clojure.kernel;

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
import com.twosigma.beakerx.clojure.evaluator.ClojureEvaluator;
import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.Configuration;
import com.twosigma.beakerx.kernel.CustomMagicCommandsEmptyImpl;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;
import org.junit.Test;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Optional;

import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.KERNEL_PARAMETERS;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getCacheFolderFactory;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static org.assertj.core.api.Assertions.assertThat;

public class ClojureAutotranslationTest extends KernelSetUpFixtureTest {

  private NamespaceClientTest.AutotranslationServiceTestImpl autotranslationService;

  @Override
  protected Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    autotranslationService = new NamespaceClientTest.AutotranslationServiceTestImpl();
    NamespaceClient nc = new NamespaceClient(autotranslationService, new ClojureBeakerXJsonSerializer(), new BeakerXCommRepositoryMock());
    MagicCommandConfigurationMock commandConfiguration = new MagicCommandConfigurationMock();
    ClojureEvaluator evaluator = new ClojureEvaluator(
            sessionId,
            sessionId,
            cellExecutor(),
            getTestTempFolderFactory(),
            KERNEL_PARAMETERS,
            nc,
            commandConfiguration.patterns(),
            new ClasspathScannerMock());
    return new Clojure(sessionId,
            evaluator,
            new Configuration(
                    kernelSocketsFactory,
                    closeKernelAction,
                    getCacheFolderFactory(),
                    new CustomMagicCommandsEmptyImpl(),
                    new BeakerXCommRepositoryMock(),
                    BeakerXServerMock.create(),
                    commandConfiguration,
                    new KernelTest.BeakerXJsonMock(),
                    new RuntimetoolsMock()));
  }

  @Test
  public void autotranslationSetAndGet() throws Exception {
    //given
    String code = "" +
            "(beakerx :set \"foo\" 123)\n" +
            "(beakerx :get \"foo\" )";
    Message message = getExecuteRequestMessage(code);
    //when
    kernelSocketsService.handleMsg(message);
    //then
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    Optional<Message> result = waitForResult(kernelSocketsService.getKernelSockets());
    verifySetAndGetResult(result.get());
  }

  private void verifySetAndGetResult(Message message) {
    Map actual = ((Map) message.getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).isNotEmpty();
    assertThat(value).contains("123");
  }

  @Test
  public void transformFromJsonToClojureObject() throws Exception {
    //given
    autotranslationService.update("person", persons());
    //when
    String code = "(((beakerx :get \"person\") 1) \"firstName\")";
    Message message = getExecuteRequestMessage(code);
    kernelSocketsService.handleMsg(message);
    //then
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    Optional<Message> result = waitForResult(kernelSocketsService.getKernelSockets());
    verifyClojureObject(result.get());
  }

  private String persons() {
    LinkedList<Map> maps = new LinkedList<>();
    maps.addFirst(person("Amanda", "Smith", 33));
    maps.addFirst(person("John", "Doe", 26));
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      return objectMapper.writeValueAsString(maps);
    } catch (JsonProcessingException e) {
      throw new RuntimeException();
    }
  }

  private Map person(String firstName, String lastName, int age) {
    HashMap hashMap = new HashMap();
    hashMap.put("firstName", firstName);
    hashMap.put("lastName", lastName);
    hashMap.put("age", age);
    return hashMap;
  }

  private void verifyClojureObject(Message message) {
    Map actual = ((Map) message.getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).isNotEmpty();
    assertThat(value).contains("Amanda");
  }
}