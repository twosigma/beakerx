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
package com.twosigma.beakerx.jupyter.msg;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.MessageFactorTest;
import com.twosigma.beakerx.jvm.object.OutputCell;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.kernel.msg.MessageHolder;
import com.twosigma.beakerx.message.Message;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class MessageCreatorNoResultTest {

  KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelTest("id1");
  }

  @Test
  public void noResult() throws Exception {
    //given
    SimpleEvaluationObject seo = new SimpleEvaluationObject("code");
    seo.setJupyterMessage(MessageFactorTest.commMsg());
    seo.finished(OutputCell.HIDDEN);
    //when
    List<MessageHolder> messages = MessageCreator.createMessage(seo);
    //then
    messages.forEach(m -> assertThat(JupyterMessages.EXECUTE_RESULT).isNotEqualTo(m.getMessage().type()));
  }
}