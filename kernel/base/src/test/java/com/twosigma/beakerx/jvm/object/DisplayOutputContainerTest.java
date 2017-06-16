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
package com.twosigma.beakerx.jvm.object;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.ResourceLoaderTest;
import com.twosigma.beakerx.chart.xychart.SimpleTimePlot;
import com.twosigma.beakerx.jupyter.KernelManager;
import com.twosigma.beakerx.jupyter.SearchMessages;
import com.twosigma.beakerx.jupyter.comm.Comm;
import com.twosigma.beakerx.table.TableDisplay;
import com.twosigma.beakerx.widgets.selectioncontainer.Tab;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import com.twosigma.beakerx.message.Message;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.widgets.TestWidgetUtils.*;
import static com.twosigma.beakerx.widgets.Widget.VIEW_NAME;
import static org.assertj.core.api.Assertions.assertThat;

public class DisplayOutputContainerTest {

  private KernelTest kernel;

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
  public void display_shouldAddMapToOutputContainer() throws Exception {
    //given
    List<Map<String, Object>> values = ResourceLoaderTest.readAsList("tableRowsTest.csv");
    OutputContainer oc = new OutputContainer();
    oc.leftShift(values.get(0));
    //when
    oc.display();
    //then
    verifyMap(kernel.getPublishedMessages());
  }

  private void verifyMap(List<Message> messages) {
    Message tableDisplay = SearchMessages.getListWidgetsByViewName(messages, TableDisplay.VIEW_NAME_VALUE).get(0);
    verifyInternalOpenCommMsg(tableDisplay, TableDisplay.MODEL_NAME_VALUE, TableDisplay.VIEW_NAME_VALUE);
    Message model = SearchMessages.getListByDataAttr(messages, Comm.METHOD, Comm.UPDATE).get(0);
    assertThat(getValueForProperty(model, "model", Map.class)).isNotEmpty();
    verifyDisplayMsg(messages);
  }

  @Test
  public void display_shouldDisplayOutputContainerWithTabLayout() throws Exception {
    //given
    List<Map<String, Object>> values = ResourceLoaderTest.readAsList("tableRowsTest.csv");
    OutputContainer oc = new OutputContainer();
    SimpleTimePlot simpleTimePlot = new SimpleTimePlot(values, Arrays.asList("m3", "y1"));
    oc.setLayoutManager(new TabbedOutputContainerLayoutManager());
    oc.addItem(simpleTimePlot, "Scatter with History");
    //when
    oc.display();
    //then
    verifyTabLayout(kernel.getPublishedMessages());
  }

  private void verifyTabLayout(List<Message> publishedMessages) {
    Message tab = SearchMessages.getListWidgetsByViewName(publishedMessages, Tab.VIEW_NAME_VALUE).get(0);
    Map data = getData(tab);
    assertThat(data.get(VIEW_NAME)).isEqualTo(Tab.VIEW_NAME_VALUE);
  }

}