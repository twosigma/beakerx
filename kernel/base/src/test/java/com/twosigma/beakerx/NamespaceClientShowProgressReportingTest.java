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
package com.twosigma.beakerx;

import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class NamespaceClientShowProgressReportingTest {

  private static String SESSION_ID = "sessionId";
  private NamespaceClient namespaceClient;
  private KernelTest kernel;

  @Before
  public void setUp() {
    namespaceClient = NamespaceClient.getBeaker(SESSION_ID);
    kernel = new KernelTest();
    KernelManager.register(kernel);
  }

  @After
  public void tearDown() throws Exception {
    kernel.exit();
    KernelManager.register(null);
  }

  @Test
  public void updateProgressReporting() throws Exception {
    //given
    SimpleEvaluationObject code = new SimpleEvaluationObject("code");
    Message jupyterMessage = commMsg();
    code.setJupyterMessage(jupyterMessage);
    InternalVariable.setValue(code);
    //when
    namespaceClient.showProgressUpdate("msg1", 20);
    namespaceClient.showProgressUpdate("msg2", 40);
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
  }

}