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
package com.twosigma.beaker.widgets;

import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.ResourceLoaderTest;
import com.twosigma.beaker.chart.xychart.SimpleTimePlot;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.jvm.object.OutputContainer;
import com.twosigma.beaker.jvm.object.TabbedOutputContainerLayoutManager;
import com.twosigma.beaker.table.TableDisplay;
import com.twosigma.beaker.widgets.selectioncontainer.Tab;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import com.twosigma.jupyter.message.Message;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static com.twosigma.beaker.widgets.TestWidgetUtils.*;
import static com.twosigma.beaker.widgets.Widget.VIEW_NAME;
import static org.assertj.core.api.Assertions.assertThat;

public class DisplayOutputContainerTest {

  private KernelTest groovyKernel;

  @Before
  public void setUp() throws Exception {
    groovyKernel = new KernelTest();
    KernelManager.register(groovyKernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }


  @Test
  public void shouldAddMapToOutputContainerTest() throws Exception {
    //given
    List<Map<String, Object>> values = ResourceLoaderTest.readAsList("tableRowsTest.csv");
    OutputContainer oc = new OutputContainer();
    oc.leftShift(values.get(0));
    //when
    DisplayOutputContainer.display(oc);
    //then
    verifyMap(groovyKernel.getPublishedMessages());
  }

  private void verifyMap(List<Message> messages) {
    Message tableDisplay = messages.get(0);
    verifyInternalOpenCommMsg(tableDisplay, TableDisplay.MODEL_NAME_VALUE, TableDisplay.VIEW_NAME_VALUE);
    Message model = messages.get(1);
    assertThat(getValueForProperty(model, "model", String.class)).isNotEmpty();
    verifyDisplayMsg(messages.get(2));
  }

  @Test
  public void shouldDisplayOutputContainerWithTabLayoutTest() throws Exception {
    //given
    List<Map<String, Object>> values = ResourceLoaderTest.readAsList("tableRowsTest.csv");
    OutputContainer oc = new OutputContainer();
    SimpleTimePlot simpleTimePlot = new SimpleTimePlot(values, Arrays.asList("m3", "y1"));
    oc.setLayoutManager(new TabbedOutputContainerLayoutManager());
    oc.addItem(simpleTimePlot, "Scatter with History");
    //when
    DisplayOutputContainer.display(oc);
    //then
    verifyTabLayout(groovyKernel.getPublishedMessages());
  }

  private void verifyTabLayout(List<Message> publishedMessages) {
    Message tab = publishedMessages.get(2);
    Map data = getData(tab);
    assertThat(data.get(VIEW_NAME)).isEqualTo(Tab.VIEW_NAME_VALUE);
  }

}