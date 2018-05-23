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
package com.twosigma.beakerx.kernel.magic.command.outcome;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;

import java.util.Optional;

public interface MagicCommandOutcomeItem {

  Optional<MIMEContainer> getMIMEContainer();

  Status getStatus();

  TryResult getResult();

  SimpleEvaluationObject getSimpleEvaluationObject();

  void sendRepliesWithStatus(KernelFunctionality kernel, Message message, int executionCount);

  void sendMagicCommandOutcome(KernelFunctionality kernel, Message message, int executionCount);

  enum Status {
    OK,
    ERROR
  }
}
