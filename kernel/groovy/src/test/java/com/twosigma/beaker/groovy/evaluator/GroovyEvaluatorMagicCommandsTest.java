package com.twosigma.beaker.groovy.evaluator;
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
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.jupyter.PathToJar;
import com.twosigma.jupyter.message.Message;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.twosigma.beaker.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beaker.jvm.object.SimpleEvaluationObject.EvaluationStatus.ERROR;
import static com.twosigma.beaker.jvm.object.SimpleEvaluationObject.EvaluationStatus.FINISHED;
import static org.assertj.core.api.Assertions.assertThat;

public class GroovyEvaluatorMagicCommandsTest {

  public static final String SRC_TEST_RESOURCES = "src/test/resources/";

  private static GroovyEvaluator groovyEvaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    groovyEvaluator = new GroovyEvaluator("shellId1", "sessionId1");
  }

  @Test
  public void addJarToClasspath() throws Exception {
    //given
    PathToJar path = new PathToJar(SRC_TEST_RESOURCES + "BeakerXClasspathTest.jar");
    String code = "" +
            "import com.beaker.BeakerXClasspathTest;" +
            "BeakerXClasspathTest t = new BeakerXClasspathTest();\n";
    SimpleEvaluationObject seo = runCode(code);
    assertThat(seo.getStatus()).isEqualTo(ERROR);
    //when
    groovyEvaluator.addJarToClasspath(path);
    //then
    SimpleEvaluationObject seo2 = runCode(code);
    assertThat(seo2.getStatus()).isEqualTo(FINISHED);
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