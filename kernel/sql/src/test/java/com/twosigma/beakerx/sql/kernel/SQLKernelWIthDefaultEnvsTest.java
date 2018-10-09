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
package com.twosigma.beakerx.sql.kernel;

import com.twosigma.beakerx.BeakerXCommRepositoryMock;
import com.twosigma.beakerx.BeakerXServerMock;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.sql.SQLKernelTest;
import com.twosigma.beakerx.sql.evaluator.SQLEvaluator;
import org.junit.Test;

import static com.twosigma.beakerx.evaluator.EvaluatorTest.getCacheFolderFactory;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static com.twosigma.beakerx.sql.kernel.SQL.BEAKERX_SQL_DEFAULT_JDBC;
import static com.twosigma.beakerx.sql.kernel.SQL.getKernelParameters;
import static org.assertj.core.api.Assertions.assertThat;

public class SQLKernelWIthDefaultEnvsTest extends SQLKernelTest {
  @Override
  protected Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    EvaluatorParameters kernelParameters = getKernelParameters(name -> {
      if (BEAKERX_SQL_DEFAULT_JDBC.equals(name)) {
        return "jdbc:h2:mem:db1";
      }
      return null;
    });
    SQLEvaluator sqlEvaluator = new SQLEvaluator(
            sessionId,
            sessionId,
            cellExecutor(),
            getTestTempFolderFactory(),
            kernelParameters,
            new EvaluatorTest.BeakexClientTestImpl());
    Kernel sqlKernel = new SQL(sessionId,
            sqlEvaluator,
            kernelSocketsFactory,
            closeKernelAction,
            getCacheFolderFactory(),
            new BeakerXCommRepositoryMock(),
            BeakerXServerMock.create());
    return sqlKernel;
  }

  @Test
  public void incorrectlyFormattedJdbcUri() {
    //give
    //when
    EvaluatorParameters kernelParameters = getKernelParameters(name -> {
      if (BEAKERX_SQL_DEFAULT_JDBC.equals(name)) {
        return "jdb:h2:mem:db1";
      }
      return null;
    });
    //then
    assertThat(kernelParameters.getParams().containsKey(BEAKERX_SQL_DEFAULT_JDBC)).isFalse();
  }

  @Test
  public void noDefaultJdbc() {
    //give
    //when
    EvaluatorParameters kernelParameters = getKernelParameters(name -> null);
    //then
    assertThat(kernelParameters.getParams().containsKey(BEAKERX_SQL_DEFAULT_JDBC)).isFalse();
  }
}