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

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.evaluator.MagicCommandAutocompletePatternsMock;
import com.twosigma.beakerx.jvm.object.OutputCell;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.sql.evaluator.SQLEvaluator;
import com.twosigma.beakerx.table.TableDisplay;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static com.twosigma.beakerx.sql.magic.command.DataSourcesMagicCommand.DATASOURCES;
import static com.twosigma.beakerx.sql.magic.command.DefaultDataSourcesMagicCommand.DEFAULT_DATASOURCE;
import static org.assertj.core.api.Assertions.assertThat;

public class SQLEvaluatorTest {

  private SQLEvaluator sqlEvaluator;
  private KernelTest kernelTest;

  @Before
  public void setUp() throws Exception {
    sqlEvaluator = new SQLEvaluator(
            "shellId1",
            "sessionId1",
            cellExecutor(),
            getTestTempFolderFactory(),
            kernelParameters(),
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock());
    sqlEvaluator.updateEvaluatorParameters(kernelParameters());
    kernelTest = new KernelTest("1", sqlEvaluator);
    KernelManager.register(kernelTest);
  }

  @After
  public void tearDown() throws Exception {
    kernelTest.exit();
    KernelManager.register(null);
  }

  @Test
  public void evaluateSql() throws Exception {
    //given
    SimpleEvaluationObject seo = KernelTest.createSeo(SQLForColorTable.CREATE_AND_SELECT_ALL);
    //when
    TryResult evaluate = sqlEvaluator.evaluate(seo, seo.getExpression());
    //then
    verifyResult(evaluate);
  }

  private void verifyResult(TryResult seo) {
    assertThat(seo.result() instanceof TableDisplay).isTrue();
    TableDisplay result = (TableDisplay) seo.result();
    assertThat(result.getValues().size()).isEqualTo(3);
  }

  @Test
  public void insertsShouldReturnOutputCellHIDDEN() throws Exception {
    //given
    SimpleEvaluationObject seo = KernelTest.createSeo(SQLForColorTable.CREATE);
    //when
    TryResult evaluate = sqlEvaluator.evaluate(seo, seo.getExpression());
    //then
    verifyInsertResult(evaluate);
  }

  private void verifyInsertResult(TryResult seo) {
    assertThat(seo.result()).isEqualTo(OutputCell.HIDDEN);
  }

  private EvaluatorParameters kernelParameters() {
    Map<String, Object> params = new HashMap<>();
    params.put(DATASOURCES, "chemistry=jdbc:h2:mem:chemistry");
    params.put(DEFAULT_DATASOURCE, "jdbc:h2:mem:db1");
    return new EvaluatorParameters(params);
  }
}