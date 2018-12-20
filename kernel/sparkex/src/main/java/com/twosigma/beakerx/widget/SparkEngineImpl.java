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
package com.twosigma.beakerx.widget;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.kernel.msg.StacktraceHtmlPrinter;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.configuration.SparkConfiguration;
import org.apache.spark.SparkConf;
import org.apache.spark.SparkContext;
import org.apache.spark.scheduler.SparkListener;
import org.apache.spark.scheduler.SparkListenerJobEnd;
import org.apache.spark.scheduler.SparkListenerJobStart;
import org.apache.spark.scheduler.SparkListenerStageCompleted;
import org.apache.spark.scheduler.SparkListenerStageSubmitted;
import org.apache.spark.scheduler.SparkListenerTaskEnd;
import org.apache.spark.scheduler.SparkListenerTaskStart;
import org.apache.spark.sql.RuntimeConfig;
import org.apache.spark.sql.SparkSession;
import scala.Tuple2;
import scala.collection.Iterator;

import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.twosigma.beakerx.kernel.PlainCode.createSimpleEvaluationObject;
import static com.twosigma.beakerx.widget.SparkUI.BEAKERX_ID;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_APP_NAME;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_CONTEXT_NAME;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_EXECUTOR_CORES;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_EXECUTOR_MEMORY;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_EXTRA_LISTENERS;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_MASTER;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_REPL_CLASS_OUTPUT_DIR;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_SESSION_NAME;
import static com.twosigma.beakerx.widget.SparkUI.STANDARD_SETTINGS;
import static com.twosigma.beakerx.widget.StartStopSparkListener.START_STOP_SPARK_LISTENER;

public class SparkEngineImpl implements SparkEngine {

  private SparkSession.Builder sparkSessionBuilder;

  SparkEngineImpl(SparkSession.Builder sparkSessionBuilder) {
    this.sparkSessionBuilder = sparkSessionBuilder;
    configureSparkSessionBuilder(this.sparkSessionBuilder);
  }

  @Override
  public TryResult configure(KernelFunctionality kernel, SparkUIApi sparkUI, Message parentMessage) {
    SparkConf sparkConf = createSparkConf(sparkUI.getAdvancedOptions(), getSparkConfBasedOn(this.sparkSessionBuilder));
    sparkConf = configureSparkConf(sparkConf, sparkUI);
    this.sparkSessionBuilder = SparkSession.builder().config(sparkConf);
    if (sparkUI.getHiveSupport()) {
      this.sparkSessionBuilder.enableHiveSupport();
    }
    TryResult sparkSessionTry = createSparkSession(sparkUI, parentMessage);
    if (sparkSessionTry.isError()) {
      return sparkSessionTry;
    }
    addListener(getOrCreate().sparkContext(), sparkUI);
    SparkVariable.putSparkSession(getOrCreate());
    TryResult tryResultSparkContext = initSparkContextInShell(kernel, parentMessage);
    if (!tryResultSparkContext.isError()) {
      kernel.registerCancelHook(SparkVariable::cancelAllJobs);
    }
    return tryResultSparkContext;
  }

  private TryResult createSparkSession(SparkUIApi sparkUI, Message parentMessage) {
    sparkUI.startSpinner(parentMessage);
    try {
      SparkSession sparkSession = getOrCreate();
      return TryResult.createResult(sparkSession);
    } catch (Exception e) {
      return TryResult.createError(formatError(e));
    } finally {
      sparkUI.stopSpinner();
    }
  }

  private String formatError(Exception e) {
    String[] print = StacktraceHtmlPrinter.print(Arrays.stream(e.getStackTrace()).map(StackTraceElement::toString).toArray(String[]::new));
    return String.join(System.lineSeparator(), print);
  }

  @Override
  public SparkSession getOrCreate() {
    return sparkSessionBuilder.getOrCreate();
  }

  @Override
  public String getSparkAppId() {
    RuntimeConfig conf = getOrCreate().conf();
    return conf.getAll().get(SPARK_APP_ID).get();
  }

  @Override
  public String getSparkUiWebUrl() {
    return getOrCreate().sparkContext().uiWebUrl().get();
  }

  @Override
  public String getSparkMasterUrl() {
    RuntimeConfig conf = getOrCreate().conf();
    return conf.getAll().get(SPARK_MASTER).get();
  }

  @Override
  public String sparkVersion() {
    try {
      InputStream sparkProps = Thread.currentThread().getContextClassLoader().
              getResourceAsStream("spark-version-info.properties");
      Properties props = new Properties();
      props.load(sparkProps);
      return props.getProperty("version");
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  private TryResult initSparkContextInShell(KernelFunctionality kernel, Message parent) {
    String addSc = String.format(("import com.twosigma.beakerx.widget.SparkVariable\n" +
                    "val %s = SparkVariable.getSparkSession()\n" +
                    "val %s = %s.sparkContext\n" +
                    "import org.apache.spark.SparkContext._\n" +
                    "import %s.implicits._\n" +
                    "import %s.sql\n" +
                    "import org.apache.spark.sql.functions._\n"),
            SPARK_SESSION_NAME, SPARK_CONTEXT_NAME, SPARK_SESSION_NAME, SPARK_SESSION_NAME, SPARK_SESSION_NAME);

    SimpleEvaluationObject seo = createSimpleEvaluationObject(addSc, kernel, new Message(new Header(JupyterMessages.COMM_MSG, parent.getHeader().getSession())), 1);
    return kernel.executeCode(addSc, seo);
  }

  private SparkConf createSparkConf(List<SparkConfiguration.Configuration> configurations, SparkConf old) {
    SparkConf sparkConf = new SparkConf();
    sparkConf.set(SPARK_EXTRA_LISTENERS, old.get(SPARK_EXTRA_LISTENERS));
    sparkConf.set(BEAKERX_ID, old.get(BEAKERX_ID));
    if (old.contains(SPARK_APP_NAME)) {
      sparkConf.set(SPARK_APP_NAME, old.get(SPARK_APP_NAME));
    }
    configurations.forEach(x -> {
      if (x.getName() != null) {
        sparkConf.set(x.getName(), (x.getValue() != null) ? x.getValue() : "");
      }
    });
    return sparkConf;
  }

  public SparkConf getSparkConf() {
    return getSparkConfBasedOn(this.sparkSessionBuilder);
  }

  public static SparkConf getSparkConfBasedOn(SparkSession.Builder sparkSessionBuilder) {
    try {
      SparkConf sparkConf = new SparkConf();
      Field options = sparkSessionBuilder.getClass().getDeclaredField("org$apache$spark$sql$SparkSession$Builder$$options");
      options.setAccessible(true);
      Iterator iterator = ((scala.collection.mutable.HashMap) options.get(sparkSessionBuilder)).iterator();
      while (iterator.hasNext()) {
        Tuple2 x = (Tuple2) iterator.next();
        sparkConf.set((String) (x)._1, (String) (x)._2);
      }
      return sparkConf;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  private SparkSession.Builder configureSparkSessionBuilder(SparkSession.Builder builder) {
    builder.config(SPARK_EXTRA_LISTENERS, START_STOP_SPARK_LISTENER);
    builder.config(BEAKERX_ID, UUID.randomUUID().toString());
    return builder;
  }

  private SparkConf configureSparkConf(SparkConf sparkConf, SparkUIApi sparkUI) {
    if (!sparkConf.contains(SPARK_APP_NAME)) {
      sparkConf.setAppName("beaker_" + UUID.randomUUID().toString());
    }
    if (sparkUI.getMasterURL().getValue() != null && !sparkUI.getMasterURL().getValue().isEmpty()) {
      sparkConf.set(SPARK_MASTER, sparkUI.getMasterURL().getValue());
    }
    if (!isLocalSpark(sparkConf)) {
      sparkConf.set(SPARK_REPL_CLASS_OUTPUT_DIR, KernelManager.get().getOutDir());
    }
    if (sparkUI.getExecutorMemory().getValue() != null && !sparkUI.getExecutorMemory().getValue().isEmpty()) {
      sparkConf.set(SPARK_EXECUTOR_MEMORY, sparkUI.getExecutorMemory().getValue());
    }

    if (sparkUI.getExecutorCores().getValue() != null && !sparkUI.getExecutorCores().getValue().isEmpty()) {
      sparkConf.set(SPARK_EXECUTOR_CORES, sparkUI.getExecutorCores().getValue());
    }

    return sparkConf;
  }


  private SparkContext addListener(SparkContext sc, SparkUIApi sparkUIManager) {
    sc.addSparkListener(new SparkListener() {

      @Override
      public void onJobStart(SparkListenerJobStart jobStart) {
        super.onJobStart(jobStart);
      }

      @Override
      public void onJobEnd(SparkListenerJobEnd jobEnd) {
        super.onJobEnd(jobEnd);
      }

      @Override
      public void onStageSubmitted(SparkListenerStageSubmitted stageSubmitted) {
        super.onStageSubmitted(stageSubmitted);
        sparkUIManager.startStage(stageSubmitted.stageInfo().stageId(), stageSubmitted.stageInfo().numTasks());
      }

      @Override
      public void onStageCompleted(SparkListenerStageCompleted stageCompleted) {
        super.onStageCompleted(stageCompleted);
        sparkUIManager.endStage(stageCompleted.stageInfo().stageId());
      }

      @Override
      public void onTaskStart(SparkListenerTaskStart taskStart) {
        super.onTaskStart(taskStart);
        sparkUIManager.taskStart(taskStart.stageId(), taskStart.taskInfo().taskId());
      }

      @Override
      public void onTaskEnd(SparkListenerTaskEnd taskEnd) {
        super.onTaskEnd(taskEnd);
        String reason = taskEnd.reason().toString();
        if (reason.equals("Success")) {
          sparkUIManager.taskEnd(taskEnd.stageId(), taskEnd.taskInfo().taskId());
        } else if (reason.contains("stage cancelled")) {
          sparkUIManager.taskCancelled(taskEnd.stageId(), taskEnd.taskInfo().taskId());
        }
      }
    });
    return sc;
  }

  public Map<String, String> getAdvanceSettings() {
    return Arrays.stream(getSparkConf().getAll())
            .filter(x -> isAdvancedSettings(x._1))
            .collect(Collectors.toMap(Tuple2::_1, Tuple2::_2));
  }

  private boolean isAdvancedSettings(String name) {
    return !STANDARD_SETTINGS.contains(name);
  }

  private static boolean isLocalSpark(SparkConf sparkConf) {
    return sparkConf.contains(SPARK_MASTER) && sparkConf.get(SPARK_MASTER) != null && sparkConf.get("spark.master").startsWith("local");
  }


  public static class SparkEngineFactoryImpl implements SparkEngineFactory {

    @Override
    public SparkEngine create(SparkSession.Builder sparkSessionBuilder) {
      return new SparkEngineImpl(sparkSessionBuilder);
    }
  }

}
