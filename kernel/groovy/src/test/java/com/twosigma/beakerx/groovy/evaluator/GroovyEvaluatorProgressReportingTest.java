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
package com.twosigma.beakerx.groovy.evaluator;

import com.twosigma.beakerx.BeakerXCommRepositoryMock;
import com.twosigma.beakerx.DefaultBeakerXJsonSerializer;
import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.widget.IntProgress;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import com.twosigma.beakerx.message.Message;

import java.util.List;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_CLOSE;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyDisplayMsg;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyOpenCommMsg;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyTypeMsg;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static com.twosigma.beakerx.evaluator.Evaluator.BEAKER_VARIABLE_NAME;

public class GroovyEvaluatorProgressReportingTest {

  public static final String GROOVY_EVALUATOR_PROGRESS_REPORTING_TEST = "groovyEvaluatorProgressReportingTest";
  private BaseEvaluator groovyEvaluator;
  private KernelTest groovyKernel;

  @Before
  public void setUp() throws Exception {
    groovyEvaluator = TestGroovyEvaluator.groovyEvaluator(new NamespaceClient(TestGroovyEvaluator.autotranslationService(), new DefaultBeakerXJsonSerializer(), new BeakerXCommRepositoryMock()));
    groovyKernel = new KernelTest(GROOVY_EVALUATOR_PROGRESS_REPORTING_TEST, groovyEvaluator);
    KernelManager.register(groovyKernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
    groovyKernel.exit();
  }

  @Test
  public void progressReporting() throws Exception {
    //given
    String code =
            "for ( int i = 0 ; i<5; i++) {\n" +
                    "  " + BEAKER_VARIABLE_NAME + ".showProgressUpdate(\"msg\"+i, i)\n" +
                    "}\n" +
                    "\"finished\"";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code,new KernelTest.SeoConfigurationFactoryMock(groovyKernel));
    //when
    TryResult evaluate = groovyEvaluator.evaluate(seo, code);
    //then
    assertThat(evaluate.result()).isEqualTo("finished");
    verifyProgressReporting(groovyKernel.getPublishedMessages());
  }

  private void verifyProgressReporting(List<Message> messages) {
    assertThat(messages.size()).isEqualTo(15);
    Message layout = messages.get(0);
    Message intProgress = messages.get(2);
    verifyOpenCommMsg(asList(layout, intProgress), IntProgress.MODEL_NAME_VALUE, IntProgress.VIEW_NAME_VALUE);

    verifyDisplayMsg(messages.get(3));

    verifyUpdate(messages.get(4), messages.get(5), 0);
    verifyUpdate(messages.get(6), messages.get(7), 1);
    verifyUpdate(messages.get(8), messages.get(9), 2);
    verifyUpdate(messages.get(10), messages.get(11), 3);
    verifyUpdate(messages.get(12), messages.get(13), 4);

    Message closeMessage = messages.get(14);
    verifyTypeMsg(closeMessage, COMM_CLOSE);
  }

  private void verifyUpdate(Message value, Message description, int index) {
    assertThat(getValueForProperty(value, IntProgress.VALUE, Integer.class)).isEqualTo(index);
    assertThat(getValueForProperty(description, IntProgress.DESCRIPTION, String.class)).isEqualTo("msg" + index);
  }


}
