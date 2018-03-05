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
import com.twosigma.beakerx.widget.FloatRangeSlider;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyMsgForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyOpenCommMsg;

public class FloatRangeSliderTest {


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
    new FloatRangeSlider();
    //then
    verifyOpenCommMsg(
        groovyKernel.getPublishedMessages(),
        FloatRangeSlider.MODEL_NAME_VALUE,
        FloatRangeSlider.VIEW_NAME_VALUE
    );
  }

  @Test
  public void setOrientation_sendCommMessage() throws Exception {
    String expected = "test";
    //given
    FloatRangeSlider floatRangeSlider = floatRangeSlider();
    //when
    floatRangeSlider.setOrientation(expected);
    //then
    verifyMsgForProperty(groovyKernel, FloatRangeSlider.ORIENTATION, expected);
  }

  @Test
  public void setReadOut_sendCommMessage() throws Exception {
    boolean expected = true;
    //given
    FloatRangeSlider floatRangeSlider = floatRangeSlider();
    //when
    floatRangeSlider.setReadOut(expected);
    //then
    verifyMsgForProperty(groovyKernel, FloatRangeSlider.READOUT, expected);
  }

  @Test
  public void setContinuousUpdate_sendCommMessage() throws Exception {
    boolean expected = true;
    //given
    FloatRangeSlider floatRangeSlider = floatRangeSlider();
    //when
    floatRangeSlider.setContinuous_update(expected);
    //then
    verifyMsgForProperty(groovyKernel, FloatRangeSlider.CONTINUOUS_UPDATE, expected);
  }

  @Test
  public void setOrientation_hasThatOrientation() throws Exception {
    String expected = "test";
    //given
    FloatRangeSlider floatRangeSlider = floatRangeSlider();
    //when
    floatRangeSlider.setOrientation(expected);
    //then
    Assertions.assertThat(floatRangeSlider.getOrientation()).isEqualTo(expected);
  }

  @Test
  public void setReadOut_hasThatReadOutFlag() throws Exception {
    boolean expected = true;
    //given
    FloatRangeSlider floatRangeSlider = floatRangeSlider();
    //when
    floatRangeSlider.setReadOut(expected);
    //then
    Assertions.assertThat(floatRangeSlider.getReadOut()).isEqualTo(expected);
  }

  @Test
  public void setContinuousUpdate_hasThatContinuousUpdateFlag() throws Exception {
    boolean expected = true;
    //given
    FloatRangeSlider floatRangeSlider = floatRangeSlider();
    //when
    floatRangeSlider.setContinuous_update(expected);
    //then
    Assertions.assertThat(floatRangeSlider.getContinuous_update()).isEqualTo(expected);
  }

  @Test
  public void setStep_hasThatStep() throws Exception {
    Double expected = new Double(10);
    //given
    FloatRangeSlider floatRangeSlider = floatRangeSlider();
    //when
    floatRangeSlider.setStep(expected);
    //then
    Assertions.assertThat(floatRangeSlider.getStep()).isEqualTo(expected);
  }

  @Test
  public void setMax_hasThatMax() throws Exception {
    Double expected = new Double(11);
    //given
    FloatRangeSlider floatRangeSlider = floatRangeSlider();
    //when
    floatRangeSlider.setMax(expected);
    //then
    Assertions.assertThat(floatRangeSlider.getMax()).isEqualTo(expected);
  }

  @Test
  public void setMin_hasThatMin() throws Exception {
    Double expected = new Double(12);
    //given
    FloatRangeSlider floatRangeSlider = floatRangeSlider();
    //when
    floatRangeSlider.setMin(expected);
    //then
    Assertions.assertThat(floatRangeSlider.getMin()).isEqualTo(expected);
  }

  @Test
  public void setUpper_hasThatUpper() throws Exception {
    Double expected = new Double(13);
    //given
    FloatRangeSlider floatRangeSlider = floatRangeSlider();
    //when
    floatRangeSlider.setUpper(expected);
    //then
    Assertions.assertThat(floatRangeSlider.getUpper()).isEqualTo(expected);
  }

  @Test
  public void setLower_hasThatLower() throws Exception {
    Double expected = new Double(14);
    //given
    FloatRangeSlider floatRangeSlider = floatRangeSlider();
    //when
    floatRangeSlider.setLower(expected);
    //then
    Assertions.assertThat(floatRangeSlider.getLower()).isEqualTo(expected);
  }

  @Test
  public void getValueFromObject_returnArrayOfDoubles() throws Exception {
    Double[] expected = {4d, 5d};
    //given
    FloatRangeSlider floatRangeSlider = floatRangeSlider();
    //when
    Double[] result = floatRangeSlider.getValueFromObject(expected);
    //then
    Assertions.assertThat(result[0]).isEqualTo(expected[0]);
    Assertions.assertThat(result[1]).isEqualTo(expected[1]);
  }

  private FloatRangeSlider floatRangeSlider() throws NoSuchAlgorithmException {
    FloatRangeSlider floatRangeSlider  = new FloatRangeSlider();
    groovyKernel.clearPublishedMessages();
    return floatRangeSlider;
  }
}
