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

import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.widgets.integers.IntText;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;

public class ValueWidgetTest {

  private KernelTest kernel;
  private ValueWidget valueWidget;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelTest();
    KernelManager.register(kernel);
    valueWidget = new IntText();
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void getIntegerWithStringParam_returnInteger() throws Exception {
    //when
    Integer value = valueWidget.getInteger("123");
    //then
    Assertions.assertThat(value.intValue()).isEqualTo(123);
  }

  @Test
  public void getIntegerWithDoubleParam_returnInteger() throws Exception {
    //when
    Integer value = valueWidget.getInteger(new Double(123));
    //then
    Assertions.assertThat(value.intValue()).isEqualTo(123);
  }

  @Test
  public void getIntegerWithIntegerParam_returnInteger() throws Exception {
    //when
    Integer value = valueWidget.getInteger(new Integer(123));
    //then
    Assertions.assertThat(value.intValue()).isEqualTo(123);
  }

  @Test
  public void getIntegerWithArrayParam_returnInteger() throws Exception {
    //when
    Integer value = valueWidget.getInteger(new Integer[]{123, 234});
    //then
    Assertions.assertThat(value.intValue()).isEqualTo(123);
  }

  @Test
  public void getDoubleWithStringParam_returnDouble() throws Exception {
    //when
    Double value = valueWidget.getDouble("123");
    //then
    Assertions.assertThat(value.doubleValue()).isEqualTo(123d);
  }

  @Test
  public void getDoubleWithDoubleParam_returnDouble() throws Exception {
    //when
    Double value = valueWidget.getDouble(new Double(123d));
    //then
    Assertions.assertThat(value.doubleValue()).isEqualTo(123d);
  }

  @Test
  public void getDoubleWithIntegerParam_returnDouble() throws Exception {
    //when
    Double value = valueWidget.getDouble(new Double(123d));
    //then
    Assertions.assertThat(value.doubleValue()).isEqualTo(123d);
  }

  @Test
  public void getDoubleWithArrayParam_returnDouble() throws Exception {
    //when
    Double value = valueWidget.getDouble(new Double[]{123d, 234d});
    //then
    Assertions.assertThat(value.doubleValue()).isEqualTo(123d);
  }

  @Test
  public void getArrayOfIntegerWithNullArrayParam_returnArray() throws Exception {
    //when
    Integer[] value = valueWidget.getArrayOfInteger(null, 5, 6);
    //then
    Assertions.assertThat(value[0]).isEqualTo(5);
    Assertions.assertThat(value[1]).isEqualTo(6);
  }

  @Test
  public void getArrayOfIntegerWithOneValueArrayParam_returnArray() throws Exception {
    //when
    Integer[] value = valueWidget.getArrayOfInteger(new String[]{"1"}, 5, 6);
    //then
    Assertions.assertThat(value[0]).isEqualTo(1);
    Assertions.assertThat(value[1]).isEqualTo(6);
  }

  @Test
  public void getArrayOfIntegerWithTwoValueArrayParam_returnArray() throws Exception {
    //when
    Integer[] value = valueWidget.getArrayOfInteger(new String[]{"1", "2"}, 5, 6);
    //then
    Assertions.assertThat(value[0]).isEqualTo(1);
    Assertions.assertThat(value[1]).isEqualTo(2);
  }

  @Test
  public void getArrayOfIntegerWithOneValueListParam_returnArray() throws Exception {
    //when
    Integer[] value = valueWidget.getArrayOfInteger(Arrays.asList("1"), 5, 6);
    //then
    Assertions.assertThat(value[0]).isEqualTo(1);
    Assertions.assertThat(value[1]).isEqualTo(6);
  }

  @Test
  public void getArrayOfIntegerWithTwoValueListParam_returnArray() throws Exception {
    //when
    Integer[] value = valueWidget.getArrayOfInteger(Arrays.asList("1", "2"), 5, 6);
    //then
    Assertions.assertThat(value[0]).isEqualTo(1);
    Assertions.assertThat(value[1]).isEqualTo(2);
  }

  @Test
  public void getArrayOfIntegerWithStringParam_returnArray() throws Exception {
    //when
    Integer[] value = valueWidget.getArrayOfInteger("1", 5, 6);
    //then
    Assertions.assertThat(value[0]).isEqualTo(1);
    Assertions.assertThat(value[1]).isEqualTo(6);
  }

}
