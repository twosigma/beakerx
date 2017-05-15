/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.chart.histogram;

import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.KernelTest;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

public class HistogramTest {

  List<Integer> list1, list2;
  Histogram histogram;

  @Before
  public void setUp() throws Exception {
    list1 = Arrays.asList(new Integer(1), new Integer(2));
    list2 = Arrays.asList(new Integer(3), new Integer(4));
    KernelManager.register(new KernelTest());
    histogram = new Histogram();
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void createHistogramByEmptyConstructor_hasDisplayModeIsNotNull() {
    //then
    Assertions.assertThat(histogram.getDisplayMode()).isNotNull();
  }

  @Test
  public void setDataWithListOfIntegerListsParam_hasListDataIsNotEmpty() {
    //when
    histogram.setData(Arrays.asList(list1, list2));
    //then
    Assertions.assertThat(histogram.getListData()).isNotEmpty();
  }

  @Test
  public void setDataWithIntegerListParam_hasDataIsNotEmpty() {
    //when
    histogram.setData(list1);
    //then
    Assertions.assertThat(histogram.getData()).isNotEmpty();
  }

  @Test
  public void setColorWithAwtColorParam_colorHasBeakerColorType() {
    //when
    histogram.setColor(java.awt.Color.GREEN);
    //then
    Assertions.assertThat(histogram.getColor() instanceof Color).isTrue();
  }

  @Test
  public void setColorWithAwtColorListParam_hasBeakerColorsIsNotEmpty() {
    //when
    histogram.setColor(Arrays.asList(java.awt.Color.GREEN, java.awt.Color.BLUE));
    //then
    Assertions.assertThat(histogram.getColors()).isNotEmpty();
  }

  @Test(expected = IllegalArgumentException.class)
  public void setColorWithStringParam_throwIllegalArgumentException() {
    //when
    histogram.setColor("blue");
  }

}
