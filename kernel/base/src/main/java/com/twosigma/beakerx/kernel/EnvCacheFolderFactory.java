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
import java.util.Optional;

import static java.util.Arrays.asList;

public class EnvCacheFolderFactory implements CacheFolderFactory {

  public static final CondaPrefix CONDA_PREFIX = new CondaPrefix();
  public static final VirtualEnvPrefix VIRTUAL_ENV_PREFIX = new VirtualEnvPrefix();

  private Path cache = null;
  private List<EnvPrefix> prefix;

  public EnvCacheFolderFactory() {
    this.prefix = asList(CONDA_PREFIX, VIRTUAL_ENV_PREFIX);
  }

  EnvCacheFolderFactory(List<EnvPrefix> prefix) {
    this.prefix = prefix;
  }

  public Path getCache() {
    if (cache == null) {
      cache = getOrCreateFile(getPrefix() + "/share/beakerx").toPath();
    }
    return cache;
  }

  private String getPrefix() {
    Optional<EnvPrefix> envPrefix = prefix.stream().
            filter(prefix -> prefix.get() != null && !prefix.get().isEmpty()).
            findFirst();
    return envPrefix.map(EnvPrefix::get).orElseGet(EnvCacheFolderFactory::getTmpDir);
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

  static String getTmpDir() {
    return System.getProperty("java.io.tmpdir");
  }

  public interface EnvPrefix {
    String get();
  }

  public static class CondaPrefix implements EnvPrefix {
    private static final String CONDA_PREFIX = "CONDA_PREFIX";

    @Override
    public String get() {
      return System.getenv(CONDA_PREFIX);
    }
  }

  public static class VirtualEnvPrefix implements EnvPrefix {
    private static final String VIRTUAL_ENV = "VIRTUAL_ENV";

    @Override
    public String get() {
      return System.getenv(VIRTUAL_ENV);
    }
  }

}
