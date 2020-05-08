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
package com.twosigma.beakerx.scala.magic.command;

import com.twosigma.beakerx.widget.SparkSessionBuilder;
import com.twosigma.beakerx.widget.SparkSessionBuilderFactory;
import com.twosigma.beakerx.widget.SparkSessionBuilderImpl;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;

import java.util.Map;


public class SparkSessionBuilderFactoryMock implements SparkSessionBuilderFactory {
  public boolean newInstanceCreated;
  public boolean stopped;

  @Override
  public SparkSessionBuilder newInstance(SparkConf sparkConf) {
    newInstanceCreated = true;

    return new SparkSessionBuilder() {


      @Override
      public SparkSession getOrCreate() {
        return null;
      }

      @Override
      public void config(String key, String value) {

      }

      @Override
      public void enableHiveSupport() {

      }

      @Override
      public Map<String, Object> getSparkConfAsMap() {
        return null;
      }

      @Override
      public SparkConf getSparkConf() {
        return null;
      }

      @Override
      public void stop() {
        stopped = true;
      }

      @Override
      public void cancelAllJobs() {

      }

      @Override
      public void cancelStage(int stageid) {

      }

    };
  }

  @Override
  public SparkSessionBuilder newInstance(SparkSession.Builder builder) {
    return new SparkSessionBuilderImpl(builder);
  }
}
