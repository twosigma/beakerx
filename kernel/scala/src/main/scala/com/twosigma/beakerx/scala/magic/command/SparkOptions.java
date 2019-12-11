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
package com.twosigma.beakerx.scala.magic.command;

import org.apache.commons.cli.Options;

public class SparkOptions {

  public static final String START = "start";
  public static final String NO_UI = "noUI";
  public static final String YARN = "yarn";
  public static final String VERSION = "version";
  private Options options = new Options();

  public SparkOptions() {
    options.addOption("s", START, false, "Start spark");
    options.addOption("nu", NO_UI, false, "No UI");
    options.addOption("y", YARN, false, "Yarn mode");

    options.addOption("v", VERSION, true, "Load spark version");
  }

  public Options getOptions() {
    return options;
  }
}
