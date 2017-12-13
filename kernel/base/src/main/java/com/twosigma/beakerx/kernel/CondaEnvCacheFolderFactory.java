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

public class CondaEnvCacheFolderFactory implements CacheFolderFactory {

  private static final String CONDA_PREFIX = "CONDA_PREFIX";

  // "$CONDA_PREFIX/share/beakerx/maven/cache"

  private Path cache = null;
  private CondaPrefix condaPrefix;

  public CondaEnvCacheFolderFactory() {
    this(new CondaPrefixSystem());
  }

  CondaEnvCacheFolderFactory(CondaPrefix condaPrefix) {
    this.condaPrefix = condaPrefix;
  }

  public Path getCache() {
    if (cache == null) {
      cache = getOrCreateFile(getCondaPrefix() + "/share/beakerx").toPath();
    }
    return cache;
  }

  private String getCondaPrefix() {
    String conda_prefix = condaPrefix.get();
    if (conda_prefix == null || conda_prefix.isEmpty()) {
      throw new RuntimeException("Your CONDA_PREFIX is empty, please switch to conda env.");
    }
    return conda_prefix;
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


  public interface CondaPrefix {
    String get();
  }

  public static class CondaPrefixSystem implements CondaPrefix {
    @Override
    public String get() {
      return System.getenv(CONDA_PREFIX);
    }
  }

}
