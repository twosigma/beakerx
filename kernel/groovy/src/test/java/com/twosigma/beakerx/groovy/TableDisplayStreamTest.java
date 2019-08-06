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

package com.twosigma.beakerx.groovy;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.table.TableDisplay;
import org.junit.After;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class TableDisplayStreamTest {

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
  public void groovyTableDisplayStream() {
    //given
    //when
    String enumCode = "" +
            "import java.util.function.Supplier\n" +
            "import java.util.stream.Stream\n" +
            "def generate = Stream.generate(new Supplier<Map<String, Object>>() {\n" +
            "    def random = new Random()\n" +
            "    def index = 0\n" +
            "\n" +
            "    @Override\n" +
            "    Map<String, Object> get() {\n" +
            "        return [str1: index++, str2: random.nextDouble(), str3: random.nextFloat()]\n" +
            "    }\n" +
            "})" +
            "\n" +
            "new TableDisplay(generate)";
    //when
    TryResult td = runCode(enumCode);
    //then
    TableDisplay tableDisplay = (TableDisplay) td.result();
    List<List<?>> lists = tableDisplay.takeNextPage();
    assertThat(lists.size()).isEqualTo(tableDisplay.PAGE_SIZE);
    assertThat(lists.get(0).get(0)).isEqualTo(1000);
  }

  private TryResult runCode(String code) {
    SimpleEvaluationObject seo = KernelTest.createSeo(code);
    return groovyEvaluator.evaluate(seo, code);
  }
}
