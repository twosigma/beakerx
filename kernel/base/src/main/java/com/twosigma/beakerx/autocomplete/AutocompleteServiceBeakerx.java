/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.autocomplete;

import com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils;
import org.jetbrains.annotations.NotNull;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.twosigma.beakerx.util.Preconditions.checkNotNull;
import static java.util.Arrays.asList;

public abstract class AutocompleteServiceBeakerx implements AutocompleteService {

  private static final String LAST_SPACE = " ";
  private MagicCommandAutocompletePatterns magicPatterns;

  public AutocompleteServiceBeakerx(MagicCommandAutocompletePatterns magicCommandAutocompletePatterns) {
    this.magicPatterns = checkNotNull(magicCommandAutocompletePatterns);
  }

  @Override
  public AutocompleteResult find(String txt, int cur) {
    String expression = txt.substring(0, cur);
    LinkedList<String> parts = new LinkedList<>(asList(MagicCommandUtils.splitPath(expression)));
    Optional<AutocompleteResult> result;
    if (expression.endsWith(LAST_SPACE)) {
      result = findNextWord(txt, parts, cur);
    } else {
      result = matchToTheWord(txt, parts, expression);
    }
    return result.orElseGet(() -> doAutocomplete(txt, cur));
  }

  private Optional<AutocompleteResult> findNextWord(String text, LinkedList<String> parts, int cur) {
    String first = parts.removeFirst();
    Optional<AutocompleteNode> node = magicPatterns.get(first);
    return node.flatMap(x -> x.findNextWord(text, parts));
  }

  private Optional<AutocompleteResult> matchToTheWord(String text, LinkedList<String> parts, String txt) {
    if (parts.size() == 1) {
      List<AutocompleteNode> collect = findMatches(magicPatterns.values(), txt);
      if (collect.isEmpty()) {
        return Optional.empty();
      }
      return Optional.of(new AutocompleteResult(collect.stream().map(AutocompleteNode::getName).collect(Collectors.toList()), 0));
    } else if (parts.size() > 1) {
      String last = parts.removeLast();
      String first = parts.removeFirst();
      Optional<AutocompleteNode> node = magicPatterns.get(first);
      return node.flatMap(x -> x.matchToTheWord(text, parts, last));
    }
    return Optional.empty();
  }

  @NotNull
  private List<AutocompleteNode> findMatches(Collection<AutocompleteNode> nodes, String txt) {
    return nodes.stream()
            .filter(x -> x.getName().startsWith(txt))
            .filter(x -> !x.getName().equals(txt))
            .collect(Collectors.toList());
  }

  protected abstract AutocompleteResult doAutocomplete(String txt, int cur);

}
