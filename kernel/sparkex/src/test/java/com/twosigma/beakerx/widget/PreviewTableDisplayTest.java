
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
package com.twosigma.beakerx.widget;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class PreviewTableDisplayTest {

  private Button button;
  private KernelTest kernel;

  @Before
  public void setUp() {
    kernel = new KernelTest();
    KernelManager.register(kernel);
    this.button = new Button();
    new PreviewTableDisplay(new ArrayList<>(), rows -> new Map[0], this.button);
  }

  @After
  public void tearDown() {
    KernelManager.register(null);
  }

  @Test
  public void previewShouldNotHaveParentHeaderFromParentMessage() throws Exception {
    //given
    Message parentMessage = commMsg();
    kernel.clearMessages();
    //when
    button.onClick(new HashMap(), parentMessage);
    //then
    Optional<Message> message = EvaluatorResultTestWatcher.waitForDisplayDataMessage(kernel);
    assertThat(message.get().getParentHeader()).isNotEqualTo(parentMessage.getHeader());
  }
}