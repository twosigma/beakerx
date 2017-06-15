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
package com.twosigma.beakerx.sql;

import com.twosigma.beakerx.KernelSocketsServiceTest;
import com.twosigma.beakerx.KernelSocketsTest;
import com.twosigma.beakerx.jupyter.msg.JupyterMessages;
import com.twosigma.jupyter.KernelParameters;
import com.twosigma.jupyter.KernelRunner;
import com.twosigma.jupyter.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.twosigma.MessageAssertions.verifyExecuteReplyMessage;
 import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
 import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static com.twosigma.beakerx.sql.SQLForColorTable.CREATE_AND_SELECT_ALL;
import static com.twosigma.beakerx.sql.SQLKernelParameters.DATASOURCES;
import static com.twosigma.beakerx.sql.SQLKernelParameters.DEFAULT_DATASOURCE;
import static org.assertj.core.api.Assertions.assertThat;

public class SQLKernelTest {

  private SQLKernel sqlKernel;
  private KernelSocketsServiceTest kernelSocketsService;

  @Before
  public void setUp() throws Exception {
    String sessionId = "sessionId2";
    SQLEvaluator sqlEvaluator = new SQLEvaluator(sessionId, sessionId);
    kernelSocketsService = new KernelSocketsServiceTest();
    sqlKernel = new SQLKernel(sessionId, sqlEvaluator, kernelSocketsService);
    sqlKernel.setShellOptions(kernelParameters());
    new Thread(() -> KernelRunner.run(() -> sqlKernel)).start();
    kernelSocketsService.waitForSockets();
  }

  @After
  public void tearDown() throws Exception {
    kernelSocketsService.shutdown();
  }

  @Test
  public void evaluate() throws Exception {
    //given
    Message message = getExecuteRequestMessage(CREATE_AND_SELECT_ALL);
    //when
    kernelSocketsService.handleMsg(message);
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    //then
    verifyIdleMessage(idleMessage);
    verifyResult();
    verifyPublishedMsgs(kernelSocketsService);
    verifySentMsgs(kernelSocketsService);
  }

  private void verifyResult() {
    //no any other messages if widget
    Optional<Message> tableDisplayOpenMsg = getTableDisplayOpenMsg(kernelSocketsService.getKernelSockets());
    assertThat(tableDisplayOpenMsg).isPresent();
  }

  private void verifyPublishedMsgs(KernelSocketsServiceTest service) {
    assertThat(service.getBusyMessage()).isPresent();
    assertThat(service.getExecuteInputMessage()).isPresent();
    assertThat(service.getIdleMessage()).isPresent();
  }

  private void verifySentMsgs(KernelSocketsServiceTest service) {
    verifyExecuteReplyMessage(service.getReplyMessage());
  }

  private void verifyIdleMessage(Optional<Message> idleMessage) {
    assertThat(idleMessage).isPresent();
  }

  private Optional<Message> getTableDisplayOpenMsg(KernelSocketsTest kernelSocketsTest) {
    return kernelSocketsTest.getPublishedMessages().stream().
            filter(x -> x.type().equals(JupyterMessages.COMM_OPEN)).
            findFirst();
  }

  private KernelParameters kernelParameters() {
    Map<String, Object> params = new HashMap<>();
    params.put(DATASOURCES, "chemistry=jdbc:h2:mem:chemistry");
    params.put(DEFAULT_DATASOURCE, "jdbc:h2:mem:db1");
    return new KernelParameters(params);
  }
}