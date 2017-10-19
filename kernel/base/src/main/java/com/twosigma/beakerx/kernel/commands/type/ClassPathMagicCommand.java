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
package com.twosigma.beakerx.kernel.commands.type;

import static com.google.common.base.Preconditions.checkNotNull;

import com.google.common.collect.Lists;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.CodeWithoutCommand;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.kernel.commands.ErrorData;
import com.twosigma.beakerx.kernel.commands.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.commands.item.CommandItem;
import com.twosigma.beakerx.kernel.commands.item.CommandItemWithResult;
import com.twosigma.beakerx.kernel.commands.item.CommandItemWithResultAndCode;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.message.Message;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.apache.commons.text.StrMatcher;
import org.apache.commons.text.StrTokenizer;

public abstract class ClassPathMagicCommand extends MagicCommand {

  protected KernelFunctionality kernel;

  public ClassPathMagicCommand(String name, String parameters,
      Set<MagicCommandType> magicCommandTypes,
      MessageCreator messageCreator, KernelFunctionality kernel) {
    super(name, parameters, magicCommandTypes, messageCreator);
    this.kernel = kernel;
  }


  protected CommandItem getMagicCommandItem(Collection<String> newAddedJars, String code, Message message, int executionCount) {
    if (newAddedJars.isEmpty()) {
      return createResultWithCustomMessage("", message, executionCount);
    }

    String textMessage = "Added jar" + (newAddedJars.size() > 1 ? "s: " : ": ") + newAddedJars + "\n";

    return createResultWithCustomMessage(textMessage, message, executionCount);
  }

  protected Collection<String> addJars(String path) {
    List<String> addedJarsName = Lists.newLinkedList();

    if (doesPathContainsWildCards(path)) {
      Map<Path, String> paths = getPaths(path);
      List<PathToJar> pathsToJars = paths.keySet().stream()
          .map(currentPath -> new PathToJar(currentPath.toString()))
          .collect(Collectors.toList());

      List<Path> addedPaths = kernel.addJarsToClasspath(pathsToJars);
      addedJarsName.addAll(addedPaths.stream().map(x -> x.getFileName().toString()).collect(Collectors.toList()));

    } else {
      Path currentPath = Paths.get(path);
      if (this.kernel.addJarToClasspath(new PathToJar(path))) {
        addedJarsName.add(currentPath.getFileName().toString());
      }
    }

    return addedJarsName;
  }

  private Map<Path, String> getPaths(String pathWithWildcard) {
    String pathWithoutWildcards = pathWithWildcard.replace("*", "");
    try {

      return Files.list(Paths.get(pathWithoutWildcards))
          .filter(path -> path.toString().toLowerCase().endsWith(".jar"))
          .collect(Collectors.toMap(p -> p, o -> o.getFileName().toString()));

    } catch (IOException e) {
      throw new IllegalStateException("Cannot find any jars files in selected path");
    }
  }

  protected String[] splitPath(String command) {
    StrTokenizer tokenizer = new StrTokenizer(command, StrMatcher.spaceMatcher(), StrMatcher.quoteMatcher());

    return tokenizer.getTokenArray();
  }

  protected ErrorData isValidPath(String path) {
    boolean isEmpty = checkNotNull(path).isEmpty();
    if (isEmpty) {
      return new ErrorData(true, "Please provide a path\n");
    }

    if (doesPathContainsWildCards(path)) {
      if (!containsSingleWildcardSymbol(path) || !path.endsWith("*")) {
        return new ErrorData(true, "Bad classpath wildcard syntax, path can only end with *\n");
      } else if (!Paths.get(path.replace("*", "")).toFile().exists()) {
        return new ErrorData(true, "Bad classpath, directory cannot be find\n");
      }
    } else if (!Paths.get(path).toFile().exists()) {
      return new ErrorData(true, "Bad classpath, file not found\n");
    }

    return new ErrorData(false, "");
  }

  private Boolean doesPathContainsWildCards(String path) {
    return path.contains("*");
  }

  private Boolean containsSingleWildcardSymbol(String path) {
    return path.length() - path.replace("*", "").length() == 1;
  }
}
