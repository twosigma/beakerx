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

import com.twosigma.ExecuteCodeCallbackTest;
import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import org.junit.Before;
import org.junit.Test;
import com.twosigma.beakerx.message.Message;

import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static org.assertj.core.api.Assertions.assertThat;

public class GroovyEvaluatorPassingSimpleEvaluationObjectTest {

  private GroovyEvaluator groovyEvaluator;

  @Before
  public void setUp() throws Exception {
    groovyEvaluator = TestGroovyEvaluator.groovyEvaluator();
  }

  @Test
  public void shouldPassSimpleEvaluationObjectToShell() throws Exception {
    //given
    String code = "" +
            "import com.twosigma.beakerx.evaluator.InternalVariable\n" +
            "InternalVariable.getParentHeader()";
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    Message message = new Message();
    seo.setJupyterMessage(message);
    //when
    groovyEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    assertThat(seo.getPayload()).isEqualTo(message);
  }
}
