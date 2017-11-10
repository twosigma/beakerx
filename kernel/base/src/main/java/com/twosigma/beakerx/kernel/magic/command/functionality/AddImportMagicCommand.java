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

import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandResultItem;
import com.twosigma.beakerx.message.Message;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class AddImportMagicCommand implements MagicCommandFunctionality {

  public static final String IMPORT = "%import";
  private KernelFunctionality kernel;

  public AddImportMagicCommand(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  @Override
  public MagicCommandResultItem execute(MagicCommandExecutionParam param) {
    Code code = param.getCode();
    String command = param.getCommand();
    Message message = param.getMessage();
    int executionCount = param.getExecutionCount();
    String[] parts = command.split(" ");
    if (parts.length != 2) {
      return MagicCommandUtils.resultWithCustomMessage(kernel.getImports().toString(), message, executionCount, kernel);
    }

    this.kernel.addImport(new ImportPath(parts[1]));

    if (isValidImport(executionCount)) {
      return MagicCommandUtils.noResult(code, message, executionCount, kernel);
    }

    this.kernel.removeImport(new ImportPath(parts[1]));

    return MagicCommandUtils.errorResult(message, "Could not import " + parts[1] + ", class not found.",
            executionCount, kernel);
  }

  private boolean isValidImport(int executionCount) {
    try {
      CompletableFuture<Boolean> validImportFuture = new CompletableFuture<>();
      kernel.executeCode("", new Message(), executionCount,
              seo -> validImportFuture.complete(!seo.getStatus().equals(SimpleEvaluationObject.EvaluationStatus.ERROR)));

      return validImportFuture.get();
    } catch (InterruptedException | ExecutionException e) {
      return Boolean.FALSE;
    }
  }

}
