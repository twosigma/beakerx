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

import com.google.inject.Inject;
import com.google.inject.Singleton;

/**
 * WebAppConfigImpl
 *
 */
@Singleton
public class DefaultWebServerConfig implements WebServerConfig {
  private final Integer port;
  private final String username;
  private final String staticDir;

  @Inject
  public DefaultWebServerConfig(WebAppConfigPref pref) {
    this.port = pref.getPort();
    this.username = System.getProperty("user.name");
    this.staticDir = pref.getStaticDirectory() != null ?
        pref.getStaticDirectory() : System.getProperty("user.dir");
  }

  @Override
  public Integer getPort() {
    return this.port;
  }

  @Override
  public String getUsername() {
    return this.username;
  }

  @Override
  public String getStaticDirectory() {
    return this.staticDir;
  }

}
