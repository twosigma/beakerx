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
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.comm.KernelControlSetShellHandler;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import com.twosigma.beakerx.message.Message;
import org.junit.Test;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CommKernelControlSetShellHandlerTest {

  private KernelControlSetShellHandler commHandler;
  private KernelTest kernel;
  private Message message;

  @Before
  public void setUp() {
    kernel = new KernelTest();
    commHandler = new KernelControlSetShellHandler(kernel);
    message = new Message();
  }

  @Test
  public void handleMessage_shouldSendShellSocketMessage() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getPublishedMessages()).isNotEmpty();
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
    Assertions.assertThat(kernel.getPublishedMessages().size()).isEqualTo(2);
  }

  @Test
  public void handleMessage_setShellOptions() throws Exception {
    //given
    initMessageData(message);
    //when
    commHandler.handle(message);
    //then
    Assertions.assertThat(kernel.isSetShellOptions()).isTrue();
  }

  private void initMessageData(Message message) {
    List<String> imports = new ArrayList<>();
    imports.add("com.twosigma.beakerx.chart.Color");


    Map<String, Object> kernelParams = new HashMap<>();
    kernelParams.put(KernelControlSetShellHandler.IMPORTS, imports);
    kernelParams.put(KernelControlSetShellHandler.CLASSPATH, new ArrayList<>());

    Map<String, Object> data = new HashMap<>();
    data.put(KernelParameters.KERNEL_PARAMETERS, kernelParams);
    Map<String, Serializable> content = new HashMap<>();
    content.put("comm_id", "commIdValue");
    content.put(Comm.DATA, (Serializable) data);
    message.setContent(content);
  }
}
