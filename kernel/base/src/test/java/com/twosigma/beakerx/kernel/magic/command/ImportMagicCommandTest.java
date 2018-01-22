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
package com.twosigma.beakerx.kernel.magic.command;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.PlainCode;
import com.twosigma.beakerx.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static com.twosigma.ExecuteCodeCallbackTest.EXECUTION_TEST_CALLBACK;
import static org.assertj.core.api.Assertions.assertThat;

public class ImportMagicCommandTest {

  private KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    this.kernel = new KernelTest("id2", new EvaluatorTest());
  }

  @After
  public void tearDown() throws Exception {
    kernel.exit();
  }

  @Test
  public void addImport() {
    //given
    String allCode = "%import com.twosigma.beakerx.widgets.integers.IntSlider\n" +
            "w = new IntSlider()";
    Code code = CodeFactory.create(allCode, new Message(), kernel);
    //when
    code.execute(kernel, 1, EXECUTION_TEST_CALLBACK);
    //then
    PlainCode actual = (PlainCode) code.getCodeFrames().get(1);
    assertThat(actual.getPlainCode()).isEqualTo("w = new IntSlider()");
    assertThat(kernel.getImports().getImportPaths()).contains(new ImportPath("com.twosigma.beakerx.widgets.integers.IntSlider"));
  }

  @Test
  public void removeImport() {
    //given
    String allCode = "%import com.twosigma.beakerx.widgets.integers.IntSlider\n";
    Code code = CodeFactory.create(allCode, new Message(), kernel);
    code.execute(kernel, 1, EXECUTION_TEST_CALLBACK);
    assertThat(kernel.getImports().getImportPaths()).contains(new ImportPath("com.twosigma.beakerx.widgets.integers.IntSlider"));
    //when
    String allRemoveCode = "%unimport com.twosigma.beakerx.widgets.integers.IntSlider\n";
    Code codeToRemove = CodeFactory.create(allRemoveCode, new Message(), kernel);
    codeToRemove.execute(kernel, 2, EXECUTION_TEST_CALLBACK);
    //then
    assertThat(kernel.getImports().getImportPaths()).doesNotContain(new ImportPath("com.twosigma.beakerx.widgets.integers.IntSlider"));
  }

  @Test
  public void allowExtraWhitespaces() {
    String allCode = "%import       com.twosigma.beakerx.widgets.integers.IntSlider";
    Code code = CodeFactory.create(allCode, new Message(), kernel);
    code.execute(kernel, 1, EXECUTION_TEST_CALLBACK);
    assertThat(kernel.getImports().getImportPaths()).contains(new ImportPath("com.twosigma.beakerx.widgets.integers.IntSlider"));
  }

  @Test
  public void wrongImportFormat() {
    String allCode = "%import ";
    Code wrongFormatImport = CodeFactory.create(allCode, new Message(), kernel);
    wrongFormatImport.execute(kernel, 1, EXECUTION_TEST_CALLBACK);
    List<Message> std = EvaluatorResultTestWatcher.getStderr(kernel.getPublishedMessages());
    String text = (String) std.get(0).getContent().get("text");
    assertThat(text).contains("Wrong format.");
  }

}
