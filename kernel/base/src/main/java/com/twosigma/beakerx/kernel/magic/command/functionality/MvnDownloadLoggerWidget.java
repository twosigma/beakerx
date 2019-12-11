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

import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.BxHTML;

import java.math.BigDecimal;
import java.util.Timer;
import java.util.TimerTask;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.Arrays.asList;
import static org.apache.commons.io.FileUtils.byteCountToDisplaySize;

public class MvnDownloadLoggerWidget {

  static final int PERIOD = 250;
  public static final String DOWNLOADED = "Downloaded";
  private BxHTML widget;
  private Timer timer;
  private volatile int jarNumbers = 0;
  private volatile double sizeInKb;
  private volatile String speed;
  private volatile String currentLine;

  public MvnDownloadLoggerWidget(Message parentMessage) {
    this.widget = new BxHTML(parentMessage);
    this.timer = new Timer();
    this.timer.scheduleAtFixedRate(new TimerTask() {
      @Override
      public void run() {
        if (jarNumbers > 0) {
          String info = getInfo(currentLine);
          String sizeWithUnit = byteCountToDisplaySize(new Double(sizeInKb * 1000).longValue());
          String status = String.format("%d jar%s, %s downloaded at %s %s", jarNumbers, getPluralFormWhenNumberOfJarGreaterThanOne(), sizeWithUnit, speed, info);
          widget.setValue(status + "</br>" + formatCurrentLine());
          widget.setDomClasses(asList("text-ellipsis"));
        }
      }
    }, 0, PERIOD);
  }

  private String formatCurrentLine() {
    return currentLine.replaceFirst(DOWNLOADED, "").trim().replaceFirst(":","").trim();
  }

  private String getPluralFormWhenNumberOfJarGreaterThanOne() {
    return (jarNumbers > 1) ? "s" : "";
  }

  public void sendLog(String line) {
    if (line != null && !line.trim().isEmpty() && line.matches(DOWNLOADED + ".+")) {
      this.currentLine = line;
      if (line.matches(".+jar.+")) {
        this.jarNumbers++;
        String[] info = split(line);
        if (info.length == 5) {
          this.sizeInKb += calculateJarSizeInKb(info);
          this.speed = calculateSpeed(info);
        }
      }
    }
  }

  private String calculateSpeed(String[] info) {
    return info[3] + info[4];
  }

  private String[] split(String line) {
    String infoWithBrackets = this.getInfo(line);

    if (infoWithBrackets != null) {
      return infoWithBrackets.replace("(", "").
              replace(")", "").
              split(" ");

    }
    return new String[0];
  }

  private String getInfo(String line) {
    Pattern pattern = Pattern.compile("\\((.*?)\\)");
    Matcher matcher = pattern.matcher(line);
    if (matcher.find()) {
      String infoWithBrackets = matcher.group();
      return infoWithBrackets;

    }
    return null;
  }

  private double calculateJarSizeInKb(String[] info) {
    String unit = info[1];
    if (unit.toLowerCase().equals("kb")) {
      return new BigDecimal(info[0]).doubleValue();
    } else if (unit.toLowerCase().equals("mb")) {
      return new BigDecimal(info[0]).multiply(new BigDecimal("1000")).doubleValue();
    } else {
      return 0;
    }
  }

  public void display() {
    this.widget.display();
  }

  public void close() {
    this.timer.cancel();
    this.widget.close();
  }
}
