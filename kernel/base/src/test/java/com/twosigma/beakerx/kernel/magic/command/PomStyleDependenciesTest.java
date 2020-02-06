
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

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class PomStyleDependenciesTest {

  @Test
  public void dependencyManagement() {
    //given
    String dependencyManagement = "<dependencyManagement>\n" +
            "\t\t<dependencies>\n" +
            "\t\t\t<dependency>\n" +
            "\t\t\t\t<groupId>org.springframework.boot</groupId>\n" +
            "\t\t\t\t<artifactId>spring-boot-starter-parent</artifactId>\n" +
            "\t\t\t\t<version>2.2.4.RELEASE</version>\n" +
            "\t\t\t\t<type>pom</type>\n" +
            "\t\t\t\t<scope>import</scope>\n" +
            "\t\t\t</dependency>\n" +
            "\t\t</dependencies>\n" +
            "\t</dependencyManagement>\n";
    String dependencies = "\t<dependencies>\n" +
            "\t\t<dependency>\n" +
            "\t\t\t<groupId>org.springframework.boot</groupId>\n" +
            "\t\t\t<artifactId>spring-boot-starter</artifactId>\n" +
            "\t\t</dependency>\n" +
            "\t\t<dependency>\n" +
            "\t\t\t<groupId>org.springframework.boot</groupId>\n" +
            "\t\t\t<artifactId>spring-boot-starter-test</artifactId>\n" +
            "\t\t\t<scope>test</scope>\n" +
            "\t\t\t<exclusions>\n" +
            "\t\t\t\t<exclusion>\n" +
            "\t\t\t\t\t<groupId>org.junit.vintage</groupId>\n" +
            "\t\t\t\t\t<artifactId>junit-vintage-engine</artifactId>\n" +
            "\t\t\t\t</exclusion>\n" +
            "\t\t\t</exclusions>\n" +
            "\t\t</dependency>\n" +
            "\t</dependencies>";
    String dependencyString = dependencyManagement + dependencies;
    //when

    PomStyleDependencies pomStyleDependencies = new PomStyleDependencies(dependencyString);
    //then
    assertThat(pomStyleDependencies.getDependencyManagement().trim()).isEqualTo(dependencyManagement.trim());
    assertThat(pomStyleDependencies.getDependencies().trim()).isEqualTo(dependencies.trim());
  }

  @Test
  public void isPomStyle() {
    //given
    String dependencyManagement = "<dependencyManagement>\n" +
            "\t\t<dependencies>\n" +
            "\t\t\t<dependency>\n" +
            "\t\t\t\t<groupId>org.springframework.boot</groupId>\n" +
            "\t\t\t\t<artifactId>spring-boot-starter-parent</artifactId>\n" +
            "\t\t\t\t<version>2.2.4.RELEASE</version>\n" +
            "\t\t\t\t<type>pom</type>\n" +
            "\t\t\t\t<scope>import</scope>\n" +
            "\t\t\t</dependency>\n" +
            "\t\t</dependencies>\n" +
            "\t</dependencyManagement>\n";
    String dependencies = "<dependencies>\n" +
            "\t\t<dependency>\n" +
            "\t\t\t<groupId>org.springframework.boot</groupId>\n" +
            "\t\t\t<artifactId>spring-boot-starter</artifactId>\n" +
            "\t\t</dependency>\n" +
            "\t\t<dependency>\n" +
            "\t\t\t<groupId>org.springframework.boot</groupId>\n" +
            "\t\t\t<artifactId>spring-boot-starter-test</artifactId>\n" +
            "\t\t\t<scope>test</scope>\n" +
            "\t\t\t<exclusions>\n" +
            "\t\t\t\t<exclusion>\n" +
            "\t\t\t\t\t<groupId>org.junit.vintage</groupId>\n" +
            "\t\t\t\t\t<artifactId>junit-vintage-engine</artifactId>\n" +
            "\t\t\t\t</exclusion>\n" +
            "\t\t\t</exclusions>\n" +
            "\t\t</dependency>\n" +
            "\t</dependencies>";
    String dependencyString = dependencyManagement + dependencies;
    //when

    boolean pomXmlStyle = PomStyleDependencies.isPomXmlStyle(dependencyString);
    //then
    assertThat(pomXmlStyle).isTrue();
  }


  @Test
  public void isNotPomStyle() {
    //given
    String dependencyString = "org.slf4j slf4j-api 1.7.25";
    //when
    boolean pomXmlStyle = PomStyleDependencies.isPomXmlStyle(dependencyString);
    //then
    assertThat(pomXmlStyle).isFalse();
  }

}