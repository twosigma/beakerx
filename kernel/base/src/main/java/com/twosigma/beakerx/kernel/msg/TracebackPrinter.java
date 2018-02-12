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
package com.twosigma.beakerx.kernel.msg;

import java.util.ArrayList;
import java.util.List;

public class TracebackPrinter {

  private static final String PREFIX = "\033[";
  private static final String RED_COLOR = "31";
  private static final String BOLD_DISPLAY = "1";
  private static final String NORMAL_DISPLAY = "0";

  static final String END = PREFIX + "0;0m";
  static final String RED_BOLD = PREFIX + BOLD_DISPLAY + ";" + RED_COLOR + "m";
  static final String RED = PREFIX + NORMAL_DISPLAY + ";" + RED_COLOR + "m";

  private static final String COM_TWOSIGMA_BEAKER = "com.twosigma.beaker";

  public static String[] print(String[] input) {
    if (input == null) {
      return new String[0];
    }
    return mark(input);
  }

  private static String[] mark(String[] input) {
    boolean shouldBeBold = true;
    List<String> ret = new ArrayList<>();
    for (String line : input) {
      if (line != null) {
        if (!line.contains(COM_TWOSIGMA_BEAKER) && shouldBeBold) {
          ret.add(RED_BOLD + line + END);
        } else {
          shouldBeBold = false;
          ret.add(RED + line + END);
        }
      }
    }
    return ret.toArray(new String[0]);
  }
}