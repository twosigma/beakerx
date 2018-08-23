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
package com.twosigma.beakerx.kernel.magic.command.functionality;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.TestWidgetUtils;
import org.junit.Before;
import org.junit.Test;

import java.util.Optional;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.mimetype.MIMEContainer.MIME.TEXT_PLAIN;
import static org.assertj.core.api.Assertions.assertThat;

public class AsyncMagicCommandTest {

  public static final String CODE = "1+1";
  private KernelTest kernel;
  private EvaluatorTest.BeakexClientTestImpl beakerXClient;

  @Before
  public void setUp() throws Exception {
    beakerXClient = new EvaluatorTest.BeakexClientTestImpl();
    EvaluatorTest evaluator = new EvaluatorTest(beakerXClient);
    this.kernel = new KernelTest("id2", evaluator);
  }

  @Test
  public void returnResult() throws InterruptedException {
    Optional<Message> result = evaluateInAsync();
    assertThat(result.isPresent());
    assertThat(TestWidgetUtils.getData(result.get()).get(TEXT_PLAIN)).isEqualTo(CODE);
  }

  @Test
  public void closeCancelButton() throws InterruptedException {
    evaluateInAsync();
    assertThat(kernel.getPublishedMessages().stream().anyMatch(m -> m.type().equals(JupyterMessages.COMM_CLOSE))).isTrue();
  }

  private Optional<Message> evaluateInAsync() throws InterruptedException {
    String allCode = AsyncMagicCommand.ASYNC + "\n"
            + CODE;
    Code code = CodeFactory.create(allCode, commMsg(), kernel);
    //when
    code.execute(kernel, 1);
    //then
    return EvaluatorResultTestWatcher.waitForResult(kernel);
  }

  @Test
  public void tagOption() throws InterruptedException {
    String allCode = AsyncMagicCommand.ASYNC + " --then tag1\n"
            + CODE;
    Code code = CodeFactory.create(allCode, commMsg(), kernel);
    //when
    code.execute(kernel, 1);
    //then
    Optional<String> tag = EvaluatorResultTestWatcher.waitForProperty(() -> {
      String lastRunByTag = beakerXClient.getLastRunByTag();
      return Optional.ofNullable(lastRunByTag);
    });
    assertThat(tag.get()).isEqualTo("tag1");
  }

}