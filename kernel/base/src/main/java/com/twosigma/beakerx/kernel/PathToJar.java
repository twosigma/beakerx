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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.net.URL;
import java.nio.file.Paths;

import static org.apache.commons.lang3.builder.EqualsBuilder.reflectionEquals;
import static org.apache.commons.lang3.builder.HashCodeBuilder.reflectionHashCode;
import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;

public class PathToJar {

  private static final Logger logger = LoggerFactory.getLogger(PathToJar.class.getName());

  private URL url;

  public PathToJar(final String path) {
    try {
      File file = Paths.get(path).toFile();
      String canonicalPath = file.getCanonicalPath();
      logger.info("PathToJar --> path: " + canonicalPath + " exists: " + file.exists());
      this.url = Paths.get(canonicalPath).toUri().toURL();
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public String getPath() {
    return url.getPath();
  }

  public URL getUrl() {
    return url;
  }

  @Override
  public boolean equals(Object o) {
    return reflectionEquals(this, o);
  }

  @Override
  public int hashCode() {
    return reflectionHashCode(this);
  }

  @Override
  public String toString() {
    return reflectionToString(this);
  }
}
