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
package com.twosigma.beakerx.kernel;

import com.twosigma.beakerx.CommRepository;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandConfiguration;
import com.twosigma.beakerx.kernel.restserver.BeakerXServer;

public class Configuration {


  private KernelSocketsFactory kernelSocketsFactory;
  private CloseKernelAction closeKernelAction;
  private CacheFolderFactory cacheFolderFactory;
  private CustomMagicCommandsFactory customMagicCommands;
  private CommRepository commRepository;
  private BeakerXServer beakerXServer;
  private MagicCommandConfiguration magicCommandConfiguration;
  private BeakerXJson beakerXJson;
  private Runtimetools runtimetools;


  public Configuration(KernelSocketsFactory kernelSocketsFactory,
                       CustomMagicCommandsFactory customMagicCommands,
                       CommRepository commRepository,
                       BeakerXServer beakerXServer,
                       MagicCommandConfiguration magicCommandConfiguration,
                       BeakerXJson beakerXJson) {
    this(kernelSocketsFactory,
            () -> System.exit(0),
            new EnvCacheFolderFactory(),
            customMagicCommands,
            commRepository,
            beakerXServer,
            magicCommandConfiguration,
            beakerXJson,
            new RuntimetoolsImpl());
  }

  public Configuration(KernelSocketsFactory kernelSocketsFactory,
                       CloseKernelAction closeKernelAction,
                       CacheFolderFactory cacheFolderFactory,
                       CustomMagicCommandsFactory customMagicCommands,
                       CommRepository commRepository,
                       BeakerXServer beakerXServer,
                       MagicCommandConfiguration magicCommandConfiguration,
                       BeakerXJson beakerXJson,
                       Runtimetools runtimetools) {
    this.kernelSocketsFactory = kernelSocketsFactory;
    this.closeKernelAction = closeKernelAction;
    this.cacheFolderFactory = cacheFolderFactory;
    this.customMagicCommands = customMagicCommands;
    this.commRepository = commRepository;
    this.beakerXServer = beakerXServer;
    this.magicCommandConfiguration = magicCommandConfiguration;
    this.beakerXJson = beakerXJson;
    this.runtimetools = runtimetools;
  }

  public KernelSocketsFactory getKernelSocketsFactory() {
    return kernelSocketsFactory;
  }

  public CloseKernelAction getCloseKernelAction() {
    return closeKernelAction;
  }

  public CacheFolderFactory getCacheFolderFactory() {
    return cacheFolderFactory;
  }

  public CustomMagicCommandsFactory getCustomMagicCommands() {
    return customMagicCommands;
  }

  public CommRepository getCommRepository() {
    return commRepository;
  }

  public BeakerXServer getBeakerXServer() {
    return beakerXServer;
  }

  public MagicCommandConfiguration getMagicCommandConfiguration() {
    return magicCommandConfiguration;
  }

  public BeakerXJson getBeakerXJson() {
    return beakerXJson;
  }

  public Runtimetools getRuntimetools() {
    return runtimetools;
  }
}
