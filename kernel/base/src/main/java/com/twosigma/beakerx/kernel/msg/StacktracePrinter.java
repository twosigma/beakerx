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

public abstract class StacktracePrinter {

  private static final String COM_TWOSIGMA_BEAKER = "com.twosigma.beaker";

  protected String[] doPrint(String[] input) {
    if (input == null) {
      return new String[0];
    }
    return mark(input);
  }

  private String[] mark(String[] input) {
    boolean shouldBeBold = true;
    List<String> ret = new ArrayList<>();
    for (String line : input) {
      if (line != null) {
        if (!line.contains(COM_TWOSIGMA_BEAKER) && shouldBeBold) {
          ret.add(startRedBold() + line + endRedBold());
        } else {
          shouldBeBold = false;
          ret.add(startRed() + line + endRed());
        }
      }
    }
    return ret.toArray(new String[0]);
  }

  public abstract String startRedBold();
  public abstract String endRedBold();

  public abstract String startRed();

  public abstract String endRed();


}
