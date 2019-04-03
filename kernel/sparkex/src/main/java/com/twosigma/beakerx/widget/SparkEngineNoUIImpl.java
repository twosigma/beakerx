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
import com.twosigma.beakerx.message.Message;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;

import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_EXECUTOR_CORES;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_EXECUTOR_MEMORY;
import static com.twosigma.beakerx.widget.SparkUIApi.SPARK_MASTER;

public class SparkEngineNoUIImpl extends SparkEngineBase implements SparkEngineNoUI {

  SparkEngineNoUIImpl(SparkSession.Builder sparkSessionBuilder) {
    super(sparkSessionBuilder, errorPrinter());
  }

  @Override
  public TryResult configure(KernelFunctionality kernel, Message parentMessage) {
    final SparkConf sparkConf = getSparkConfBasedOn(this.sparkSessionBuilder);
    configureSparkConfDefaults(sparkConf);
    configureSparkConf(sparkConf);
    this.sparkSessionBuilder = SparkSession.builder().config(sparkConf);
    TryResult sparkSessionTry = createSparkSession();
    if (sparkSessionTry.isError()) {
      return sparkSessionTry;
    }
    SparkVariable.putSparkSession(getOrCreate());
    TryResult tryResultSparkContext = initSparkContextInShell(kernel, parentMessage);
    if (!tryResultSparkContext.isError()) {
      kernel.registerCancelHook(SparkVariable::cancelAllJobs);
    }
    return tryResultSparkContext;
  }

  private void configureSparkConfDefaults(SparkConf sparkConf) {
    if (!sparkConf.contains(SPARK_MASTER)) {
      this.conf.getMaster().ifPresent(sparkConf::setMaster);
    }
    if (!sparkConf.contains(SPARK_EXECUTOR_CORES)) {
      this.conf.getExecutorCores().ifPresent(x -> sparkConf.set(SPARK_EXECUTOR_CORES, x));
    }
    if (!sparkConf.contains(SPARK_EXECUTOR_MEMORY)) {
      this.conf.getExecutorMemory().ifPresent(x -> sparkConf.set(SPARK_EXECUTOR_MEMORY, x));
    }
  }

  public interface SparkEngineNoUIFactory {
    SparkEngineNoUI create(SparkSession.Builder sparkSessionBuilder);
  }

  public static class SparkEngineNoUIFactoryImpl implements SparkEngineNoUIFactory {

    @Override
    public SparkEngineNoUI create(SparkSession.Builder sparkSessionBuilder) {
      return new SparkEngineNoUIImpl(sparkSessionBuilder);
    }
  }

  private static ErrorPrinter errorPrinter() {
    return e -> Stream.of(e.getMessage(), e.getCause())
            .filter(Objects::nonNull)
            .map(Object::toString)
            .collect(Collectors.joining(System.lineSeparator()));
  }
}
