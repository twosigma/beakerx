/*
 *  Copyright 2020 TWO SIGMA OPEN SOURCE, LLC
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

import org.junit.Test;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;

public class MavenJarResolverTest {

  @Test
  public void createDependencyWithVersion() {
    //given
    //when
    MavenJarResolver.Dependency dependency = MavenJarResolver.Dependency.create(Arrays.asList("groupId", "artifactId", "1.0"));
    //then
    assertThat(dependency.getVersion()).isEqualTo("1.0");
  }

  @Test
  public void createDependencyWithLatestVersion() {
    //given
    //when
    MavenJarResolver.Dependency dependency = MavenJarResolver.Dependency.create(Arrays.asList("groupId", "artifactId"));
    //then
    assertThat(dependency.getVersion()).isEqualTo("[0,)");
  }
}