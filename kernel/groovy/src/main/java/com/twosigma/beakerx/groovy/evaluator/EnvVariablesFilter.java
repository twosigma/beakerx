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
package com.twosigma.beakerx.groovy.evaluator;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EnvVariablesFilter {

  private static Pattern[] envVariablePatterns = {
          Pattern.compile("\\$\\{([a-z_][a-z0-9_]*)\\}", Pattern.CASE_INSENSITIVE),
          Pattern.compile("\\$([a-z_][a-z0-9_]*)", Pattern.CASE_INSENSITIVE)
  };

  public static String envVariablesFilter(String p, Map<String, String> env) {
    if (p == null) return p;
    for (Pattern pattern : envVariablePatterns) {
      Matcher matcher = pattern.matcher(p);
      String r = "";
      int lastIndex = 0;
      while (matcher.find()) {
        String var = matcher.group(1);
        String substitute = env.get(var);
        if (substitute == null) substitute = "";
        r += p.substring(lastIndex, matcher.start());
        r += substitute;
        lastIndex = matcher.end();
      }
      r += p.substring(lastIndex, p.length());
      p = r;
    }
    return p;
  }
}
