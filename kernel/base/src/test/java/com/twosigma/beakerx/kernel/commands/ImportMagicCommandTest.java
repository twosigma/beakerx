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

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.CodeWithoutCommand;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.message.Message;
import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ImportMagicCommandTest {

  private MagicCommand sut;
  private KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    this.kernel = new KernelTest("id2", new EvaluatorTest());
    this.sut = new MagicCommand(kernel);
  }

  @Test
  public void addImport() throws Exception {
    //given
    Code code = new Code("" +
            "%import com.twosigma.beakerx.widgets.integers.IntSlider\n" +
            "w = new IntSlider()");
    //when
    MagicCommandResult result = sut.process(code, new Message(), 1);
    //then
    assertThat(result.getCode().get()).isEqualTo(new CodeWithoutCommand("w = new IntSlider()"));
    assertThat(kernel.getImports().getImportPaths()).contains(new ImportPath("com.twosigma.beakerx.widgets.integers.IntSlider"));
  }

  @Test
  public void removeImport() throws Exception {
    //given
    Code addImport = new Code("" +
            "%import com.twosigma.beakerx.widgets.integers.IntSlider\n");
    sut.process(addImport, new Message(), 1);
    assertThat(kernel.getImports().getImportPaths()).contains(new ImportPath("com.twosigma.beakerx.widgets.integers.IntSlider"));
    //when
    Code removeImport = new Code("" +
            "%unimport com.twosigma.beakerx.widgets.integers.IntSlider\n");
    sut.process(removeImport, new Message(), 1);
    //then
    assertThat(kernel.getImports().getImportPaths()).doesNotContain(new ImportPath("com.twosigma.beakerx.widgets.integers.IntSlider"));
  }

}