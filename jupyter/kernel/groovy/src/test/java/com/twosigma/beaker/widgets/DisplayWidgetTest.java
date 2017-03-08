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
package com.twosigma.beaker.widgets;

import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.widgets.integers.IntSlider;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.lappsgrid.jupyter.msg.Message;

import static com.twosigma.beaker.jupyter.Comm.COMM_ID;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_MSG;
import static com.twosigma.beaker.widgets.TestWidgetUtils.getContent;
import static com.twosigma.beaker.widgets.TestWidgetUtils.verifyDisplayMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class DisplayWidgetTest {

  private GroovyKernelTest groovyKernel;

  @Before
  public void setUp() throws Exception {
    groovyKernel = new GroovyKernelTest();
    KernelManager.register(groovyKernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void shouldSendCommOpenWhenCreate() throws Exception {
    //given
    IntSlider widget = new IntSlider();
    groovyKernel.clearPublishedMessages();
    //when
    DisplayWidget.display(widget);
    //then
    verifyCommDisplayMsg(widget);
  }

  private void verifyCommDisplayMsg(IntSlider widget) {
    assertThat(groovyKernel.getPublishedMessages().size()).isEqualTo(1);
    Message message = groovyKernel.getPublishedMessages().get(0);
    assertThat(message.getHeader().getType()).isEqualTo(COMM_MSG.getName());
    verifyDisplayMsg(message);
    assertThat(getContent(message).get(COMM_ID)).isEqualTo(widget.getComm().getCommId());
  }
}