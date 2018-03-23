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
package com.twosigma.beakerx.groovy.evaluator;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class GroovyEvaluatorStackTraceTest {

  private static BaseEvaluator groovyEvaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    groovyEvaluator = TestGroovyEvaluator.groovyEvaluator();
  }

  @AfterClass
  public static void tearDown() throws Exception {
    groovyEvaluator.exit();
  }

  @Test
  public void arithmeticException() throws Exception {
    String code ="1/0";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code);
    //when
    TryResult evaluate = groovyEvaluator.evaluate(seo, code);
    //then
    assertThat(evaluate.isError()).isTrue();
    assertThat(evaluate.error()).contains("at this cell line 1");
  }

  @Test
  public void unableToResolveClass() throws Exception {
    String code ="new IntSlider()";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code);
    //when
    TryResult evaluate = groovyEvaluator.evaluate(seo, code);
    //then
    assertThat(evaluate.isError()).isTrue();
    System.out.println(evaluate.error());
    assertThat(evaluate.error()).startsWith("unable to resolve class IntSlider  @ line 1, column 1.");
  }

//  @Test
//  public void noSuchProperty() throws Exception {
//    String code ="ne";
//    SimpleEvaluationObject seo = new SimpleEvaluationObject(code);
//    //when
//    TryResult evaluate = groovyEvaluator.evaluate(seo, code);
//    //then
//    assertThat(evaluate.result()).isEqualTo("finished");
//  }
//
//  @Test
//  public void noSignatureOfMethod() throws Exception {
//    String code ="aa1()";
//    SimpleEvaluationObject seo = new SimpleEvaluationObject(code);
//    //when
//    TryResult evaluate = groovyEvaluator.evaluate(seo, code);
//    //then
//    assertThat(evaluate.result()).isEqualTo("finished");
//  }

}