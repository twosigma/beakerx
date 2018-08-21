/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.kernel.magic.command.functionality;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.ExecutionOptions;
import com.twosigma.beakerx.kernel.GroupName;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.HBox;
import com.twosigma.beakerx.widget.RESTButton;
import com.twosigma.beakerx.widget.Spinner;
import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static com.twosigma.beakerx.kernel.CodeFrame.handleResult;
import static com.twosigma.beakerx.kernel.PlainCode.createSimpleEvaluationObject;
import static com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem.Status.OK;
import static java.util.Arrays.asList;
import static java.util.Arrays.copyOfRange;

public class AsyncMagicCommand implements MagicCommandFunctionality {

  public static final String ASYNC = "%%async";
  public static final String CANCEL_EXECUTION = "cancel/execution/";
  private KernelFunctionality kernel;
  private ExecutorService executorService = Executors.newCachedThreadPool();
  private AsyncMagicCommandOptions asyncMagicCommandOptions;

  public AsyncMagicCommand(KernelFunctionality kernel) {
    this.kernel = kernel;
    this.asyncMagicCommandOptions = new AsyncMagicCommandOptions();
  }

  @Override
  public String getMagicCommandName() {
    return ASYNC;
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    AsyncMagicCommandOptions.OptionsResult optionsResult = asyncMagicCommandOptions.parseOptions(getOptions(param));
    if (optionsResult.hasError()) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, optionsResult.errorMsg());
    }
    return runAsync(param, optionsResult);
  }

  private MagicCommandOutcomeItem runAsync(MagicCommandExecutionParam param, AsyncMagicCommandOptions.OptionsResult optionsResult) {
    GroupName groupName = GroupName.generate();
    Message parentMessage = param.getCode().getMessage();
    HBox panel = createCancelPanel(parentMessage, groupName.asString());
    panel.display();
    executorService.submit(() -> {
      int executionCount = param.getExecutionCount();
      SimpleEvaluationObject seo = createSimpleEvaluationObject(param.getCommandCodeBlock(), kernel, parentMessage, executionCount);
      TryResult result = kernel.executeCode(param.getCommandCodeBlock(), seo, new ExecutionOptions(groupName));
      panel.close();
      handleResult(seo, result);
      if (result.isResult()) {
        optionsResult.options().forEach(AsyncOptionCommand::run);
      }
    });
    return new MagicCommandOutput(OK);
  }

  private String[] getOptions(MagicCommandExecutionParam param) {
    String[] parts = param.getCommand().split(" ");
    if (parts.length == 1) {
      return new String[0];
    }
    return copyOfRange(parts, 1, parts.length);
  }

  @NotNull
  private HBox createCancelPanel(Message parentMessage, String groupName) {
    Spinner spinner = new Spinner(parentMessage, "Running...");
    RESTButton xButton = new RESTButton(KernelManager.get().getBeakerXServer().getURL() + CANCEL_EXECUTION + groupName, parentMessage);
    xButton.setDomClasses(new ArrayList<>(asList("bx-button", "icon-close")));
    xButton.setTooltip("Cancel asynchronous computation");
    return new HBox(Arrays.asList(xButton, spinner), parentMessage);
  }


  interface AsyncOptionCommand {
    void run();
  }
}
