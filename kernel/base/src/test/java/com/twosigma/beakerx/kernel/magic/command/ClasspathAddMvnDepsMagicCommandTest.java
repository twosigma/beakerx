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

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddMvnMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathResetMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.TestWidgetUtils;
import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import static com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddMvnMagicCommand.ADD_MVN_FORMAT_ERROR_MESSAGE;
import static com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddMvnMagicCommand.CLASSPATH_ADD_MVN;
import static com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathResetMagicCommand.CLASSPATH_RESET;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;

public class ClasspathAddMvnDepsMagicCommandTest {

  private static final String SRC_TEST_RESOURCES_TEST_MVN_CACHE = "src/test/resources/testMvnCache";
  public static final String BUILD_PATH = "build";
  public static final String TEST_MVN_CACHE = BUILD_PATH + "/testMvnCache";
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
  public void tearDown() {
    evaluator.exit();
  }

  @Test
  public void handleClasspathAddMvnDep() throws Exception {
    //given
    String allCode = CLASSPATH_ADD_MVN + " org.slf4j slf4j-api 1.7.5";
    handleClasspathAddMvnDep(allCode, "slf4j-api-1.7.5.jar");
  }

  @Test
  public void handleClasspathAddMvnDepUsingGradleSyntax() throws Exception {
    //given
    String allCode = CLASSPATH_ADD_MVN + " com.google.code.gson:gson:2.6.2";
    handleClasspathAddMvnDep(allCode, "gson-2.6.2.jar");
  }

  @Test
  public void unresolvedDependency() {
    //given
    String allCode = CLASSPATH_ADD_MVN + " com.google.code.XXXX gson 2.6.2";
    MagicCommand command = new MagicCommand(new ClasspathAddMvnMagicCommand(kernel.mavenResolverParam, kernel), allCode);
    Code code = Code.createCode(allCode, singletonList(command), NO_ERRORS, new Message(new Header(JupyterMessages.COMM_MSG, "session1")));
    //when
    code.execute(kernel, 1);
    //then
    List<Message> stderr = EvaluatorResultTestWatcher.getStderr(kernel.getPublishedMessages());
    String text = (String) stderr.get(0).getContent().get("text");
    assertThat(text).contains("Could not resolve dependencies for:");
    assertThat(text).contains("com.google.code.XXXX : gson : 2.6.2");
  }

  @Test
  public void handleClasspathReset() throws Exception {
    //given
    String allCode = CLASSPATH_ADD_MVN + " com.google.code.gson:gson:2.6.2";
    handleClasspathAddMvnDep(allCode, "gson-2.6.2.jar");
    kernel.clearMessages();
    ClasspathAddMvnMagicCommand mvnMagicCommand = MagicCommandTypesFactory.getClasspathAddMvnMagicCommand(kernel);
    mvnMagicCommand.addRepo("jcenter", "jcenter");
    //when
    String resetCode = CLASSPATH_RESET;
    ClasspathResetMagicCommand resetMagicCommand = MagicCommandTypesFactory.getClasspathResetMagicCommand(kernel);
    MagicCommand command = new MagicCommand(resetMagicCommand, resetCode);
    Code code = Code.createCode(resetCode, singletonList(command), NO_ERRORS, new Message(new Header(JupyterMessages.COMM_MSG, "session1")));
    code.execute(kernel, 1);
    //then
    List<Message> stderr = EvaluatorResultTestWatcher.getStdouts(kernel.getPublishedMessages());
    String text = (String) stderr.get(0).getContent().get("text");
    assertThat(text).contains("Reset done");
    boolean cache = Files.exists(Paths.get(mvnMagicCommand.getCommandParams().getPathToCache()));
    Assert.assertFalse(cache);
    boolean jars = Files.exists(Paths.get(mvnMagicCommand.getCommandParams().getPathToNotebookJars()));
    Assert.assertFalse(jars);
    Assert.assertTrue(mvnMagicCommand.getRepos().get().isEmpty());
  }

  @Test
  public void wrongCommandFormat() {
    //given
    String allCode = CLASSPATH_ADD_MVN + " com.google.code.XXXX gson";
    MagicCommand command = new MagicCommand(new ClasspathAddMvnMagicCommand(kernel.mavenResolverParam, kernel), allCode);
    Code code = Code.createCode(allCode, singletonList(command), NO_ERRORS, new Message(new Header(JupyterMessages.COMM_MSG, "session1")));
    //when
    code.execute(kernel, 1);
    //then
    List<Message> stderr = EvaluatorResultTestWatcher.getStderr(kernel.getPublishedMessages());
    String text = (String) stderr.get(0).getContent().get("text");
    assertThat(text).contains(ADD_MVN_FORMAT_ERROR_MESSAGE + "\n");
  }

  private void handleClasspathAddMvnDep(String allCode, String expected) throws Exception {
    MagicCommand command = new MagicCommand(new ClasspathAddMvnMagicCommand(kernel.mavenResolverParam, kernel), allCode);
    Code code = Code.createCode(allCode, singletonList(command), NO_ERRORS, new Message(new Header(JupyterMessages.COMM_MSG, "session1")));
    //when
    code.execute(kernel, 1);
    //then
    Optional<Message> updateMessage = EvaluatorResultTestWatcher.waitForUpdateMessage(kernel);
    String text = (String) TestWidgetUtils.getState(updateMessage.get()).get("value");
    assertThat(text).contains(expected);
    String mvnDir = kernel.getTempFolder().toString() + MavenJarResolver.MVN_DIR;
    Stream<Path> paths = Files.walk(Paths.get(mvnDir));
    Optional<Path> dep = paths.filter(file -> (file.getFileName().toFile().getName().contains("gson") ||
            file.getFileName().toFile().getName().contains("slf4j"))).findFirst();
    assertThat(dep).isPresent();
    assertThat(kernel.getClasspath().get(0)).contains(mvnDir);
    dep.ifPresent(path -> {
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
