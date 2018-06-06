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

import org.apache.commons.text.StringEscapeUtils;

import java.util.Arrays;

public class StacktraceHtmlPrinter extends StacktracePrinter {

  private static final String FONT = "font-size: 14px;font-family: 'Roboto Mono', monospace, sans-serif; color: #B22B31;";
  private static String END = "</div>";

  private static final StacktracePrinter INSTANCE = new StacktraceHtmlPrinter();

  public static String[] print(String[] input) {
    String[] escaped = Arrays.stream(input).map(StringEscapeUtils::escapeHtml4).toArray(String[]::new);
    return INSTANCE.doPrint(escaped);
  }

  @Override
  public String startRedBold() {
    return "<div style=\"font-weight: bold; " + FONT + "\">";
  }

  @Override
  public String endRedBold() {
    return END;
  }

  @Override
  public String startRed() {
    return "<div style=\"" + FONT + "\">";
  }

  @Override
  public String endRed() {
    return END;
  }


}
