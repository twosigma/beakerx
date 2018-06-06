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

  public static int ROWS = 10;
  private final HBox countButton;
  private VBox panel;
  private Collection<Map<String, Object>> preview;
  private Rows previewAllRows;
  private List<Widget> previewContent;
  private List<Widget> rowsContent;

  public PreviewTableDisplay(Collection<Map<String, Object>> previewRows, Rows allRows, Count count) {
    this.previewAllRows = allRows;
    this.preview = previewRows;
    this.countButton = createCountButton(count);
    this.previewContent = asList(new HBox(asList(createShowRowsButton(), this.countButton)), new TableDisplay(this.preview));
    this.panel = new VBox(previewContent);
  }

  private HBox createCountButton(Count count) {
    Label label = new Label();
    Button button = new Button();
    button.setDescription("Count rows");
    button.registerOnClick((content, message) -> {
      Long aLong = count.get();
      label.setValue(aLong);
    });
    return new HBox(asList(button, label));
  }

  private Button createShowRowsButton() {
    Button button = new Button();
    button.setDescription("Preview " + ROWS + " Rows");
    button.registerOnClick((content, message) -> {
      if (this.rowsContent == null) {
        this.rowsContent = asList(countButton, new TableDisplay(previewAllRows.get(ROWS)));
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

  public void display() {
    this.panel.display();
  }

  public interface Rows {
    Map<String, Object>[] get(int rows);
  }

  public interface Count {
    Long get();
  }

}
