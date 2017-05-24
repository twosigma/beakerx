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

package com.twosigma.beaker.jvm.object;

import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.jupyter.SearchMessages;
import com.twosigma.beaker.widgets.box.GridView;
import com.twosigma.beaker.widgets.box.HBox;
import com.twosigma.beaker.widgets.integers.IntText;
import com.twosigma.jupyter.message.Message;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

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
    Assertions.assertThat(manager.getColumns()).isEqualTo(2);
  }

  @Test
  public void createLayoutManagerWithParam_hasCountColumnsEqualsThatParam() throws Exception {
    int columns = 5;
    //when
    GridOutputContainerLayoutManager manager = new GridOutputContainerLayoutManager(columns);
    //then
    Assertions.assertThat(manager.getColumns()).isEqualTo(columns);
  }

  @Test
  public void dispaly_publishMessagesWithGridAndHBox() throws Exception {
    //given
    GridOutputContainerLayoutManager manager = new GridOutputContainerLayoutManager(2);
    OutputContainer container = new OutputContainer(Arrays.asList(new IntText(), new IntText()));
    container.setLayoutManager(manager);
    //when
    manager.display(container);
    //then
    verifyView(kernel.getPublishedMessages(), HBox.VIEW_NAME_VALUE);
    verifyView(kernel.getPublishedMessages(), GridView.VIEW_NAME_VALUE);
  }

  private void verifyView(List<Message> publishedMessages, String viewName) {
    Assertions.assertThat(
        SearchMessages.getListWidgetsByViewName(publishedMessages, viewName)).isNotEmpty();
  }

}
