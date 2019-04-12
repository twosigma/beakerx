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

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.ClasspathScanner;
import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.PathToJar;
import org.junit.After;
import org.junit.BeforeClass;
import org.junit.Test;

import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;

public class GroovyEvaluatorMagicCommandsTest {

  public static final String SRC_TEST_RESOURCES = "../../doc/resources/jar/";

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
  public void addJarToClasspath() throws Exception {
    //given
    String code = "" +
            "import com.example.Demo;\n" +
            "Demo demo = new Demo();\n" +
            "demo.getObjectTest()\n";
    TryResult seo = runCode(code);
    assertThat(seo.error()).contains("unable to resolve class");
    //when
    PathToJar path = new PathToJar(SRC_TEST_RESOURCES + "demo.jar");
    groovyEvaluator.addJarsToClasspath(singletonList(path));
    //then
    TryResult seo2 = runCode(code);
    assertThat(seo2.result()).isEqualTo("Demo_test_123");
  }

  private TryResult runCode(String code) {
    SimpleEvaluationObject seo = KernelTest.createSeo(code);
    return groovyEvaluator.evaluate(seo, code);
  }

  @Test
  public void scanClasspath() throws Exception {
    ClasspathScannerMock classpathScannerMock = new ClasspathScannerMock();
    //given
    BaseEvaluator evaluator = TestGroovyEvaluator.groovyEvaluator(classpathScannerMock);
    //when
    PathToJar path = new PathToJar(SRC_TEST_RESOURCES + "demo.jar");
    evaluator.addJarsToClasspath(singletonList(path));
    //then
    assertThat(classpathScannerMock.scanned).isTrue();
  }

  static class ClasspathScannerMock implements ClasspathScanner {
    boolean scanned = false;

    @Override
    public void scan() {
      scanned = true;
    }
  }

}