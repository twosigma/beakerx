package com.twosigma.beakerx.kernel.magic.command;

import static com.twosigma.beakerx.kernel.magic.command.MavenJarResolver.POM_XML;

import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver.Dependency;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;
import org.apache.commons.io.IOUtils;

public class PomFactory {

  public String createPom(String pathToMavenRepo, String pathToNotebookJars,
      Dependency dependency, Map<String, String> repos) throws IOException {
    InputStream pom = getClass().getClassLoader().getResourceAsStream(POM_XML);
    String pomAsString = IOUtils.toString(pom, StandardCharsets.UTF_8);
    pomAsString = configureOutputDir(pathToMavenRepo, pomAsString);
    pomAsString = configureDependencies(dependency.getGroupId(), dependency.getArtifactId(), dependency.getVersion(), pomAsString);
    for (Entry<String, String> entry : repos.entrySet()) {
      pomAsString = configureRepos(pomAsString, entry.getKey(), entry.getValue());
    }

    return pomAsString;
  }

  private String configureDependencies(String groupId, String artifactId, String version, String pomAsString) {
    return pomAsString.replace(
        "<dependencies></dependencies>",
        "<dependencies>\n" +
            "  <dependency>\n" +
            "    <groupId>" + groupId + "</groupId>\n" +
            "    <artifactId>" + artifactId + "</artifactId>\n" +
            "    <version>" + version + "</version>\n" +
            "  </dependency>\n" +
            "</dependencies>");
  }

  private String configureOutputDir(String pathToMavenRepo, String pomAsString) {
    String absolutePath = new File(pathToMavenRepo).getAbsolutePath();
    return pomAsString.replace(
        "<outputDirectory>pathToNotebookJars</outputDirectory>",
        "<outputDirectory>" + absolutePath + "</outputDirectory>");
  }

  private String configureRepos(String pomAsString, String name, String url) {
    String repoPattern = "</repository>\n" +
        "  <repository>\n" +
        "    <id>%s</id>\n" +
        "    <url>%s</url>\n" +
        "  </repository>\n" +
        "</repositories>";

    return pomAsString.replace("</repository>\n" +
        "    </repositories>", String.format(repoPattern, name, url));
  }
}
