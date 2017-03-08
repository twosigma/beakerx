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

package com.twosigma.beaker.jupyter;

import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.lappsgrid.jupyter.msg.Message;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

public class CommTest {

  private GroovyKernelJupyterTest groovyKernel;
  private Comm comm;

  @Before
  public void setUp() {
    groovyKernel = new GroovyKernelJupyterTest();
    KernelManager.register(groovyKernel);
    comm = new Comm("targetName");
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

//  @Test
  public void commOpen_shouldSendIOPubSocketMessage() throws NoSuchAlgorithmException {
    //when
    comm.open();
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Assertions.assertThat(groovyKernel.getPublishMessages().get(0)).isNotNull();
  }

//  @Test
  public void commOpen_shouldAddCommToStorageMap() throws NoSuchAlgorithmException {
    //when
    comm.open();
    //then
    Assertions.assertThat(groovyKernel.isCommPresent(comm.getCommId())).isTrue();
  }

//  @Test
  public void commOpen_sentMessageHasTypeIsCommOpen() throws NoSuchAlgorithmException {
    //when
    comm.open();
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat(sendMessage.getHeader().getType())
        .isEqualTo(JupyterMessages.COMM_OPEN.getName());
  }

//  @Test
  public void commOpen_sentMessageHasCommId() throws NoSuchAlgorithmException {
    //when
    comm.open();
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat((String) sendMessage.getContent().get(Comm.COMM_ID)).isNotEmpty();
  }

//  @Test
  public void commOpen_sentMessageHasTargetName() throws NoSuchAlgorithmException {
    //when
    comm.open();
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat((String) sendMessage.getContent().get(Comm.TARGET_NAME)).isNotEmpty();
  }

//  @Test
  public void commOpen_sentMessageHasData() throws NoSuchAlgorithmException {
    initCommData(comm);
    //when
    comm.open();
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat((Map) sendMessage.getContent().get(Comm.DATA)).isNotEmpty();
  }

//  @Test
  public void commOpen_sentMessageHasTargetModule() throws NoSuchAlgorithmException {
    //given
    comm.setTargetModule("targetModuleName");
    //when
    comm.open();
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat((String) sendMessage.getContent().get(Comm.TARGET_MODULE)).isNotEmpty();
  }

//  @Test
  public void commClose_shouldSendIOPubSocketMessage() throws NoSuchAlgorithmException {
    //when
    comm.close();
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Assertions.assertThat(groovyKernel.getPublishMessages().get(0)).isNotNull();
  }

//  @Test
  public void commClose_shouldRemoveCommFromStorageMap() throws NoSuchAlgorithmException {
    //when
    comm.close();
    //then
    Assertions.assertThat(groovyKernel.isCommPresent(comm.getCommId())).isFalse();
  }

//  @Test
  public void commClose_sentMessageHasTypeIsCommClose() throws NoSuchAlgorithmException {
    //when
    comm.close();
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat(sendMessage.getHeader().getType())
        .isEqualTo(JupyterMessages.COMM_CLOSE.getName());
  }

//  @Test
  public void commClose_sentMessageHasEmptyData() throws NoSuchAlgorithmException {
    initCommData(comm);
    //when
    comm.close();
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat((Map) sendMessage.getContent().get(Comm.DATA)).isEmpty();
  }

//  @Test
  public void commSend_shouldSendIOPubSocketMessage() throws NoSuchAlgorithmException {
    //when
    comm.send();
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Assertions.assertThat(groovyKernel.getPublishMessages().get(0)).isNotNull();
  }

//  @Test
  public void commSend_sentMessageHasTypeIsCommClose() throws NoSuchAlgorithmException {
    //when
    comm.send();
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat(sendMessage.getHeader().getType())
        .isEqualTo(JupyterMessages.COMM_MSG.getName());
  }

//  @Test
  public void commSend_sentMessageHasCommId() throws NoSuchAlgorithmException {
    //when
    comm.send();
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat((String) sendMessage.getContent().get(Comm.COMM_ID)).isNotEmpty();
  }

//  @Test
  public void commClose_sentMessageHasData() throws NoSuchAlgorithmException {
    initCommData(comm);
    //when
    comm.send();
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat((Map) sendMessage.getContent().get(Comm.DATA)).isNotEmpty();
  }

  private void initCommData(Comm comm) {
    HashMap<String, Serializable> data = new HashMap<>();
    data.put("model_module", "value");
    comm.setData(data);
  }
}
