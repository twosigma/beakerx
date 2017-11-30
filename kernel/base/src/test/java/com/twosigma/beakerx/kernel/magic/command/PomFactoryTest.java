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

import static org.apache.commons.lang3.StringUtils.normalizeSpace;
import static org.assertj.core.api.Assertions.assertThat;
import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver.Dependency;

import java.util.Collections;
import java.util.Map;
import org.junit.Test;

public class PomFactoryTest {

  protected static final String EXPECTED_RESULT_BLOCK = "" +
          "<repositories>\n" +
          "  <repository>\n" +
          "    <id>project-repo</id>\n" +
          "       <url>file://${project.basedir}/build/testMvnCache</url>\n" +
          "    </repository>\n" +
          "  <repository>\n" +
          "    <id>repository.spring.snapshot</id>\n" +
          "    <url>http://repo.spring.io/snapshot</url>\n" +
          "  </repository>\n" +
          "</repositories>";

  @Test
  public void createPomWithRepos() throws Exception {
    //given
    Map<String, String> repos = Collections.singletonMap("repository.spring.snapshot", "http://repo.spring.io/snapshot");
    PomFactory pomFactory = new PomFactory();
    Dependency dependency = new Dependency("", "", "");
    //when
    String pomAsString = pomFactory.createPom("/", "/", dependency, repos);
    //then
    assertThat(normalizeSpace(pomAsString)).contains(normalizeSpace(EXPECTED_RESULT_BLOCK));
  }

}
