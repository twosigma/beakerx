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
package com.twosigma.beakerx.jvm.object;

import com.twosigma.beakerx.jvm.threads.BeakerInputHandler;
import com.twosigma.beakerx.jvm.threads.BeakerOutputHandler;
import com.twosigma.beakerx.kernel.threads.ResultSender;
import com.twosigma.beakerx.message.Message;

import static com.twosigma.beakerx.util.Preconditions.checkNotNull;
import static org.apache.commons.lang3.builder.EqualsBuilder.reflectionEquals;
import static org.apache.commons.lang3.builder.HashCodeBuilder.reflectionHashCode;
import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;

public class Configuration {

  private final Message message;
  private final int executionCount;
  private final BeakerInputHandler stdin;
  private final ResultSender resultSender;
  private final BeakerOutputHandler stdout;
  private final BeakerOutputHandler stderr;


  public Configuration(BeakerInputHandler stdin,
                       BeakerOutputHandler stdout,
                       BeakerOutputHandler stderr,
                       ResultSender resultSender,
                       Message message,
                       int executionCount) {
    this.stdin = checkNotNull(stdin);
    this.resultSender = checkNotNull(resultSender);
    this.stdout = checkNotNull(stdout);
    this.stderr = checkNotNull(stderr);
    this.message = checkNotNull(message);
    this.executionCount = executionCount;
  }

  public BeakerOutputHandler getStdout() {
    return stdout;
  }

  public BeakerOutputHandler getStderr() {
    return stderr;
  }

  public Message getMessage() {
    return message;
  }

  public int getExecutionCount() {
    return executionCount;
  }

  public BeakerInputHandler getStdin() {
    return stdin;
  }

  public ResultSender getResultSender() {
    return resultSender;
  }

  @Override
  public boolean equals(Object o) {
    return reflectionEquals(this, o);
  }

  @Override
  public int hashCode() {
    return reflectionHashCode(this);
  }

  @Override
  public String toString() {
    return reflectionToString(this);
  }
}
