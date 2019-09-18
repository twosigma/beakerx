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

import com.twosigma.beakerx.table.TableDisplay;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import static java.util.Arrays.asList;

public class PreviewTableDisplay {

  public static final String PREVIEW = "Preview";
  public static int ROWS = 10;
  private final List<Widget> previewContent;
  private Output panel;
  private Collection<Map<String, Object>> preview;
  private Rows allRows;

  public PreviewTableDisplay(Collection<Map<String, Object>> previewRows, Rows allRows, Button button) {
    this.allRows = allRows;
    this.preview = previewRows;
    this.previewContent = asList(configureShowRowsButton(button), new TableDisplay(this.preview));
    this.panel = new Output();
    this.panel.display();
  }

  public PreviewTableDisplay(Collection<Map<String, Object>> previewRows, Rows allRows) {
    this(previewRows, allRows, new Button());
  }

  private Button configureShowRowsButton(Button button) {
    button.setDescription(PREVIEW + " " + ROWS + " Rows");
    button.registerOnClick((content, message) -> {
      TableDisplay tableDisplay = new TableDisplay(allRows.get(ROWS + 1));
      tableDisplay.ROWS_LIMIT = ROWS;
      tableDisplay.ROW_LIMIT_TO_INDEX = ROWS;
      tableDisplay.setRowLimitMsg(String.format("Note: materializing a %s row preview of a Spark RDD", ROWS));
      panel.clearOutput();
      panel.display(tableDisplay);
    });
    return button;
  }

  public void display() {
    this.panel.displayWidgets(previewContent);
  }

  public interface Rows {
    Map<String, Object>[] get(int rows);
  }
}