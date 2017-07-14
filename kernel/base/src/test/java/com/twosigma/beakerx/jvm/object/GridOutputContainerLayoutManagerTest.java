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
import com.twosigma.beakerx.chart.xychart.Plot;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.jupyter.SearchMessages;
import com.twosigma.beakerx.widgets.TestWidgetUtils;
import com.twosigma.beakerx.widgets.box.GridView;
import com.twosigma.beakerx.widgets.box.HBox;
import com.twosigma.beakerx.widgets.integers.IntText;
import com.twosigma.beakerx.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.widgets.BeakerxWidget.MODEL;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;

public class GridOutputContainerLayoutManagerTest {

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
  public void createLayoutManagerWithoutParam_hasTwoColumns() throws Exception {
    //when
    GridOutputContainerLayoutManager manager = new GridOutputContainerLayoutManager();
    //then
    assertThat(manager.getColumns()).isEqualTo(2);
  }

  @Test
  public void createLayoutManagerWithParam_hasCountColumnsEqualsThatParam() throws Exception {
    int columns = 5;
    //when
    GridOutputContainerLayoutManager manager = new GridOutputContainerLayoutManager(columns);
    //then
    assertThat(manager.getColumns()).isEqualTo(columns);
  }

  @Test
  public void dispaly_publishMessagesWithGridAndHBox() throws Exception {
    //given
    GridOutputContainerLayoutManager manager = new GridOutputContainerLayoutManager(2);
    OutputContainer container = new OutputContainer(asList(new IntText(), new IntText()));
    container.setLayoutManager(manager);
    //when
    manager.display(container);
    //then
    verifyView(kernel.getPublishedMessages(), HBox.VIEW_NAME_VALUE);
    verifyView(kernel.getPublishedMessages(), GridView.VIEW_NAME_VALUE);
  }

  @Test
  public void dispaly_activateChildren() throws Exception {
    //given
    GridOutputContainerLayoutManager manager = new GridOutputContainerLayoutManager(2);
    OutputContainer container = new OutputContainer(asList(new Plot()));
    container.setLayoutManager(manager);
    //when
    manager.display(container);
    //then
    verifyChildren(kernel);
  }

  private void verifyChildren(KernelTest kernel) {
    Map model = TestWidgetUtils.findValueForProperty(kernel, MODEL, Map.class);
    assertThat(model.get("type")).isEqualTo("Plot");
  }


  private void verifyView(List<Message> publishedMessages, String viewName) {
    assertThat(
            SearchMessages.getListWidgetsByViewName(publishedMessages, viewName)).isNotEmpty();
  }

}
