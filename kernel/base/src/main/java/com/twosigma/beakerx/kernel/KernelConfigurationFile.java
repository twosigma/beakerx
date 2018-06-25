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
package com.twosigma.beakerx.kernel;

import com.google.gson.Gson;
import com.twosigma.beakerx.message.MessageSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.Map;
import java.util.Optional;

public class KernelConfigurationFile implements ConfigurationFile {

  private static final Logger logger = LoggerFactory.getLogger(KernelConfigurationFile.class);
  private File config;
  private Config configuration;
  private Optional<String> context = Optional.empty();

  public KernelConfigurationFile(final String[] args) {
    if (args.length > 2) {
      logger.error("Invalid parameters passed to the Kernel. Expected one or two parameter, found " + args.length);
      for (String string : args) {
        logger.error(string);
      }
      System.exit(1);
    }
    this.config = getConfig(args[0]);
    if (args.length == 2) {
      String contextAsJson = args[1];
      this.context = Optional.of(contextAsJson);
    }
  }

  @Override
  public Config getConfig() {
    if (configuration == null) {
      logger.debug("Path to config file : " + config.getAbsolutePath());
      configuration = MessageSerializer.parse(new String(readConfig(), StandardCharsets.UTF_8), Config.class);
      logger.debug("Creating signing hmac with: {}", configuration.getKey());
    }
    return configuration;
  }

  private byte[] readConfig() {
    byte[] bytes = new byte[0];
    try {
      bytes = Files.readAllBytes(config.toPath());
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    return bytes;
  }

  private File getConfig(final String path) {
    File config = new File(path);
    if (!config.exists()) {
      logger.error("Kernel configuration not found.");
      System.exit(1);
    }
    return config;
  }

  public Optional<String> getContext() {
    return context;
  }
}
