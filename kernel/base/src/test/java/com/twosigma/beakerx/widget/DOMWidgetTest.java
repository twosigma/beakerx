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

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Map;

import static com.twosigma.beakerx.widget.DOMWidget.DOM_CLASSES;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;

public class DOMWidgetTest {

  private KernelTest kernel;
  private DOMWidget widget;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelTest();
    KernelManager.register(kernel);
    widget = new Button();
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void shouldSendDomClassesUpdateMessage() {
    //given
    //when
    widget.setDomClasses(asList("class1", "class2"));
    //then
    Message update = EvaluatorResultTestWatcher.getUpdate(kernel.getPublishedMessages()).get();
    Map state = TestWidgetUtils.getState(update);
    assertThat(state.get(DOM_CLASSES)).isEqualTo(asList("class1", "class2").toArray());
  }
}