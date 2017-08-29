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
package com.twosigma.beakerx.kernel.commands;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

public class ClasspathAddMvnDepsMagicCommandTest {

  private MagicCommand sut;
  private KernelTest kernel;
  private EvaluatorTest evaluator;

  @Before
  public void setUp() throws Exception {
    this.evaluator = new EvaluatorTest();
    this.kernel = new KernelTest("id2", evaluator);
    this.sut = new MagicCommand(kernel);
  }

  @After
  public void tearDown() throws Exception {
    this.evaluator.exit();
  }

  @Test
  public void handleClasspathAddMvnDep() throws Exception {
    //given
    String codeAsString = "%classpath add mvn com.fasterxml.jackson.core jackson-databind 2.6.5";
    Code code = new Code(codeAsString);
    //when
    sut.process(code, new Message(), 1);
    //then
    String mvnDir = kernel.getTempFolder().toString() + MagicCommand.MVN_DIR;
    Stream<Path> paths = Files.walk(Paths.get(mvnDir));
    Optional<Path> dep = paths.filter(file -> file.getFileName().toFile().getName().contains("jackson-databind")).findFirst();
    assertThat(dep).isPresent();
    assertThat(kernel.getClasspath().get(0)).contains(mvnDir);
  }
}
