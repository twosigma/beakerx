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
package com.twosigma.beakerx.groovy.evaluator;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GroovyStackTracePrettyPrinter {

  public static final String ORG_CODEHAUS_GROOVY_CONTROL_MULTIPLE_COMPILATION_ERRORS_EXCEPTION_STARTUP_FAILED = "org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:";

  public static String printStacktrace(String scriptName, String stacktrace) {
    Optional<String> value = scriptRunScript(scriptName, stacktrace);
    if (value.isPresent()) {
      return value.get();
    }
    value = multipleCompilationErrorsExceptionWithScript(scriptName, stacktrace);
    if (value.isPresent()) {
      return value.get();
    }
    return stacktrace;
  }

  private static Optional<String> multipleCompilationErrorsExceptionWithScript(String scriptName, String stacktrace) {
    String result = stacktrace;
    if (result.startsWith(ORG_CODEHAUS_GROOVY_CONTROL_MULTIPLE_COMPILATION_ERRORS_EXCEPTION_STARTUP_FAILED)) {
      String pattern = String.format("(%s:\\s*)(\\d+)(:)(.*)(%s*)", scriptName,System.lineSeparator());
      Pattern r = Pattern.compile(pattern);
      Matcher m = r.matcher(stacktrace);
      if (m.find()) {
        result = result.replace(ORG_CODEHAUS_GROOVY_CONTROL_MULTIPLE_COMPILATION_ERRORS_EXCEPTION_STARTUP_FAILED,"");
        String replace = result.replace(m.group(0), m.group(4));
        return Optional.of(replace.trim());
      }
    }
    return Optional.empty();
  }


  private static Optional<String> scriptRunScript(String scriptName, String stacktrace) {
    String pattern = String.format("(%s.run\\(%s:\\s*)(\\d+)(\\))", scriptName, scriptName);
    Pattern r = Pattern.compile(pattern);
    Matcher m = r.matcher(stacktrace);
    if (m.find()) {
      String replace = stacktrace.replace(m.group(0), "this cell line " + m.group(2));
      return Optional.of(replace);
    }
    return Optional.empty();
  }
}
