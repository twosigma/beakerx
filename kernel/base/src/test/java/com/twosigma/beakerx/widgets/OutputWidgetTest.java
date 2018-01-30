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
package com.twosigma.beakerx.widgets;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.widgets.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beakerx.widgets.TestWidgetUtils.verifyOpenCommMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class OutputWidgetTest {

  private KernelTest groovyKernel;

  @Before
  public void setUp() throws Exception {
    groovyKernel = new KernelTest();
    KernelManager.register(groovyKernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void shouldSendCommOpenWhenCreate() throws Exception {
    //given
    //when
    new Output();
    //then
    verifyOpenCommMsg(groovyKernel.getPublishedMessages(), Output.MODEL_NAME_VALUE, Output.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldSendCommMsgWhenAppendStdout() throws Exception {
    //given
    Output output = new Output();
    groovyKernel.clearPublishedMessages();
    //when
    output.appendStdout("Hello 1");
    //then
    Map<String, String> value = (Map<String, String>) getValueForProperty(groovyKernel, Output.OUTPUTS, List.class).get(0);
    assertThat(value.get(Output.OUTPUT_TYPE)).isEqualTo(Output.STREAM);
    assertThat(value.get(Output.NAME)).isEqualTo(Output.STDOUT);
    assertThat(value.get(Output.TEXT)).isEqualTo("Hello 1\n");
  }

  @Test
  public void shouldSendCommMsgWhenAppendStderr() throws Exception {
    //given
    Output output = new Output();
    groovyKernel.clearPublishedMessages();
    //when
    output.appendStderr("Error 1");
    //then
    Map<String, String> value = (Map<String, String>) getValueForProperty(groovyKernel, Output.OUTPUTS, List.class).get(0);
    assertThat(value.get(Output.OUTPUT_TYPE)).isEqualTo(Output.STREAM);
    assertThat(value.get(Output.NAME)).isEqualTo(Output.STDERR);
    assertThat(value.get(Output.TEXT)).isEqualTo("Error 1\n");
  }

  @Test
  public void shouldSendCommMsgClear() throws Exception {
    //given
    Output output = new Output();
    output.appendStderr("Error 1");
    groovyKernel.clearPublishedMessages();
    //when
    output.clearOutput();
    //then
    List value = getValueForProperty(groovyKernel, Output.OUTPUTS, List.class);
    assertThat(value).isEmpty();
  }

}