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
package com.twosigma.beakerx.widget;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.singletonList;

public abstract class MultipleSelectionWidget extends SelectionWidget<String[]> {

  private static final ArrayList<String> DEFAULT = new ArrayList<>(singletonList("0"));

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put(Widget.VALUE, this.value);
    return content;
  }

  @Override
  public String[] getValueFromObject(Object input) {
    List<String> result = DEFAULT;
    if (input instanceof Object[]) {
      result = Arrays.stream((Object[]) input).map(i -> (String) i).collect(Collectors.toList());
    } else if (input instanceof List) {
      result = (List<String>) input;
    } else if (input instanceof String) {
      result = Arrays.asList(input.toString());
    }
    return result.toArray(new String[result.size()]);
  }

  @Override
  public String[] updateValueFromObject(Object input) {
    Collection<Integer> indexes = indexes(input);
    List<String> collect = indexes.stream().map(x -> getOptions()[x]).collect(Collectors.toList());
    return collect.toArray(new String[collect.size()]);
  }

  protected Collection<Integer> indexes(Object input) {
    if (input instanceof Object[]) {
      return Arrays.stream((Object[]) input).map(i -> (Integer) i).collect(Collectors.toList());
    } else if (input instanceof List) {
      return ((List<Integer>) input);
    }
    return new ArrayList<>(singletonList(0));
  }
}