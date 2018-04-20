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
import com.twosigma.beakerx.mimetype.MIMEContainer;

import java.util.Optional;

import static com.twosigma.beakerx.util.Preconditions.checkNotNull;

public class MagicCommandResult implements MagicCommandOutcomeItem {

  private Status status;
  private Optional<MIMEContainer> mimeContainer;

  public MagicCommandResult(Status status, MIMEContainer mimeContainer) {
    this.status = status;
    this.mimeContainer = Optional.of(checkNotNull(mimeContainer));
  }

  @Override
  public Optional<MIMEContainer> getMIMEContainer() {
    return mimeContainer;
  }

  @Override
  public Status getStatus() {
    return status;
  }

  @Override
  public Outcome getOutcome() {
    return Outcome.RESULT;
  }

  @Override
  public TryResult getResult() {
    return null;
  }

  @Override
  public SimpleEvaluationObject getSimpleEvaluationObject() {
    return null;
  }
}
