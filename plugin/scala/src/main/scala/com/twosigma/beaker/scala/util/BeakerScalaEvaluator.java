/*
 *  Copyright 2014-2016 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.scala.util;

import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import org.apache.spark.HttpServer;
import org.apache.spark.SparkConf;

import java.io.File;
import com.google.inject.Inject;
import com.google.inject.Provider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BeakerScalaEvaluator extends ScalaEvaluator {

  private final static Logger log = LoggerFactory.getLogger(BeakerScalaEvaluator.class.getName());

  public static String classURI = "uninitialized";

  @Inject
  public BeakerScalaEvaluator(Provider<BeakerObjectConverter> osp) {
    super(osp);
  }

  @Override
  public void initialize(String id, String sId) {
    super.initialize(id, sId);
    // Run a class server for the Scala Repl for the remote workers
    SparkConf conf = new SparkConf();
    File outputDir = new File(outDir);
    // the creation of SecurityManager has to be lazy so SPARK_YARN_MODE is set if needed
    org.apache.spark.SecurityManager m = new org.apache.spark.SecurityManager(conf);
    HttpServer classServer = new HttpServer(conf, outputDir, m, 0,
            "spark class server for " + outputDir.getPath());
    classServer.start();
    BeakerScalaEvaluator.classURI = classServer.uri();
    log.info("Serving classes in " + outputDir.getPath() + " on uri=" + BeakerScalaEvaluator.classURI);
  }
}
