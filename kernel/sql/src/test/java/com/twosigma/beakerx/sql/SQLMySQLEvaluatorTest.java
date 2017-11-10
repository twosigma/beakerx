package com.twosigma.beakerx.sql;

import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForResult;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static com.twosigma.beakerx.jvm.object.SimpleEvaluationObject.EvaluationStatus.FINISHED;
import static com.twosigma.beakerx.kernel.commands.MagicCommand.DEFAULT_DATASOURCE;
import static com.wix.mysql.EmbeddedMysql.anEmbeddedMysql;
import static com.wix.mysql.ScriptResolver.classPathScript;
import static com.wix.mysql.config.Charset.UTF8;
import static com.wix.mysql.config.MysqldConfig.aMysqldConfig;
import static com.wix.mysql.distribution.Version.v5_7_latest;
import static org.assertj.core.api.Assertions.assertThat;

import com.twosigma.ExecuteCodeCallbackTest;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kernel.commands.MagicCommand;
import com.twosigma.beakerx.kernel.commands.MagicCommandResult;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.sql.evaluator.SQLEvaluator;
import com.twosigma.beakerx.table.TableDisplay;
import com.wix.mysql.EmbeddedMysql;
import com.wix.mysql.config.MysqldConfig;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class SQLMySQLEvaluatorTest {

  private static final String SRC_TEST_RESOURCES = "./src/test/resources/";
  private static final String CLASSPATH_TO_MYSQL_DRIVER_JAR = SRC_TEST_RESOURCES + "jdbc_drivers/mysql-connector-java-6.0.6.jar";
  private static final String TEST_DB_USER = "minty";
  private static final String TEST_DB_PASSWORD = "anotherPassword";
  private static final Integer TEST_DB_PORT = 2215;

  private EmbeddedMysql embeddedMysql;
  private SQLEvaluator sqlEvaluator;
  private KernelTest kernelTest;
  private MagicCommand magicCommand;


  @Before
  public void setUp() throws Exception {

    MysqldConfig config = aMysqldConfig(v5_7_latest)
        .withCharset(UTF8)
        .withPort(TEST_DB_PORT)
        .withUser(TEST_DB_USER, TEST_DB_PASSWORD)
        .withTimeZone("Europe/Vilnius")
        .withTimeout(2, TimeUnit.MINUTES)
        .withServerVariable("max_connect_errors", 666)
        .build();

    embeddedMysql = anEmbeddedMysql(config)
        .addSchema("test", classPathScript("db/mysql.sql"))
        .start();

    sqlEvaluator = new SQLEvaluator("she-llId1", "sessionId1", cellExecutor(), getTestTempFolderFactory());
    sqlEvaluator.setShellOptions(kernelParameters());
    kernelTest = new KernelTest("1", sqlEvaluator);
    magicCommand = new MagicCommand(kernelTest);
    KernelManager.register(kernelTest);

    addJDBCDriverViaMagicCommand();
  }

  private void addJDBCDriverViaMagicCommand() throws InterruptedException {
    String codeAsString = "%classpath add jar " + CLASSPATH_TO_MYSQL_DRIVER_JAR;
    magicCommand.process(new Code(codeAsString), new Message(), 0);
  }

  @After
  public void tearDown() throws Exception {
    embeddedMysql.stop();
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
    params.put(DEFAULT_DATASOURCE, "jdbc:mysql://localhost:" + TEST_DB_PORT + "/test?user=" + TEST_DB_USER + "&password=" + TEST_DB_PASSWORD);
    return new KernelParameters(params);
  }

  private void verifyResult(SimpleEvaluationObject seo) {
    assertThat(seo.getStatus()).isEqualTo(FINISHED);
    assertThat(seo.getPayload() instanceof TableDisplay).isTrue();
    TableDisplay result = (TableDisplay) seo.getPayload();
    assertThat(result.getValues().size()).isEqualTo(4);
  }

}
