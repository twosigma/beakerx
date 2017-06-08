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
package com.twosigma.beaker.groovy.examples;

import com.twosigma.beaker.easyform.EasyFormView;
import com.twosigma.beaker.groovy.GroovyKernelSetupTest;
import com.twosigma.jupyter.message.Message;
import org.junit.Test;

import java.util.Optional;

import static com.twosigma.beaker.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beaker.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static org.assertj.core.api.Assertions.assertThat;

public class GroovyEasyFormTest extends GroovyKernelSetupTest {

  @Test
  public void evaluateEasyForm() throws Exception {
    //given
    String code = "" +
            "f = new EasyForm(\"Form and Run\")\n" +
            "f.addTextField(\"first\", 250)\n" +
            "f['first'] = \"First\"\n" +
            "f.addTextField(\"last\", 250)\n" +
            "f['last'] = \"Last\"\n" +
            "f.addButton(\"Go!\", \"run\")\n" +
            "f";
    Message message = getExecuteRequestMessage(code);
    //when
    kernelSocketsService.handleMsg(message);
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    //then
    assertThat(idleMessage).isPresent();
    assertMessageExists("Easy form widget was not found.", EasyFormView.VIEW_NAME_VALUE);
  }
}
