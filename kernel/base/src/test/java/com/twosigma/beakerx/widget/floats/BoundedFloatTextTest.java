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
package com.twosigma.beakerx.widget.floats;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyMsgForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyOpenCommMsg;

public class BoundedFloatTextTest {

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
  public void createByEmptyConstructor_sendCommOpenMessage() throws Exception {
    //given
    //when
    new BoundedFloatText();
    //then
    verifyOpenCommMsg(
        groovyKernel.getPublishedMessages(),
        BoundedFloatText.MODEL_NAME_VALUE,
        BoundedFloatText.VIEW_NAME_VALUE
    );
  }

  @Test
  public void setValue_sendCommMessage() throws Exception {
    String expected = "test";
    //given
    BoundedFloatText boundedFloatText = boundedFloatText();
    //when
    boundedFloatText.setValue(expected);
    //then
    verifyMsgForProperty(groovyKernel, boundedFloatText.VALUE, expected);
  }

  private BoundedFloatText boundedFloatText() throws NoSuchAlgorithmException {
    BoundedFloatText boundedFloatText = new BoundedFloatText();
    groovyKernel.clearPublishedMessages();
    return boundedFloatText;
  }
}
