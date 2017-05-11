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

package com.twosigma.beaker.chart;

import com.twosigma.beaker.chart.xychart.plotitem.Bars;
import com.twosigma.beaker.chart.xychart.plotitem.BasedXYGraphics;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;

public class ToolTipBuilderTest {

  private BasedXYGraphics xyGraphics;

  @Before
  public void setUp() throws Exception {
    xyGraphics = new Bars();
    xyGraphics.setX(Arrays.asList(10, 20));
    xyGraphics.setY(Arrays.asList(10, 20));
    xyGraphics.setBase(5);
    xyGraphics.setDisplayName("test display name");
  }

  @Test
  public void setToolTipBuilderWithOneParam_hasToolTip() {
    //given
    ToolTipBuilder toolTipBuilder = new ToolTipBuilder() {

      @Override
      public Object call(Object x) {
        return "x=" + x;
      }

      @Override
      public int getMaximumNumberOfParameters() {
        return 1;
      }
    };
    //when
    xyGraphics.setToolTip(toolTipBuilder);
    //then
    Assertions.assertThat(xyGraphics.getToolTips().get(0)).isEqualTo("x=10");
  }

  @Test
  public void setToolTipBuilderWithTwoParams_hasToolTip() {
    //given
    ToolTipBuilder toolTipBuilder = new ToolTipBuilder() {

      @Override
      public Object call(Object x, Object y) {
        return "x=" + x + ";y=" + y;
      }

      @Override
      public int getMaximumNumberOfParameters() {
        return 2;
      }
    };
    //when
    xyGraphics.setToolTip(toolTipBuilder);
    //then
    Assertions.assertThat(xyGraphics.getToolTips().get(0)).isEqualTo("x=10;y=10");
  }

  @Test
  public void setToolTipBuilderWithThreeParams_hasToolTip() {
    //given
    ToolTipBuilder toolTipBuilder = new ToolTipBuilder() {

      @Override
      public Object call(Object x, Object y, Object index) {
        return "index=" + index;
      }

      @Override
      public int getMaximumNumberOfParameters() {
        return 3;
      }
    };
    //when
    xyGraphics.setToolTip(toolTipBuilder);
    //then
    Assertions.assertThat(xyGraphics.getToolTips().get(0)).isEqualTo("index=0");
  }

  @Test
  public void setToolTipBuilderWithFourParams_hasToolTip() {
    //given
    ToolTipBuilder toolTipBuilder = new ToolTipBuilder() {

      @Override
      public Object call(Object x, Object y, Object index, Object base) {
        return "base=" + base;
      }

      @Override
      public int getMaximumNumberOfParameters() {
        return 4;
      }
    };
    //when
    xyGraphics.setToolTip(toolTipBuilder);
    //then
    Assertions.assertThat(xyGraphics.getToolTips().get(0)).isEqualTo("base=5.0");
  }

  @Test
  public void setToolTipBuilderWithFiveParams_hasToolTip() {
    //given
    ToolTipBuilder toolTipBuilder = new ToolTipBuilder() {

      @Override
      public Object call(Object x, Object y, Object base, Object index, Object displayName) {
        return displayName;
      }

      @Override
      public int getMaximumNumberOfParameters() {
        return 5;
      }
    };
    //when
    xyGraphics.setToolTip(toolTipBuilder);
    //then
    Assertions.assertThat(xyGraphics.getToolTips().get(0)).isEqualTo(xyGraphics.getDisplayName());
  }

}
