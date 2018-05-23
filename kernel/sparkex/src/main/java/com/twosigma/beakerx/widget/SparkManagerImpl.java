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
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import org.apache.spark.SparkConf;
import org.apache.spark.SparkContext;
import org.apache.spark.scheduler.SparkListener;
import org.apache.spark.scheduler.SparkListenerJobEnd;
import org.apache.spark.scheduler.SparkListenerJobStart;
import org.apache.spark.scheduler.SparkListenerStageCompleted;
import org.apache.spark.scheduler.SparkListenerStageSubmitted;
import org.apache.spark.scheduler.SparkListenerTaskEnd;
import org.apache.spark.scheduler.SparkListenerTaskStart;
import org.apache.spark.sql.SparkSession;
import scala.Tuple2;
import scala.collection.Iterator;

import java.lang.reflect.Field;
import java.util.UUID;

import static com.twosigma.beakerx.kernel.PlainCode.createSimpleEvaluationObject;
import static com.twosigma.beakerx.widget.SparkUIManager.SPARK_EXECUTOR_CORES;
import static com.twosigma.beakerx.widget.SparkUIManager.SPARK_EXECUTOR_MEMORY;
import static com.twosigma.beakerx.widget.SparkUIManager.SPARK_MASTER;
import static com.twosigma.beakerx.widget.SparkUIManager.SPARK_SESSION_NAME;

public class SparkManagerImpl implements SparkManager {

  public static final String SPARK_APP_NAME = "spark.app.name";
  public static final String SPARK_CORES_MAX = "spark.cores.max";
  private SparkUIManager sparkContextManager;
  private SparkSession.Builder sparkSessionBuilder;

  private SparkManagerImpl(SparkSession.Builder sparkSessionBuilder) {
    this.sparkSessionBuilder = sparkSessionBuilder;
  }

  @Override
  public TryResult configure(KernelFunctionality kernel, SparkUIManager sparkContextManager, Message parentMessage) {
    this.sparkContextManager = sparkContextManager;
    SparkConf sparkConf = configureSparkConf(getSparkConf());
    sparkSessionBuilder.config(sparkConf);
    SparkSession sparkSession = getOrCreate();
    addListener(getOrCreate().sparkContext());
    SparkVariable.putSparkContext(getOrCreate().sparkContext());
    SparkVariable.putSparkSession(sparkSession);
    TryResult tryResultSparkContext = initSparkContextInShell(kernel, parentMessage);
    if (!tryResultSparkContext.isError()) {
      kernel.registerCancelHook(SparkVariable::cancelAllJobs);
    }
    return tryResultSparkContext;
  }

  @Override
  public SparkSession getOrCreate() {
    return sparkSessionBuilder.getOrCreate();
  }

  @Override
  public SparkContext sparkContext() {
    return getOrCreate().sparkContext();
  }

  @Override
  public SparkSession.Builder getBuilder() {
    return this.sparkSessionBuilder;
  }

  private TryResult initSparkContextInShell(KernelFunctionality kernel, Message parent) {
    String addSc = String.format(("import com.twosigma.beakerx.widget.SparkVariable\n" +
                    "val %s = SparkVariable.getSparkSession()\n" +
                    "import org.apache.spark.SparkContext._\n" +
                    "import %s.implicits._\n" +
                    "import %s.sql\n" +
                    "import org.apache.spark.sql.functions._\n"),
            SPARK_SESSION_NAME, SPARK_SESSION_NAME, SPARK_SESSION_NAME);

    SimpleEvaluationObject seo = createSimpleEvaluationObject(addSc, kernel, new Message(new Header(JupyterMessages.COMM_MSG, parent.getHeader().getSession())), 1);
    return kernel.executeCode(addSc, seo);
  }

  private SparkConf createSparkConf() {
    SparkConf sparkConf = new SparkConf();
    try {
      Field options = this.sparkSessionBuilder.getClass().getDeclaredField("org$apache$spark$sql$SparkSession$Builder$$options");
      options.setAccessible(true);
      Iterator iterator = ((scala.collection.mutable.HashMap) options.get(this.sparkSessionBuilder)).iterator();
      while (iterator.hasNext()) {
        Tuple2 x = (Tuple2) iterator.next();
        sparkConf.set((String) (x)._1, (String) (x)._2);
      }
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    return sparkConf;
  }

  public SparkConf getSparkConf() {
    return createSparkConf();
  }

  private SparkConf configureSparkConf(SparkConf sparkConf) {
    if (!sparkConf.contains(SPARK_APP_NAME)) {
      sparkConf.setAppName("beaker_" + UUID.randomUUID().toString());
    }
    if (this.sparkContextManager.getMasterURL().getValue() != null && !this.sparkContextManager.getMasterURL().getValue().isEmpty()) {
      sparkConf.set(SPARK_MASTER, this.sparkContextManager.getMasterURL().getValue());
    }
    if (!isLocalSpark(sparkConf)) {
      sparkConf.set("spark.repl.class.outputDir", KernelManager.get().getOutDir());
    }
    if (this.sparkContextManager.getExecutorMemory().getValue() != null && !this.sparkContextManager.getExecutorMemory().getValue().isEmpty()) {
      sparkConf.set(SPARK_EXECUTOR_MEMORY, this.sparkContextManager.getExecutorMemory().getValue());
    }

    if (this.sparkContextManager.getExecutorCores().getValue() != null && !this.sparkContextManager.getExecutorCores().getValue().isEmpty()) {
      sparkConf.set(SPARK_EXECUTOR_CORES, this.sparkContextManager.getExecutorCores().getValue());
    }

    if (!sparkConf.contains(SPARK_CORES_MAX)) {
      sparkConf.set(SPARK_CORES_MAX, "100");
    }
    return sparkConf;
  }


  private SparkContext addListener(SparkContext sc) {
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
        sparkContextManager.startStage(stageSubmitted.stageInfo().stageId(), stageSubmitted.stageInfo().numTasks());
      }

      @Override
      public void onStageCompleted(SparkListenerStageCompleted stageCompleted) {
        super.onStageCompleted(stageCompleted);
        sparkContextManager.endStage(stageCompleted.stageInfo().stageId());
      }

      @Override
      public void onTaskStart(SparkListenerTaskStart taskStart) {
        super.onTaskStart(taskStart);
        sparkContextManager.taskStart(taskStart.stageId(), taskStart.taskInfo().taskId());
      }

      @Override
      public void onTaskEnd(SparkListenerTaskEnd taskEnd) {
        super.onTaskEnd(taskEnd);
        if (taskEnd.reason().toString().equals("Success")) {
          sparkContextManager.taskEnd(taskEnd.stageId(), taskEnd.taskInfo().taskId());
        }
      }
    });
    return sc;
  }

  private static boolean isLocalSpark(SparkConf sparkConf) {
    return sparkConf.contains(SPARK_MASTER) && sparkConf.get(SPARK_MASTER) != null && sparkConf.get("spark.master").startsWith("local");
  }


  public static class SparkManagerFactoryImpl implements SparkManagerFactory{

    @Override
    public SparkManager create(SparkSession.Builder sparkSessionBuilder) {
      return new SparkManagerImpl(sparkSessionBuilder);
    }
  }

}
