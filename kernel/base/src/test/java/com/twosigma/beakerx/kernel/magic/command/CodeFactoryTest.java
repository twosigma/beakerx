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
package com.twosigma.beakerx.kernel.magic.command;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.message.Message;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class CodeFactoryTest {

  private KernelFunctionality kernel;

  @Before
  public void setUp() throws Exception {
    this.kernel = new KernelTest();
  }

  @Test
  public void shouldBuildCodeWithCombinationOfCodeAndMagic() {
    //given
    String codeAsString = "" +
            "println(1)\n" +
            "%time 1+1\n" +
            "println(2)\n" +
            "%time 1+2\n";
    //when
    Code code = CodeFactory.create(codeAsString, commMsg(), kernel);
    //then
    assertThat(code.getCodeFrames().size()).isEqualTo(4);
  }

  @Test
  public void shouldBuildCodeWithIfStatement() {
    //given
    String codeAsString = "" +
            "println(1)\n" +
            "%time 1+1\n" +
            "if(true){\n" +
            "  println(2)\n" +
            "}\n" +
            "println(3)\n" +
            "%time 1+2\n" +
            "println(4)\n";
    //when
    Code code = CodeFactory.create(codeAsString, commMsg(), kernel);
    //then
    assertThat(code.getCodeFrames().size()).isEqualTo(5);
  }

  @Test
  public void shouldBuildCodeWithMagicCommandInsideIfStatement() {
    //given
    String codeAsString = "" +
            "println(1)\n" +
            "if(true){\n" +
            "    %time println(221)\n" +
            "}\n" +
            "println(2)\n" +
            "  %time 1+2";
    //when
    Code code = CodeFactory.create(codeAsString, commMsg(), kernel);
    //then
    assertThat(code.getCodeFrames().size()).isEqualTo(4);
  }

  @Test
  public void shouldNotModifyCode() {
    String codeAsString = "%time println(\"x  y\")";
    //when
    Code code = CodeFactory.create(codeAsString, commMsg(), kernel);
    //then
    assertThat(((MagicCommand) code.getCodeFrames().get(0)).getCommand()).isEqualTo(codeAsString);
  }
}