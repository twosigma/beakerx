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
package com.twosigma.beakerx.javash.evaluator;

import org.apache.commons.lang3.StringUtils;

public class Codev {
  private String[] lines;
  private int index = 0;

  public Codev(String code) {
    this.lines = code.split("\n");
  }

  public CodeLine getNotBlankLine() {
    if (this.index >= lines.length) {
      throw new RuntimeException("No more line");
    }
    this.index = skipBlankLines(this.index);
    return new CodeLine(this.index, lines[this.index]);
  }

  private int skipBlankLines(int ci) {
    while (ci < lines.length - 1 && StringUtils.isBlank(lines[ci])) {
      ci++;
    }
    return ci;
  }

  public String getLastLine() {
    return lines[lines.length - 1];
  }

  public void moveToNextLine() {
    if ((index != -1) && index < (lines.length -1 )) {
      index++;
    } else {
      index = -1;
    }
  }

  public boolean hasLineToProcess() {
    return this.index != -1;
  }

  public static class CodeLine {
    private int index;
    private String line;

    public CodeLine(int index, String line) {
      this.index = index;
      this.line = line;
    }

    public int getIndex() {
      return index;
    }

    public String getLine() {
      return line;
    }
  }

}
