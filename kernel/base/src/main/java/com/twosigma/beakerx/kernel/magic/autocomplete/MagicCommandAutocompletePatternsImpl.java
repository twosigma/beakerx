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
package com.twosigma.beakerx.kernel.magic.autocomplete;

import com.twosigma.beakerx.autocomplete.AutocompleteNode;
import com.twosigma.beakerx.autocomplete.MagicCommandAutocompletePatterns;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathMagicCommand;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.twosigma.beakerx.autocomplete.AutocompleteNode.NO_CHILDREN;
import static com.twosigma.beakerx.kernel.magic.command.functionality.ClassPathAddMvnCellMagicCommand.CLASSPATH_CELL;
import static java.util.Arrays.asList;

public class MagicCommandAutocompletePatternsImpl implements MagicCommandAutocompletePatterns {

  private Map<String, AutocompleteNode> patterns = new HashMap<>();

  public MagicCommandAutocompletePatternsImpl() {
    patterns.put(ClasspathMagicCommand.CLASSPATH,
            new AutocompleteNodeStatic(ClasspathMagicCommand.CLASSPATH,
                    asList(new AutocompleteNodeStatic("add",
                            asList(
                                    new AutocompleteNodeFileSystem("jar", NO_CHILDREN),
                                    new AutocompleteNodeHttpGet("mvn", NO_CHILDREN),
                                    new AutocompleteNodeStatic("dynamic", NO_CHILDREN))))));

    patterns.put(CLASSPATH_CELL,
            new AutocompleteNodeStatic(CLASSPATH_CELL,
                    asList(new AutocompleteNodeStatic("add",
                            asList(
                                    new AutocompleteNodeStatic("mvn", NO_CHILDREN))))));
  }

  @Override
  public Optional<AutocompleteNode> get(String name) {
    AutocompleteNode autocompleteNode = patterns.get(name);
    if (autocompleteNode == null) {
      return Optional.empty();
    }
    return Optional.of(autocompleteNode);
  }

  @Override
  public Collection<AutocompleteNode> values() {
    return patterns.values();
  }
}
