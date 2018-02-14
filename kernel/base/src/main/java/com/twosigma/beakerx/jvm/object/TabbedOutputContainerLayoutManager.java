/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.jvm.object;

import com.twosigma.beakerx.widget.Widget;
import com.twosigma.beakerx.widget.selectioncontainer.Tab;

import java.util.List;

public class TabbedOutputContainerLayoutManager extends OutputContainerLayoutManager {

  @Override
  public void display(OutputContainer container) {
    List<Widget> items = getWidgets(container);
    Tab tab = new Tab(items, container.getLabels());
    tab.display();
  }
}
