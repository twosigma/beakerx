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

package com.twosigma.beaker.jupyter.comm;

import com.twosigma.beaker.KernelTest;
import org.junit.Before;
import com.twosigma.jupyter.message.Message;
import org.junit.Test;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beaker.jupyter.comm.KernelControlGetDefaultShellHandler.KERNEL_CONTROL_RESPONSE;
import static com.twosigma.jupyter.KernelParameters.KERNEL_PARAMETERS;
import static org.assertj.core.api.Assertions.assertThat;

public class CommKernelControlGetDefaultShellHandlerTest {

  private KernelControlGetDefaultShellHandler commHandler;
  private KernelTest kernel;
  private Message message;

  @Before
  public void setUp() {
    kernel = new KernelTest();
    commHandler = new KernelControlGetDefaultShellHandler(kernel) {
      @Override
      public String[] getDefaultImports() {
        return new String[0];
      }

      @Override
      public String[] getDefaultClassPath() {
        return new String[0];
      }
    };
    message = new Message();
  }

  @Test
  public void handleGetDefaultShellMessage_shouldSendShellSocketMessage() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
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
    assertThat(kernel.getPublishedMessages().size()).isEqualTo(2);
  }

  @Test
  public void handleGetDefaultShellMessage_sentMessageHasCommId() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = kernel.getPublishedMessages().get(1);
    assertThat((String) sendMessage.getContent().get(Comm.COMM_ID)).isNotEmpty();
  }

  @Test
  public void handleGetDefaultShellMessage_sentMessageHasKernelControlResponse() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = kernel.getPublishedMessages().get(1);
    assertThat((Map) sendMessage.getContent().get(Comm.DATA)).isNotEmpty();
    Map<String, Serializable> shell = (Map) sendMessage.getContent().get(Comm.DATA);
    assertThat((Map) shell.get(KERNEL_CONTROL_RESPONSE)).isNotEmpty();
  }

  @Test
  public void handleGetDefaultShellMessage_sentMessageHasImportsData() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = kernel.getPublishedMessages().get(1);
    Map<String, Serializable> response =
            (Map)((Map) sendMessage.getContent().get(Comm.DATA)).get(KERNEL_CONTROL_RESPONSE);

    Map<String, Serializable> beakerx_kernel_parameters =(Map) response.get(KERNEL_PARAMETERS);
    assertThat(beakerx_kernel_parameters.containsKey(KernelControlSetShellHandler.IMPORTS)).isTrue();
    assertThat(beakerx_kernel_parameters.get(KernelControlSetShellHandler.IMPORTS)).isNotNull();
  }

  @Test
  public void handleGetDefaultShellMessage_sentMessageHasClasspathData() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message sendMessage = kernel.getPublishedMessages().get(1);
    Map<String, Serializable> response =
            (Map)((Map) sendMessage.getContent().get(Comm.DATA)).get(KERNEL_CONTROL_RESPONSE);
    Map<String, Serializable> beakerx_kernel_parameters =(Map) response.get(KERNEL_PARAMETERS);
    assertThat(beakerx_kernel_parameters.containsKey(KernelControlSetShellHandler.CLASSPATH))
            .isTrue();
  }

  public static void initMessageData(Message message) {
    Map<String, Serializable> content = new HashMap<>();
    Map<String, Serializable> data = new HashMap<>();
    data.put(KernelControlGetDefaultShellHandler.GET_DEFAULT_SHELL, Boolean.TRUE);
    content.put(Comm.DATA, (Serializable) data);
    content.put(Comm.COMM_ID, "commIdValue");
    message.setContent(content);
  }
}
