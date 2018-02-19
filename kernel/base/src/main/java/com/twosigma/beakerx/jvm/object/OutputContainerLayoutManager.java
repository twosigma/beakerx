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
import com.twosigma.beakerx.mimetype.MIMEContainer;
import com.twosigma.beakerx.widget.Widget;
import com.twosigma.beakerx.widget.HTML;
import com.twosigma.beakerx.widget.HTMLPre;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.Optional.empty;
import static java.util.Optional.of;

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
    return container.getItems().stream().
            map(this::toWidget).
            filter(Optional::isPresent).
            map(Optional::get).
            collect(Collectors.toList());
  }

  private Optional<Widget> toWidget(Object item) {
    if (item == null) {
      return handleNull();
    }
    Widget widget = SerializeToString.getTableDisplay(item);
    if (widget != null) {
      return of(widget);
    }
    if (item instanceof Widget) {
      return of((Widget) item);
    }
    if (item instanceof MIMEContainer) {
      return of(createHTML(((MIMEContainer) item).getData().toString()));
    }

    return of(createHTMLPre(item.toString()));
  }

  private Optional<Widget> handleNull() {
    List<MIMEContainer> mimeContainerForNull = SerializeToString.getMimeContainerForNull();
    if (mimeContainerForNull.contains(MIMEContainer.HIDDEN)) {
      return empty();
    }
    return of(createHTMLPre(mimeContainerForNull.get(0).getData().toString()));
  }

  private Widget createHTML(String value) {
    HTML label = new HTML();
    label.setValue(value);
    return label;
  }

  private Widget createHTMLPre(String value) {
    HTMLPre pre = new HTMLPre();
    pre.setValue(value);
    return pre;
  }
}
