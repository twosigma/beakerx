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
package com.twosigma.beakerx.groovy.evaluator;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.message.Message;
import org.junit.After;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class DeclareEnumGroovyEvaluatorTest {

  private static BaseEvaluator groovyEvaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    groovyEvaluator = TestGroovyEvaluator.groovyEvaluator();
  }

  @After
  public void tearDown() throws Exception {
    groovyEvaluator.exit();
  }

  @Test
  public void declareEnum() {
    //given
    //when
    String enumCode = "" +
            "enum MyColors{\n" +
            "  BLUE, RED, WHITE\n" +
            "}\n";
    runCode(enumCode);
    //when
    TryResult result = runCode("MyColors.values()");
    //then
    Object[] array = (Object[]) result.result();
    assertThat(array[1].toString()).isEqualTo("RED");
  }

  private TryResult runCode(String code) {
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code);
    Message message = commMsg();
    seo.setJupyterMessage(message);
    return groovyEvaluator.evaluate(seo, code);
  }

}
