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

  public static int ROWS = 1000;
  private VBox panel;
  private Collection<Map<String, Object>> preview;
  private PreviewAllRows previewAllRows;
  private List<Widget> previewContent;
  private List<Widget> rowsContent;

  public PreviewTableDisplay(Collection<Map<String, Object>> previewRows, PreviewAllRows previewAllRows) {
    this.previewAllRows = previewAllRows;
    this.preview = previewRows;
    this.previewContent = asList(createShowRowsButton(), new TableDisplay(this.preview));
    this.panel = new VBox(previewContent);
  }

  private Button createShowRowsButton() {
    Button button = new Button();
    button.setDescription("Show rows");
    button.registerOnClick((content, message) -> {
      if (this.rowsContent == null) {
        this.rowsContent = asList(createHideRowsButton(), new TableDisplay(previewAllRows.get(ROWS)));
      }
      changeContent(this.rowsContent);
    });
    return button;
  }

  private void changeContent(List<Widget> content) {
    panel.getLayout().setDisplayNone();
    panel.close();
    panel = new VBox(content);
    panel.display();
  }

  private Button createHideRowsButton() {
    Button button = new Button();
    button.setDescription("Hide rows");
    button.registerOnClick((content, message) -> {
      changeContent(this.previewContent);
    });
    return button;
  }

  public void display() {
    this.panel.display();
  }

  public interface PreviewAllRows {
    Map<String, Object>[] get(int rows);
  }

}
