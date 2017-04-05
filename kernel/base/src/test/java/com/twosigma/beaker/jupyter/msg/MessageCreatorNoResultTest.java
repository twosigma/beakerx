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
package com.twosigma.beaker.jupyter.msg;

import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.jvm.object.OutputCell;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.jupyter.message.Message;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class MessageCreatorNoResultTest {

  private MessageCreator messageCreator;

  @Before
  public void setUp() throws Exception {
    messageCreator = new MessageCreator(new KernelTest("id1"));
  }

  @Test
  public void noResult() throws Exception {
    //given
    SimpleEvaluationObject seo = new SimpleEvaluationObject("code");
    seo.setJupyterMessage(new Message());
    seo.finished(OutputCell.HIDDEN);
    //when
    List<MessageHolder> messages = messageCreator.createMessage(seo);
    //then
    messages.forEach( m -> assertThat(JupyterMessages.EXECUTE_RESULT).isNotEqualTo(m.getMessage().type()));
  }
}