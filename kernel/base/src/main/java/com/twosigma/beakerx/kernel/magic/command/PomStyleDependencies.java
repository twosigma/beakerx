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
package com.twosigma.beakerx.kernel.magic.command;

public class PomStyleDependencies {

  public static final String DEPENDENCY_MANAGEMENT = "<dependencyManagement>";
  public static final String DEPENDENCIES = "<dependencies>";
  private String dependencies;
  private String dependencyManagement = "<dependencyManagement></dependencyManagement>";

  public PomStyleDependencies(String dependencies) {
    if (dependencies.startsWith(DEPENDENCY_MANAGEMENT)) {
      this.dependencyManagement = dependencies.substring(0, dependencies.indexOf("</dependencyManagement>") + "</dependencyManagement>".length());
      this.dependencies = dependencies.substring(dependencies.indexOf("</dependencyManagement>") + "</dependencyManagement>".length());
    } else {
      this.dependencies = dependencies;
    }
  }

  public String getDependencies() {
    return dependencies;
  }

  public String getDependencyManagement() {
    return dependencyManagement;
  }

  public static boolean isPomXmlStyle(String commandCodeBlock) {
    return commandCodeBlock != null && (commandCodeBlock.startsWith(DEPENDENCIES) || commandCodeBlock.startsWith(DEPENDENCY_MANAGEMENT));
  }
}
