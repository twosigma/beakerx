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
package com.twosigma.beakerx.widget.configuration;

import com.twosigma.beakerx.widget.Button;
import com.twosigma.beakerx.widget.Text;

import java.util.ArrayList;

import static java.util.Arrays.asList;

public class PropertyItemFactoryImpl implements PropertyItemFactory {

  public PropertyItem createPropertyItem(Text nameWidget, Text valueWidget, Button remove) {
    nameWidget.setPlaceholder("name");
    nameWidget.setDomClasses(new ArrayList<>(asList("bx-config-name")));
    valueWidget.setPlaceholder("value");
    remove.setDomClasses(new ArrayList<>(asList("bx-button", "icon-close")));
    PropertyItem propertyItem = new PropertyItem(nameWidget, valueWidget, remove);
    return propertyItem;
  }
}
