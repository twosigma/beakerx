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

package com.twosigma.beakerx.chart.actions;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.chart.KeyboardCodes;
import com.twosigma.beakerx.chart.xychart.plotitem.Bars;
import com.twosigma.beakerx.chart.xychart.plotitem.XYGraphics;
import com.twosigma.beakerx.kernel.KernelManager;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;

public class GraphicsActionTest {

  private XYGraphics xyGraphics;
  private GraphicsActionListenerStub actionListener;
  private KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    xyGraphics = new Bars();
    xyGraphics.setX(Arrays.asList(10, 20));
    xyGraphics.setY(Arrays.asList(10, 20));
    xyGraphics.setDisplayName("test display name");
    actionListener = new GraphicsActionListenerStub();
    kernel = new KernelTest();
    KernelManager.register(kernel);
  }

  @Test
  public void xyGraphicsOnClick_shouldExecuteActionListener() {
    //given
    xyGraphics.onClick(actionListener);
    //when
    xyGraphics.fireClick(new XYGraphicsActionObject(), null);
    //then
    Assertions.assertThat(actionListener.getActionObject()).isNotNull();
    Assertions.assertThat(actionListener.getActionObject().getGraphics())
        .isEqualTo(xyGraphics);
  }

  @Test
  public void xyGraphicsOnKeyByString_shouldExecuteActionListener2() {
    //given
    xyGraphics.onKey("CTRL", actionListener);
    //when
    xyGraphics.fireOnKey("CTRL", new XYGraphicsActionObject(), null);
    //then
    Assertions.assertThat(actionListener.getActionObject()).isNotNull();
    Assertions.assertThat(actionListener.getActionObject().getGraphics())
        .isEqualTo(xyGraphics);
  }

  @Test
  public void xyGraphicsOnKeByKeyboardCode_shouldExecuteActionListener2() {
    //given
    xyGraphics.onKey(KeyboardCodes.CTRL, actionListener);
    //when
    xyGraphics.fireOnKey(KeyboardCodes.CTRL.name(), new XYGraphicsActionObject(), null);
    //then
    Assertions.assertThat(actionListener.getActionObject()).isNotNull();
    Assertions.assertThat(actionListener.getActionObject().getGraphics())
        .isEqualTo(xyGraphics);
  }

  class GraphicsActionListenerStub implements GraphicsActionListener{
    private GraphicsActionObject actionObject;

    @Override
    public void execute(GraphicsActionObject actionObject) {
      this.actionObject = actionObject;
    }

    public GraphicsActionObject getActionObject() {
      return actionObject;
    }
  }
}
