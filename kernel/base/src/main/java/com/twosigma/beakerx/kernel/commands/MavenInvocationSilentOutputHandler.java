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

import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddMvnMagicCommand;
import org.apache.maven.shared.invoker.InvocationOutputHandler;

public class MavenInvocationSilentOutputHandler implements InvocationOutputHandler {

  private ClasspathAddMvnMagicCommand.MvnLoggerWidget intProgress;
  private int counter = 1;

  public MavenInvocationSilentOutputHandler(ClasspathAddMvnMagicCommand.MvnLoggerWidget intProgress) {
    this.intProgress = intProgress;
  }

  @Override
  public void consumeLine(String line) {
    if (line != null && !line.trim().isEmpty() && (line.matches("Downlo.+") || acceptLineWhichShowDownloadingProgress(line))) {
      if (counter % 10 == 1) {
        intProgress.sendLog(line);
        counter = 1;
      }
      counter++;
    }
  }

  private boolean acceptLineWhichShowDownloadingProgress(String line) {
    // line example 3/119 KB
    return line.matches("\\d+/\\d+.+");
  }
}
