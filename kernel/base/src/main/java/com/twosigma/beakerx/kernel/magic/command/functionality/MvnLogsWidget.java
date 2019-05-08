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
package com.twosigma.beakerx.kernel.magic.command.functionality;

import com.twosigma.beakerx.kernel.magic.command.BxMavenManager;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.Output;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class MvnLogsWidget {

  static final int PERIOD = 1000;

  private Output output;
  private Timer timer;
  private List<String> logs = Collections.synchronizedList(new ArrayList<>());
  private int start = 0;

  public MvnLogsWidget(Message parentMessage) {
    this.output = new Output(parentMessage);
    this.timer = new Timer();
    this.timer.scheduleAtFixedRate(new TimerTask() {
      @Override
      public void run() {
        sendLogs();
      }
    }, 0, PERIOD);
  }

  private synchronized void sendLogs() {
    if (BxMavenManager.isLogsOn()) {
      int end = logs.size();
      List<String> logs = new ArrayList<>();
      logs.addAll(this.logs.subList(start, end));
      if (!logs.isEmpty()) {
        String join = String.join("\n", logs);
        output.appendStdout(join);
        start = end;
      }
    }
  }

  public synchronized void sendLog(String line) {
    logs.add(line);
  }

  public synchronized void stop() {
    this.timer.cancel();
    sendLogs();
  }

  public synchronized void close() {
    this.output.close();
  }

  public synchronized void display() {
    this.output.display();
  }
}
