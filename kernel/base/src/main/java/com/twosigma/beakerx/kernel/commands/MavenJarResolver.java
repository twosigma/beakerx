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

import com.google.common.io.Resources;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.maven.shared.invoker.DefaultInvocationRequest;
import org.apache.maven.shared.invoker.DefaultInvoker;
import org.apache.maven.shared.invoker.InvocationRequest;
import org.apache.maven.shared.invoker.InvocationResult;
import org.apache.maven.shared.invoker.Invoker;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static com.google.common.base.Preconditions.checkNotNull;

public class MavenJarResolver {

  public static final String MVN_DIR = File.separator + "mvnJars";
  public static final String POM_XML = "PomTemplateMagicCommand.xml";
  public static final List<String> GOALS = Arrays.asList("validate");

  private final String pathToMavenRepo;
  private ResolverParams commandParams;
  private File mavenLocation;

  public MavenJarResolver(final ResolverParams commandParams) {
    this.commandParams = checkNotNull(commandParams);
    this.pathToMavenRepo = getOrCreateFile(commandParams.getPathToNotebookJars()).getAbsolutePath();
  }

  public AddMvnCommandResult retrieve(String groupId, String artifactId, String version) {
    File finalPom = null;
    try {
      finalPom = getPom(groupId, artifactId, version);
      InvocationRequest request = createInvocationRequest();
      request.setOffline(commandParams.getOffline());
      request.setPomFile(finalPom);
      Invoker invoker = getInvoker();
      InvocationResult invocationResult = invoker.execute(request);
      return getResult(invocationResult, groupId, artifactId, version);
    } catch (Exception e) {
      return AddMvnCommandResult.error(e.getMessage());
    } finally {
      deletePomFolder(finalPom);
    }
  }

  private Invoker getInvoker() {
    Invoker invoker = new DefaultInvoker();
    invoker.setMavenHome(mavenLocation());
    invoker.setLogger(new MavenJarResolverSilentLogger());
    invoker.setOutputHandler(new MavenInvocationSilentOutputHandler());
    invoker.setLocalRepositoryDirectory(getOrCreateFile(this.commandParams.getPathToCache()));
    return invoker;
  }

  private File mavenLocation() {
    if (mavenLocation == null) {
      try {
        URL url = Resources.getResource("mvnLocation.txt");
        if(url==null){
          throw new RuntimeException("Cannot find maven location file.");
        }
        String mvnName = Resources.toString(url, StandardCharsets.UTF_8);
        mavenLocation = new File(mvnName);
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
    }
    return mavenLocation;
  }

  private AddMvnCommandResult getResult(InvocationResult invocationResult, String groupId, String artifactId, String version) {
    if (invocationResult.getExitCode() != 0) {
      if (invocationResult.getExecutionException() != null) {
        return AddMvnCommandResult.error(invocationResult.getExecutionException().getMessage());
      }
      return AddMvnCommandResult.error("Could not resolve dependencies for: " + groupId + " : " + artifactId + " : " + version);
    }
    return AddMvnCommandResult.SUCCESS;
  }

  private InvocationRequest createInvocationRequest() {
    InvocationRequest request = new DefaultInvocationRequest();
    request.setGoals(GOALS);
    return request;
  }

  private void deletePomFolder(File finalPom) {
    if (finalPom != null) {
      File parentFile = new File(finalPom.getParent());
      try {
        FileUtils.deleteDirectory(parentFile);
      } catch (IOException e) {
      }
    }
  }

  private File getPom(String groupId, String artifactId, String version) throws IOException {
    InputStream pom = getClass().getClassLoader().getResourceAsStream(POM_XML);
    String pomAsString = IOUtils.toString(pom, StandardCharsets.UTF_8);
    pomAsString = configureOutputDir(pomAsString);
    pomAsString = configureDependencies(groupId, artifactId, version, pomAsString);
    File finalPom = new File(this.commandParams.getPathToNotebookJars() + "/poms/pom-" + UUID.randomUUID() + "-" + groupId + artifactId + version + "xml");
    FileUtils.writeStringToFile(finalPom, pomAsString, StandardCharsets.UTF_8);
    return finalPom;
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

  private String configureOutputDir(String pomAsString) {
    String absolutePath = new File(this.getPathToMavenRepo()).getAbsolutePath();
    return pomAsString.replace(
            "<outputDirectory>pathToNotebookJars</outputDirectory>",
            "<outputDirectory>" + absolutePath + "</outputDirectory>");
  }

  public String getPathToMavenRepo() {
    return pathToMavenRepo;
  }

  public static class AddMvnCommandResult {

    public static final AddMvnCommandResult SUCCESS = new AddMvnCommandResult(true, "");

    private boolean jarRetrieved;
    private String errorMessage;

    private AddMvnCommandResult(boolean retrieved, String errorMessage) {
      this.jarRetrieved = retrieved;
      this.errorMessage = errorMessage;
    }

    public boolean isJarRetrieved() {
      return jarRetrieved;
    }

    public String getErrorMessage() {
      return errorMessage;
    }

    public static AddMvnCommandResult success() {
      return SUCCESS;
    }

    public static AddMvnCommandResult error(String msg) {
      return new AddMvnCommandResult(false, msg);
    }
  }

  public static class ResolverParams {

    private String pathToCache;
    private String pathToNotebookJars;
    private boolean offline = false;

    public ResolverParams(String pathToCache, String pathToNotebookJars, boolean offline) {
      this.pathToCache = checkNotNull(pathToCache);
      this.pathToNotebookJars = checkNotNull(pathToNotebookJars);
      this.offline = offline;
    }

    public ResolverParams(String pathToCache, String pathToNotebookJars) {
      this(pathToCache, pathToNotebookJars, false);
    }

    public String getPathToCache() {
      return pathToCache;
    }

    public String getPathToNotebookJars() {
      return pathToNotebookJars;
    }

    public boolean getOffline() {
      return offline;
    }
  }

  private File getOrCreateFile(String pathToMavenRepo) {
    File theDir = new File(pathToMavenRepo);
    if (!theDir.exists()) {
      try {
        theDir.mkdir();
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
    }
    return theDir;
  }
}
