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
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.widget.TestWidgetUtils.getData;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyOpenCommMsg;

public class ImageTest {

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
  public void shouldSendCommOpenWhenCreate() throws Exception {
    //given
    //when
    new Image();
    //then
    verifyOpenCommMsg(groovyKernel.getPublishedMessages(), Image.MODEL_NAME_VALUE, Image.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldSendCommMsgWhenValueChange() throws Exception {
    //given
    Image widget = image();
    //when
    widget.setValue("picture".getBytes());
    //then
    Message message = groovyKernel.getPublishedMessages().get(0);
    Map data = getData(message);
    List<List<String>> o = (List)data.get(Comm.BUFFER_PATHS);
    Assertions.assertThat(o.get(0).get(0)).isEqualTo("value");
  }

  @Test
  public void shouldSendCommMsgWhenFormatChange() throws Exception {
    //given
    Image widget = image();
    //when
    widget.setFormat("jpg");
    //then
    TestWidgetUtils.verifyMsgForProperty(groovyKernel, Image.FORMAT, "jpg");
  }

  @Test
  public void shouldSendCommMsgWhenHeightChange() throws Exception {
    //given
    Image widget = image();
    //when
    widget.setHeight("123");
    //then
    TestWidgetUtils.verifyMsgForProperty(groovyKernel, Image.HEIGHT, "123");
  }

  @Test
  public void shouldSendCommMsgWhenWidthChange() throws Exception {
    //given
    Image widget = image();
    //when
    widget.setWidth("321");
    //then
    TestWidgetUtils.verifyMsgForProperty(groovyKernel, Image.WIDTH, "321");
  }

  @Test
  public void setWidth_hasThatWidth() throws Exception {
    String expected = "123";
    //given
    Image widget = image();
    //when
    widget.setWidth(expected);
    //then
    Assertions.assertThat(widget.getWidth()).isEqualTo(expected);
  }

  @Test
  public void setHeight_hasThatHeight() throws Exception {
    String expected = "123";
    //given
    Image widget = image();
    //when
    widget.setHeight(expected);
    //then
    Assertions.assertThat(widget.getHeight()).isEqualTo(expected);
  }

  @Test
  public void setFormat_hasThatFormat() throws Exception {
    String expected = "test";
    //given
    Image widget = image();
    //when
    widget.setFormat(expected);
    //then
    Assertions.assertThat(widget.getFormat()).isEqualTo(expected);
  }

  private Image image() throws NoSuchAlgorithmException {
    Image widget = new Image();
    groovyKernel.clearPublishedMessages();
    return widget;
  }

}