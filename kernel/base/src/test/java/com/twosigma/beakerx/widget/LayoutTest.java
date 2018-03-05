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

package com.twosigma.beakerx.widget;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.jupyter.SearchMessages;
import com.twosigma.beakerx.kernel.KernelManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

public class LayoutTest {

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
  public void shouldSendCommOpenWhenCreate() throws Exception {
    //given
    //when
    new Layout();
    //then
    Assertions.assertThat(
        SearchMessages.getListWidgetsByModelName(kernel.getPublishedMessages(), Layout.MODEL_NAME_VALUE)
    ).isNotEmpty();
  }

  @Test
  public void setAlignItems_hasThatAlignItems() throws Exception {
    String expected = "test";
    //given
    Layout layout = layout();
    //when
    layout.setAlign_items(expected);
    //then
    Assertions.assertThat(layout.getAlign_items()).isEqualTo(expected);
  }

  @Test
  public void setDisplay_hasThatDisplay() throws Exception {
    String expected = "test";
    //given
    Layout layout = layout();
    //when
    layout.setDisplay(expected);
    //then
    Assertions.assertThat(layout.getDisplay()).isEqualTo(expected);
  }

  @Test
  public void setFlexFlow_hasThatFlexFlow() throws Exception {
    String expected = "test";
    //given
    Layout layout = layout();
    //when
    layout.setFlex_flow(expected);
    //then
    Assertions.assertThat(layout.getFlex_flow()).isEqualTo(expected);
  }

  @Test
  public void setHeight_hasThatHeight() throws Exception {
    String expected = "10";
    //given
    Layout layout = layout();
    //when
    layout.setHeight(expected);
    //then
    Assertions.assertThat(layout.getHeight()).isEqualTo(expected);
  }

  @Test
  public void setWidth_hasThatWidth() throws Exception {
    String expected = "20";
    //given
    Layout layout = layout();
    //when
    layout.setWidth(expected);
    //then
    Assertions.assertThat(layout.getWidth()).isEqualTo(expected);
  }

  private Layout layout() throws NoSuchAlgorithmException {
    Layout widget = new Layout();
    kernel.clearPublishedMessages();
    return widget;
  }

}
