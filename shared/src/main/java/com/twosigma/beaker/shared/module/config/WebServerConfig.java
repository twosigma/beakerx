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
 * WebAppConfig
 * stores run-time configurations of a web application.
 */
public interface WebServerConfig {
  /**
   * gets the port number
   * @return
   */
  public Integer getPort();
  /**
   * gets the username
   * @return
   */
  public String getUsername();
  /**
   * gets the directory where static files are served from
   * @return
   */
  public String getStaticDirectory();
}
