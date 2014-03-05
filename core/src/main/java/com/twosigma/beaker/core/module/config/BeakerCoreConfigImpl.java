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
package com.twosigma.beaker.core.module.config;

import com.google.inject.Inject;
import com.twosigma.beaker.shared.module.config.BeakerConfig;
import java.net.UnknownHostException;

/**
 * BeakerCoreConfigImpl
 *
 */
public class BeakerCoreConfigImpl implements BeakerCoreConfig {

  private final String configDir;
  private final String nginxPath;
  private final Boolean useKerberos;
  private final Integer portBase;

  @Inject
  public BeakerCoreConfigImpl(BeakerConfig bkConfig, BeakerCoreConfigPref pref)
      throws UnknownHostException {
    this.useKerberos = pref.getUseKerberos();
    this.portBase = pref.getPortBase();
    this.configDir = bkConfig.getInstallDirectory() + "/config";
    this.nginxPath = "";
  }

  @Override
  public String getConfigDirectory() {
    return this.configDir;
  }

  @Override
  public String getNginxPath() {
    return this.nginxPath;
  }

  @Override
  public Integer getPortBase() {
    return this.portBase;
  }

  @Override
  public Boolean getUseKerberos() {
    return this.useKerberos;
  }

}
