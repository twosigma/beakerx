
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
package com.twosigma.beakerx.kernel.commands;

import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.commands.item.MagicCommandItem;
import com.twosigma.beakerx.kernel.commands.item.MagicCommandItemWithCode;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class MagicCommandResultItemTest {

  @Test
  public void hasCodeToExecute() throws Exception {
    //given
    Code code = new Code("" +
            "%classpath add jar demoResources/beakerxTestLibrary.jar\n" +
            "code code code");
    //when
    MagicCommandItem item = new MagicCommandItemWithCode(code);
    //then
    assertThat(item.hasCodeToExecute()).isTrue();
  }

  @Test
  public void noCodeToExecute() throws Exception {
    //given
    Code code = new Code("%classpath add jar demoResources/beakerxTestLibrary.jar");
    //when
    MagicCommandItem item = new MagicCommandItemWithCode(code);
    //then
    assertThat(item.hasCodeToExecute()).isFalse();
  }
}