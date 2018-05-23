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

import com.twosigma.beakerx.Display;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.PlainCode;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.SparkManager;
import com.twosigma.beakerx.widget.SparkManagerImpl;
import com.twosigma.beakerx.widget.SparkUI;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Arrays.asList;
import static java.util.Arrays.copyOfRange;

public class SparkMagicCommand implements MagicCommandFunctionality {

  public static final String SPARK = "%%sparkRunner";
  private KernelFunctionality kernel;
  private SparkUI.SparkUIFactory sparkUIFactory;
  private SparkManager.SparkManagerFactory sparkManagerFactory;
  private SparkUI sparkUI;
  private Map<String, SparkOption> sparkOptions;

  public SparkMagicCommand(KernelFunctionality kernel) {
    //constructor for reflection in LoadMagicMagicCommand
    this(kernel, new SparkUI.SparkUIFactoryImpl(), new SparkManagerImpl.SparkManagerFactoryImpl());
  }

  SparkMagicCommand(KernelFunctionality kernel, SparkUI.SparkUIFactory sparkUIFactory, SparkManager.SparkManagerFactory sparkManagerFactory) {
    this.kernel = kernel;
    this.sparkUIFactory = sparkUIFactory;
    this.sparkManagerFactory = sparkManagerFactory;
    configureOptions();
  }

  private void configureOptions() {
    this.sparkOptions = new HashMap<>();
    this.sparkOptions.put("--connect", this::connectToSparkSession);
    this.sparkOptions.put("-c", this::connectToSparkSession);
  }

  @Override
  public String getMagicCommandName() {
    return SPARK;
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    if (sparkUI != null && sparkUI.isSparkSessionIsActive()) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "Active spark session exists. If you want to close it run 'spark.close()'");
    }
    List<String> options = getOptions(param);
    MagicCommandOutcomeItem optionValidation = validateOptions(options);
    if (optionValidation.getStatus().equals(MagicCommandOutput.Status.ERROR)) {
      return optionValidation;
    }
    MagicCommandOutcomeItem ui = createUI(param);
    if (ui.getStatus().equals(MagicCommandOutcomeItem.Status.OK)) {
      options.forEach(option -> sparkOptions.get(option).run(param.getCode().getMessage()));
    }
    return ui;
  }

  private MagicCommandOutcomeItem validateOptions(List<String> options) {
    for (String option : options) {
      if (!sparkOptions.containsKey(option)) {
        return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "Unknown option " + option);
      }
    }
    return new MagicCommandOutput(MagicCommandOutput.Status.OK);
  }

  private List<String> getOptions(MagicCommandExecutionParam param) {
    String[] parts = param.getCommand().split(" ");
    if (parts.length == 1) {
      return new ArrayList<>();
    }
    return asList(copyOfRange(parts, 1, parts.length));
  }

  private MagicCommandOutcomeItem createUI(MagicCommandExecutionParam param) {
    SimpleEvaluationObject seo = PlainCode.createSimpleEvaluationObject(param.getCommandCodeBlock(), kernel, param.getCode().getMessage(), param.getExecutionCount());
    if (param.getCommandCodeBlock().isEmpty()) {
      InternalVariable.setValue(seo);
      return createSparkUI(new SparkConf());
    } else {
      return createSparkUIBasedOnUserSparkConfiguration(param, seo);
    }
  }

  private MagicCommandOutcomeItem createSparkUIBasedOnUserSparkConfiguration(MagicCommandExecutionParam param, SimpleEvaluationObject seo) {
    TryResult either = kernel.executeCode(param.getCommandCodeBlock(), seo);
    if (either.isResult()) {
      Object result = either.result();
      if (result instanceof SparkConf) {
        return createSparkUI((SparkConf) result);
      } else if (result instanceof SparkSession.Builder) {
        return createSparkUI((SparkSession.Builder) result);
      } else {
        return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "Body of  " + SPARK + " magic command must return SparkConf object or SparkSession.Builder object");
      }
    } else {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "There occurs problem during execution of " + SPARK + " : " + either.error());
    }
  }

  private MagicCommandOutcomeItem createSparkUI(SparkSession.Builder builder) {
    SparkManager sparkManager = sparkManagerFactory.create(builder);
    this.sparkUI = sparkUIFactory.create(sparkManager);
    return displaySparkUI(sparkUI);
  }

  private MagicCommandOutcomeItem createSparkUI(SparkConf sparkConf) {
    SparkSession.Builder builder = SparkSession.builder().config(sparkConf);
    SparkManager sparkManager = sparkManagerFactory.create(builder);
    this.sparkUI = sparkUIFactory.create(sparkManager);
    return displaySparkUI(sparkUI);
  }

  private MagicCommandOutcomeItem displaySparkUI(SparkUI sparkUI) {
    Display.display(sparkUI);
    return new MagicCommandOutput(MagicCommandOutput.Status.OK);
  }

  private void connectToSparkSession(Message parent) {
    sparkUI.getConnectButton().onClick(new HashMap(), new Message(new Header(JupyterMessages.COMM_MSG, parent.getHeader().getSession())));
  }

  interface SparkOption {
    void run(Message parent);
  }
}
