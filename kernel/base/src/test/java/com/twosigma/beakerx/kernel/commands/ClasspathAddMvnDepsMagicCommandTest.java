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
import com.twosigma.beakerx.kernel.commands.item.MagicCommandItem;
import com.twosigma.beakerx.message.Message;
import org.apache.commons.io.FileUtils;
import org.assertj.core.api.Assertions;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Enumeration;
import java.util.Optional;
import java.util.stream.Stream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import static com.twosigma.beakerx.kernel.commands.MavenJarResolver.MVN_DIR;
import static com.twosigma.beakerx.kernel.commands.MagicCommand.ADD_MVN_FORMAT_ERROR_MESSAGE;
import static com.twosigma.beakerx.kernel.msg.MessageCreator.TEXT;
import static org.assertj.core.api.Assertions.assertThat;

public class ClasspathAddMvnDepsMagicCommandTest {

  private static final String SRC_TEST_RESOURCES_TEST_IVY_CACHE = "src/test/resources/testMvnCache";
  public static final String BUILD_PATH = "build";
  public static final String TEST_MVN_CACHE = BUILD_PATH + "/testMvnCache";

  private static MagicCommand sut;
  private static KernelTest kernel;
  private static EvaluatorTest evaluator;

  @BeforeClass
  public static void setUp() throws Exception {
    evaluator = new EvaluatorTest();
    kernel = new KernelTest("id2", evaluator);
    sut = new MagicCommand(kernel);
    prepareLocalMavenRepository();
  }

  @AfterClass
  public static void tearDown() throws Exception {
    evaluator.exit();
  }

  @Test
  public void handleClasspathAddMvnDep() throws Exception {
    //given
    String codeAsString = "%classpath add mvn com.google.code.gson gson 2.6.2";
    Code code = new Code(codeAsString);
    //when
    MagicCommandResult process = sut.process(code, new Message(), 1);
    //then
    Assertions.assertThat(getText(process)).contains("Added jar1");
    String mvnDir = kernel.getTempFolder().toString() + MVN_DIR;
    Stream<Path> paths = Files.walk(Paths.get(mvnDir));
    Optional<Path> dep = paths.filter(file -> file.getFileName().toFile().getName().contains("gson")).findFirst();
    assertThat(dep).isPresent();
    assertThat(kernel.getClasspath().get(0)).contains(mvnDir);
    assertThat(getText(process)).contains("gson-2.6.2.jar");
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
    assertThat(text).contains("Could not resolve dependencies for: com.google.code.XXXX : gson : 2.6.2");
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
    MagicCommandItem magicCommandItem = process.getItems().get(0);
    Message message = magicCommandItem.getResult().get();
    return (String) message.getContent().get(TEXT);
  }

  private static void prepareLocalMavenRepository() throws IOException {
    FileUtils.copyDirectory(new File(SRC_TEST_RESOURCES_TEST_IVY_CACHE), new File(BUILD_PATH));
    unzipRepo();
  }

  private static void unzipRepo() {
    try {
      ZipFile zipFile = new ZipFile(BUILD_PATH + "/testMvnCache.zip");
      Enumeration<?> enu = zipFile.entries();
      while (enu.hasMoreElements()) {
        ZipEntry zipEntry = (ZipEntry) enu.nextElement();
        String name = BUILD_PATH + "/" + zipEntry.getName();
        File file = new File(name);
        if (name.endsWith("/")) {
          file.mkdirs();
          continue;
        }

        File parent = file.getParentFile();
        if (parent != null) {
          parent.mkdirs();
        }

        InputStream is = zipFile.getInputStream(zipEntry);
        FileOutputStream fos = new FileOutputStream(file);
        byte[] bytes = new byte[1024];
        int length;
        while ((length = is.read(bytes)) >= 0) {
          fos.write(bytes, 0, length);
        }
        is.close();
        fos.close();

      }
      zipFile.close();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
