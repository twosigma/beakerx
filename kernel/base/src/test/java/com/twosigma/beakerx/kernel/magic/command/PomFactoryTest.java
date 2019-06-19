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

import com.google.common.collect.Maps;
import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver.Dependency;
import org.junit.Before;
import org.junit.Test;

import java.util.Map;

import static java.util.Arrays.asList;
import static org.apache.commons.lang3.StringUtils.deleteWhitespace;
import static org.apache.commons.lang3.StringUtils.normalizeSpace;
import static org.assertj.core.api.Assertions.assertThat;

public class PomFactoryTest {

  protected static final String EXPECTED_RESULT_BLOCK = "" +
          "<repositories>" +
          "  <repository>" +
          "    <id>project-repo</id>" +
          "       <url>file://${project.basedir}/build/testMvnCache</url>" +
          "    </repository>" +
          "  <repository>" +
          "    <id>repo2</id>" +
          "    <url>urlToRepo2</url>" +
          "  </repository>" +
          "  <repository>" +
          "    <id>repository.spring.snapshot</id>" +
          "    <url>http://repo.spring.io/snapshot</url>" +
          "  </repository>" +
          "</repositories>";

  private static final String EXPECTED_MULTIPLE_DEP_POM = "" +
          "<dependencies>" +
          "  <dependency>" +
          "    <groupId>group</groupId>" +
          "    <artifactId>artifact</artifactId>" +
          "    <version>1.1.1</version>" +
          "    <type>jar</type>" +
          "  </dependency>" +
          "  <dependency>" +
          "    <groupId>other-group</groupId>" +
          "    <artifactId>other-artifact</artifactId>" +
          "    <version>1.1.1</version>" +
          "    <type>jar</type>" +
          "  </dependency>" +
          "</dependencies>";

  private PomFactory pomFactory;

  @Before
  public void setUp() throws Exception {
    pomFactory = new PomFactory();
  }

  @Test
  public void createPomWithRepos() throws Exception {
    //given
    Map<String, String> repos = Maps.newHashMap();
    repos.put("repo2", "urlToRepo2");
    repos.put("repository.spring.snapshot", "http://repo.spring.io/snapshot");
    Dependency dependency = Dependency.create(asList("", "", ""));
    //when
    String pomAsString = pomFactory.createPom(new PomFactory.Params("/", repos, MavenJarResolver.GOAL, MavenJarResolver.MAVEN_BUILT_CLASSPATH_FILE_NAME), asList(dependency));
    //then
    assertThat(removeWhitespaces(pomAsString)).contains(removeWhitespaces(EXPECTED_RESULT_BLOCK));
  }

  @Test
  public void createPomWithMultipleDependencies() throws Exception {
    Map<String, String> repos = Maps.newHashMap();
    Dependency dependency1 = Dependency.create(asList("group", "artifact", "1.1.1"));
    Dependency dependency2 = Dependency.create(asList("other-group", "other-artifact", "1.1.1"));
    String pomAsString = pomFactory.createPom(new PomFactory.Params("/", repos, MavenJarResolver.GOAL, MavenJarResolver.MAVEN_BUILT_CLASSPATH_FILE_NAME), asList(dependency1, dependency2));
    assertThat(removeWhitespaces(pomAsString)).contains(removeWhitespaces(EXPECTED_MULTIPLE_DEP_POM));
  }

  @Test
  public void createPomWithType() throws Exception {
    //given
    Dependency dependency = Dependency.create(asList("group", "art", "ver", "pom"));
    //when
    String pomAsString = pomFactory.createPom(new PomFactory.Params("/", Maps.newHashMap(), MavenJarResolver.GOAL, MavenJarResolver.MAVEN_BUILT_CLASSPATH_FILE_NAME), asList(dependency));
    //then
    assertThat(removeWhitespaces(pomAsString)).contains("<type>pom</type>");
    assertThat(removeWhitespaces(pomAsString)).doesNotContain("<classifier");
  }

  @Test
  public void createPomWithClassifier() throws Exception {
    //given
    Dependency dependency = Dependency.create(asList("group", "art", "ver", "pom", "Classifier"));
    //when
    String pomAsString = pomFactory.createPom(new PomFactory.Params("/", Maps.newHashMap(), MavenJarResolver.GOAL, MavenJarResolver.MAVEN_BUILT_CLASSPATH_FILE_NAME), asList(dependency));
    //then
    assertThat(removeWhitespaces(pomAsString)).contains("<classifier>Classifier</classifier>");
  }

  private String removeWhitespaces(String pomAsString) {
    return normalizeSpace(deleteWhitespace(pomAsString));
  }

}
