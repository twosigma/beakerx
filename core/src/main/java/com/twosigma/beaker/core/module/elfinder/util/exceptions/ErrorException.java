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
package com.twosigma.beaker.core.module.elfinder.util.exceptions;

/**
 * This Exception is thrown when the implementation can't complete and wants to return an error to the client.
 */
public class ErrorException extends RuntimeException {

  private final String   error;
  private final String[] args;

  /**
   * See /elfinder/js/i18n/elfinder.??.js for error codes.
   *
   * @param error The error code.
   * @param args  Any arguments needed by the error message.
   */
  public ErrorException(String error, String... args) {
    this.error = error;
    this.args = args;
  }

  /**
   * @return The error code that will translated by elfinder to a nice message.
   */
  public String getError() {
    return error;
  }

  /**
   * @return The arguments needed by the error message.
   */
  public String[] getArgs() {
    return args;
  }
}
