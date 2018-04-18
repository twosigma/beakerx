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
import com.twosigma.beakerx.widget.SparkUI;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;

public class SparkMagicCommand implements MagicCommandFunctionality {

  public static final String SPARK = "%%spark";
  private KernelFunctionality kernel;

  public SparkMagicCommand(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  @Override
  public String getMagicCommandName() {
    return SPARK;
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
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

  private MagicCommandOutcomeItem createSparkUI(SparkSession.Builder spaBuilder) {
    SparkUI sparkUI = SparkUI.create(spaBuilder);
    return displaySparkUI(sparkUI);
  }

  private MagicCommandOutcomeItem displaySparkUI(SparkUI sparkUI) {
    Display.display(sparkUI);
    return new MagicCommandOutput(MagicCommandOutput.Status.OK);
  }

  private MagicCommandOutcomeItem createSparkUI(SparkConf sparkConf) {
    SparkUI sparkUI = SparkUI.create(sparkConf);
    return displaySparkUI(sparkUI);
  }
}
