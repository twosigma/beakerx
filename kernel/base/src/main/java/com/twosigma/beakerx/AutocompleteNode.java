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
package com.twosigma.beakerx;

import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

public abstract class AutocompleteNode {

  public static final List<AutocompleteNode> NO_CHILDREN = Arrays.asList();
  private String name;
  private List<AutocompleteNode> children;

  public AutocompleteNode(String name, List<AutocompleteNode> children) {
    this.name = name;
    this.children = children;
  }

  public String getName() {
    return name;
  }

  public Collection<AutocompleteNode> getChildren() {
    return children;
  }

  public abstract List<String> matchToTheWord(LinkedList<String> parts, String last);

  public abstract List<String> findNextWord(LinkedList<String> parts);
}
