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

import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.FINISHED;
import static com.twosigma.beakerx.kernel.commands.MagicCommand.DEFAULT_DATASOURCE;
import static org.assertj.core.api.Assertions.assertThat;
import static ru.yandex.qatools.embed.postgresql.distribution.Version.Main.V9_6;

import com.twosigma.ExecuteCodeCallbackTest;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kernel.commands.MagicCommand;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.sql.evaluator.SQLEvaluator;
import com.twosigma.beakerx.table.TableDisplay;
import java.net.URISyntaxException;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import ru.yandex.qatools.embed.postgresql.EmbeddedPostgres;

public class SQLPostgresEvaluatorTest {

  private static final String SRC_TEST_RESOURCES = "./src/test/resources/";
  private static final String CLASSPATH_TO_POSTGRESQL_DRIVER_JAR = SRC_TEST_RESOURCES + "jdbc_drivers/postgresql-9.1-901-1.jdbc4.jar";
  private static final String TEST_DB_USER = "minty";
  private static final String TEST_DB_PASSWORD = "anotherPassword";
  private static final Integer TEST_DB_PORT = 5444;

  private EmbeddedPostgres embeddedPostgres = new EmbeddedPostgres(V9_6);

  private SQLEvaluator sqlEvaluator;
  private KernelTest kernelTest;
  private MagicCommand magicCommand;


  @Before
  public void setUp() throws Exception {

    embeddedPostgres.start("localhost", TEST_DB_PORT, "test", TEST_DB_USER, TEST_DB_PASSWORD);
    embeddedPostgres.getProcess().ifPresent(postgresProcess -> {
      try {
        postgresProcess.importFromFile(Paths.get(getClass().getClassLoader().getResource("db/postgres.sql").toURI()).toFile());
      } catch (URISyntaxException e) {
        e.printStackTrace();
      }
    });

    sqlEvaluator = new SQLEvaluator("she-llId1", "sessionId1", cellExecutor(), getTestTempFolderFactory());
    sqlEvaluator.setShellOptions(kernelParameters());
    kernelTest = new KernelTest("1", sqlEvaluator);
    magicCommand = new MagicCommand(kernelTest);
    KernelManager.register(kernelTest);

    addJDBCDriverViaMagicCommand();
  }

  private void addJDBCDriverViaMagicCommand() throws InterruptedException {
    String codeAsString = "%classpath add jar " + CLASSPATH_TO_POSTGRESQL_DRIVER_JAR;
    magicCommand.process(new Code(codeAsString), new Message(), 0);
  }

  @After
  public void tearDown() throws Exception {
    embeddedPostgres.stop();
    kernelTest.exit();
    KernelManager.register(null);
  }

  @Test
  public void evaluateSQL() throws InterruptedException {
    //given
    SimpleEvaluationObject seo = new SimpleEvaluationObject("SELECT * FROM docs", new ExecuteCodeCallbackTest());
    //when
    sqlEvaluator.evaluate(seo, seo.getExpression());
    waitForResult(seo);

    //then
    verifyResult(seo);
  }

  private KernelParameters kernelParameters() {
    Map<String, Object> params = new HashMap<>();
    params.put(DEFAULT_DATASOURCE, "jdbc:postgresql://localhost:" + TEST_DB_PORT + "/test?user=" + TEST_DB_USER + "&password=" + TEST_DB_PASSWORD);
    return new KernelParameters(params);
  }

  private void verifyResult(SimpleEvaluationObject seo) {
    assertThat(seo.getStatus()).isEqualTo(FINISHED);
    assertThat(seo.getPayload() instanceof TableDisplay).isTrue();
    TableDisplay result = (TableDisplay) seo.getPayload();
    assertThat(result.getValues().size()).isEqualTo(4);
  }

}
