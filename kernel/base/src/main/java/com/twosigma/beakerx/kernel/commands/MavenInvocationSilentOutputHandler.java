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
package com.twosigma.beakerx.kernel.commands;

import com.twosigma.beakerx.kernel.magic.command.BxMavenManager;
import com.twosigma.beakerx.kernel.magic.command.functionality.MvnDownloadLoggerWidget;
import com.twosigma.beakerx.kernel.magic.command.functionality.MvnLogsWidget;
import org.apache.maven.shared.invoker.InvocationOutputHandler;

public class MavenInvocationSilentOutputHandler implements InvocationOutputHandler {

  private MvnDownloadLoggerWidget mvnLoggerWidget;
  private MvnLogsWidget logs;

  public MavenInvocationSilentOutputHandler(MvnDownloadLoggerWidget mvnLoggerWidget, MvnLogsWidget logs) {
    this.mvnLoggerWidget = mvnLoggerWidget;
    this.logs = logs;
  }

  @Override
  public void consumeLine(String line) {
    if (BxMavenManager.isLogsOn()) {
      logs.sendLog(line);
    }
    mvnLoggerWidget.sendLog(line);
  }
}
