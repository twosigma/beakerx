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

package com.twosigma.beakerx;

import com.github.lwhite1.tablesaw.api.Table;
import com.twosigma.beakerx.chart.xychart.Plot;
import com.twosigma.beakerx.chart.xychart.plotitem.XYGraphics;
import com.twosigma.beakerx.fileloader.CsvPlotReader;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import com.twosigma.beakerx.table.TableDisplay;
import com.twosigma.beakerx.widgets.DisplayableWidget;

import java.util.Collection;
import java.util.Map;

import static com.twosigma.beakerx.mimetype.MIMEContainer.HIDDEN;
import static com.twosigma.beakerx.mimetype.MIMEContainer.Text;


public class SerializeToString {

  public static MIMEContainer doit(final Object input) {
    MIMEContainer ret = null;
    if (input == null) {
      if(Kernel.showNullExecutionResult){
        ret = Text("null");
      }else{
        ret = HIDDEN;
      }
    }else{
      ret = getMimeContainer(input);
    }
    return ret;
  }

  private static MIMEContainer getMimeContainer(final Object input) {
    if (input instanceof DisplayableWidget) {
      ((DisplayableWidget) input).display();
      return HIDDEN;
    }
    TableDisplay table = getTableDisplay(input);
    if (table != null) {
      table.display();
      return HIDDEN;
    }
    if (input instanceof Table) {
      new TableDisplay(new CsvPlotReader().convert((Table) input)).display();
      return HIDDEN;
    }
    if (input instanceof XYGraphics) {
      new Plot().add((XYGraphics) input).display();
      return HIDDEN;
    }
    if (input instanceof MIMEContainer) {
      return (MIMEContainer) input;
    }
    return Text(input.toString());
  }

  public static TableDisplay getTableDisplay(final Object input) {
    TableDisplay ret = null;
    if (input instanceof Map) {
      Map map = (Map) input;
      ret = new TableDisplay(map);
    } else if (input instanceof Collection) {
      Collection items = (Collection) input;
      if (!items.isEmpty()) {
        Object item = items.iterator().next();
        if (item instanceof Map) {
          ret = new TableDisplay(items);
        }
      }
    } else if (input instanceof Map[]) {
      Map[] items = (Map[]) input;
      if (items.length > 0) {
        ret = new TableDisplay(items);
      }
    }
    return ret;
  }

}
