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

import com.twosigma.beakerx.chart.xychart.Plot;
import com.twosigma.beakerx.chart.xychart.plotitem.XYGraphics;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import com.twosigma.beakerx.table.TableDisplay;
import com.twosigma.beakerx.widget.DisplayableWidget;
import jupyter.Displayers;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.twosigma.beakerx.mimetype.MIMEContainer.HIDDEN;
import static com.twosigma.beakerx.mimetype.MIMEContainer.Text;
import static java.util.Collections.singletonList;


public class SerializeToString {

  private static List<MIMEContainer> HIDDEN_MIME = singletonList(HIDDEN);

  public static List<MIMEContainer> doit(final Object input) {
    if (input == null) {
      return getMimeContainerForNull();
    }
    return getMimeContainer(input);
  }

  public static List<MIMEContainer> getMimeContainerForNull() {
    if (Kernel.showNullExecutionResult) {
      return singletonList(Text("null"));
    }

    return HIDDEN_MIME;
  }

  private static List<MIMEContainer> getMimeContainer(final Object data) {

    Object input = DisplayerDataMapper.convert(data);

    if (input instanceof DisplayableWidget) {
      ((DisplayableWidget) input).display();
      return HIDDEN_MIME;
    }

    TableDisplay table = getTableDisplay(input);
    if (table != null) {
      table.display();
      return HIDDEN_MIME;
    }

    if (input instanceof Collection) {
      return singletonList(MIMEContainer.Text(collectionToString((Collection<?>) input)));
    }

    if (input instanceof XYGraphics) {
      new Plot().add((XYGraphics) input).display();
      return HIDDEN_MIME;
    }
    if (input instanceof MIMEContainer) {
      return singletonList((MIMEContainer) input);
    }

    return Displayers.display(input).entrySet().stream().
            map(item -> new MIMEContainer(item.getKey(), item.getValue())).
            collect(Collectors.toList());
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
          if (((Map) item).keySet().stream().allMatch(o -> o instanceof String)) {
            ret = new TableDisplay(items);
          }
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

  private static <E> String collectionToString(Collection<E> collection) {
    Iterator<E> it = collection.iterator();
    if (!it.hasNext())
      return "[]";

    StringBuilder sb = new StringBuilder();
    sb.append('[');
    for (; ; ) {
      E e = it.next();
      sb.append(e);
      if (!it.hasNext())
        return sb.append(']').toString();
      sb.append(',').append(' ');
    }
  }

}
