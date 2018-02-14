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

package com.twosigma.beakerx.widget.link;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.jupyter.SearchMessages;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.widget.Widget;
import com.twosigma.beakerx.widget.integer.IntSlider;
import com.twosigma.beakerx.widget.string.Text;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class LinkTest {

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
  public void createWithFourParams_shouldSendCommOpenMessage() throws Exception {
    //given
    Widget source = new IntSlider();
    Widget target = new Text();
    kernel.clearPublishedMessages();
    //when
    new Link(source, "source", target, "target");
    //then
    Assertions.assertThat(
        SearchMessages.getListWidgetsByModelName(kernel.getPublishedMessages(), Link.MODEL_NAME_VALUE)
    ).isNotEmpty();
  }

}
