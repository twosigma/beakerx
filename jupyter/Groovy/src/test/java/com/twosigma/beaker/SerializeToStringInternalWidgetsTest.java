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
package com.twosigma.beaker;

import com.twosigma.beaker.jupyter.Comm;
import com.twosigma.beaker.jupyter.GroovyKernelManager;
import com.twosigma.beaker.widgets.GroovyKernelTest;
import com.twosigma.beaker.widgets.TestWidgetUtils;
import com.twosigma.beaker.chart.xychart.Plot;
import com.twosigma.beaker.widgets.internal.InternalWidget;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;
import java.util.Map;

import static com.twosigma.beaker.widgets.DisplayWidget.DISPLAY;
import static com.twosigma.beaker.widgets.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beaker.widgets.internal.InternalWidget.MODEL;
import static org.assertj.core.api.Assertions.assertThat;

public class SerializeToStringInternalWidgetsTest {

  private GroovyKernelTest groovyKernel;

  @Before
  public void setUp() throws Exception {
    groovyKernel = new GroovyKernelTest();
    GroovyKernelManager.register(groovyKernel);
  }

  @After
  public void tearDown() throws Exception {
    GroovyKernelManager.register(null);
  }

  @Test
  public void shouldSendModelMsg() throws Exception {
    //give
    InternalWidget widget = createInternalWidget();
    //when
    SerializeToString.doit(widget);
    //then
    assertThat(groovyKernel.getMessages().size()).isEqualTo(2);
    String model = getValueForProperty(groovyKernel.getMessages().get(0), MODEL, String.class);
    assertThat(model).isNotNull();
  }

  @Test
  public void shouldSendDisplayMsg() throws Exception {
    //give
    InternalWidget widget = createInternalWidget();
    //when
    SerializeToString.doit(widget);
    //then
    assertThat(groovyKernel.getMessages().size()).isEqualTo(2);
    Map data = TestWidgetUtils.getData(groovyKernel.getMessages().get(1));
    assertThat(data.get(Comm.METHOD)).isEqualTo(DISPLAY);
  }

  private InternalWidget createInternalWidget() throws NoSuchAlgorithmException {
    Plot plot = new Plot();
    groovyKernel.clearMessages();
    return plot;
  }

}