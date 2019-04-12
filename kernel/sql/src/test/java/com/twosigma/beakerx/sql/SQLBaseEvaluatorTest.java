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

import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.evaluator.EvaluatorBaseTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.evaluator.MagicCommandAutocompletePatternsMock;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.sql.evaluator.SQLEvaluator;
import org.junit.AfterClass;
import org.junit.BeforeClass;

import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static com.twosigma.beakerx.sql.magic.command.DataSourcesMagicCommand.DATASOURCES;
import static com.twosigma.beakerx.sql.magic.command.DefaultDataSourcesMagicCommand.DEFAULT_DATASOURCE;

public class SQLBaseEvaluatorTest extends EvaluatorBaseTest {

  private static BaseEvaluator evaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    evaluator = new SQLEvaluator("shellId1",
            "sessionId1",
            cellExecutor(),
            getTestTempFolderFactory(),
            kernelParameters(),
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock());
  }

  @AfterClass
  public static void tearDown() throws Exception {
    evaluator.exit();
  }

  @Override
  protected BaseEvaluator createNewEvaluator() {
    SQLEvaluator evaluator = new SQLEvaluator("shellId1",
            "sessionId1",
            cellExecutor(),
            getTestTempFolderFactory(),
            kernelParameters(),
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock());
    return evaluator;
  }

  @Override
  protected BaseEvaluator createNewEvaluator(TempFolderFactory tempFolderFactory) {
    SQLEvaluator evaluator = new SQLEvaluator("shellId1",
            "sessionId1",
            cellExecutor(),
            tempFolderFactory,
            kernelParameters(),
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock());
    return evaluator;
  }

  @Override
  public BaseEvaluator evaluator() {
    return evaluator;
  }

  @Override
  protected String codeForDivide16By2() {
    return "select 16/2";
  }

  @Override
  protected String codeForDivisionByZero() {
    return "select 1/0";
  }

  @Override
  protected String textAssertionForDivisionByZero() {
    return "Division by zero:";
  }

  @Override
  protected String codeForHello() {
    return "select 'Hello'";
  }

  @Override
  protected String codeForPrintln() {
    return null;
  }

  @Override
  public void returnPrintln() throws Exception {
    // exclude test
  }

  private static EvaluatorParameters kernelParameters() {
    Map<String, Object> params = new HashMap<>();
    params.put(DATASOURCES, "chemistry=jdbc:h2:mem:chemistry");
    params.put(DEFAULT_DATASOURCE, "jdbc:h2:mem:db1");
    return new EvaluatorParameters(params);
  }
}