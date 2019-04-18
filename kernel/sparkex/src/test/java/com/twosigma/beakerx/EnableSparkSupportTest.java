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
package com.twosigma.beakerx;

import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.evaluator.TestBeakerCellExecutor;
import com.twosigma.beakerx.kernel.BeakerXJsonConfig;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.Configuration;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelRunner;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandType;
import com.twosigma.beakerx.kernel.magic.command.functionality.LoadMagicMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.scala.evaluator.NoBeakerxObjectTestFactory;
import com.twosigma.beakerx.scala.evaluator.ScalaEvaluator;
import com.twosigma.beakerx.scala.kernel.Scala;
import com.twosigma.beakerx.scala.magic.command.EnableSparkSupportMagicCommand;
import com.twosigma.beakerx.scala.magic.command.SparkInitCommandFactory;
import com.twosigma.beakerx.table.serializer.TableDisplaySerializer;
import com.twosigma.beakerx.widget.PreviewTableDisplay;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

import static com.twosigma.beakerx.scala.magic.command.EnableSparkSupportMagicCommand.ENABLE_SPARK_SUPPORT;
import static com.twosigma.beakerx.scala.magic.command.LoadSparkSupportMagicCommand.LOAD_SPARK_SUPPORT;
import static com.twosigma.beakerx.table.TableDisplay.TABLE_DISPLAY_SUBTYPE;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getState;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beakerx.widget.Widget.DESCRIPTION;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;

public class EnableSparkSupportTest {

  private static KernelSocketsServiceTest kernelSocketsService;
  private static KernelFunctionality kernel;
  private static Thread kernelThread;

  private final static Logger logger = Logger.getLogger(EnableSparkSupportTest.class.getName());

  @BeforeClass
  public static void setUp() throws Exception {
    kernelSocketsService = new KernelSocketsServiceTest();
    kernel = createKernel("s1", kernelSocketsService, KernelCloseKernelAction.NO_ACTION);
    kernelThread = new Thread(() -> KernelRunner.run(() -> kernel));
    kernelThread.start();
    kernelSocketsService.waitForSockets();
  }

  @AfterClass
  public static void tearDown() throws Exception {
    kernelSocketsService.shutdown();
    kernelThread.join();
  }

  @Test
  public void sparkPreviewDisplayer() throws Exception {
    try {
      enableSparkSupport(ENABLE_SPARK_SUPPORT);
      //when
      runSparkDataset("ds");
      //then
      Optional<Message> preview = EvaluatorResultTestWatcher.waitForUpdateMessage(kernelSocketsService.getKernelSockets());
      assertThat(getValueForProperty(preview.get(), DESCRIPTION, String.class)).contains(PreviewTableDisplay.PREVIEW);
    } finally {
      stopSpark();
    }
  }

  @Test
  public void sparkImplicit() throws Exception {
    try {
      enableSparkSupport(ENABLE_SPARK_SUPPORT);
      //when
      runSparkDataset("ds.display(1)");
      //then
      Optional<Message> table = EvaluatorResultTestWatcher.waitForUpdateMessage(kernelSocketsService.getKernelSockets());
      logger.info(">>>>>>>>>>>>>>>>>>>>>1: "+table.toString());
      logger.info(">>>>>>>>>>>>>>>>>>>>>2: "+kernelSocketsService.getKernelSockets().getPublishedMessages().toString());
      assertThat(((Map) getState(table.get()).get("model")).get(TableDisplaySerializer.TYPE)).isEqualTo(TABLE_DISPLAY_SUBTYPE);
    } finally {
      stopSpark();
    }
  }

  @Test
  public void convertSeqToList() throws Exception {
    try {
      enableSparkSupport(ENABLE_SPARK_SUPPORT + " --start");
      String code =
              "import spark.implicits._\n" +
                      "import org.apache.spark.sql.functions._\n" +
                      "val df = Seq(\"en,fr,de\", \"en,fr\", \"ru,ua\", \"en,ru\").toDF(\"languages\")\n" +
                      "df.withColumn(\"langArray\", split(col(\"languages\"), \",\")).display(4)";
      Message messageWithCode = MessageFactoryTest.getExecuteRequestMessage(code);
      //when
      kernelSocketsService.handleMsg(messageWithCode);
      //then
      Optional<Message> table = EvaluatorResultTestWatcher.waitForUpdateMessage(kernelSocketsService.getKernelSockets());
      List values = (List) ((Map) getState(table.get()).get("model")).get("values");
      List firstRow = (List) values.get(0);
      List actual = (List) firstRow.get(1);
      assertThat(actual.get(0)).isEqualTo("en");
    } finally {
      stopSpark();
    }
  }

  private void stopSpark() throws InterruptedException {
    kernelSocketsService.getKernelSockets().clear();
    String code =
            "spark.stop()\n";
    Message messageWithCode = MessageFactoryTest.getExecuteRequestMessage(code);
    //when
    kernelSocketsService.handleMsg(messageWithCode);
    Optional<Message> idleMessage = EvaluatorResultTestWatcher.waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
  }

  private void enableSparkSupport(String code) throws InterruptedException {
    Message messageWithCode = MessageFactoryTest.getExecuteRequestMessage(code);
    kernelSocketsService.handleMsg(messageWithCode);
    Optional<Message> idleMessage = EvaluatorResultTestWatcher.waitForIdleMessage(kernelSocketsService.getKernelSockets());
    assertThat(idleMessage).isPresent();
    kernelSocketsService.getKernelSockets().clear();
  }

  private void runSparkDataset(String returnStatement) {
    //given
    String peoplePath = EnableSparkSupportTest.class.getClassLoader().getResource("people.json").getPath();
    String code =
            "val spark = SparkSession\n" +
                    "    .builder\n" +
                    "    .appName(\"jupyter\")\n" +
                    "    .master(\"local[*]\")\n" +
                    "    .getOrCreate()\n" +
                    "val ds = spark.read.json(\"file://" + peoplePath + "\")\n"
                    + returnStatement + "\n";

    Message messageWithCode = MessageFactoryTest.getExecuteRequestMessage(code);

    //when
    kernelSocketsService.handleMsg(messageWithCode);
  }

  static MagicCommandType enableSparkSupportMagicCommand(KernelFunctionality kernel) {
    return new MagicCommandType(
            EnableSparkSupportMagicCommand.ENABLE_SPARK_SUPPORT,
            "<>",
            new EnableSparkSupportMagicCommand(kernel, new EnableSparkSupportTest.SparkInitCommandFactoryMock(kernel)));
  }

  static public class SparkInitCommandFactoryMock implements SparkInitCommandFactory {

    boolean isJarAdded = false;
    boolean isRunOptions = false;
    boolean isLoadSparkFrom_SPARK_HOME_IfIsNotOnClasspath = false;
    boolean isLoadLatestVersionOfSparkIfIsNotOnClasspath = false;
    private KernelFunctionality kernel;

    public SparkInitCommandFactoryMock(KernelFunctionality kernel) {
      this.kernel = kernel;
    }

    @Override
    public Command addSparkexJar() {
      return new Command() {
        @Override
        public MagicCommandOutcomeItem run() {
          isJarAdded = true;
          return new MagicCommandOutput(MagicCommandOutput.Status.OK);
        }

        @Override
        public String getErrorMessage() {
          return "addSparkexJarError";
        }
      };
    }

    @Override
    public Command loadSparkSupportMagicClass() {
      return new Command() {
        @Override
        public MagicCommandOutcomeItem run() {
          Optional<MagicCommandFunctionality> magic = CodeFactory.findMagicCommandFunctionality(kernel.getMagicCommandTypes(), LoadMagicMagicCommand.LOAD_MAGIC);
          MagicCommandOutcomeItem magicCommandOutcomeItem = ((LoadMagicMagicCommand) magic.get())
                  .load("com.twosigma.beakerx.scala.magic.command.LoadSparkSupportMagicCommand");
          return magicCommandOutcomeItem;
        }

        @Override
        public String getErrorMessage() {
          return "Cannot load LoadSparkSupportMagicCommand class";
        }
      };
    }

    @Override
    public Command runOptions(MagicCommandExecutionParam param) {

      return new Command() {
        @Override
        public MagicCommandOutcomeItem run() {
          isRunOptions = true;
          return new MagicCommandOutput(MagicCommandOutput.Status.OK);
        }

        @Override
        public String getErrorMessage() {
          return "runOptionsError";
        }
      };
    }

    @Override
    public Command loadSparkFrom_SPARK_HOME_IfIsNotOnClasspath() {
      return new Command() {
        @Override
        public MagicCommandOutcomeItem run() {
          isLoadSparkFrom_SPARK_HOME_IfIsNotOnClasspath = true;
          return new MagicCommandOutput(MagicCommandOutput.Status.OK);
        }

        @Override
        public String getErrorMessage() {
          return "loadSparkFrom_SPARK_HOME_IfIsNotOnClasspathError";
        }
      };
    }

    @Override
    public Command loadLatestVersionOfSparkIfIsNotOnClasspath(MagicCommandExecutionParam param) {
      return new Command() {
        @Override
        public MagicCommandOutcomeItem run() {
          isLoadLatestVersionOfSparkIfIsNotOnClasspath = true;
          return new MagicCommandOutput(MagicCommandOutput.Status.OK);
        }

        @Override
        public String getErrorMessage() {
          return "loadLatestVersionOfSparkIfIsNotOnClasspathError";
        }
      };
    }

    @Override
    public Command loadSparkSupportMagic(MagicCommandExecutionParam param) {
      return new Command() {
        @Override
        public MagicCommandOutcomeItem run() {
          String loadSparkMagic = LOAD_SPARK_SUPPORT;
          Optional<MagicCommandFunctionality> magic = CodeFactory.findMagicCommandFunctionality(kernel.getMagicCommandTypes(), loadSparkMagic);
          MagicCommandOutcomeItem execute = magic.get()
                  .execute(param);
          return execute;
        }

        @Override
        public String getErrorMessage() {
          return "Error loading Spark, was it added to the classpath?";
        }
      };
    }

  }

  private static Kernel createKernel(String sessionId, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    MagicCommandConfigurationMock magicCommandConfiguration = new MagicCommandConfigurationMock();
    ScalaEvaluator evaluator = new ScalaEvaluator(sessionId,
            sessionId,
            TestBeakerCellExecutor.cellExecutor(),
            new NoBeakerxObjectTestFactory(),
            EvaluatorTest.getTestTempFolderFactory(),
            getKernelParameters(),
            new EvaluatorTest.BeakexClientTestImpl(),
            magicCommandConfiguration.patterns(),
            new ClasspathScannerMock());
    return new Scala(sessionId,
            evaluator,
            new Configuration(
                    kernelSocketsFactory,
                    closeKernelAction,
                    EvaluatorTest.getCacheFolderFactory(),
                    kernel -> singletonList(enableSparkSupportMagicCommand(kernel)),
                    new BeakerXCommRepositoryMock(),
                    BeakerXServerMock.create(),
                    magicCommandConfiguration,
                    new BeakerXJsonConfig(getPathToBeakerXJson()),
                    new RuntimetoolsMock()));
  }

  private static Path getPathToBeakerXJson() {
    try {
      return Paths.get(EnableSparkSupportTest.class.getClassLoader().getResource("beakerxTest.json").toURI());
    } catch (URISyntaxException e) {
      throw new RuntimeException(e);
    }
  }


  private static EvaluatorParameters getKernelParameters() {
    HashMap<String, Object> kernelParameters = new HashMap<>();
    return new EvaluatorParameters(kernelParameters);
  }
}
