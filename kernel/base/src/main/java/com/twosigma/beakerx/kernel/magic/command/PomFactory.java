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
package com.twosigma.beakerx.kernel.magic.command;

import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver.Dependency;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

public class PomFactory {

  public String createPom(Params params, List<Dependency> dependencies) {
    String pomAsString = createPom(params);
    pomAsString = configureDependencies(dependencies, pomAsString);
    return pomAsString;
  }

  public String createPom(Params params, PomStyleDependencies dependencies) {
    String pomAsString = createPom(params);
    pomAsString = configureDependencies(dependencies, pomAsString);
    return pomAsString;
  }

  private String createPom(Params params) {
    InputStream pom = getClass().getClassLoader().getResourceAsStream(MavenJarResolver.POM_XML);
    String pomAsString = getPomAsString(pom);
    pomAsString = configureOutputDir(params.pathToMavenRepo, pomAsString);
    pomAsString = configureRepos(params.repos, pomAsString);
    pomAsString = configureGoal(params.goal, pomAsString);
    pomAsString = configureBuildClasspathPlugin(params.pathToMavenRepo, params.mavenBuiltClasspathFileName, pomAsString);
    return pomAsString;
  }

  private String getPomAsString(InputStream pom) {
    String pomAsString;
    try {
      pomAsString = IOUtils.toString(pom, StandardCharsets.UTF_8);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    return pomAsString;
  }

  private String configureBuildClasspathPlugin(String pathToMavenRepo, String mavenBuiltClasspathFileName, String pomAsString) {
    String absolutePath = new File(pathToMavenRepo, mavenBuiltClasspathFileName).getAbsolutePath();
    return pomAsString.replace(
            "<outputFile>mavenBuiltClasspathFile</outputFile>",
            "<outputFile>" + absolutePath + "</outputFile>");
  }

  private String configureGoal(String goal, String pomAsString) {
    return pomAsString.replaceAll("<phase>goal</phase>", "<phase>" + goal + "</phase>");
  }

  private String configureDependencies(PomStyleDependencies dependencies, String pomAsString) {
    return pomAsString.replace(
            "<dependencies></dependencies>",
            dependencies.asString());
  }

  private String configureDependencies(List<Dependency> dependencies, String pomAsString) {
    for (Dependency dependency : dependencies) {
      pomAsString = configureDependency(dependency, pomAsString);
    }
    return pomAsString;
  }

  private String configureDependency(Dependency dependency, String pomAsString) {
    return pomAsString.replace(
            "</dependencies>",
            "  <dependency>\n" +
                    "    <groupId>" + dependency.getGroupId() + "</groupId>\n" +
                    "    <artifactId>" + dependency.getArtifactId() + "</artifactId>\n" +
                    "    <version>" + dependency.getVersion() + "</version>\n" +
                    "    <type>" + dependency.getType() + "</type>\n" +
                    classifier(dependency.getClassifier()) +
                    "  </dependency>\n" +
                    "</dependencies>");
  }

  private String classifier(Optional<String> classifier) {
    return classifier.map(s -> "<classifier>" + s + "</classifier>\n").orElse("");
  }

  private String configureOutputDir(String pathToMavenRepo, String pomAsString) {
    String absolutePath = new File(pathToMavenRepo).getAbsolutePath();
    return pomAsString.replace(
            "<outputDirectory>pathToNotebookJars</outputDirectory>",
            "<outputDirectory>" + absolutePath + "</outputDirectory>");
  }


  private String configureRepos(Map<String, String> repos, String pomAsString) {
    for (Entry<String, String> entry : repos.entrySet()) {
      pomAsString = configureRepos(pomAsString, entry.getKey(), entry.getValue());
    }
    return pomAsString;
  }


  private String configureRepos(String pomAsString, String name, String url) {
    String repoPattern = "" +
            "<repository>\n" +
            "    <id>%s</id>\n" +
            "    <url>%s</url>\n" +
            "</repository>\n";

    return pomAsString.replace("</repositories>", String.format(repoPattern, name, url) + "</repositories>");
  }

  static class Params {
    String pathToMavenRepo;
    Map<String, String> repos;
    String goal;
    private String mavenBuiltClasspathFileName;

    public Params(String pathToMavenRepo, Map<String, String> repos, String goal, String mavenBuiltClasspathFileName) {
      this.pathToMavenRepo = pathToMavenRepo;
      this.repos = repos;
      this.goal = goal;
      this.mavenBuiltClasspathFileName = mavenBuiltClasspathFileName;
    }
  }
}
