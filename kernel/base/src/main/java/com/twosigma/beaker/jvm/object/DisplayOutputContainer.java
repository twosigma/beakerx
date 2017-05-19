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
package com.twosigma.beaker.jvm.object;

import com.twosigma.beaker.SerializeToString;
import com.twosigma.beaker.widgets.CommFunctionality;
import com.twosigma.beaker.widgets.Widget;
import com.twosigma.beaker.widgets.box.HBox;
import com.twosigma.beaker.widgets.box.VBox;
import com.twosigma.beaker.widgets.selectioncontainer.Tab;
import com.twosigma.beaker.widgets.strings.Label;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class DisplayOutputContainer {

  public static void display(OutputContainer container) {
    if (container.getLayoutManager() instanceof TabbedOutputContainerLayoutManager) {
      List<Widget> items = getCommFunctionalities(container);
      Tab tab = new Tab(items, container.getLabels());
      tab.display();
    } else if (container.getLayoutManager() instanceof GridOutputContainerLayoutManager) {

      GridOutputContainerLayoutManager layout = (GridOutputContainerLayoutManager) container.getLayoutManager();
      int columns = layout.getColumns();

      List<Widget> items = getCommFunctionalities(container);
      List<Widget> rows = new ArrayList<>();

      for (int i = 0; i < items.size(); i = i + columns) {
        List<Widget> rowItems = new ArrayList<>();
        for (int c = i; c < i + columns; c++) {
          if (c < items.size()) {
            rowItems.add(items.get(c));
          } else {
            rowItems.add(new Label());
          }
        }
        rows.add(new HBox(rowItems));
      }
      VBox vBox = new VBox(rows);
      vBox.display();
    } else {
      container.getItems().forEach(item -> toCommFunctionality(item).display());
    }
  }

  private static List<Widget> getCommFunctionalities(OutputContainer container) {
    return container.getItems().stream().map(x -> toCommFunctionality(x)).collect(Collectors.toList());
  }


  private static Widget toCommFunctionality(Object item) {
    Widget widget = SerializeToString.getTableDisplay(item);
    if (widget == null && item instanceof Widget) {
      widget = (Widget) item;
    } else if (widget == null) {
      Label label = new Label();
      label.setValue(item.toString());
      widget = label;
    }
    return widget;
  }

}
