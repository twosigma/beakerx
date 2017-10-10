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
import com.twosigma.beakerx.kernel.commands.item.CommandItem;
import com.twosigma.beakerx.message.Message;
import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.stream.Stream;

import static com.twosigma.beakerx.kernel.commands.MavenJarResolver.MVN_DIR;
import static com.twosigma.beakerx.kernel.commands.MagicCommand.ADD_MVN_FORMAT_ERROR_MESSAGE;
import static com.twosigma.beakerx.kernel.msg.MessageCreator.TEXT;
import static org.assertj.core.api.Assertions.assertThat;

public class ClasspathAddMvnDepsMagicCommandTest {

  public static final String TEST_IVY_CACHE = "build/testIvyCache";
  private static final String SRC_TEST_RESOURCES_TEST_IVY_CACHE = "src/test/resources/testIvyCache";

  private MagicCommand sut;
  private KernelTest kernel;
  private EvaluatorTest evaluator;

  @Before
  public void setUp() throws Exception {
    this.evaluator = new EvaluatorTest();
    this.kernel = new KernelTest("id2", evaluator);
    this.sut = new MagicCommand(kernel);
    copyIvyCacheToBuildDirectoryBecauseIvyChangeDatesInCache();
  }

  @After
  public void tearDown() throws Exception {
    this.evaluator.exit();
  }

  @Test
  public void handleClasspathAddMvnDep() throws Exception {
    //given
    String codeAsString = "%classpath add mvn com.google.code.gson gson 2.6.2";
    Code code = new Code(codeAsString);
    //when
    MagicCommandResult process = sut.process(code, new Message(), 1);
    //then
    String mvnDir = kernel.getTempFolder().toString() + MVN_DIR;
    Stream<Path> paths = Files.walk(Paths.get(mvnDir));
    Optional<Path> dep = paths.filter(file -> file.getFileName().toFile().getName().contains("gson")).findFirst();
    assertThat(dep).isPresent();
    assertThat(kernel.getClasspath().get(0)).contains(mvnDir);
    assertThat(getText(process)).contains("gson.jar");
  }

  @Test
  public void unresolvedDependency() throws Exception {
    //given
    String codeAsString = "%classpath add mvn com.google.code.XXXX gson 2.6.2";
    Code code = new Code(codeAsString);
    //when
    MagicCommandResult process = sut.process(code, new Message(), 1);
    //then
    String text = getText(process);
    assertThat(text).contains("unresolved dependency");
  }

  @Test
  public void wrongCommandFormat() throws Exception {
    //given
    String codeAsString = "%classpath add mvn com.google.code.XXXX gson";
    Code code = new Code(codeAsString);
    //when
    MagicCommandResult process = sut.process(code, new Message(), 1);
    //then
    String text = getText(process);
    assertThat(text).isEqualTo(ADD_MVN_FORMAT_ERROR_MESSAGE);
  }

  private String getText(MagicCommandResult process) {
    CommandItem magicCommandItem = process.getItems().get(0);
    Message message = magicCommandItem.getResult().get();
    return (String) message.getContent().get(TEXT);
  }

  private void copyIvyCacheToBuildDirectoryBecauseIvyChangeDatesInCache() throws IOException {
    FileUtils.copyDirectory(new File(SRC_TEST_RESOURCES_TEST_IVY_CACHE),new File(TEST_IVY_CACHE));
  }
}
