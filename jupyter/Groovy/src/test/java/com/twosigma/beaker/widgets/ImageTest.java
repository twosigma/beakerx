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

import com.twosigma.beaker.jupyter.GroovyKernelManager;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beaker.widgets.TestWidgetUtils.verifyMsgForProperty;
import static com.twosigma.beaker.widgets.TestWidgetUtils.verifyOpenCommMsg;

public class ImageTest {

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
  public void shouldSendCommOpenWhenCreate() throws Exception {
    //given
    //when
    new Image();
    //then
    verifyOpenCommMsg(groovyKernel.getMessages(), Image.MODEL_NAME_VALUE, Image.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldSendCommMsgWhenValueChange() throws Exception {
    //given
    Image widget = image();
    //when
    widget.setValue("picture".getBytes());
    //then
    verifyMsgForProperty(groovyKernel, "_b64value", "picture".getBytes());
  }

  @Test
  public void shouldSendCommMsgWhenFormatChange() throws Exception {
    //given
    Image widget = image();
    //when
    widget.setFormat("jpg");
    //then
    verifyMsgForProperty(groovyKernel, Image.FORMAT, "jpg");
  }

  @Test
  public void shouldSendCommMsgWhenHeightChange() throws Exception {
    //given
    Image widget = image();
    //when
    widget.setHeight("123");
    //then
    verifyMsgForProperty(groovyKernel, Image.HEIGHT, "123");
  }

  @Test
  public void shouldSendCommMsgWhenWidthChange() throws Exception {
    //given
    Image widget = image();
    //when
    widget.setWidth("321");
    //then
    verifyMsgForProperty(groovyKernel, Image.WIDTH, "321");
  }

  private Image image() throws NoSuchAlgorithmException {
    Image widget = new Image();
    groovyKernel.clearMessages();
    return widget;
  }

}