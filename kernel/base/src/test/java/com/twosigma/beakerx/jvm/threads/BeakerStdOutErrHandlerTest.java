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

import com.twosigma.ExecuteCodeCallbackTest;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import org.assertj.core.api.Assertions;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.PrintStream;
import java.lang.reflect.Field;
import java.util.Map;

public class BeakerStdOutErrHandlerTest {

  private static SimpleEvaluationObject seo;
  private static BeakerStdOutErrHandler handler;
  private static Field instanceField;
  private static Field thrHandlersField;
  private static Field defOutField;
  private static Field defErrField;
  private static Field originOutField;
  private static Field originErrField;

  @BeforeClass
  public static void setUpClass() throws Exception {
    instanceField = BeakerStdOutErrHandler.class.getDeclaredField("instance");
    instanceField.setAccessible(true);
    thrHandlersField = BeakerStdOutErrHandler.class.getDeclaredField("thrHandlers");
    thrHandlersField.setAccessible(true);
    defOutField = BeakerStdOutErrHandler.class.getDeclaredField("def_out");
    defOutField.setAccessible(true);
    defErrField = BeakerStdOutErrHandler.class.getDeclaredField("def_err");
    defErrField.setAccessible(true);
    originOutField = BeakerStdOutErrHandler.class.getDeclaredField("orig_out");
    originOutField.setAccessible(true);
    originErrField = BeakerStdOutErrHandler.class.getDeclaredField("orig_err");
    originErrField.setAccessible(true);
    handler = new BeakerStdOutErrHandler();
    seo = new SimpleEvaluationObject("code", new ExecuteCodeCallbackTest());
  }

  @Before
  public void setUp() throws Exception {
    BeakerStdOutErrHandler.init();
  }

  @AfterClass
  public static void tearDownClass() throws Exception {
    BeakerStdOutErrHandler.fini();
  }

  @Test
  public void init_instanceIsNotNull() throws Exception {
    //when
    BeakerStdOutErrHandler.init();
    //then
    Assertions.assertThat(getInstance(handler)).isNotNull();
  }

  @Test
  public void fini_instanceIsNull() throws Exception {
    //when
    BeakerStdOutErrHandler.init();
    BeakerStdOutErrHandler.fini();
    //then
    Assertions.assertThat(getInstance(handler)).isNull();
  }

  @Test
  public void out_returnOriginOut() throws Exception {
    //when
    PrintStream printStream = BeakerStdOutErrHandler.out();
    //then
    Assertions.assertThat(getOriginOut(getInstance(handler))).isEqualTo(printStream);
  }

  @Test
  public void err_returnOriginErr() throws Exception {
    //when
    PrintStream printStream = BeakerStdOutErrHandler.err();
    //then
    Assertions.assertThat(getOriginErr(getInstance(handler))).isEqualTo(printStream);
  }

  @Test
  public void setOutputHandler_threadHandlersMapIsNotEmpty() throws Exception {
    //when
    BeakerStdOutErrHandler.setOutputHandler(seo.getStdOutputHandler(), seo.getStdErrorHandler());
    //then
    Assertions.assertThat(getThrHandlers(getInstance(handler))).isNotEmpty();
  }

  @Test
  public void theClrOutputHandler_threadHandlersMapIsEmpty() throws Exception {
    //given
    BeakerStdOutErrHandler.setOutputHandler(seo.getStdOutputHandler(), seo.getStdErrorHandler());
    //when
    BeakerStdOutErrHandler.clrOutputHandler();
    //then
    Assertions.assertThat(getThrHandlers(getInstance(handler))).isEmpty();
  }

  @Test
  public void setDefaultOutputHandler_shouldSetUpDefOutAndDefErr() throws Exception {
    BeakerOutputHandler stdOut = seo.getStdOutputHandler();
    BeakerOutputHandler stdErr = seo.getStdErrorHandler();
    //when
    BeakerStdOutErrHandler.setDefaultOutputHandler(stdOut,  stdErr);
    //then
    Assertions.assertThat(getDefOut(getInstance(handler))).isEqualTo(stdOut);
    Assertions.assertThat(getDefErr(getInstance(handler))).isEqualTo(stdErr);
  }

  private BeakerStdOutErrHandler getInstance(BeakerStdOutErrHandler handler) throws Exception {
    return (BeakerStdOutErrHandler)instanceField.get(handler);
  }

  private Map<Long, Object> getThrHandlers(BeakerStdOutErrHandler handler) throws Exception {
    return (Map<Long, Object>)thrHandlersField.get(handler);
  }

  private BeakerOutputHandler getDefOut(BeakerStdOutErrHandler handler) throws Exception {
    return (BeakerOutputHandler)defOutField.get(handler);
  }

  private BeakerOutputHandler getDefErr(BeakerStdOutErrHandler handler) throws Exception {
    return (BeakerOutputHandler)defErrField.get(handler);
  }

  private PrintStream getOriginOut(BeakerStdOutErrHandler handler) throws Exception {
    return (PrintStream)originOutField.get(handler);
  }

  private PrintStream getOriginErr(BeakerStdOutErrHandler handler) throws Exception {
    return (PrintStream) originErrField.get(handler);
  }

}
