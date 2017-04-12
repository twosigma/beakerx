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
package com.twosigma.beaker.sqlsh;

import com.twosigma.beaker.KernelSocketsFactoryTest;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.table.TableDisplay;
import com.twosigma.jupyter.KernelParameters;
import com.twosigma.jupyter.KernelRunner;
import com.twosigma.jupyter.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beaker.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beaker.jvm.object.SimpleEvaluationObject.EvaluationStatus.FINISHED;
import static com.twosigma.beaker.sqlsh.SqlKernelParameters.DATASOURCES;
import static com.twosigma.beaker.sqlsh.SqlKernelParameters.DEFAULT_DATASOURCE;
import static org.assertj.core.api.Assertions.assertThat;

public class SqlKernelTest {

  private SqlKernel sqlKernel;
  private KernelSocketsFactoryTest kernelSocketsFactory;

  @Before
  public void setUp() throws Exception {
    String sessionId = "sessionId1";
    SQLEvaluator sqlEvaluator = new SQLEvaluator(sessionId, sessionId);
    sqlEvaluator.setShellOptions(kernelParameters());
    kernelSocketsFactory = new KernelSocketsFactoryTest();
    sqlKernel = new SqlKernel(sessionId, sqlEvaluator, kernelSocketsFactory);
    new Thread(() -> KernelRunner.run(() -> sqlKernel)).start();
    kernelSocketsFactory.waitForSockets();
  }

  @After
  public void tearDown() throws Exception {
    kernelSocketsFactory.shutdown();
  }

  @Test
  public void evaluateSql() throws Exception {
    //given
    String code = "" +
            "CREATE TABLE color (\n" +
            "  id int(11) NOT NULL,\n" +
            "  name varchar(45) NOT NULL,\n" +
            "  code varchar(10),\n" +
            "  PRIMARY KEY (id)\n" +
            ");\n" +
            "\n" +
            "INSERT INTO color (id, name, code) VALUES (1001,'AliceBlue','#F0F8FF');\n" +
            "INSERT INTO color (id, name, code) VALUES (1002,'AntiqueWhite','#FAEBD7');\n" +
            "INSERT INTO color (id, name, code) VALUES (1003,'Aqua','#00FFFF');\n" +
            "SELECT * FROM color WHERE name LIKE 'A%';";
    //when
    SimpleEvaluationObject seo = sqlKernel.getEvaluatorManager().executeCode(code, new Message(), 1);
    waitForResult(seo);
    //then
    verifyResult(seo);
  }

  private void verifyResult(SimpleEvaluationObject seo) {
    assertThat(seo.getStatus()).isEqualTo(FINISHED);
    assertThat(seo.getPayload() instanceof TableDisplay).isTrue();
    TableDisplay result = (TableDisplay) seo.getPayload();
    assertThat(result.getValues().size()).isEqualTo(3);
  }

  private KernelParameters kernelParameters() {
    Map<String, Object> params = new HashMap<>();
    params.put(DATASOURCES, "chemistry=jdbc:h2:mem:chemistry");
    params.put(DEFAULT_DATASOURCE, "jdbc:h2:mem:db1");
    return new KernelParameters(params);
  }
}