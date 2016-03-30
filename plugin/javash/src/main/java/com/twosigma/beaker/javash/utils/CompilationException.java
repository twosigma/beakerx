/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.javash.utils;

import java.util.List;

public class CompilationException extends IllegalStateException {
  private List<CompilationError> compilationErrors;

  public CompilationException(String message, List<CompilationError> compilationErrors) {
    super(message);
    this.compilationErrors = compilationErrors;
  }

  public List<CompilationError> getCompilationErrors() {
    return compilationErrors;
  }

  public static class CompilationError {
    private int lineNumber;
    private String errorMessage;
    private String code;

    public CompilationError(int lineNumber, String errorMessage, String code) {
      this.lineNumber = lineNumber;
      this.errorMessage = errorMessage;
      this.code = code;
    }

    public int getLineNumber() {
      return lineNumber;
    }

    public String getErrorMessage() {
      return errorMessage;
    }

    public String getCode() {
      return code;
    }
  }
}
