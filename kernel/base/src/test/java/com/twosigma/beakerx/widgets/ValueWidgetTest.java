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

package com.twosigma.beakerx.widgets;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.widgets.integers.IntText;
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
    Double value = valueWidget.getDouble(new Integer(123));
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

  @Test
  public void getArrayOfDoubleWithNullArrayParam_returnArray() throws Exception {
    //when
    Double[] value = valueWidget.getArrayOfDouble(null, 5d, 6d);
    //then
    Assertions.assertThat(value[0]).isEqualTo(5d);
    Assertions.assertThat(value[1]).isEqualTo(6d);
  }

  @Test
  public void getArrayOfDoubleWithOneValueArrayParam_returnArray() throws Exception {
    //when
    Double[] value = valueWidget.getArrayOfDouble(new String[]{"1"}, 5d, 6d);
    //then
    Assertions.assertThat(value[0]).isEqualTo(1d);
    Assertions.assertThat(value[1]).isEqualTo(6d);
  }

  @Test
  public void getArrayOfDoubleWithTwoValueArrayParam_returnArray() throws Exception {
    //when
    Double[] value = valueWidget.getArrayOfDouble(new String[]{"1", "2"}, 5d, 6d);
    //then
    Assertions.assertThat(value[0]).isEqualTo(1d);
    Assertions.assertThat(value[1]).isEqualTo(2d);
  }

  @Test
  public void getArrayOfDoubleWithOneValueListParam_returnArray() throws Exception {
    //when
    Double[] value = valueWidget.getArrayOfDouble(Arrays.asList("1"), 5d, 6d);
    //then
    Assertions.assertThat(value[0]).isEqualTo(1d);
    Assertions.assertThat(value[1]).isEqualTo(6d);
  }

  @Test
  public void getArrayOfDoubleWithTwoValueListParam_returnArray() throws Exception {
    //when
    Double[] value = valueWidget.getArrayOfDouble(Arrays.asList("1", "2"), 5d, 6d);
    //then
    Assertions.assertThat(value[0]).isEqualTo(1d);
    Assertions.assertThat(value[1]).isEqualTo(2d);
  }

  @Test
  public void getArrayOfDoubleWithStringParam_returnArray() throws Exception {
    //when
    Double[] value = valueWidget.getArrayOfDouble("1", 5d, 6d);
    //then
    Assertions.assertThat(value[0]).isEqualTo(1d);
    Assertions.assertThat(value[1]).isEqualTo(6d);
  }

  @Test
  public void getStringWithStringParam_returnString() throws Exception {
    //when
    String value = valueWidget.getString("abc");
    //then
    Assertions.assertThat(value).isEqualTo("abc");
  }

  @Test
  public void getStringWithByteArrayParam_returnString() throws Exception {
    //when
    String value = valueWidget.getString("abc".getBytes());
    //then
    Assertions.assertThat(value).isEqualTo("abc");
  }

  @Test
  public void getStringWithDoubleParam_returnString() throws Exception {
    //when
    String value = valueWidget.getString(new Integer(123));
    //then
    Assertions.assertThat(value).isEqualTo("123");
  }

  @Test
  public void getStringWithNullParam_returnEmptyString() throws Exception {
    //when
    String value = valueWidget.getString(null);
    //then
    Assertions.assertThat(value).isEmpty();
  }

  @Test
  public void getStringArrayWithNullArrayParam_returnEmptyArray() throws Exception {
    //when
    String[] value = valueWidget.getStringArray(null);
    //then
    Assertions.assertThat(value).isEmpty();
  }

  @Test
  public void getStringArrayWithArrayParam_returnArray() throws Exception {
    //when
    String[] value = valueWidget.getStringArray(new String[]{"ab", "cd"});
    //then
    Assertions.assertThat(value[0]).isEqualTo("ab");
    Assertions.assertThat(value[1]).isEqualTo("cd");
  }

  @Test
  public void getStringArrayWithListParam_returnArray() throws Exception {
    //when
    String[] value = valueWidget.getStringArray(Arrays.asList("ab", "cd"));
    //then
    Assertions.assertThat(value[0]).isEqualTo("ab");
    Assertions.assertThat(value[1]).isEqualTo("cd");
  }

  @Test
  public void getStringArrayWithIntegerParam_returnArray() throws Exception {
    //when
    String[] value = valueWidget.getStringArray(new Integer(123));
    //then
    Assertions.assertThat(value[0]).isEqualTo("123");
  }

  @Test
  public void getBooleanWithNullParam_returnFalse() throws Exception {
    //when
    Boolean value = valueWidget.getBoolean(null);
    //then
    Assertions.assertThat(value).isFalse();
  }

  @Test
  public void getBooleanWithBooleanParam_returnBoolean() throws Exception {
    //when
    Boolean value = valueWidget.getBoolean(Boolean.TRUE);
    //then
    Assertions.assertThat(value).isTrue();
  }

  @Test
  public void getBooleanWithStringParam_returnBoolean() throws Exception {
    //when
    Boolean value = valueWidget.getBoolean("true");
    //then
    Assertions.assertThat(value).isTrue();
  }

  @Test
  public void createValueWidget_hasDefaultValues() throws Exception {
    //when
    //then
    Assertions.assertThat(valueWidget.getDisabled()).isFalse();
    Assertions.assertThat(valueWidget.getVisible()).isTrue();
    Assertions.assertThat(valueWidget.getDescription()).isEmpty();
    Assertions.assertThat(valueWidget.getMsg_throttle()).isEqualTo(3);
  }

}
