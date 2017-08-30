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
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.stream.Stream;

import static com.twosigma.beakerx.kernel.commands.ClasspathAddMvnDepsMagicCommandTest.TestRunner.runIfInternetAvailable;
import static com.twosigma.beakerx.kernel.commands.MagicCommand.ADD_MVN_FORMAT_ERROR_MESSAGE;
import static com.twosigma.beakerx.kernel.msg.MessageCreator.TEXT;
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
    runIfInternetAvailable(() -> {
      //given
      String codeAsString = "%classpath add mvn com.fasterxml.jackson.core jackson-databind 2.6.5";
      Code code = new Code(codeAsString);
      //when
      MagicCommandResult process = sut.process(code, new Message(), 1);
      //then
      String mvnDir = kernel.getTempFolder().toString() + MagicCommand.MVN_DIR;
      Stream<Path> paths = Files.walk(Paths.get(mvnDir));
      Optional<Path> dep = paths.filter(file -> file.getFileName().toFile().getName().contains("jackson-databind")).findFirst();
      assertThat(dep).isPresent();
      assertThat(kernel.getClasspath().get(0)).contains(mvnDir);
      assertThat(getText(process)).contains("jackson-databind.jar");
    });
  }

  @Test
  public void unresolvedDependency() throws Exception {
    runIfInternetAvailable(() -> {
      //given
      String codeAsString = "%classpath add mvn com.fasterxml.jackson.core1 jackson-databind 2.6.5";
      Code code = new Code(codeAsString);
      //when
      MagicCommandResult process = sut.process(code, new Message(), 1);
      //then
      String text = getText(process);
      assertThat(text).contains("unresolved dependency");
    });
  }

  @Test
  public void wrongCommandFormat() throws Exception {
    runIfInternetAvailable(() -> {
      //given
      String codeAsString = "%classpath add mvn com.fasterxml.jackson.core1 jackson-databind";
      Code code = new Code(codeAsString);
      //when
      MagicCommandResult process = sut.process(code, new Message(), 1);
      //then
      String text = getText(process);
      assertThat(text).isEqualTo(ADD_MVN_FORMAT_ERROR_MESSAGE);
    });
  }

  private String getText(MagicCommandResult process) {
    MagicCommandItem magicCommandItem = process.getItems().get(0);
    Message message = magicCommandItem.getResult().get();
    return (String) message.getContent().get(TEXT);
  }

  public static class TestRunner {
    static Logger logger = LoggerFactory.getLogger(TestRunner.class.getName());

    public static void runIfInternetAvailable(TestFactory testFactory) throws IOException {
      if (isInternetAvailable()) {
        testFactory.run();
      } else {
        logger.warn("Internet not available");
      }
    }

    public interface TestFactory {
      void run() throws IOException;
    }

    private static boolean isInternetAvailable() {
      try {
        final URL url = new URL("https://repo1.maven.org/");
        final URLConnection conn = url.openConnection();
        conn.connect();
        return true;
      } catch (Exception e) {
        return false;
      }
    }
  }
}
