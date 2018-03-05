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

package com.twosigma.beakerx.jvm.threads;

import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class BeakerStdOutErrHandlerTest {

  private static SimpleEvaluationObject seo;
  private SimpleOutputHandlerTest stdout;
  private SimpleErrHandlerTest stderr;

  @Before
  public void setUp() throws Exception {
    BeakerStdOutErrHandler.init();
    stdout = new SimpleOutputHandlerTest();
    stderr = new SimpleErrHandlerTest();
    seo = new SimpleEvaluationObject("code", stdout, stderr);
    seo.setOutputHandler();
  }

  @After
  public void tearDownClass() throws Exception {
    seo.clrOutputHandler();
    BeakerStdOutErrHandler.fini();
  }

  @Test
  public void shouldHandleStdout() throws Exception {
    //given
    //when
    System.out.print("Hello");
    //then
    assertThat(stdout.text).isNotEmpty();
  }

  @Test
  public void shouldHandleStderr() throws Exception {
    //given
    //when
    System.err.print("Error");
    //then
    assertThat(stderr.text).isNotEmpty();
  }

  static class SimpleOutputHandlerTest implements BeakerOutputHandler {

    private String text;

    @Override
    public void write(String b) {
      this.text = b;
    }
  }

  static class SimpleErrHandlerTest implements BeakerOutputHandler {

    private String text;

    @Override
    public void write(String b) {
      this.text = b;
    }
  }


}
