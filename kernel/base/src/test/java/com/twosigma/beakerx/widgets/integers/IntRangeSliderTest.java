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
package com.twosigma.beakerx.widgets.integers;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beakerx.widgets.TestWidgetUtils.verifyMsgForProperty;
import static com.twosigma.beakerx.widgets.TestWidgetUtils.verifyOpenCommMsg;

public class IntRangeSliderTest {

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
    new IntRangeSlider();
    //then
    verifyOpenCommMsg(
        groovyKernel.getPublishedMessages(),
        IntRangeSlider.MODEL_NAME_VALUE,
        IntRangeSlider.VIEW_NAME_VALUE
    );
  }

  @Test
  public void setOrientation_sendCommMessage() throws Exception {
    String expected = "test";
    //given
    IntRangeSlider intRangeSlider  = IntRangeSlider();
    //when
    intRangeSlider.setOrientation(expected);
    //then
    verifyMsgForProperty(groovyKernel, IntRangeSlider.ORIENTATION, expected);
  }


  @Test
  public void setReadOut_sendCommMessage() throws Exception {
    boolean expected = true;
    //given
    IntRangeSlider intRangeSlider  = IntRangeSlider();
    //when
    intRangeSlider.setReadOut(expected);
    //then
    verifyMsgForProperty(groovyKernel, IntRangeSlider.READOUT, expected);
  }

  @Test
  public void setContinuousUpdate_sendCommMessage() throws Exception {
    boolean expected = true;
    //given
    IntRangeSlider intRangeSlider  = IntRangeSlider();
    //when
    intRangeSlider.setContinuous_update(expected);
    //then
    verifyMsgForProperty(groovyKernel, IntRangeSlider.CONTINUOUS_UPDATE, expected);
  }

  @Test
  public void setOrientation_hasThatOrientation() throws Exception {
    String expected = "test";
    //given
    IntRangeSlider intRangeSlider  = IntRangeSlider();
    //when
    intRangeSlider.setOrientation(expected);
    //then
    Assertions.assertThat(intRangeSlider.getOrientation()).isEqualTo(expected);
  }

  @Test
  public void setReadOut_hasThatOrientation() throws Exception {
    boolean expected = true;
    //given
    IntRangeSlider intRangeSlider  = IntRangeSlider();
    //when
    intRangeSlider.setReadOut(expected);
    //then
    Assertions.assertThat(intRangeSlider.getReadOut()).isEqualTo(expected);
  }

  @Test
  public void setContinuousUpdate_hasThatOrientation() throws Exception {
    boolean expected = true;
    //given
    IntRangeSlider intRangeSlider  = IntRangeSlider();
    //when
    intRangeSlider.setContinuous_update(expected);
    //then
    Assertions.assertThat(intRangeSlider.getContinuous_update()).isEqualTo(expected);
  }

  private IntRangeSlider IntRangeSlider() throws NoSuchAlgorithmException {
    IntRangeSlider intRangeSlider  = new IntRangeSlider();
    groovyKernel.clearPublishedMessages();
    return intRangeSlider;
  }

}
