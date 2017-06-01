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
import com.twosigma.beaker.widgets.bools.Checkbox;
import com.twosigma.beaker.widgets.floats.FloatSlider;
import com.twosigma.beaker.widgets.integers.IntSlider;
import com.twosigma.beaker.widgets.selections.Dropdown;
import com.twosigma.beaker.widgets.strings.Text;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InteractiveBaseTest {
  private KernelTest kernel;

  @Before
  public void setUp() {
    kernel = new KernelTest();
    KernelManager.register(kernel);
    }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void widgetsFromAbbreviationsWithIntParam_returnIntSlider() throws Exception {
    //when
    List<ValueWidget<?>> witgets = InteractiveBase.widgetsFromAbbreviations(10);
    //then
    Assertions.assertThat(witgets.size()).isEqualTo(1);
    Assertions.assertThat(witgets.get(0).getClass().getName()).isEqualTo(IntSlider.class.getName());
  }

  @Test
  public void widgetsFromAbbreviationsWithFloatParam_returnFloatSlider() throws Exception {
    //when
    List<ValueWidget<?>> witgets = InteractiveBase.widgetsFromAbbreviations(10.0);
    //then
    Assertions.assertThat(witgets.size()).isEqualTo(1);
    Assertions.assertThat(witgets.get(0).getClass().getName()).isEqualTo(FloatSlider.class.getName());
  }

  @Test
  public void widgetsFromAbbreviationsWithStringParam_returnTextField() throws Exception {
    //when
    List<ValueWidget<?>> witgets = InteractiveBase.widgetsFromAbbreviations("test");
    //then
    Assertions.assertThat(witgets.size()).isEqualTo(1);
    Assertions.assertThat(witgets.get(0).getClass().getName()).isEqualTo(Text.class.getName());
  }

  @Test
  public void widgetsFromAbbreviationsWithBooleanParam_returnCheckbox() throws Exception {
    //when
    List<ValueWidget<?>> witgets = InteractiveBase.widgetsFromAbbreviations(true);
    //then
    Assertions.assertThat(witgets.size()).isEqualTo(1);
    Assertions.assertThat(witgets.get(0).getClass().getName()).isEqualTo(Checkbox.class.getName());
  }

  @Test
  public void widgetsFromAbbreviationsWithoutParam_returnEmptyList() throws Exception {
    //when
    List<ValueWidget<?>> witgets = InteractiveBase.widgetsFromAbbreviations();
    //then
    Assertions.assertThat(witgets).isEmpty();
    }

  @Test
  public void widgetsFromAbbreviationsWithTwoIntParam_returnedTwoIntSliders() throws Exception {
    int one = 10, two = 100;
    //when
    List<ValueWidget<?>> witgets = InteractiveBase.widgetsFromAbbreviations(one, two);
    //then
    Assertions.assertThat(witgets.size()).isEqualTo(2);
  }

  @Test
  public void widgetFromTupleWithThreeIntParam_returnedIntSliderHasMinMaxValueFromParams() throws Exception {
    int min = 10, max = 100, value = (min + max)/2;
    //when
    IntSlider intSlider = (IntSlider)InteractiveBase.widgetFromTuple(min, max, null);
    //then
    Assertions.assertThat(intSlider.getMin()).isEqualTo(min);
    Assertions.assertThat(intSlider.getMax()).isEqualTo(max);
    Assertions.assertThat(intSlider.getValue()).isEqualTo(value);
  }

  @Test
  public void widgetFromTupleWithThreeDoubleParam_returnedFloatSliderHasMinMaxValueFromParams() throws Exception {
    double min = 10d, max = 100d, value = (min + max)/2d;
    //when
    FloatSlider floatSlider = (FloatSlider)InteractiveBase.widgetFromTuple(min, max, null);
    //then
    Assertions.assertThat(floatSlider.getMin()).isEqualTo(min);
    Assertions.assertThat(floatSlider.getMax()).isEqualTo(max);
    Assertions.assertThat(floatSlider.getValue()).isEqualTo(value);
  }

  //@Test //enable after fix
  public void widgetFromTupleWithFourIntParam_returnedIntSliderHasMinMaxValueStepFromParams() throws Exception {
    int min = 10, max = 100, value = 20, step =5;
    //when
    IntSlider intSlider = (IntSlider)InteractiveBase.widgetFromTuple(min, max, step, value);
    //then
    Assertions.assertThat(intSlider.getMin()).isEqualTo(min);
    Assertions.assertThat(intSlider.getMax()).isEqualTo(max);
    Assertions.assertThat(intSlider.getValue()).isEqualTo(value);
    Assertions.assertThat(intSlider.getStep()).isEqualTo(step);
  }

  //@Test //enable after fix
  public void widgetFromTupleWithFourDoubleParam_returnedFloatSliderHasMinMaxValueStepFromParams() throws Exception {
    double min = 10d, max = 100d, value = 20d, step = 5d;
    //when
    FloatSlider floatSlider = (FloatSlider)InteractiveBase.widgetFromTuple(min, max, step, value);
    //then
    Assertions.assertThat(floatSlider.getMin()).isEqualTo(min);
    Assertions.assertThat(floatSlider.getMax()).isEqualTo(max);
    Assertions.assertThat(floatSlider.getValue()).isEqualTo(value);
    Assertions.assertThat(floatSlider.getStep()).isEqualTo(step);
  }

  //@Test //enable after fix
  public void widgetFromIterableWithListOfIntParam_returnedDropdownHasOptions() throws Exception {
    String[] resultOptions = new String[]{"1", "2", "3", "4"};
    //when
    Dropdown dropdown = InteractiveBase.widgetFromIterable(Arrays.asList(1, 2, 3, 4));
    //then
    Assertions.assertThat(dropdown.getOptions()).isEqualTo(resultOptions);
  }

  @Test
  public void widgetFromIterableWithArrayOfIntParam_returnedDropdownHasOptions() throws Exception {
    String[] resultOptions = new String[]{"1", "2", "3", "4"};
    //when
    Dropdown dropdown = InteractiveBase.widgetFromIterable(new Integer[]{1, 2, 3, 4});
    //then
    Assertions.assertThat(dropdown.getOptions()).isEqualTo(resultOptions);
  }

  @Test
  public void widgetFromIterableWithMapOfIntParam_returnedDropdownHasOptions() throws Exception {
    String[] resultOptions = new String[]{"1", "2", "3", "4"};
    Map map = new HashMap<Integer, Integer>(){
      { put(1, 1);
        put(2, 2);
        put(3, 3);
        put(4, 4);}
    };
    //when
    Dropdown dropdown = InteractiveBase.widgetFromIterable(map);
    //then
    Assertions.assertThat(dropdown.getOptions()).isEqualTo(resultOptions);
  }

  @Test
  public void widgetFromIterableWithIntParam_returnedDropdownHasOptions() throws Exception {
    String[] resultOptions = new String[]{"123"};
    //when
    Dropdown dropdown = InteractiveBase.widgetFromIterable(123);
    //then
    Assertions.assertThat(dropdown.getOptions()).isEqualTo(resultOptions);
  }

}
