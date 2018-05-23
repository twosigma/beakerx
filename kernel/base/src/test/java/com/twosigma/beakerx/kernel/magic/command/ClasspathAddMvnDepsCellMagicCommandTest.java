/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *import static org.assertj.core.api.Assertions.assertThat;
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.twosigma.beakerx.kernel.magic.command;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClassPathAddMvnCellMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.TestWidgetUtils;
import org.apache.commons.io.FileUtils;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.kernel.magic.command.functionality.ClassPathAddMvnCellMagicCommand.CLASSPATH_ADD_MVN_CELL;

public class ClasspathAddMvnDepsCellMagicCommandTest {


  private static final String SRC_TEST_RESOURCES_TEST_MVN_CACHE = "src/test/resources/testMvnCache";
  public static final String BUILD_PATH = "build";
  public static final ArrayList<MagicCommandOutcomeItem> NO_ERRORS = new ArrayList<>();

  private static KernelTest kernel;
  private static EvaluatorTest evaluator;

  @Before
  public void setUp() throws Exception {
    evaluator = new EvaluatorTest();
    kernel = new KernelTest("id2", evaluator);
    prepareLocalMavenRepository();
  }

  @After
  public void tearDown() throws Exception {
    evaluator.exit();
  }

  @Test
  public void handleAddDeps() throws Exception {
    //given
    String allCode = CLASSPATH_ADD_MVN_CELL + "\n"
            + "org.slf4j slf4j-api 1.7.5\n"
            + "com.google.code.gson gson 2.6.2";
    List<String> expected = Arrays.asList("slf4j-api-1.7.5.jar", "gson-2.6.2.jar");
    handleCellClasspathAddMvnDep(allCode, expected);
  }

  @Test
  public void handleAddDepsMixedSyntax() throws Exception {
    String allCode = CLASSPATH_ADD_MVN_CELL + "\n"
            + "org.slf4j slf4j-api 1.7.5\n"
            + "com.google.code.gson:gson:2.6.2";
    List<String> expected = Arrays.asList("slf4j-api-1.7.5.jar", "gson-2.6.2.jar");
    handleCellClasspathAddMvnDep(allCode, expected);
  }

  @Test
  public void handleUnresolvedDep() throws Exception {
    String allCode = "%%classpath add mvn\n"
            + "com.google.code.XXXX:gson:2.6.2";
    //given
    MagicCommand command = new MagicCommand(new ClassPathAddMvnCellMagicCommand(kernel.mavenResolverParam, kernel), allCode);
    Code code = Code.createCode(allCode, Collections.singletonList(command), NO_ERRORS, commMsg());
    //when
    code.execute(kernel, 1);
    //then
    List<Message> stderr = EvaluatorResultTestWatcher.getStderr(kernel.getPublishedMessages());
    String text = (String) stderr.get(0).getContent().get("text");
    Assertions.assertThat(text).contains("Could not resolve dependencies for:");
    Assertions.assertThat(text).contains("com.google.code.XXXX : gson : 2.6.2");
  }

  @Test
  public void handleIncorrectSyntax() throws Exception {
    String singleLine = "%%classpath add mvn\n"
            + "org.slf4j slf4j-api 1.7.5 "
            + "com.google.code.gson:gson:2.6.2";
    String additionalCode = "%%classpath add mvn\n"
            + "org.slf4j slf4j-api 1.7.5\n"
            + "println(\"test\")";
    processMagicCommand(singleLine);
    List<Message> stderr = EvaluatorResultTestWatcher.getStderr(kernel.getPublishedMessages());
    String text = (String) stderr.get(0).getContent().get("text");
    Assertions.assertThat(text.equals(ClassPathAddMvnCellMagicCommand.MVN_CELL_FORMAT_ERROR_MESSAGE));
    processMagicCommand(additionalCode);
    List<Message> stderr2 = EvaluatorResultTestWatcher.getStderr(kernel.getPublishedMessages());
    String text2 = (String) stderr2.get(0).getContent().get("text");
    Assertions.assertThat(text2.equals(ClassPathAddMvnCellMagicCommand.MVN_CELL_FORMAT_ERROR_MESSAGE));
  }

  private void processMagicCommand(String allCode) {
    MagicCommand command = new MagicCommand(new ClassPathAddMvnCellMagicCommand(kernel.mavenResolverParam, kernel), allCode);
    Code code = Code.createCode(allCode, Collections.singletonList(command), NO_ERRORS, commMsg());
    code.execute(kernel, 1);
  }


  private void handleCellClasspathAddMvnDep(String allCode, List<String> expected) throws Exception {
    processMagicCommand(allCode);
    String mvnDir = kernel.getTempFolder().toString() + MavenJarResolver.MVN_DIR;
    List<String> depNames = Files.walk(Paths.get(mvnDir)).map(p -> p.getFileName().toString()).collect(Collectors.toList());

    Optional<Message> updateMessage = EvaluatorResultTestWatcher.waitForUpdateMessage(kernel);
    String text =  (String) TestWidgetUtils.getState(updateMessage.get()).get("value");

    Assertions.assertThat(kernel.getClasspath().get(0)).contains(mvnDir);
    Assertions.assertThat(expected.stream()
            .allMatch(depNames::contains));
    Assertions.assertThat(expected.stream().allMatch(text::contains));

    Files.walk(Paths.get(mvnDir)).forEach(path -> {
      try {
        FileUtils.forceDelete(path.toFile());
      } catch (IOException e) {
        e.printStackTrace();
      }
    });
  }

  private static void prepareLocalMavenRepository() throws IOException {
    FileUtils.copyDirectory(new File(SRC_TEST_RESOURCES_TEST_MVN_CACHE), new File(BUILD_PATH));
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
