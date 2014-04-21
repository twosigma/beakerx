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

package com.twosigma.beaker.shared.module.config;

/**
 * WebAppConfigPref
 * stores preferences that can contribute to determining the run-time configurations
 * of a web application.
 */
public interface WebAppConfigPref {
  /**
   * Gets preferred port number. Can be <code>null</code>;
   * @return
   */
  public Integer getPort();
  /**
   * Gets preferred directory to serve static files from. Can be <code>null</code>;
   * @return
   */
  public String getStaticDirectory();
}
