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
package com.twosigma.beakerx.widgets.selectioncontainer;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.widgets.Widget;
import com.twosigma.beakerx.widgets.integers.IntSlider;
import com.twosigma.beakerx.widgets.strings.Text;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import com.twosigma.beakerx.message.Message;

import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.widgets.TestWidgetUtils.getData;
import static com.twosigma.beakerx.widgets.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beakerx.widgets.TestWidgetUtils.verifyInternalOpenCommMsgWitLayout;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;

public class TabTest {

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
  public void shouldSendCommOpenWhenCreateWithChildren() throws Exception {
    //given
    List<Widget> children = asList(new IntSlider(), new Text());
    kernel.clearPublishedMessages();
    //when
    new Tab(children, asList("t1", "t2"));
    //then
    verifyInternalOpenCommMsgWitLayout(kernel.getPublishedMessages(), Tab.MODEL_NAME_VALUE, Tab.VIEW_NAME_VALUE);
    verifyChildren(children);
    verifyTitles();
  }

  private void verifyChildren(List<Widget> children) {
    Message message = kernel.getPublishedMessages().get(1);
    Map data = getData(message);
    Object[] objects = (Object[]) data.get(Tab.CHILDREN);
    assertThat(objects[0]).isEqualTo(Tab.IPY_MODEL + children.get(0).getComm().getCommId());
    assertThat(objects[1]).isEqualTo(Tab.IPY_MODEL + children.get(1).getComm().getCommId());
  }

  private void verifyTitles() {
    Message titlesMessage = kernel.getPublishedMessages().get(2);
    Map titles = (Map) getValueForProperty(titlesMessage, Tab.TITLES, Object.class);
    assertThat(titles.get(0)).isEqualTo("t1");
    assertThat(titles.get(1)).isEqualTo("t2");
  }
}