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
package com.twosigma.beakerx;

import com.twosigma.beakerx.kernel.KernelManager;

import java.util.List;
import java.util.stream.Collectors;

public class ClasspathManager {

  public static List<String> getJars() {
    List<String> pathsAsStrings = KernelManager.get().getClasspath().getPathsAsStrings();
    return pathsAsStrings.stream()
            .filter(x -> x.endsWith(".jar")).collect(Collectors.toList());
  }
}
