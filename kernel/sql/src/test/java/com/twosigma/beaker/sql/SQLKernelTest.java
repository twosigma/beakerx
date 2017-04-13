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
package com.twosigma.beaker.sql;

import com.twosigma.beaker.KernelSocketsServiceTest;
import com.twosigma.beaker.KernelSocketsTest;
import com.twosigma.beaker.jupyter.comm.Comm;
import com.twosigma.beaker.jupyter.msg.JupyterMessages;
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
import static com.twosigma.beaker.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beaker.sql.SqlForColorTable.CREATE_AND_SELECT_ALL;
import static com.twosigma.beaker.sql.SQLKernelParameters.DATASOURCES;
import static com.twosigma.beaker.sql.SQLKernelParameters.DEFAULT_DATASOURCE;
import static org.assertj.core.api.Assertions.assertThat;

public class SQLKernelTest {

  private SQLKernel sqlKernel;
  private KernelSocketsServiceTest kernelSocketsFactory;

  @Before
  public void setUp() throws Exception {
    String sessionId = "sessionId2";
    SQLEvaluator sqlEvaluator = new SQLEvaluator(sessionId, sessionId);
    sqlEvaluator.setShellOptions(kernelParameters());
    kernelSocketsFactory = new KernelSocketsServiceTest();
    sqlKernel = new SQLKernel(sessionId, sqlEvaluator, kernelSocketsFactory);
    new Thread(() -> KernelRunner.run(() -> sqlKernel)).start();
    kernelSocketsFactory.waitForSockets();
  }

  @After
  public void tearDown() throws Exception {
    kernelSocketsFactory.shutdown();
  }

  @Test
  public void evaluate() throws Exception {
    //given
    Message message = getExecuteRequestMessage(CREATE_AND_SELECT_ALL);
    //when
    kernelSocketsFactory.handleMsg(message);
    Optional<Message> result = waitForResult(kernelSocketsFactory.getKernelSockets());
    //then
    verifyResult(result);
  }

  private void verifyResult(Optional<Message> result) {
    assertThat(result).isPresent();
    Message message = result.get();
    Map actual = ((Map) message.getContent().get(Comm.DATA));
    String value = (String) actual.get("text/plain");
    assertThat(value).isEmpty();
    Optional<Message> tableDisplayOpenMsg = getTableDisplayOpenMsg(kernelSocketsFactory.getKernelSockets());
    assertThat(tableDisplayOpenMsg).isPresent();
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