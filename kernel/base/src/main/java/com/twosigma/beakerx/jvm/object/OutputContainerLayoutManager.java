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

import com.twosigma.beakerx.SerializeToString;
import com.twosigma.beakerx.widgets.Widget;
import com.twosigma.beakerx.widgets.strings.HTML;

import java.util.List;
import java.util.stream.Collectors;

public abstract class OutputContainerLayoutManager {

  private boolean borderDisplayed;

  public boolean isBorderDisplayed() {
    return borderDisplayed;
  }

  public void setBorderDisplayed(boolean borderDisplayed) {
    this.borderDisplayed = borderDisplayed;
  }

  public abstract void display(OutputContainer container);

  protected List<Widget> getWidgets(OutputContainer container) {
    return container.getItems().stream().map(x -> toWidget(x)).collect(Collectors.toList());
  }

  private Widget toWidget(Object item) {
    Widget widget = SerializeToString.getTableDisplay(item);
    if (widget == null && item instanceof Widget) {
      widget = (Widget) item;
    } else if (widget == null) {
      HTML label = new HTML();
      label.setValue(item.toString());
      widget = label;
    }
    return widget;
  }
}
