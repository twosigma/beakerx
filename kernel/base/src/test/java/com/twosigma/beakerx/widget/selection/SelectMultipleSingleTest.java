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
package com.twosigma.beakerx.widget.selection;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.widget.Widget;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beakerx.widget.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyInternalOpenCommMsgWitLayout;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyMsgForProperty;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.fail;

public class SelectMultipleSingleTest {

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
  public void noSelection() throws Exception {
    SelectMultipleSingle widget = selectMultipleSingle();
    kernel.clearPublishedMessages();
    //when
    widget.setOptions(new String[]{"1", "2", "3"});
    //then
    Integer index = getValueForProperty(kernel.getPublishedMessages().get(1), Widget.INDEX, Integer.class);
    assertThat(index).isEqualTo(-1);
  }

  @Test
  public void updateValue() throws Exception {
    SelectMultipleSingle widget = selectMultipleSingle();
    widget.setOptions(new String[]{"1", "2", "3"});
    kernel.clearPublishedMessages();
    //when
    widget.updateValue(1);
    //then
    assertThat(widget.getValue()).isEqualTo(new String[]{"2"});
  }

  @Test
  public void shouldNotUpdateValueWhenArrayOfIndexes() throws Exception {
    SelectMultipleSingle widget = selectMultipleSingle();
    widget.setOptions(new String[]{"1", "2", "3"});
    kernel.clearPublishedMessages();
    //when
    try {
      widget.updateValue(asList(1, 2));
      fail("should not update value when list of indexes");
    } catch (Exception e) {
      // then
      // test passes
    }
  }

  @Test
  public void shouldSendCommOpenWhenCreate() throws Exception {
    //given
    //when
    new SelectMultipleSingle();
    //then
    verifyInternalOpenCommMsgWitLayout(kernel.getPublishedMessages(), SelectMultipleSingle.MODEL_NAME_VALUE, SelectMultipleSingle.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldSendCommMsgWhenValueChange() throws Exception {
    //given
    SelectMultipleSingle widget = selectMultipleSingle();
    widget.setOptions(new String[]{"1", "2", "3"});
    kernel.clearPublishedMessages();
    //when
    widget.setValue("2");
    //then
    verifyMsgForProperty(kernel, SelectMultiple.VALUE, new String[]{"2"});
  }

  @Test
  public void shouldSendCommMsgWhenOptionsChange() throws Exception {
    //given
    SelectMultipleSingle widget = selectMultipleSingle();
    //when
    widget.setOptions(new String[]{"2", "3"});
    //then
    verifyMsgForProperty(kernel, SelectMultiple.OPTIONS_LABELS, new String[]{"2", "3"});
  }

  private SelectMultipleSingle selectMultipleSingle() throws NoSuchAlgorithmException {
    SelectMultipleSingle widget = new SelectMultipleSingle();
    kernel.clearPublishedMessages();
    return widget;
  }


}