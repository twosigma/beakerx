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

import com.twosigma.beakerx.kernel.PathToJar;
import org.junit.Test;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.jar.JarOutputStream;
import java.util.jar.Manifest;

import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;

public abstract class ClasspathManagerTest extends KernelSetUpFixtureTest {

  private static final String JAR_NAME = "classpathManagerFooTest.jar";

  @Test
  public void returnEmptyListOfJarsFromClasspath() {
    //given
    //when
    List<String> jars = ClasspathManager.getJars();
    //then
    assertThat(jars).isEmpty();
  }

  @Test
  public void returnOnlyJarsFromClasspath() {
    //given
    String jar = createJar();
    getKernel().addJarsToClasspath(singletonList(new PathToJar(jar)));
    //when
    List<String> jars = ClasspathManager.getJars();
    //then
    assertThat(jars).isNotEmpty();
    jars.forEach(path -> assertThat(path).endsWith(".jar"));
  }

  private String createJar() {
    String archiveFile = getKernel().getTempFolder() + File.separator + JAR_NAME;
    try {
      FileOutputStream stream = new FileOutputStream(archiveFile);
      JarOutputStream out = new JarOutputStream(stream, new Manifest());
      out.close();
      stream.close();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }

    return archiveFile;
  }
}