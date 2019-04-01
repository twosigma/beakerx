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

import com.twosigma.beakerx.kernel.KernelInfo;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.SparkEngine;
import com.twosigma.beakerx.widget.SparkEngineConf;
import org.apache.spark.sql.SparkSession;

import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.scala.magic.command.SparkOptions.YARN;

public class YarnSparkOptionCommand implements SparkMagicCommandOptions.SparkOptionCommand {

  private static final String PROXY_URI_BASES = "spark.org.apache.hadoop.yarn.server.webproxy.amfilter.AmIpFilter.param.PROXY_URI_BASES";

  @Override
  public void run(SparkEngine sparkEngine, Message parent) {
    SparkEngineConf conf = new SparkEngineConf();
    conf.setMaster("yarn");
    conf.setExecutorCores("4");
    conf.setExecutorMemory("1g");
    Map<String, String> configs = new HashMap<>();
    configs.put("spark.submit.deployMode", "client");
    configs.put("spark.yarn.jars", KernelInfo.mvnRepoPath() + "/*");
    conf.setConfigs(configs);
    sparkEngine.additionalConf(conf);
    sparkEngine.sparkUiWebUrlFactory(() -> {
      SparkSession sparkSession = sparkEngine.getOrCreate();
      if (sparkSession!= null && sparkSession.sparkContext().getConf().contains(PROXY_URI_BASES)) {
        return sparkEngine.getOrCreate().sparkContext().getConf().get(PROXY_URI_BASES);
      }
      return "";
    });
    sparkEngine.stageLinkFactory((stageId) -> {
      String url = sparkEngine.getSparkUiWebUrl();
      return url + "/stages/stage/?id=" + stageId + "&attempt=0";
    });
    sparkEngine.jobLinkFactory((jobId) -> {
      String url = sparkEngine.getSparkUiWebUrl();
      return url + "/jobs/job/?id=" + jobId;
    });
  }

  @Override
  public String getName() {
    return YARN;
  }
}
