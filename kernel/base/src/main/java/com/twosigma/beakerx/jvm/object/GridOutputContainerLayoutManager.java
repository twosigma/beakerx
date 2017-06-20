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

import com.twosigma.beakerx.widgets.Widget;
import com.twosigma.beakerx.widgets.box.GridView;
import com.twosigma.beakerx.widgets.box.HBox;

import java.util.ArrayList;
import java.util.List;

public class GridOutputContainerLayoutManager extends AbstractGridLayoutManager {

  public GridOutputContainerLayoutManager() {
    this(2);
  }

  public GridOutputContainerLayoutManager(int columns) {
    super(columns);
  }

  @Override
  public void display(OutputContainer container) {
    GridOutputContainerLayoutManager layout = (GridOutputContainerLayoutManager) container.getLayoutManager();
    int columns = layout.getColumns();

    List<Widget> items = getWidgets(container);
    List<Widget> rows = new ArrayList<>();
    for (int itemIndex = 0; itemIndex < items.size(); itemIndex = itemIndex + columns) {
      rows.add(new HBox(createRow(columns, items, itemIndex)));
    }

    GridView gridView = new GridView(rows);
    gridView.display();
  }

  private List<Widget> createRow(int columns, List<Widget> items, int itemIndex) {
    List<Widget> rowItems = new ArrayList<>();
    for (int c = itemIndex; c < itemIndex + columns; c++) {
      if (c < items.size()) {
        rowItems.add(items.get(c));
      }else {
        rowItems.add(emptyItem());
      }
    }
    return rowItems;
  }

  private HBox emptyItem() {
    return new HBox(new ArrayList<>());
  }
}
