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

import java.io.File;
import java.nio.file.Path;
import java.util.List;

import static java.util.Arrays.asList;

public class EnvCacheFolderFactory implements CacheFolderFactory {

  public static final String PLEASE_SWITCH_TO_CONDA_ENV_OR_VIRTUAL_ENV = "Please switch to conda env or virtual env.";

  public static final CondaPrefixSystem CONDA_PREFIX_SYSTEM = new CondaPrefixSystem();
  public static final VirtualEnvPrefixSystem VIRTUAL_ENV_PREFIX_SYSTEM = new VirtualEnvPrefixSystem();

  // "$CONDA_PREFIX/share/beakerx/maven/cache"

  private Path cache = null;
  private List<EnvPrefix> condaPrefix;

  public EnvCacheFolderFactory() {
    this(asList(CONDA_PREFIX_SYSTEM, VIRTUAL_ENV_PREFIX_SYSTEM));
  }

  EnvCacheFolderFactory(List<EnvPrefix> condaPrefix) {
    this.condaPrefix = condaPrefix;
  }

  public Path getCache() {
    if (cache == null) {
      cache = getOrCreateFile(getCondaPrefix() + "/share/beakerx").toPath();
    }
    return cache;
  }

  private String getCondaPrefix() {
    String envPrefix = null;
    for (EnvPrefix cp : condaPrefix) {
      String prefixResult = cp.get();
      if (prefixResult != null && !prefixResult.isEmpty()) {
        envPrefix = prefixResult;
        break;
      }
    }
    if (envPrefix == null || envPrefix.isEmpty()) {
      throw new RuntimeException(PLEASE_SWITCH_TO_CONDA_ENV_OR_VIRTUAL_ENV);
    }
    return envPrefix;
  }

  private File getOrCreateFile(String pathToMavenRepo) {
    File theDir = new File(pathToMavenRepo);
    if (!theDir.exists()) {
      try {
        theDir.mkdirs();
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
    }
    return theDir;
  }

  public interface EnvPrefix {
    String get();
  }

  public static class CondaPrefixSystem implements EnvPrefix {
    private static final String CONDA_PREFIX = "CONDA_PREFIX";

    @Override
    public String get() {
      return System.getenv(CONDA_PREFIX);
    }
  }

  public static class VirtualEnvPrefixSystem implements EnvPrefix {
    private static final String VIRTUAL_ENV = "VIRTUAL_ENV";

    @Override
    public String get() {
      return System.getenv(VIRTUAL_ENV);
    }
  }

}
