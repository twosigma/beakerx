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
  // "$CONDA_PREFIX/share/beakerx/maven"

  private Path cache = null;

  public Path getCache() {
    if (cache == null) {
      String condaPrefix = System.getenv("CONDA_PREFIX");
      cache = getOrCreateFile(condaPrefix + "/share/beakerx").toPath();
    }
    return cache;
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
}
