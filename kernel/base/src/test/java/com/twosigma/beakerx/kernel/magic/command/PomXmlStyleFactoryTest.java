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
import org.junit.Before;
import org.junit.Test;

import java.util.Map;

import static org.apache.commons.lang3.StringUtils.deleteWhitespace;
import static org.apache.commons.lang3.StringUtils.normalizeSpace;
import static org.assertj.core.api.Assertions.assertThat;

public class PomXmlStyleFactoryTest {

  private static final String MULTIPLE_DEPs = "" +
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
  public void createPomWithMultipleDependencies() throws Exception {
    PomStyleDependencies pomStyleDependencies = new PomStyleDependencies(MULTIPLE_DEPs);
    Map<String, String> repos = Maps.newHashMap();
    String pomAsString = pomFactory.createPom(new PomFactory.Params("/", repos, MavenJarResolver.GOAL, MavenJarResolver.MAVEN_BUILT_CLASSPATH_FILE_NAME), pomStyleDependencies);
    assertThat(removeWhitespaces(pomAsString)).contains(removeWhitespaces(MULTIPLE_DEPs));
  }

  private String removeWhitespaces(String pomAsString) {
    return normalizeSpace(deleteWhitespace(pomAsString));
  }
}
