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

import com.twosigma.beakerx.kernel.commands.MavenInvocationSilentOutputHandler;
import com.twosigma.beakerx.kernel.commands.MavenJarResolverSilentLogger;
import com.twosigma.beakerx.kernel.magic.command.functionality.MvnDownloadLoggerWidget;
import com.twosigma.beakerx.kernel.magic.command.functionality.MvnLogsWidget;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.util.Preconditions;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.maven.shared.invoker.DefaultInvocationRequest;
import org.apache.maven.shared.invoker.DefaultInvoker;
import org.apache.maven.shared.invoker.InvocationRequest;
import org.apache.maven.shared.invoker.InvocationResult;
import org.apache.maven.shared.invoker.Invoker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.Collections.singletonList;

public class MavenJarResolver {

  public static final String MVN_DIR = File.separator + "mvnJars";
  public static final String POM_XML = "PomTemplateMagicCommand.xml";
  public static final String GOAL = "validate";
  public static final String MAVEN_BUILT_CLASSPATH_FILE_NAME = "mavenclasspathfilename.txt";

  private static final Logger logger = LoggerFactory.getLogger(MavenJarResolver.class);

  private final String pathToMavenRepo;
  private ResolverParams commandParams;
  private String mavenLocation;
  private PomFactory pomFactory;
  private MvnLogsWidget logs;

  public MavenJarResolver(final ResolverParams commandParams,
                          PomFactory pomFactory) {
    this.commandParams = Preconditions.checkNotNull(commandParams);
    this.pathToMavenRepo = getOrCreateFile(commandParams.getPathToNotebookJars()).getAbsolutePath();
    this.pomFactory = pomFactory;
  }


  public AddMvnCommandResult retrieve(PomStyleDependencies dependencies, Message parent) {
    String pomAsString = pomFactory.createPom(new PomFactory.Params(pathToMavenRepo, commandParams.getRepos(), GOAL, MAVEN_BUILT_CLASSPATH_FILE_NAME), dependencies);
    return retrieveDeps(dependencies.asString(), parent, pomAsString);
  }

  public AddMvnCommandResult retrieve(Dependency dependency, Message parent) {
    List<Dependency> dependencies = singletonList(dependency);
    return retrieve(dependencies, parent);
  }

  public AddMvnCommandResult retrieve(List<Dependency> dependencies, Message parent) {
    String pomAsString = pomFactory.createPom(new PomFactory.Params(pathToMavenRepo, commandParams.getRepos(), GOAL, MAVEN_BUILT_CLASSPATH_FILE_NAME), dependencies);
    String deps = dependencies.stream().map(Dependency::toString).collect(Collectors.joining());
    return retrieveDeps(deps, parent, pomAsString);
  }

  private AddMvnCommandResult retrieveDeps(String dependencies, Message parent, String pomAsString) {
    File finalPom = null;
    try {
      finalPom = saveToFile(commandParams.getPathToNotebookJars(), pomAsString);
      InvocationRequest request = createInvocationRequest(finalPom);
      MvnDownloadLoggerWidget progress = new MvnDownloadLoggerWidget(parent);
      this.logs = manageOutput(this.logs, parent);
      MavenInvocationSilentOutputHandler outputHandler = new MavenInvocationSilentOutputHandler(progress, this.logs);
      Invoker invoker = getInvoker(outputHandler);
      progress.display();
      InvocationResult invocationResult = invoker.execute(request);
      progress.close();
      this.logs.stop();
      return getResult(invocationResult, dependencies);
    } catch (Exception e) {
      return AddMvnCommandResult.error(e.getMessage());
    } finally {
      deletePomFolder(finalPom);
    }
  }

  private MvnLogsWidget manageOutput(MvnLogsWidget output, Message parent) {
    if (output != null) {
      output.close();
    }
    MvnLogsWidget newInstance = new MvnLogsWidget(parent);
    if (BxMavenManager.isLogsOn()) {
      newInstance.display();
    }
    return newInstance;
  }

  private File saveToFile(String pathToNotebookJars, String pomAsString)
          throws IOException {
    File finalPom = new File(pathToNotebookJars + "/poms/pom-" + UUID.randomUUID() + "-" + "xml");

    FileUtils.writeStringToFile(finalPom, pomAsString, StandardCharsets.UTF_8);
    return finalPom;
  }

  private Invoker getInvoker(MavenInvocationSilentOutputHandler mavenInvocationSilentOutputHandler) {
    Invoker invoker = new DefaultInvoker();
    String mvn = findMvn();
    System.setProperty("maven.home", mvn);
    invoker.setLogger(new MavenJarResolverSilentLogger());
    invoker.setOutputHandler(mavenInvocationSilentOutputHandler);
    invoker.setLocalRepositoryDirectory(getOrCreateFile(this.commandParams.getPathToCache()));
    return invoker;
  }

  public String findMvn() {
    if (mavenLocation == null) {

      if (System.getenv("M2_HOME") != null) {
        mavenLocation = System.getenv("M2_HOME") + "/bin/mvn";
        return mavenLocation;
      }

      for (String dirname : System.getenv("PATH").split(File.pathSeparator)) {
        File file = new File(dirname, "mvn");
        if (file.isFile() && file.canExecute()) {
          mavenLocation = file.getAbsolutePath();
          return mavenLocation;
        }
      }
      throw new RuntimeException("No mvn found, please install mvn by 'conda install maven' or setup M2_HOME");
    }
    return mavenLocation;
  }

  private AddMvnCommandResult getResult(InvocationResult invocationResult, String dependencies) {
    if (invocationResult.getExitCode() != 0) {
      if (invocationResult.getExecutionException() != null) {
        return AddMvnCommandResult.error(invocationResult.getExecutionException().getMessage());
      }
      StringBuilder errorMsgBuilder = new StringBuilder("Could not resolve dependencies for:");
      errorMsgBuilder
              .append("\n")
              .append(dependencies);
      return AddMvnCommandResult.error(errorMsgBuilder.toString());
    }

    return AddMvnCommandResult.success(transformFromMavenRepoToKernelRepo(mavenBuildClasspath(), jarsFromRepo()));
  }

  private List<String> transformFromMavenRepoToKernelRepo(List<String> jarNamesFromBuildClasspath, Map<String, Path> jarNames) {
    List<String> result = new ArrayList<>();
    jarNamesFromBuildClasspath.forEach(jarName -> {
      if (jarNames.get(jarName) != null) {
        result.add(jarNames.get(jarName).toAbsolutePath().toString());
      }
    });
    return result;
  }

  private Map<String, Path> jarsFromRepo() {
    try {
      List<Path> collect = Files.list(Paths.get(pathToMavenRepo)).collect(Collectors.toList());
      return collect.stream().collect(Collectors.toMap(x -> x.getFileName().toString(), x -> x));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  private List<String> mavenBuildClasspath() {
    String jarPathsAsString = null;
    try {
      File fileToClasspath = new File(pathToMavenRepo, MAVEN_BUILT_CLASSPATH_FILE_NAME);
      InputStream fileInputStream = new FileInputStream(fileToClasspath);
      jarPathsAsString = IOUtils.toString(fileInputStream, StandardCharsets.UTF_8);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    Stream<String> stream = Arrays.stream(jarPathsAsString.split(File.pathSeparator));
    return stream.map(x -> Paths.get(x).getFileName().toString()).collect(Collectors.toList());
  }

  private InvocationRequest createInvocationRequest(File finalPom) {
    InvocationRequest request = new DefaultInvocationRequest();
    request.setGoals(singletonList(GOAL));
    request.setOffline(commandParams.getOffline());
    request.setPomFile(finalPom);
    request.setUpdateSnapshots(true);
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

  public String getPathToMavenRepo() {
    return pathToMavenRepo;
  }

  public static class Dependency {

    static final String DEFAULT_TYPE = "jar";

    private String groupId;
    private String artifactId;
    private String version;
    private String type = DEFAULT_TYPE;
    private Optional<String> classifier = Optional.empty();

    private Dependency(String groupId, String artifactId, String version) {
      this.groupId = groupId;
      this.artifactId = artifactId;
      this.version = version;
    }

    public static Dependency create(List<String> args) {
      Dependency dependency = new Dependency(args.get(0), args.get(1), args.get(2));
      if (args.size() > 3) {
        dependency.type = args.get(3);
      }
      if (args.size() > 4) {
        dependency.classifier = Optional.of(args.get(4));
      }
      return dependency;
    }

    public String getGroupId() {
      return groupId;
    }

    public String getArtifactId() {
      return artifactId;
    }

    public String getVersion() {
      return version;
    }

    public String getType() {
      return type;
    }

    public Optional<String> getClassifier() {
      return classifier;
    }

    @Override
    public String toString() {
      return groupId + " : "
              + artifactId + " : "
              + version + " : "
              + type;
    }
  }


  public static class AddMvnCommandResult {

    private boolean jarRetrieved;
    private String errorMessage;
    private List<String> addedJarsPaths;

    private AddMvnCommandResult(boolean retrieved, String errorMessage, List<String> addedJarsPaths) {
      this.jarRetrieved = retrieved;
      this.errorMessage = errorMessage;
      this.addedJarsPaths = addedJarsPaths;
    }

    public boolean isJarRetrieved() {
      return jarRetrieved;
    }

    public String getErrorMessage() {
      return errorMessage;
    }

    public static AddMvnCommandResult success(List<String> addedJarsPaths) {
      return new AddMvnCommandResult(true, "", addedJarsPaths);
    }

    public static AddMvnCommandResult error(String msg) {
      return new AddMvnCommandResult(false, msg, new ArrayList<>());
    }

    public List<String> getAddedJarPaths() {
      return addedJarsPaths;
    }
  }

  public static class ResolverParams {

    private String pathToCache;
    private String pathToNotebookJars;
    private boolean offline = false;
    private Map<String, String> repos = Collections.emptyMap();

    public ResolverParams(String pathToCache, String pathToNotebookJars, boolean offline) {
      this.pathToCache = Preconditions.checkNotNull(pathToCache);
      this.pathToNotebookJars = Preconditions.checkNotNull(pathToNotebookJars);
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

    public Map<String, String> getRepos() {
      return repos;
    }

    public void setRepos(Map<String, String> repos) {
      this.repos = repos;
    }

  }

  private File getOrCreateFile(String pathToMavenRepo) {
    File theDir = new File(pathToMavenRepo);
    if (!theDir.exists()) {
      try {
        theDir.mkdirs();
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
    }
    return theDir;
  }

  public interface RetriveDeps {
    AddMvnCommandResult getDeps(MavenJarResolver mavenJarResolver);
  }
}
