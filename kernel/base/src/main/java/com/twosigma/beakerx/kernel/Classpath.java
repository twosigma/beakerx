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

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.twosigma.beakerx.util.Preconditions.checkNotNull;
import static java.util.stream.Collectors.toList;

public class Classpath {

  public static final String DELIMITER = System.lineSeparator();

  private List<PathToJar> paths = new ArrayList<>();

  public boolean add(final PathToJar path) {
    checkNotNull(path);
    if (!paths.contains(path)) {
      return this.paths.add(path);
    }
    return false;
  }

  public List<PathToJar> getPaths() {
    return paths;
  }

  public List<String> getPathsAsStrings() {
    return paths.stream().map(PathToJar::getPath).collect(toList());
  }

  public int size() {
    return paths.size();
  }

  public String get(int index) {
    return paths.get(index).getPath();
  }

  public boolean isEmpty() {
    return paths.isEmpty();
  }

  @Override
  public String toString() {
    return paths.stream()
            .map(PathToJar::getPath)
            .collect(Collectors.joining(DELIMITER));
  }
}
