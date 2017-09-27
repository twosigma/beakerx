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
package com.twosigma.beakerx.widgets.selections;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public abstract class MultipleSelectionWidget extends SelectionWidget<String[]> {

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(VALUE, this.value);
    return content;
  }

  @Override
  public String[] getValueFromObject(Object input) {
    Collection<Integer> indexes = indexes(input);
    List<String> collect = indexes.stream().map(x -> getOptions()[x]).collect(Collectors.toList());
    return collect.toArray(new String[collect.size()]);
  }

  private Collection<Integer> indexes(Object input) {
    return getIntegerArray(input);
  }

}