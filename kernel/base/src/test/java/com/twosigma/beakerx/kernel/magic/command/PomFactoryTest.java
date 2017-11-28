package com.twosigma.beakerx.kernel.magic.command;

import static org.hamcrest.CoreMatchers.containsString;
import static org.junit.Assert.assertThat;

import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver.Dependency;
import java.util.Collections;
import java.util.Map;
import org.junit.Test;

public class PomFactoryTest {

  protected static final String EXPECTED_RESULT_BLOCK = "<repositories>\n"
      + "        <repository>\n"
      + "            <id>project-repo</id>\n"
      + "            <url>file://${project.basedir}/build/testMvnCache</url>\n"
      + "        </repository>\n"
      + "  <repository>\n"
      + "    <id>repository.spring.snapshot</id>\n"
      + "    <url>http://repo.spring.io/snapshot</url>\n"
      + "  </repository>\n"
      + "</repositories>";

  @Test
  public void doTest() throws Exception {
    //given
    Map<String, String> repos = Collections.singletonMap("repository.spring.snapshot", "http://repo.spring.io/snapshot");
    PomFactory pomFactory = new PomFactory();
    Dependency dependency = new Dependency("", "", "");

    //when
    String pomAsString = pomFactory.createPom("/", "/", dependency, repos);

    //then
    assertThat(pomAsString, containsString(EXPECTED_RESULT_BLOCK));
  }

}
