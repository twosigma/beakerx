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

import com.twosigma.beakerx.jvm.object.Configuration;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.threads.ResultSender;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class BeakerStdOutErrHandlerTest {

  private static SimpleEvaluationObject seo;
  private SimpleOutputHandlerMock stdout;
  private SimpleErrHandlerMock stderr;

  @Before
  public void setUp() throws Exception {
    BeakerStdInOutErrHandler.init();
    stdout = new SimpleOutputHandlerMock();
    stderr = new SimpleErrHandlerMock();
    seo = new SimpleEvaluationObject("code", seo -> new Configuration(new BeakerInputHandlerMock(), stdout, stderr, new ResultSenderMock(), commMsg(), 1));
    seo.setOutputHandler();
  }

  @After
  public void tearDownClass() throws Exception {
    seo.clrOutputHandler();
    BeakerStdInOutErrHandler.fini();
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

  static class SimpleOutputHandlerMock implements BeakerOutputHandler {

    private String text;

    @Override
    public void write(String b) {
      this.text = b;
    }
  }

  static class SimpleErrHandlerMock implements BeakerOutputHandler {

    private String text;

    @Override
    public void write(String b) {
      this.text = b;
    }
  }

  static class BeakerInputHandlerMock implements BeakerInputHandler {

    @Override
    public int read() {
      return 0;
    }
  }

  static class ResultSenderMock implements ResultSender {
    @Override
    public void update(SimpleEvaluationObject seo) {
    }

    @Override
    public void exit() {

    }
  }

}
