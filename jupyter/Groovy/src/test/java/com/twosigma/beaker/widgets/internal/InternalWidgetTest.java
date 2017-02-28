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
package com.twosigma.beaker.widgets.internal;


import com.twosigma.beaker.jupyter.GroovyKernelManager;
import com.twosigma.beaker.widgets.GroovyKernelTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beaker.widgets.InternalWidgetsTestUtils.verifyOpenCommMsgInternalWidgets;
import static com.twosigma.beaker.widgets.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beaker.widgets.internal.InternalWidget.MODEL;
import static org.assertj.core.api.Assertions.assertThat;

public abstract class InternalWidgetTest {

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
    create();
    //then
    verifyOpenCommMsgInternalWidgets(groovyKernel.getMessages(), getModelNameValue(), getViewNameValue());
  }

  @Test
  public void shouldSendCommMsgForSendModel() throws Exception {
    //given
    InternalWidget internalWidget = create();
    groovyKernel.clearMessages();
    //when
    internalWidget.sendModel();
    //then
    String valueForProperty = getValueForProperty(groovyKernel, MODEL, String.class);
    assertThat(valueForProperty).isNotNull();
  }

  public abstract InternalWidget create() throws NoSuchAlgorithmException;

  public abstract String getModelNameValue();

  public abstract String getViewNameValue();
}