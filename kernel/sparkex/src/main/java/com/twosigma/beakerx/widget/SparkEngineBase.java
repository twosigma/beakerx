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
import com.twosigma.beakerx.scala.magic.command.JobLinkFactory;
import com.twosigma.beakerx.scala.magic.command.SparkUiWebUrlFactory;
import com.twosigma.beakerx.scala.magic.command.StageLinkFactory;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.RuntimeConfig;
import org.apache.spark.sql.SparkSession;
import org.jetbrains.annotations.NotNull;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

import static com.twosigma.beakerx.kernel.PlainCode.createSimpleEvaluationObject;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_APP_NAME;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_CONTEXT_NAME;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_MASTER;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_REPL_CLASS_OUTPUT_DIR;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_SESSION_NAME;

abstract class SparkEngineBase implements SparkEngine {

  public static final String STOP = "stop";

  protected SparkSessionBuilder userSparkSessionBuilder;
  protected SparkSessionBuilder sparkSessionBuilder;
  private ErrorPrinter errorPrinter;
  protected SparkEngineConf conf = new SparkEngineConf();
  private StageLinkFactory stageLinkFactory;
  private JobLinkFactory jobLinkFactory;
  private SparkUiWebUrlFactory sparkUiWebUrlFactory;
  protected String stopContext = STOP;

  SparkEngineBase(SparkSessionBuilder sparkSessionBuilder, ErrorPrinter errorPrinter) {
    this.userSparkSessionBuilder = sparkSessionBuilder;
    this.errorPrinter = errorPrinter;
    this.jobLinkFactory(createJobLinkFactory());
    this.stageLinkFactory(createStageLinkFactory());
    this.sparkUiWebUrlFactory(createSparkUiWebUrl());
  }

  @Override
  public String getConf(String name) {
    SparkSession sparkSession = getOrCreate();
    if (sparkSession != null && sparkSession.sparkContext().getConf().contains(name)) {
      return getOrCreate().sparkContext().getConf().get(name);
    }
    return "";
  }

  @Override
  public String stageLink(int stageId) {
    return this.stageLinkFactory.create(stageId);
  }

  @Override
  public String jobLink(int jobId) {
    return this.jobLinkFactory.create(jobId);
  }

  @Override
  public void additionalConf(SparkEngineConf conf) {
    this.conf = conf;
  }

  @Override
  public SparkEngineConf getSparkEngineConf() {
    return conf;
  }

  @Override
  public void configAutoStart() {
  }

  protected TryResult createSparkSession() {
    try {
      SparkSession sparkSession = getOrCreate();
      return TryResult.createResult(sparkSession);
    } catch (Exception e) {
      return TryResult.createError(errorPrinter.print(e));
    }
  }

  private SparkSession getOrCreate() {
    return sparkSessionBuilder.getOrCreate();
  }

  @Override
  public String getSparkAppId() {
    RuntimeConfig conf = getOrCreate().conf();
    return conf.getAll().get(SPARK_APP_ID).get();
  }

  @Override
  public String getSparkUiWebUrl() {
    return sparkUiWebUrlFactory.create();
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

  protected TryResult initSparkContextInShell(KernelFunctionality kernel, Message parent) {
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

  protected SparkConf createSparkConf(Map<String, Object> sparkOptions) {
    SparkConf sparkConf = new SparkConf();
    sparkOptions.forEach((k, v) -> {
      if (k.equals("properties")) {
        List properties = (List) v;
        properties.forEach(p -> {
          Map m = (Map) p;
          sparkConf.set((String) m.get("name"), (String) m.get("value"));
        });
      } else {
        sparkConf.set(k, (v != null) ? v.toString() : "");
      }
    });
    return sparkConf;
  }

  @Override
  public Map<String, Object> getUserSparkConfAsMap() {
    return this.userSparkSessionBuilder.getSparkConfAsMap();
  }

  protected void configureSparkConf(SparkConf sparkConf) {
    if (!sparkConf.contains(SPARK_APP_NAME)) {
      sparkConf.setAppName("beaker_" + UUID.randomUUID().toString());
    }
    if (sparkConf.contains(SPARK_MASTER) && !isLocalSpark(sparkConf)) {
      sparkConf.set(SPARK_REPL_CLASS_OUTPUT_DIR, KernelManager.get().getOutDir());
    }
  }


  private static boolean isLocalSpark(SparkConf sparkConf) {
    return sparkConf.contains(SPARK_MASTER) && sparkConf.get(SPARK_MASTER) != null && sparkConf.get("spark.master").startsWith("local");
  }

  @Override
  public void jobLinkFactory(JobLinkFactory jobLinkFactory) {
    this.jobLinkFactory = jobLinkFactory;
  }

  @Override
  public void stageLinkFactory(StageLinkFactory stageLinkFactory) {
    this.stageLinkFactory = stageLinkFactory;
  }

  @Override
  public void sparkUiWebUrlFactory(SparkUiWebUrlFactory factory) {
    this.sparkUiWebUrlFactory = factory;
  }

  @NotNull
  protected StageLinkFactory createStageLinkFactory() {
    return (stageId) -> {
      if (getOrCreate().sparkContext().uiWebUrl().isDefined()) {
        return getOrCreate().sparkContext().uiWebUrl().get() + "/stages/stage/?id=" + stageId + "&attempt=0";
      } else {
        return "";
      }
    };
  }

  @NotNull
  protected JobLinkFactory createJobLinkFactory() {
    return (jobId) -> {
      if (getOrCreate().sparkContext().uiWebUrl().isDefined()) {
        return getOrCreate().sparkContext().uiWebUrl().get() + "/jobs/job/?id=" + jobId;
      } else {
        return "";
      }
    };
  }

  @NotNull
  protected SparkUiWebUrlFactory createSparkUiWebUrl() {
    return () -> getOrCreate().sparkContext().uiWebUrl().get();
  }

  @Override
  public String getStopContext() {
    return stopContext;
  }
}
