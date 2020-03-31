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

import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;
import scala.Tuple2;
import scala.collection.Iterator;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class SparkSessionBuilderImpl implements SparkSessionBuilder {

  private SparkSession.Builder sparkSessionBuilder;

  public SparkSessionBuilderImpl(SparkSession.Builder sparkSessionBuilder) {
    this.sparkSessionBuilder = sparkSessionBuilder;
  }


  @Override
  public SparkSession getOrCreate() {
    return this.sparkSessionBuilder.getOrCreate();
  }

  @Override
  public void config(String key, String value) {
    this.sparkSessionBuilder.config(key, value);
  }

  @Override
  public void enableHiveSupport() {
    this.sparkSessionBuilder.enableHiveSupport();
  }

  @Override
  public Map<String, Object> getSparkConfAsMap() {
    Map<String, Object> sparkConf = new HashMap();
    Iterator iterator = getConfigIterator();
    while (iterator.hasNext()) {
      Tuple2 x = (Tuple2) iterator.next();
      sparkConf.put((String) (x)._1, (x)._2);
    }
    return sparkConf;
  }

  public SparkConf getSparkConf() {
    SparkConf sparkConf = new SparkConf();
    Iterator iterator = getConfigIterator();
    while (iterator.hasNext()) {
      Tuple2 x = (Tuple2) iterator.next();
      sparkConf.set((String) (x)._1, (String) (x)._2);
    }
    return sparkConf;
  }

  @Override
  public void stop() {
    getOrCreate().sparkContext().stop();
  }

  @Override
  public void cancelAllJobs() {
    getOrCreate().sparkContext().cancelAllJobs();
  }

  @Override
  public void cancelStage(int stageid) {
    getOrCreate().sparkContext().cancelStage(stageid);
  }

  private Iterator getConfigIterator() {
    try {
      Field options = getOptionsField(sparkSessionBuilder);
      options.setAccessible(true);
      return ((scala.collection.mutable.HashMap) options.get(sparkSessionBuilder)).iterator();
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  private Field getOptionsField(SparkSession.Builder sparkSessionBuilder) {
    Field[] declaredFields = sparkSessionBuilder.getClass().getDeclaredFields();
    Optional<Field> options = Arrays.stream(declaredFields).filter(f -> f.getName().contains("options")).findFirst();
    if (options.isPresent()) {
      return options.get();
    }
    throw new RuntimeException("SparkSession.builder does not contain 'options' field.");
  }

}
