package com.twosigma.beakerx.groovy.evaluator;
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

import com.twosigma.ExecuteCodeCallbackTest;
import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.message.Message;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.ERROR;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.FINISHED;
import static org.assertj.core.api.Assertions.assertThat;

public class GroovyEvaluatorMagicCommandsTest {

  public static final String SRC_TEST_RESOURCES = "src/test/resources/";

  private static GroovyEvaluator groovyEvaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    groovyEvaluator = TestGroovyEvaluator.groovyEvaluator();
  }

  @Test
  public void addJarToClasspath() throws Exception {
    //given
    String code = "" +
            "import com.beakerx.BeakerxObject;\n" +
            "BeakerxObject beakerxObject = new BeakerxObject();\n" +
            "beakerxObject.getObjectTest()\n";
    SimpleEvaluationObject seo = runCode(code);
    assertThat(seo.getStatus()).isEqualTo(ERROR);
    //when
    PathToJar path = new PathToJar(SRC_TEST_RESOURCES + "beakerxTestLibrary.jar");
    groovyEvaluator.addJarToClasspath(path);
    //then
    SimpleEvaluationObject seo2 = runCode(code);
    assertThat(seo2.getStatus()).isEqualTo(FINISHED);
    assertThat(seo2.getPayload()).isEqualTo("BeakerxObject_test_123");
  }

  private SimpleEvaluationObject runCode(String code) throws InterruptedException {
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    Message message = new Message();
    seo.setJupyterMessage(message);
    groovyEvaluator.evaluate(seo, code);
    waitForResult(seo);
    return seo;
  }
}