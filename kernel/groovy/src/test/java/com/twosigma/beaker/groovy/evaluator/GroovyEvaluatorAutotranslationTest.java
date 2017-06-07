/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.groovy.evaluator;

import org.assertj.core.api.Assertions;
import org.junit.Test;

public class GroovyEvaluatorAutotranslationTest extends GroovyEvaluatorTest {

  @Test
  public void parseSetBeakerObjectScript_returnBeakerObjectValue() {
    //when
    Object result = parseClassFromScript("beaker.x = 10 ");
    //then
    Assertions.assertThat(result instanceof Number).isTrue();
  }

 @Test
  public void parseGetBeakerObjectScript_returnBeakerObjectValue() {
    //when
    parseClassFromScript("beaker.x = 10 ");
    Object result = parseClassFromScript("beaker.x");
    //then
    Assertions.assertThat(result).isNotNull();
  }

  @Test
  public void parseGetBeakerObjectScript_graph() {
    //when
    parseClassFromScript("  def r = new Random()\n" +
            "  def nnodes = 100\n" +
            "  def nodes = []\n" +
            "  def links = []\n" +
            "\n" +
            "  for (x in (0..nnodes)){\n" +
            "    nodes.add(name:\"\" + x, group:((int) x*7/nnodes))\n" +
            "  }\n" +
            "\n" +
            "for (x in (0..(int) nnodes*1.15)) {\n" +
            "    source = x % nnodes\n" +
            "    target = ((int) log(1 + r.nextInt(nnodes))/log(1.3))\n" +
            "    value = 10.0 / (1 + abs(source - target))\n" +
            "    links.add(source: source, target: target, value: value*value)\n" +
            "  }\n" +
            "\n" +
            "beaker.graph = [nodes: nodes, links: links] \n");
    Object result = parseClassFromScript("beaker.graph");
    //then
    Assertions.assertThat(result).isNotNull();
  }
}
