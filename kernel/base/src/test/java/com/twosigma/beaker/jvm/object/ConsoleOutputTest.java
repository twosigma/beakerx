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

package com.twosigma.beaker.jvm.object;

import org.assertj.core.api.Assertions;
import org.junit.Test;

public class ConsoleOutputTest {

  @Test
  public void createConsoleOutputWithParams_hasErrorAndTextProperties(){
    //when
    ConsoleOutput consoleOutput = new ConsoleOutput(true, "text_message");
    //then
    Assertions.assertThat(consoleOutput.isError()).isTrue();
    Assertions.assertThat(consoleOutput.getText()).isEqualTo("text_message");
  }

  @Test
  public void setIsPrintedToTrue_hasPrintedIsTrue(){
    //given
    ConsoleOutput consoleOutput = new ConsoleOutput(false, "");
    //when
    consoleOutput.setPrinted(true);
    //then
    Assertions.assertThat(consoleOutput.isPrinted()).isTrue();
  }

  @Test
  public void toString_returnStringWithErrorAndText(){
    //given
    ConsoleOutput consoleOutput = new ConsoleOutput(true, "text_message");
    //when
    String output = consoleOutput.toString();
    //then
    Assertions.assertThat(output.contains("true")).isTrue();
    Assertions.assertThat(output.contains("text_message")).isTrue();
  }

}
