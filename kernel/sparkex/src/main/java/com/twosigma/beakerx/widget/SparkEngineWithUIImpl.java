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
import com.twosigma.beakerx.scala.magic.command.YarnSparkOptionCommand;
import org.apache.spark.SparkConf;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static com.twosigma.beakerx.widget.SparkUIApi.BEAKERX_ID;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_EXTRA_LISTENERS;
import static com.twosigma.beakerx.widget.StartStopSparkListener.START_STOP_SPARK_LISTENER;

public class SparkEngineWithUIImpl extends SparkEngineBase implements SparkEngineWithUI {

  public static final String STOP_FROM_SPARK_UI_FORM_BUTTON = "stop_from_spark_ui_form_button";
  private SparkSessionBuilderFactory sparkSessionBuilderFactory;
  private SparkListenerService sparkListenerService;

  SparkEngineWithUIImpl(SparkSessionBuilder sparkSessionBuilder,
                        SparkSessionBuilderFactory sparkSessionBuilderFactory,
                        SparkListenerService sparkListenerService) {
    super(sparkSessionBuilder, errorPrinter());
    this.sparkSessionBuilderFactory = sparkSessionBuilderFactory;
    this.sparkListenerService = sparkListenerService;
  }

  private boolean autoStart;

  @Override
  public void configAutoStart() {
    this.autoStart = true;
  }

  @Override
  public void stop() {
    this.stopContext = STOP_FROM_SPARK_UI_FORM_BUTTON;
    this.sparkSessionBuilder.stop();
  }

  @Override
  public void cancelAllJobs() {
    this.sparkSessionBuilder.cancelAllJobs();
  }

  @Override
  public void cancelStage(int stageid) {
    this.sparkSessionBuilder.cancelStage(stageid);
  }


  public boolean isAutoStart() {
    return this.autoStart;
  }

  @Override
  public TryResult createSparkContext(KernelFunctionality kernel, SparkUIApi sparkUI, Message parentMessage, Map<String, Object> sparkOptions) {
    resetEngine();
    this.sparkSessionBuilder = newSessionBuilder(sparkOptions);
    if (shouldEnableHive(sparkOptions)) {
      this.sparkSessionBuilder.enableHiveSupport();
    }
    TryResult sparkSessionTry = createSparkSession();
    if (sparkSessionTry.isError()) {
      return sparkSessionTry;
    }
    this.sparkListenerService.configure(this.sparkSessionBuilder, sparkUI);
    SparkVariable.putSparkSession(this.sparkSessionBuilder.getOrCreate());
    TryResult tryResultSparkContext = initSparkContextInShell(kernel, parentMessage);
    if (!tryResultSparkContext.isError()) {
      kernel.registerCancelHook(SparkVariable::cancelAllJobs);
    }
    return tryResultSparkContext;
  }

  private SparkSessionBuilder newSessionBuilder(Map<String, Object> sparkOptions) {
    SparkConf sparkConf = newSparkConf(sparkOptions);
    SparkSessionBuilder sparkSessionBuilder = this.sparkSessionBuilderFactory.newInstance(sparkConf);
    sparkSessionBuilder.config(SPARK_EXTRA_LISTENERS, START_STOP_SPARK_LISTENER);
    sparkSessionBuilder.config(BEAKERX_ID, UUID.randomUUID().toString());
    return sparkSessionBuilder;
  }

  private SparkConf newSparkConf(Map<String, Object> sparkOptions) {
    SparkConf sparkConf = createSparkConf(sparkOptions);
    configureSparkConf(sparkConf);
    configureRuntime(sparkConf);
    return sparkConf;
  }

  private void resetEngine() {
    this.stopContext = STOP;
    this.jobLinkFactory(createJobLinkFactory());
    this.stageLinkFactory(createStageLinkFactory());
    this.sparkUiWebUrlFactory(createSparkUiWebUrl());
  }

  private void configureRuntime(SparkConf sparkConf) {
    if (sparkConf.contains("spark.master") && sparkConf.get("spark.master").contains("yarn")) {
      YarnSparkOptionCommand.runtimeConfiguration(this, sparkConf);
    }
  }


  private boolean shouldEnableHive(Map<String, Object> sparkOptions) {
    if (!sparkOptions.isEmpty()) {
      List properties = (List) sparkOptions.get("properties");
      Optional first = properties.stream().filter(x -> ((Map) x).get("name").equals("spark.sql.catalogImplementation")).findFirst();
      return (first.isPresent() && ((Map) first.get()).get("value").equals("hive"));
    }
    return false;
  }


  public static class SparkEngineWithUIFactoryImpl implements SparkEngineWithUIFactory {

    @Override
    public SparkEngineWithUI create(SparkSessionBuilder sparkSessionBuilder, SparkSessionBuilderFactory sparkSessionBuilderFactory, SparkListenerService sparkListenerService) {
      return new SparkEngineWithUIImpl(sparkSessionBuilder, sparkSessionBuilderFactory, sparkListenerService);
    }
  }

  private static ErrorPrinter errorPrinter() {
    return e -> {
      String[] print = StacktraceHtmlPrinter.print(Arrays.stream(e.getStackTrace()).map(StackTraceElement::toString).toArray(String[]::new));
      return String.join(System.lineSeparator(), print);
    };
  }

}
