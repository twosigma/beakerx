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

package com.twosigma.beaker.scala.comm;

import com.twosigma.beaker.jupyter.comm.TargetNamesEnum;
import com.twosigma.beaker.jupyter.handler.JupyterHandlerTest;
import com.twosigma.beaker.scala.ScalaKernelMock;
import com.twosigma.jupyter.handler.Handler;
import com.twosigma.jupyter.message.Message;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

public class ScalaCommOpenHandlerTest {

  private ScalaKernelMock kernel;
  private ScalaCommOpenHandler commOpenHandler;
  private String targetName = TargetNamesEnum.KERNEL_CONTROL_CHANNEL.getTargetName();

  @Before
  public void setUp() {
    kernel = new ScalaKernelMock();
    commOpenHandler = new ScalaCommOpenHandler(kernel);
  }

  @Test
  public void handleMessage_shouldSendShellSocketMessage() throws Exception {
    //given
    Message message = JupyterHandlerTest.initOpenMessage();
    //when
    commOpenHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getSentMessages()).isNotEmpty();
  }

  @Test
  public void getControlHandlersWithEmptyString_returnEmptyHandlersArray() throws Exception {
    //when
    Handler[] handlers = commOpenHandler.getKernelControlChanelHandlers("");
    //then
    Assertions.assertThat(handlers).isEmpty();
  }

  @Test
  public void getControlHandlersWithTargetName_returnNotEmptyHandlersArray() throws Exception {
    //when
    Handler[] handlers = commOpenHandler.getKernelControlChanelHandlers(targetName);
    //then
    Assertions.assertThat(handlers).isNotEmpty();
  }
}
