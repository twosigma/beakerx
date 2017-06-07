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
package com.twosigma.beaker.scala;

import com.twosigma.ExecuteCodeCallbackTest;
import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.scala.evaluator.ScalaEvaluator;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.twosigma.beaker.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beaker.jvm.object.SimpleEvaluationObject.EvaluationStatus.FINISHED;
import static org.assertj.core.api.Assertions.assertThat;

public class ScalaAutotranslationTest {

  private static ScalaEvaluator scalaEvaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    String sid = "sid";
    scalaEvaluator = new ScalaEvaluator(NamespaceClient.getBeaker(sid).getObjectSerializer());
    scalaEvaluator.initialize("id", sid);
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

  @Test
  public void createStringInBeakerObject() throws Exception {
    //given
    String code = "beaker.x = \"Strings work fine\"\n";

    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    scalaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    assertThat(seo.getStatus()).isEqualTo(FINISHED);
    assertThat(seo.getPayload()).isNotNull();
  }

  @Test
  public void createFieldInBeakerObject_graph() throws Exception {
    //given
    String code = "var r = scala.util.Random\n" +
            "var nnodes = 100\n" +
            "var nodes = scala.collection.mutable.ListBuffer.empty[Map[String,Any]]\n" +
            "var links = scala.collection.mutable.ListBuffer.empty[Map[String,Double]]\n" +
            "var x=0.0\n" +
            "\n" +
            "for (x <- 0 to nnodes){\n" +
            "    nodes += Map(\"name\"->x.toString, \"group\"->((x*7)/nnodes));\n" +
            "}\n" +
            "\n" +
            "for (x <-  0 to (nnodes*1.15).asInstanceOf[Int]) {\n" +
            "    var source = (x % nnodes).asInstanceOf[Int]\n" +
            "    val log = (scala.math.log(1.0 + r.nextInt(nnodes))).asInstanceOf[Int]\n" +
            "    val int = (log / scala.math.log(1.3)).asInstanceOf[Int]\n" +
            "    var target = int\n" +
            "    var value = (10.0 / (1 + scala.math.abs(source - target)));\n" +
            "    links += Map(\"source\" -> source, \"target\" -> target, \"value\" -> (value*value))\n" +
            "}\n" +
            "beaker.graph = Map(\"nodes\" -> nodes, \"links\" -> links)";

    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, new ExecuteCodeCallbackTest());
    //when
    scalaEvaluator.evaluate(seo, code);
    waitForResult(seo);
    //then
    assertThat(seo.getStatus()).isEqualTo(FINISHED);
    assertThat(seo.getPayload()).isNotNull();
  }
}
