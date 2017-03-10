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

import com.twosigma.beaker.evaluator.GroovyEvaluator;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import com.twosigma.jupyter.message.Message;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CommKernelControlGetDefaultShellHandlerTest {

  private CommKernelControlGetDefaultShellHandler commHandler;
  private GroovyKernelJupyterTest groovyKernel;
  private Message message;

  @Before
  public void setUp() {
    String id = "1";
    groovyKernel = new GroovyKernelJupyterTest(id, new GroovyEvaluator(id, id));
    commHandler = new CommKernelControlGetDefaultShellHandler(groovyKernel) {
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

  //  @Test
  public void handleGetDefaultShellMessage_shouldSendShellSocketMessage() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
  }

  //  @Test
  public void handleNotGetDefaultShellMessage_notSendShellSocketMessage() throws Exception {
    //given
    Map<String, Serializable> content = new HashMap<>();
    content.put(Comm.DATA, new HashMap<>());
    message.setContent(content);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isEmpty();
  }

  //  @Test
  public void handleGetDefaultShellMessage_sentMessageHasCommId() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat((String) sendMessage.getContent().get(Comm.COMM_ID)).isNotEmpty();
  }

  //  @Test
  public void handleGetDefaultShellMessage_sentMessageHasKernelControlResponse() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat((Map) sendMessage.getContent().get(Comm.DATA)).isNotEmpty();
    Map<String, Serializable> shell = (Map) sendMessage.getContent().get(Comm.DATA);
    Assertions.assertThat(
            (Map) shell.get(CommKernelControlGetDefaultShellHandler.KERNEL_CONTROL_RESPONSE))
            .isNotEmpty();
  }

  //  @Test
  public void handleGetDefaultShellMessage_sentMessageHasImportsData() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishMessages().get(0);
    Map<String, Serializable> response =
            (Map)
                    ((Map) sendMessage.getContent().get(Comm.DATA))
                            .get(CommKernelControlGetDefaultShellHandler.KERNEL_CONTROL_RESPONSE);
    Assertions.assertThat(response.containsKey(CommKernelControlSetShellHandler.IMPORTS)).isTrue();
    Assertions.assertThat((List) response.get(CommKernelControlSetShellHandler.IMPORTS))
            .isNotEmpty();
  }

  //  @Test
  public void handleGetDefaultShellMessage_sentMessageHasClasspathData() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getPublishMessages().get(0);
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
