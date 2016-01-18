/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.shared.module.util;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;

public class ControlCharacterUtils {

  public static String escapeControlCharacters(final String value) {
    if (StringUtils.isNotEmpty(value)) {
      StringBuilder sb = new StringBuilder();
      for (int i = 0; i < value.length(); i++) {
        if (Character.isISOControl(value.charAt(i))) {
          sb.append(
              StringEscapeUtils.escapeJava(
                  StringEscapeUtils.escapeJson(
                      value.substring(i, i + 1))));
        } else {
          sb.append(value.charAt(i));
        }
      }
      return sb.toString();
    }
    return StringUtils.EMPTY;
  }

  public static boolean containsControlCharacters(final String value) {
    if (StringUtils.isNotEmpty(value)) {
      for (int i = 0; i < value.length(); i++) {
        char c = value.charAt(i);
        if (!Character.isWhitespace(c) && Character.isISOControl(c)) {
          return true;
        }
      }
    }
    return false;
  }
}
