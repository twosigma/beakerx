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
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.msg.StacktraceHtmlPrinter;
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
import org.jetbrains.annotations.NotNull;

import java.util.Arrays;
import java.util.UUID;

import static com.twosigma.beakerx.widget.SparkUIApi.BEAKERX_ID;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_EXTRA_LISTENERS;
import static com.twosigma.beakerx.widget.StartStopSparkListener.START_STOP_SPARK_LISTENER;

public class SparkEngineWithUIImpl extends SparkEngineBase implements SparkEngineWithUI {


  SparkEngineWithUIImpl(SparkSession.Builder sparkSessionBuilder) {
    super(sparkSessionBuilder, errorPrinter());
    configureSparkSessionBuilder(this.sparkSessionBuilder);
  }

  private boolean autoStart;

  @Override
  public void configAutoStart() {
    this.autoStart = true;
  }

  public boolean isAutoStart() {
    return this.autoStart;
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

  private SparkSession.Builder configureSparkSessionBuilder(SparkSession.Builder builder) {
    builder.config(SPARK_EXTRA_LISTENERS, START_STOP_SPARK_LISTENER);
    builder.config(BEAKERX_ID, UUID.randomUUID().toString());
    return builder;
  }

  public interface SparkEngineWithUIFactory {
    SparkEngineWithUI create(SparkSession.Builder sparkSessionBuilder);
  }

  public static class SparkEngineWithUIFactoryImpl implements SparkEngineWithUIFactory {

    @Override
    public SparkEngineWithUI create(SparkSession.Builder sparkSessionBuilder) {
      return new SparkEngineWithUIImpl(sparkSessionBuilder);
    }
  }

  @NotNull
  private static ErrorPrinter errorPrinter() {
    return e -> {
      String[] print = StacktraceHtmlPrinter.print(Arrays.stream(e.getStackTrace()).map(StackTraceElement::toString).toArray(String[]::new));
      return String.join(System.lineSeparator(), print);
    };
  }

}
