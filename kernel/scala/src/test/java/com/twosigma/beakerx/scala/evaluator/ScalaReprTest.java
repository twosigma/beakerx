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

package com.twosigma.beakerx.scala.evaluator;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import com.twosigma.beakerx.scala.TestScalaEvaluator;
import com.twosigma.beakerx.scala.kernel.ScalaKernelMock;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class ScalaReprTest {

  private static ScalaEvaluator scalaEvaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    scalaEvaluator = TestScalaEvaluator.evaluator();
  }

  @Before
  public void setUp() throws Exception {
    ScalaKernelMock kernel = new ScalaKernelMock("id", scalaEvaluator);
    KernelManager.register(kernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @AfterClass
  public static void tearDownClass() throws Exception {
    scalaEvaluator.exit();
  }

  @Test
  public void unitObjectShouldBeRepresentedAsHIDDEN() {
    //given
    String code = "()";
    SimpleEvaluationObject seo = KernelTest.createSeo(code);
    //when
    TryResult evaluate = scalaEvaluator.evaluate(seo, code);
    //then
    assertThat(((MIMEContainer) evaluate.result())).isEqualTo(MIMEContainer.HIDDEN);
  }

  @Test
  public void emptyStringShouldBeRepresentedAsEmptyString() {
    //given
    String code = "\"\"";
    SimpleEvaluationObject seo = KernelTest.createSeo(code);
    //when
    TryResult evaluate = scalaEvaluator.evaluate(seo, code);
    //then
    assertThat(evaluate.result()).isEqualTo("");
  }
}

