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

import com.twosigma.beaker.groovy.GroovyKernelTest;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import com.twosigma.jupyter.message.Message;
import org.junit.Test;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CommKernelControlSetShellHandlerTest {

  private CommKernelControlSetShellHandler commHandler;
  private GroovyKernelTest groovyKernel;
  private Message message;

  @Before
  public void setUp() {
    groovyKernel = new GroovyKernelTest();
    commHandler = new CommKernelControlSetShellHandler(groovyKernel);
    message = new Message();
  }

  @Test
  public void handleMessage_shouldSendShellSocketMessage() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
  }

  @Test
  public void handleMessageWithoutData_notSendShellSocketMessage() throws Exception {
    //given
    Map<String, Serializable> content = new HashMap<>();
    content.put("comm_id", "commIdValue");
    message.setContent(content);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isEmpty();
  }

  @Test
  public void handleMessage_setShellOptions() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.isSetShellOptions()).isTrue();
  }

  private void initMessageData(Message message) {
    Map<String, List<String>> data = new HashMap<>();
    List<String> imports = new ArrayList<>();
    imports.add("com.twosigma.beaker.chart.Color");
    data.put(CommKernelControlSetShellHandler.IMPORTS, imports);
    data.put(CommKernelControlSetShellHandler.CLASSPATH, new ArrayList<>());

    Map<String, Serializable> content = new HashMap<>();
    content.put("comm_id", "commIdValue");
    content.put(Comm.DATA, (Serializable) data);
    message.setContent(content);
  }
}
