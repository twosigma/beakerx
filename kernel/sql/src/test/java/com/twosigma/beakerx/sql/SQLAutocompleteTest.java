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
package com.twosigma.beakerx.sql;

import com.twosigma.ExecuteCodeCallbackTest;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.evaluator.TestBeakerCellExecutor;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.sql.kernel.SQLEvaluator;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

 import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.kernel.commands.MagicCommand.DATASOURCES;
import static com.twosigma.beakerx.kernel.commands.MagicCommand.DEFAULT_DATASOURCE;
import static org.assertj.core.api.Assertions.assertThat;

public class SQLAutocompleteTest {

  private SQLEvaluator sqlEvaluator;
  private KernelTest kernelTest;

  @Before
  public void setUp() throws Exception {
    kernelTest = new KernelTest();
    KernelManager.register(kernelTest);
    sqlEvaluator = new SQLEvaluator("shellId1", "sessionId1", TestBeakerCellExecutor.cellExecutor());
    sqlEvaluator.setShellOptions(kernelParameters());
  }

  @After
  public void tearDown() throws Exception {
    sqlEvaluator.exit();
    KernelManager.register(null);
  }

  @Test
  public void shouldAutocompleteTo_s() throws Exception {
    //when
    AutocompleteResult autocomplete = sqlEvaluator.autocomplete(
            "s", 1);
    //then
    assertThat(autocomplete.getMatches()).isNotEmpty();
    assertThat(autocomplete.getStartIndex()).isEqualTo(0);
  }

  @Test
  public void shouldAutocompleteToValues() throws Exception {
    //given
    givenColorTable();
    //when
    String code = "INSERT INTO color (id, name, code) VALU";
    AutocompleteResult autocomplete = sqlEvaluator.autocomplete(code, code.length());
    //then
    assertThat(autocomplete.getMatches()).isNotEmpty();
    assertThat(autocomplete.getStartIndex()).isEqualTo(35);
  }

  @Test
  public void shouldAutocompleteToPercentPercentbeakerD() throws Exception {
    //given
    givenColorTable();
    //when
    String code = "%%beakerD";
    AutocompleteResult autocomplete = sqlEvaluator.autocomplete(code, code.length());
    //then
    assertThat(autocomplete.getMatches()).isNotEmpty();
    assertThat(autocomplete.getStartIndex()).isEqualTo(0);
  }

  @Test
  public void shouldAutocompleteAfterSpace() throws Exception {
    //given
    givenColorTable();
    //when
    String code = "%%beakerDB ";
    AutocompleteResult autocomplete = sqlEvaluator.autocomplete(code, code.length());
    //then
    assertThat(autocomplete.getMatches()).isNotEmpty();
    assertThat(autocomplete.getStartIndex()).isEqualTo(code.length());
  }

  private void givenColorTable() throws InterruptedException {
    SimpleEvaluationObject seo = new SimpleEvaluationObject(SQLForColorTable.CREATE_AND_SELECT_ALL, new ExecuteCodeCallbackTest());
    sqlEvaluator.evaluate(seo, SQLForColorTable.CREATE_AND_SELECT_ALL);
    waitForResult(seo);
  }

  private KernelParameters kernelParameters() {
    Map<String, Object> params = new HashMap<>();
    params.put(DATASOURCES, "chemistry=jdbc:h2:mem:chemistry");
    params.put(DEFAULT_DATASOURCE, "jdbc:h2:mem:db1");
    return new KernelParameters(params);
  }
}