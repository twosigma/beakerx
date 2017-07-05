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
package com.twosigma.beakerx.widgets.integers;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beakerx.widgets.TestWidgetUtils.verifyMsgForProperty;
import static com.twosigma.beakerx.widgets.TestWidgetUtils.verifyOpenCommMsg;

public class PlayTest {

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
  public void createByEmptyConstructor_sendCommOpenMessage() throws Exception {
    //given
    //when
    new Play();
    //then
    verifyOpenCommMsg(groovyKernel.getPublishedMessages(), Play.MODEL_NAME_VALUE, Play.VIEW_NAME_VALUE);
  }

  @Test
  public void setValue_sendCommMessage() throws Exception {
    //given
    Play play = Play();
    //when
    play.setValue(11);
    //then
    verifyMsgForProperty(groovyKernel, Play.VALUE, 11);
  }

  @Test
  public void setOrientation_hasThatOrientation() throws Exception {
    int expected = 50;
    //given
    Play play = Play();
    //when
    play.setOrientation(expected);
    //then
    Assertions.assertThat(play.getOrientation()).isEqualTo(expected);
  }

  @Test
  public void setOrientation_sendCommMessage() throws Exception {
    int expected = 50;
    //given
    Play play = Play();
    //when
    play.setOrientation(expected);
    //then
    verifyMsgForProperty(groovyKernel, Play.INTERVAL, expected);
  }

  private Play Play() throws NoSuchAlgorithmException {
    Play play = new Play();
    groovyKernel.clearPublishedMessages();
    return play;
  }

}
