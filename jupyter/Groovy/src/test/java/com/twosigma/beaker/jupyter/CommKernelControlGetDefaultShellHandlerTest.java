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

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.lappsgrid.jupyter.groovy.GroovyKernelTest;
import org.lappsgrid.jupyter.groovy.msg.Message;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class CommKernelControlGetDefaultShellHandlerTest {

  private CommKernelControlGetDefaultShellHandler commHandler;
  private GroovyKernelTest groovyKernel;
  private Message message;

  @Before
  public void setUp() {
    groovyKernel = new GroovyKernelTest();
    commHandler = new CommKernelControlGetDefaultShellHandler(groovyKernel);
    message = new Message();
  }

  @Test
  public void handleGetDefaultShellMessage_shouldSendShellSocketMessage() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
  }

  @Test
  public void handleNotGetDefaultShellMessage_notSendShellSocketMessage() throws Exception {
    //given
    Map<String, Serializable> content = new HashMap<>();
    content.put(Comm.DATA, new HashMap<>());
    message.setContent(content);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isEmpty();
  }

  @Test
  public void handleGetDefaultShellMessage_publishedMessageHasCommId() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishedMessages().get(0);
    Assertions.assertThat((String) sendMessage.getContent().get(Comm.COMM_ID)).isNotEmpty();
  }

  @Test
  public void handleGetDefaultShellMessage_publishedMessageHasKernelControlResponse() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishedMessages().get(0);
    Assertions.assertThat((Map) sendMessage.getContent().get(Comm.DATA)).isNotEmpty();
    Map<String, Serializable> shell = (Map) sendMessage.getContent().get(Comm.DATA);
    Assertions.assertThat(
            (Map) shell.get(CommKernelControlGetDefaultShellHandler.KERNEL_CONTROL_RESPONSE))
        .isNotEmpty();
  }

  @Test
  public void handleGetDefaultShellMessage_publishedMessageHasImportsData() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishedMessages().get(0);
    Map<String, Serializable> response =
        (Map)
            ((Map) sendMessage.getContent().get(Comm.DATA))
                .get(CommKernelControlGetDefaultShellHandler.KERNEL_CONTROL_RESPONSE);
    Assertions.assertThat(response.containsKey(CommKernelControlSetShellHandler.IMPORTS)).isTrue();
    Assertions.assertThat(response.get(CommKernelControlSetShellHandler.IMPORTS)).isNotNull();
  }

  @Test
  public void handleGetDefaultShellMessage_publishedMessageHasClasspathData() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishedMessages().get(0);
    Map<String, Serializable> response =
        (Map)
            ((Map) sendMessage.getContent().get(Comm.DATA))
                .get(CommKernelControlGetDefaultShellHandler.KERNEL_CONTROL_RESPONSE);
    Assertions.assertThat(response.containsKey(CommKernelControlSetShellHandler.CLASSPATH))
        .isTrue();
  }

  private void initMessageData(Message message) {
    Map<String, Serializable> content = new HashMap<>();
    Map<String, Serializable> data = new HashMap<>();
    data.put(CommKernelControlGetDefaultShellHandler.GET_DEFAULT_SHELL, Boolean.TRUE);
    content.put(Comm.DATA, (Serializable) data);
    content.put(Comm.COMM_ID, "commIdValue");
    message.setContent(content);
  }
}
