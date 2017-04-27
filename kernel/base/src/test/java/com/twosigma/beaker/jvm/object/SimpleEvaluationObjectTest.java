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

package com.twosigma.beaker.jvm.object;

import com.twosigma.ExecuteCodeCallbackTest;
import com.twosigma.beaker.jvm.ObserverObjectTest;
import com.twosigma.beaker.jvm.threads.BeakerOutputHandler;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beaker.jvm.object.SimpleEvaluationObject.EvaluationStatus.*;

public class SimpleEvaluationObjectTest {

  private SimpleEvaluationObject seo;
  private ObserverObjectTest observer;

  @Before
  public void setUp() throws Exception {
    seo = new SimpleEvaluationObject("code", new ExecuteCodeCallbackTest());
    observer = new ObserverObjectTest();
    seo.addObserver(observer);
  }

  @Test
  public void createWithParam_hasExpressionIsParamAndStatusIsQueued() throws Exception {
    //when
    SimpleEvaluationObject object = new SimpleEvaluationObject("code", new ExecuteCodeCallbackTest());
    //then
    Assertions.assertThat(object.getExpression()).isEqualTo("code");
    Assertions.assertThat(object.getStatus()).isEqualTo(QUEUED);
  }

  @Test
  public void seoStarted_shouldNotifyObserver() throws Exception {
    //when
    seo.started();
    //then
    Assertions.assertThat(observer.getObjectList().get(0)).isEqualTo(seo);
  }

  @Test
  public void seoFinished_shouldNotifyObserver() throws Exception {
    //when
    seo.finished(new Object());
    //then
    Assertions.assertThat(observer.getObjectList().get(0)).isEqualTo(seo);
  }

  @Test
  public void seoError_shouldNotifyObserver() throws Exception {
    //when
    seo.error(new Object());
    //then
    Assertions.assertThat(observer.getObjectList().get(0)).isEqualTo(seo);
  }

  @Test
  public void seoUpdate_shouldNotifyObserver() throws Exception {
    //when
    seo.update(new Object());
    //then
    Assertions.assertThat(observer.getObjectList().get(0)).isEqualTo(seo);
  }

  @Test
  public void seoStarted_hasRunningStatus() throws Exception {
    //when
    seo.started();
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(RUNNING);
  }

  @Test
  public void seoFinished_hasFinishedStatus() throws Exception {
    //when
    seo.finished(new Object());
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(FINISHED);
  }

  @Test
  public void seoError_hasErrorStatus() throws Exception {
    //when
    seo.error(new Object());
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(ERROR);
  }

  @Test
  public void seoUpdate_hasRunningStatus() throws Exception {
    //when
    seo.update(new Object());
    //then
    Assertions.assertThat(seo.getStatus()).isEqualTo(RUNNING);
  }

  @Test
  public void seoUpdate_shouldSetPayload() throws Exception {
    //given
    Object payload = new Object();
    //when
    seo.update(payload);
    //then
    Assertions.assertThat(seo.getPayload()).isEqualTo(payload);
  }

  @Test
  public void seoFinished_shouldSetPayload() throws Exception {
    //given
    Object payload = new Object();
    //when
    seo.finished(payload);
    //then
    Assertions.assertThat(seo.getPayload()).isEqualTo(payload);
  }

  @Test
  public void seoError_shouldSetPayload() throws Exception {
    //given
    Object payload = new Object();
    //when
    seo.error(payload);
    //then
    Assertions.assertThat(seo.getPayload()).isEqualTo(payload);
  }

  @Test
  public void beakerOutputHandlerWriteBytesWithLength_shouldNotifyObserver() throws Exception {
    //given
    BeakerOutputHandler handler = seo.getStdOutputHandler();
    //when
    handler.write("test".getBytes(), 0, 2);
    //then
    Assertions.assertThat(observer.getObjectList().get(0)).isEqualTo(seo);
  }

  @Test
  public void beakerOutputHandlerWriteInt_shouldNotifyObserver() throws Exception {
    //given
    BeakerOutputHandler handler = seo.getStdOutputHandler();
    //when
    handler.write('t');
    //then
    Assertions.assertThat(observer.getObjectList().get(0)).isEqualTo(seo);
  }

  @Test
  public void beakerOutputHandlerWriteBytes_shouldNotifyObserver() throws Exception {
    //given
    BeakerOutputHandler handler = seo.getStdOutputHandler();
    //when
    handler.write("test".getBytes());
    //then
    Assertions.assertThat(observer.getObjectList().get(0)).isEqualTo(seo);
  }

  @Test
  public void stdErrorHandlerWrite_addConsoleOutput() throws Exception {
    //given
    BeakerOutputHandler handler = seo.getStdErrorHandler();
    //when
    handler.write("test".getBytes());
    //then
    Assertions.assertThat(seo.getConsoleOutput()).isNotEmpty();
  }

  @Test
  public void stdOutputHandlerWrite_addConsoleOutput() throws Exception {
    //given
    BeakerOutputHandler handler = seo.getStdOutputHandler();
    //when
    handler.write("test".getBytes());
    //then
    Assertions.assertThat(seo.getConsoleOutput()).isNotEmpty();
  }

}
