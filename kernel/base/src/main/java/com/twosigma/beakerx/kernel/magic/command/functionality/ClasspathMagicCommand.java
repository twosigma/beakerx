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
package com.twosigma.beakerx.kernel.magic.command.functionality;

import com.google.common.collect.Lists;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;
import static java.util.Collections.singletonList;

public abstract class ClasspathMagicCommand implements MagicCommandFunctionality {

  public static final String CLASSPATH = "%classpath";

  protected KernelFunctionality kernel;

  public ClasspathMagicCommand(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  public Collection<String> addJars(String path) {
    if (doesPathContainsWildCards(path)) {
      return handleWildCards(path);
    } else {
      return handlePath(path);
    }
  }

  public MagicCommandOutput handleAddedJars(String path){
    Collection<String> newAddedJars = addJars(path);
    Collection<String> conflicts = searchForConflicts(newAddedJars);
    if (newAddedJars.isEmpty()) {
      return new MagicCommandOutput(MagicCommandOutput.Status.OK);
    }
    String textMessage = "Added jar" + (newAddedJars.size() > 1 ? "s: " : ": ") + newAddedJars;
    MagicCommandOutput.Status status = MagicCommandOutcomeItem.Status.OK;
    if (!conflicts.isEmpty()){
      textMessage += "\n\n" + "Dependency conflict"  + (conflicts.size() > 1 ? "s: " : ": ") + conflicts;
      status = MagicCommandOutcomeItem.Status.ERROR;
    }
    return new MagicCommandOutput(status, textMessage);
  }

  public List<String> searchForConflicts(Collection<String> newAddedJars){
    return kernel.getClasspath().getPathsAsStrings().stream()
            .map(this::getFilenameFromPath)
            .map(d -> checkIfDepExist(d, newAddedJars))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .collect(Collectors.toList());
  }

  public String getFilenameFromPath(String path){
    String[] parts = path.split("/");
    return parts[parts.length-1];
  }

  public Optional<String> checkIfDepExist(String dependency, Collection<String> addedJars){
    Pattern pattern = Pattern.compile("(.*)\\-(\\d[\\.\\d]*[\\.\\-[\\S]*]+)");
    Matcher depMatcher = pattern.matcher(dependency);
    if (!depMatcher.find()){
      return Optional.empty();
    }
    String depName = depMatcher.group(1);
    String depVersion = depMatcher.group(2);
    return addedJars.stream()
            .map(pattern::matcher)
            .filter(m -> m.find()
                    && m.group(1).equals(depName)
                    && !m.group(2).equals(depVersion))
            .map(m -> m.group(0))
            .findFirst();
  }

  private Collection<String> handlePath(String path) {
    List<String> addedJarsName = Lists.newLinkedList();
    Path currentPath = Paths.get(path);
    List<Path> paths = this.kernel.addJarsToClasspath(singletonList(new PathToJar(path)));
    if (!paths.isEmpty()) {
      addedJarsName.add(currentPath.getFileName().toString());
    }
    return addedJarsName;
  }

  private List<String> handleWildCards(String path) {
    List<String> addedJarsName = Lists.newLinkedList();
    Map<Path, String> paths = getPaths(path);
    List<PathToJar> pathsToJars = paths.keySet().stream()
            .map(currentPath -> new PathToJar(currentPath.toString()))
            .collect(Collectors.toList());

    List<Path> addedPaths = kernel.addJarsToClasspath(pathsToJars);
    addedJarsName.addAll(addedPaths.stream().map(x -> x.getFileName().toString()).collect(Collectors.toList()));
    return addedJarsName;
  }

  private Map<Path, String> getPaths(String pathWithWildcard) {
    String pathWithoutWildcards = pathWithWildcard.replace("*", "");
    try {

      return Files.list(Paths.get(pathWithoutWildcards))
              .filter(path -> path.toString().toLowerCase().endsWith(".jar"))
              .collect(Collectors.toMap(p -> p, o -> o.getFileName().toString()));

    } catch (IOException e) {
      throw new IllegalStateException("Cannot create any jars files in selected path");
    }
  }

  private Boolean doesPathContainsWildCards(String path) {
    return path.contains("*");
  }

  private Boolean containsSingleWildcardSymbol(String path) {
    return path.length() - path.replace("*", "").length() == 1;
  }

  protected ErrorData isValidPath(String path) {
    boolean isEmpty = checkNotNull(path).isEmpty();
    if (isEmpty) {
      return new ErrorData(true, "Please provide a path");
    }

    if (doesPathContainsWildCards(path)) {
      if (!containsSingleWildcardSymbol(path) || !path.endsWith("*")) {
        return new ErrorData(true, "Bad classpath wildcard syntax, path can only end with *");
      } else if (!Paths.get(path.replace("*", "")).toFile().exists()) {
        return new ErrorData(true, "Bad classpath, directory cannot be create");
      }
    } else if (!Paths.get(path).toFile().exists()) {
      return new ErrorData(true, "Bad classpath, file not found");
    }

    return new ErrorData(false, "");
  }
}
