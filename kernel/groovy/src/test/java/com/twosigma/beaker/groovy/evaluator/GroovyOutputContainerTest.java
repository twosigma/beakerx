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
package com.twosigma.beaker.groovy.evaluator;

import com.twosigma.beaker.chart.xychart.Plot;
import com.twosigma.beaker.evaluator.EvaluatorManager;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.KernelTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import com.twosigma.jupyter.message.Message;

import java.util.List;

import static com.twosigma.beaker.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beaker.jvm.object.SimpleEvaluationObject.EvaluationStatus.FINISHED;
import static com.twosigma.beaker.widgets.TestWidgetUtils.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;

public class GroovyOutputContainerTest {

  public static final Message HEADER_MESSAGE = new Message();
  private EvaluatorManager groovyEvaluator;
  private KernelTest groovyKernel;

  @Before
  public void setUp() throws Exception {
    groovyKernel = new KernelTest();
    KernelManager.register(groovyKernel);
    groovyEvaluator = new EvaluatorManager(groovyKernel,new GroovyEvaluator("id", "sid"));
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void shouldAddPlotToOutputContainerTest() throws Exception {
    //given
    String code =
            "import com.twosigma.beaker.groovy.evaluator.ResourceLoaderTest;\n" +
            "import com.twosigma.beaker.jvm.object.OutputContainer;\n" +
            "import com.twosigma.beaker.chart.xychart.SimpleTimePlot;\n" +
            "List<Map<?, ?>> rates = ResourceLoaderTest.readAsList(\"tableRowsTest.csv\");\n" +
            "plot2 = new SimpleTimePlot(rates, [\"m3\", \"y1\"], showLegend:false, initWidth: 300, initHeight: 400)\n" +
            "new OutputContainer() << plot2";

    //when
    SimpleEvaluationObject seo = groovyEvaluator.executeCode(code, HEADER_MESSAGE, 1);
    waitForResult(seo);
    //then
    assertTrue(seo.getPayload().toString(),seo.getStatus().equals(FINISHED));
    verifyPlot(groovyKernel.getPublishedMessages());
  }

  private void verifyPlot(List<Message> messages) {
    Message tableDisplay = messages.get(0);
    verifyInternalOpenCommMsg(tableDisplay, Plot.MODEL_NAME_VALUE, Plot.VIEW_NAME_VALUE);
    Message model = messages.get(1);
    assertThat(getValueForProperty(model, "model", String.class)).isNotEmpty();
    verifyDisplayMsg(messages);
  }

}