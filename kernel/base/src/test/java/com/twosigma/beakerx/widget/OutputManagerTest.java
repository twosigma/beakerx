/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.widget;

import com.twosigma.beakerx.Display;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

public class OutputManagerTest {

  @Before
  public void setUp() throws Exception {
    KernelManager.register(new KernelTest());

    Output out = new Output();
    OutputManager.setOutput(out);
  }

  @After
  public void tearDown() throws Exception {
    OutputManager.setOutput(null);
  }

  @Test
  public void widgetShouldBeDisplayedByOutputManager() {
    //given
    TestWidgetDisplayMethodStrategy testDisplayMethodStrategy = new TestWidgetDisplayMethodStrategy();
    OutputManager.changeWidgetDisplayMethodStrategy(testDisplayMethodStrategy);
    //when
    Text text = new Text();
    text.display();
    //then
    Assertions.assertThat(testDisplayMethodStrategy.widgetDisplayed).isTrue();
  }

  @Test
  public void MIMEShouldBeDisplayedByOutputManager() {
    //given
    TestMIMEDisplayMethodStrategy testDisplayMethodStrategy = new TestMIMEDisplayMethodStrategy();
    OutputManager.changeMIMEDisplayMethodStrategy(testDisplayMethodStrategy);
    //when
    MIMEContainer text = MIMEContainer.Text("Hello");
    Display.display(text);
    //then
    Assertions.assertThat(testDisplayMethodStrategy.mimeContainersDisplayed).isTrue();
  }

  static class TestWidgetDisplayMethodStrategy implements Widget.WidgetDisplayMethodStrategy {
    private boolean widgetDisplayed;
    @Override
    public void display(Widget widget) {
      widgetDisplayed = true;
    }
  }

  static class TestMIMEDisplayMethodStrategy implements Display.MIMEContainerDisplayMethodStrategy {
    private boolean mimeContainersDisplayed;
    @Override
    public void display(List<MIMEContainer> mimeContainers) {
      mimeContainersDisplayed = true;
    }
  }
}