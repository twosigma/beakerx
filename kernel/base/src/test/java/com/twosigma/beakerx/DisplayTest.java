/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import com.twosigma.beakerx.widget.IntSlider;
import com.twosigma.beakerx.widget.Widget;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.stream.Collectors;

import static com.twosigma.beakerx.kernel.comm.Comm.METADATA;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getData;
import static org.assertj.core.api.Assertions.assertThat;

public class DisplayTest {

  private KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelTest();
    KernelManager.register(kernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void shouldSendMessageForText() {
    //given
    //when
    Display.display("Hello");
    //then
    verifyText();
  }

  private void verifyText() {
    Message message = kernel.getPublishedMessages().get(0);
    assertThat(message.type()).isEqualTo(JupyterMessages.DISPLAY_DATA);
    assertThat(getData(message).get(MIMEContainer.MIME.TEXT_PLAIN)).isEqualTo("Hello");
  }

  @Test
  public void shouldSendMessageForWidget() {
    //given
    //when
    Display.display(new IntSlider());
    //then
    verifyWidget();
  }

  private void verifyWidget() {
    Message message = kernel.getPublishedMessages().stream()
            .filter(x -> x.type().equals(JupyterMessages.DISPLAY_DATA))
            .collect(Collectors.toList()).get(0);
    assertThat(getData(message).get(Widget.APPLICATION_VND_JUPYTER_WIDGET_VIEW_JSON)).isNotNull();
  }

  @Test
  public void contentShouldContainMetadata() {
    //given
    //when
    Display.display("Hello");
    //then
    Message message = kernel.getPublishedMessages().get(0);
    assertThat(message.getContent().get(METADATA)).isNotNull();
  }
}