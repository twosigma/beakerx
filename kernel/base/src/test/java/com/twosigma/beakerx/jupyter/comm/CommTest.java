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

package com.twosigma.beakerx.jupyter.comm;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.kernel.comm.Comm;
import org.junit.After;
import org.junit.Before;
import com.twosigma.beakerx.message.Message;
import org.junit.Test;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_MSG;
import static org.assertj.core.api.Assertions.assertThat;

public class CommTest {

  private KernelTest kernel;
  private Comm comm;

  @Before
  public void setUp() {
    kernel = new KernelTest();
    KernelManager.register(kernel);
    comm = new Comm("targetName");
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void commCreatedWithParentMessageShouldAlwaysSendHeaderFromThisParentMessage() throws NoSuchAlgorithmException {
    //given
    submitCodeToExecution();
    //when
    Message parentMessage = commMsg();
    comm.open(parentMessage);
    assertThat(kernel.getPublishedMessages().get(0).getParentHeader()).isEqualTo(parentMessage.getHeader());
    kernel.clearPublishedMessages();
    //then
    comm.send(COMM_MSG, Comm.Buffer.EMPTY, comm.getData());
    assertThat(kernel.getPublishedMessages().get(0).getParentHeader()).isEqualTo(parentMessage.getHeader());
  }

  @Test
  public void commCreatedWithoutParentMessageShouldAlwaysSendHeaderFromMessageGivenFromInternalVariable() throws NoSuchAlgorithmException {
    // code from first execution
    Message message1 = submitCodeToExecution();
    comm.open();
    assertThat(kernel.getPublishedMessages().get(0).getParentHeader()).isEqualTo(message1.getHeader());
    kernel.clearPublishedMessages();
    // code from second execution
    Message message2 = submitCodeToExecution();
    comm.send(COMM_MSG, Comm.Buffer.EMPTY, comm.getData());
    assertThat(kernel.getPublishedMessages().get(0).getParentHeader()).isEqualTo(message2.getHeader());
  }

  private Message submitCodeToExecution() {
    SimpleEvaluationObject value = new SimpleEvaluationObject("ok");
    Message jupyterMessage = commMsg();
    value.setJupyterMessage(jupyterMessage);
    InternalVariable.setValue(value);
    return jupyterMessage;
  }

  @Test
  public void commOpen_shouldSendIOPubSocketMessage() throws NoSuchAlgorithmException {
    //when
    comm.open();
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    assertThat(kernel.getPublishedMessages().get(0)).isNotNull();
  }

  @Test
  public void commOpen_shouldAddCommToStorageMap() throws NoSuchAlgorithmException {
    //when
    comm.open();
    //then
    assertThat(kernel.isCommPresent(comm.getCommId())).isTrue();
  }

  @Test
  public void commOpen_sentMessageHasTypeIsCommOpen() throws NoSuchAlgorithmException {
    //when
    comm.open();
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = kernel.getPublishedMessages().get(0);
    assertThat(sendMessage.getHeader().getType())
            .isEqualTo(JupyterMessages.COMM_OPEN.getName());
  }

  @Test
  public void commOpen_sentMessageHasCommId() throws NoSuchAlgorithmException {
    //when
    comm.open();
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = kernel.getPublishedMessages().get(0);
    assertThat((String) sendMessage.getContent().get(Comm.COMM_ID)).isNotEmpty();
  }

  @Test
  public void commOpen_sentMessageHasTargetName() throws NoSuchAlgorithmException {
    //when
    comm.open();
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = kernel.getPublishedMessages().get(0);
    assertThat((String) sendMessage.getContent().get(Comm.TARGET_NAME)).isNotEmpty();
  }

  @Test
  public void commOpen_sentMessageHasData() throws NoSuchAlgorithmException {
    initCommData(comm);
    //when
    comm.open();
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = kernel.getPublishedMessages().get(0);
    assertThat((Map) sendMessage.getContent().get(Comm.DATA)).isNotEmpty();
  }

  @Test
  public void commOpen_sentMessageHasTargetModule() throws NoSuchAlgorithmException {
    //given
    comm.setTargetModule("targetModuleName");
    //when
    comm.open();
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = kernel.getPublishedMessages().get(0);
    assertThat((String) sendMessage.getContent().get(Comm.TARGET_MODULE)).isNotEmpty();
  }

  @Test
  public void commClose_shouldSendIOPubSocketMessage() throws NoSuchAlgorithmException {
    //when
    comm.close();
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    assertThat(kernel.getPublishedMessages().get(0)).isNotNull();
  }

  @Test
  public void commClose_shouldRemoveCommFromStorageMap() throws NoSuchAlgorithmException {
    //when
    comm.close();
    //then
    assertThat(kernel.isCommPresent(comm.getCommId())).isFalse();
  }

  @Test
  public void commClose_sentMessageHasTypeIsCommClose() throws NoSuchAlgorithmException {
    //when
    comm.close();
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = kernel.getPublishedMessages().get(0);
    assertThat(sendMessage.getHeader().getType())
            .isEqualTo(JupyterMessages.COMM_CLOSE.getName());
  }

  @Test
  public void commClose_sentMessageHasEmptyData() throws NoSuchAlgorithmException {
    initCommData(comm);
    //when
    comm.close();
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = kernel.getPublishedMessages().get(0);
    assertThat((Map) sendMessage.getContent().get(Comm.DATA)).isEmpty();
  }

  @Test
  public void commSend_shouldSendIOPubSocketMessage() throws NoSuchAlgorithmException {
    //when
    comm.send(COMM_MSG, Comm.Buffer.EMPTY, comm.getData());
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    assertThat(kernel.getPublishedMessages().get(0)).isNotNull();
  }

  @Test
  public void commSend_sentMessageHasTypeIsCommClose() throws NoSuchAlgorithmException {
    //when
    comm.send(COMM_MSG, Comm.Buffer.EMPTY, comm.getData());
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = kernel.getPublishedMessages().get(0);
    assertThat(sendMessage.getHeader().getType())
            .isEqualTo(JupyterMessages.COMM_MSG.getName());
  }

  @Test
  public void commSend_sentMessageHasCommId() throws NoSuchAlgorithmException {
    //when
    comm.send(COMM_MSG, Comm.Buffer.EMPTY, comm.getData());
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = kernel.getPublishedMessages().get(0);
    assertThat((String) sendMessage.getContent().get(Comm.COMM_ID)).isNotEmpty();
  }

  @Test
  public void commClose_sentMessageHasData() throws NoSuchAlgorithmException {
    initCommData(comm);
    //when
    comm.send(COMM_MSG, Comm.Buffer.EMPTY, comm.getData());
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = kernel.getPublishedMessages().get(0);
    assertThat((Map) sendMessage.getContent().get(Comm.DATA)).isNotEmpty();
  }

  private void initCommData(Comm comm) {
    HashMap<String, Serializable> data = new HashMap<>();
    data.put("model_module", "value");
    comm.setData(data);
  }
}
