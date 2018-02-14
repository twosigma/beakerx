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
package com.twosigma.beakerx.widget.box;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.widget.Widget;
import com.twosigma.beakerx.widget.integers.IntSlider;
import com.twosigma.beakerx.widget.strings.Text;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyInternalOpenCommMsgWitLayout;

public class CyclingDisplayBoxTest {

  private KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelTest();
    KernelManager.register(kernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void createWithParam_shouldSendCommOpenMessage() throws Exception {
    //given
    List<Widget> children = Arrays.asList(new IntSlider(), new Text());
    kernel.clearPublishedMessages();
    //when
    new CyclingDisplayBox(children);
    //then
    verifyInternalOpenCommMsgWitLayout(
        kernel.getPublishedMessages(),
        CyclingDisplayBox.MODEL_NAME_VALUE,
        CyclingDisplayBox.VIEW_NAME_VALUE
    );
  }
}
