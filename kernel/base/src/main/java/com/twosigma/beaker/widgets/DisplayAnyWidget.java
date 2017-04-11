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
package com.twosigma.beaker.widgets;

import com.github.lwhite1.tablesaw.api.Table;
import com.twosigma.beaker.easyform.DisplayEasyForm;
import com.twosigma.beaker.easyform.EasyForm;
import com.twosigma.beaker.fileloader.CsvPlotReader;
import com.twosigma.beaker.jvm.object.OutputContainer;
import com.twosigma.beaker.table.TableDisplay;
import com.twosigma.beaker.widgets.internal.InternalWidget;

import static com.twosigma.beaker.SerializeToString.isInternalWidget;

public class DisplayAnyWidget {
  
  /**
   * Displays all kinds of widgets.
   * 
   * @param input
   */
  public static void display(Object input) {
    if (input instanceof EasyForm) {
      DisplayEasyForm.display((EasyForm)input);
    }else if (input instanceof OutputContainer) {
      DisplayOutputContainer.display((OutputContainer)input);
    }else if(input instanceof Table){
      showInternalWidget(new TableDisplay(new CsvPlotReader().convert((Table) input)));
    }else if (isInternalWidget(input)) {
      showInternalWidget(input);
    }else if(input instanceof Widget){
      DisplayWidget.display((Widget)input);
    }
  }

  private static void showInternalWidget(Object result) {
    InternalWidget widget = (InternalWidget) result;
    widget.sendModel();
    DisplayWidget.display(widget);
  }

}
