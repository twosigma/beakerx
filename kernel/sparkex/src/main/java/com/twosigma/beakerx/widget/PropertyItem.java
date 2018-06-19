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
package com.twosigma.beakerx.widget;

import static com.twosigma.beakerx.util.Preconditions.checkNotNull;
import static java.util.Arrays.asList;

public class PropertyItem extends HBox {

  private Text name;
  private Text value;
  private Button remove;

  public PropertyItem(Text name, Text value, Button remove) {
    super(asList(checkNotNull(name), checkNotNull(value), checkNotNull(remove)));
    this.name = name;
    this.value = value;
    this.remove = remove;
  }

  public String getNameAsString() {
    return name.getValue();
  }

  public String getValueAsString() {
    return value.getValue();
  }

  public void disable() {
    name.setDisabled(true);
    value.setDisabled(true);
    remove.setDisabled(true);
  }

  public void enable() {
    name.setDisabled(false);
    value.setDisabled(false);
    remove.setDisabled(false);
  }
}
