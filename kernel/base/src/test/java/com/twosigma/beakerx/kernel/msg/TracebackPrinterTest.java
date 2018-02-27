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
package com.twosigma.beakerx.kernel.msg;

import org.junit.Test;

import static com.twosigma.beakerx.kernel.msg.TracebackPrinter.END;
import static com.twosigma.beakerx.kernel.msg.TracebackPrinter.RED;
import static com.twosigma.beakerx.kernel.msg.TracebackPrinter.RED_BOLD;
import static org.assertj.core.api.Assertions.assertThat;


public class TracebackPrinterTest {

  @Test
  public void markRedBoldOnlyUserError() {
    //given
    String[] errors = {
            "java.lang.ArithmeticException: Division by zero",
            "at script151843480428036338083.run(script151843480428036338083.groovy:1)",
            "at com.twosigma.beakerx.groovy.evaluator.GroovyCodeRunner.call(GroovyCodeRunner.java:XXX)",
            "at com.twosigma.beakerx.groovy.evaluator.GroovyCodeRunner.call(GroovyCodeRunner.java:YYY)",
            "some additional stack trace"
    };
    //when
    String[] result = TracebackPrinter.print(errors);
    //then
    assertThat(result[0]).isEqualTo(RED_BOLD + "java.lang.ArithmeticException: Division by zero" + END);
    assertThat(result[1]).isEqualTo(RED_BOLD + "at script151843480428036338083.run(script151843480428036338083.groovy:1)" + END);
    assertThat(result[2]).isEqualTo(RED + "at com.twosigma.beakerx.groovy.evaluator.GroovyCodeRunner.call(GroovyCodeRunner.java:XXX)" + END);
    assertThat(result[3]).isEqualTo(RED + "at com.twosigma.beakerx.groovy.evaluator.GroovyCodeRunner.call(GroovyCodeRunner.java:YYY)" + END);
    assertThat(result[4]).isEqualTo(RED + "some additional stack trace" + END);
  }

  @Test
  public void empty() {
    String[] result = TracebackPrinter.print(null);
    assertThat(result.length).isEqualTo(0);
  }
}