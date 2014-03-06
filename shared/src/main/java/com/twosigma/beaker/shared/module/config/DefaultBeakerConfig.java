/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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

import java.io.File;


/**
 * BeakerConfigImpl
 *
 */
public class DefaultBeakerConfig implements BeakerConfig {

  private final String username;
  private final String installDir;
  private final String staticDir;
  private final String dotDir;

  public DefaultBeakerConfig() {
    this.username = System.getProperty("user.name");
    this.installDir = System.getProperty("user.dir");
    this.staticDir = installDir + "/src/main/web";
    this.dotDir = System.getProperty("user.home") + "/.beaker";

    File dotFile = new File(dotDir);
    if (!dotFile.exists()) {
      if (!dotFile.mkdir()) {
        System.out.println("failed to create " + dotDir);
      }
    }
  }

  @Override
  public String getUsername() {
    return this.username;
  }

  @Override
  public String getInstallDirectory() {
    return this.installDir;
  }

  @Override
  public String getStaticDirectory() {
    return this.staticDir;
  }

  @Override
  public String getDotDirectory() {
    return this.dotDir;
  }

}
