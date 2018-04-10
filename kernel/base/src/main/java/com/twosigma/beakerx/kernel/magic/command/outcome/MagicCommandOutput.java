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

public class MagicCommandOutput implements MagicCommandOutcomeItem {

  private Optional<MIMEContainer> mineContainer;
  private MagicCommandOutput.Status status;

  private TryResult result;
  private SimpleEvaluationObject seo;

  private MagicCommandOutput(MagicCommandOutput.Status status, Optional<MIMEContainer> mineContainer, TryResult result, SimpleEvaluationObject seo) {
    this.mineContainer = mineContainer;
    this.status = checkNotNull(status);
    this.result = result;
    this.seo = seo;
  }

  public MagicCommandOutput(Status status) {
    this(status, Optional.empty(), null, null);
  }

  public MagicCommandOutput(MagicCommandOutput.Status status, String text) {
    this(status, Optional.of(MIMEContainer.Text(checkNotNull(text).concat("\n"))), null, null);
  }

  public MagicCommandOutput(Status status, String text, TryResult result, SimpleEvaluationObject seo) {
    this(status, Optional.of(MIMEContainer.Text(checkNotNull(text).concat("\n"))), result, seo);
  }

  @Override
  public Optional<MIMEContainer> getMIMEContainer() {
    return mineContainer;
  }

  public MagicCommandOutput.Status getStatus() {
    return status;
  }

  @Override
  public TryResult getResult() {
    return result;
  }

  @Override
  public SimpleEvaluationObject getSimpleEvaluationObject() {
    return seo;
  }

  @Override
  public Outcome getOutcome() {
    return Outcome.OUTPUT;
  }

}
