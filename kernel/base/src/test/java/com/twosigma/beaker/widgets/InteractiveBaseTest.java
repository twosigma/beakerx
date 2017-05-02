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
import com.twosigma.beaker.widgets.strings.Text;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

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

  //@Test enable after fix
  public void widgetsFromAbbreviationsWithTwoIntParam_returnedIntSliderHasMinMaxFromParams() throws Exception {
    int min = 10, max = 100;
    //when
    List<ValueWidget<?>> witgets = InteractiveBase.widgetsFromAbbreviations(min, max);
    //then
    IntSlider intSlider = (IntSlider) witgets.get(0);
    Assertions.assertThat(intSlider.getMin()).isEqualTo(min);
    Assertions.assertThat(intSlider.getMax()).isEqualTo(max);
  }

  //@Test enable after fix
  public void widgetsFromAbbreviationsWithThreeIntParam_returnedIntSliderHasMinMaxStepFromParams() throws Exception {
    int min = 10, max = 100, step = 5;
    //when
    List<ValueWidget<?>> witgets = InteractiveBase.widgetsFromAbbreviations(min, max, step);
    //then
    IntSlider intSlider = (IntSlider) witgets.get(0);
    Assertions.assertThat(intSlider.getMin()).isEqualTo(min);
    Assertions.assertThat(intSlider.getMax()).isEqualTo(max);
    Assertions.assertThat(intSlider.getStep()).isEqualTo(step);
  }

}
