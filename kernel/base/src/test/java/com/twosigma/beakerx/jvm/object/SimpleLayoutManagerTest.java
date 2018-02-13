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

package com.twosigma.beakerx.jvm.object;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import com.twosigma.beakerx.widget.Widget;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beakerx.widget.TestWidgetUtils.findValueForProperty;
import static org.assertj.core.api.Assertions.assertThat;

public class SimpleLayoutManagerTest {


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
  public void create_borderDisplayedIsFalse() throws Exception {
    //when
    SimpleLayoutManager manager = new SimpleLayoutManager();
    //then
    assertThat(manager.isBorderDisplayed()).isFalse();
  }

  @Test
  public void outputContainerWithHtml() throws Exception {
    //given
    String code = "<h4>Title</h4>";
    OutputContainer outputContainer = new OutputContainer();
    outputContainer.leftShift(MIMEContainer.HTML(code));
    //when
    outputContainer.display();
    //then
    String value = findValueForProperty(kernel, Widget.VALUE, String.class);
    assertThat(value).isEqualTo(code);
  }

  @Test
  public void outputContainerWithNull() throws Exception {
    //given
    OutputContainer outputContainer = new OutputContainer();
    outputContainer.leftShift(null);
    //when
    outputContainer.display();
    //then
    String value = findValueForProperty(kernel, Widget.VALUE, String.class);
    assertThat(value).isEqualTo("null");
  }
}
