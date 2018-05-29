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

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.MessageFactorTest;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.EvaluatorManager;
import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.PlainCode;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.BeakerxPlot;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;

import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyInternalOpenCommMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class GroovyOutputContainerTest {

  public static final Message HEADER_MESSAGE = MessageFactorTest.commMsg();
  private EvaluatorManager groovyEvaluatorManager;
  private KernelTest groovyKernel;

  @Before
  public void setUp() throws Exception {
    BaseEvaluator evaluator = TestGroovyEvaluator.groovyEvaluator();
    groovyKernel = new KernelTest("GroovyOutputContainerTest", evaluator);
    groovyEvaluatorManager = new EvaluatorManager(groovyKernel, evaluator);
    groovyEvaluatorManager.setShellOptions(new EvaluatorParameters(new HashMap()));
    KernelManager.register(groovyKernel);
  }

  @After
  public void tearDown() {
    KernelManager.register(null);
    groovyKernel.exit();
  }

  @Test
  public void shouldAddPlotToOutputContainerTest() throws Exception {
    //given
    String code =
            "import com.twosigma.beakerx.groovy.evaluator.ResourceLoaderTest;\n" +
                    "import com.twosigma.beakerx.jvm.object.OutputContainer;\n" +
                    "import com.twosigma.beakerx.chart.xychart.SimpleTimePlot;\n" +
                    "List<Map<?, ?>> rates = ResourceLoaderTest.readAsList(\"tableRowsTest.csv\");\n" +
                    "plot2 = new SimpleTimePlot(rates, [\"m3\", \"y1\"], showLegend:false, initWidth: 300, initHeight: 400)\n" +
                    "new OutputContainer() << plot2";

    //when
    SimpleEvaluationObject evaluationObject = PlainCode.createSimpleEvaluationObject(code, groovyKernel, HEADER_MESSAGE, 1);
    TryResult seo = groovyEvaluatorManager.executeCode(code, evaluationObject);
    //then
    assertThat(seo.result()).isNotNull();
    verifyPlot(groovyKernel.getPublishedMessages());
  }

  private void verifyPlot(List<Message> messages) {
    Message tableDisplay = messages.get(0);
    verifyInternalOpenCommMsg(tableDisplay, BeakerxPlot.MODEL_NAME_VALUE, BeakerxPlot.VIEW_NAME_VALUE);
//    Message model = messages.get(1);
//    assertThat(getValueForProperty(model, "model", Map.class)).isNotEmpty();
//    verifyDisplayMsg(messages);
  }

}