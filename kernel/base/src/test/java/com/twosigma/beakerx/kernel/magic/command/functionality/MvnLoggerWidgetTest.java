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
package com.twosigma.beakerx.kernel.magic.command.functionality;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.TestWidgetUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Optional;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class MvnLoggerWidgetTest {

  private KernelTest kernel;
  private MvnDownloadLoggerWidget sut;

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
  public void sendLogMessage() throws Exception {
    //given
    Message parentMessage = commMsg();
    sut = new MvnDownloadLoggerWidget(parentMessage);
    //when
    sut.sendLog("Downloaded: https://repo/someJar.jar (6 KB at 62.7 KB/sec)");
    //then
    Optional<Message> message = EvaluatorResultTestWatcher.waitForUpdateMessage(kernel);
    assertThat(message).isPresent();
    String value = (String) TestWidgetUtils.getState(message.get()).get("value");
    assertThat(value).contains("downloaded");
  }

}