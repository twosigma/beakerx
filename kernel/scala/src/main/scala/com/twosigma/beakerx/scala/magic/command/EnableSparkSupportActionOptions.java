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

import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.message.Message;

public interface EnableSparkSupportActionOptions {
  String SPARK_SQL = "spark-sql";
  String SPARK_SQL_2_12 = " org.apache.spark " + SPARK_SQL + "_2.12 ";
  String SPARK_MLLIB_2_12 = " org.apache.spark spark-mllib_2.12 ";

  MagicCommandOutcomeItem loadSpark(Message parent, String version);
}
