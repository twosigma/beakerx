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
package com.twosigma.beaker.chart.xychart.plotitem;

import org.apache.cxf.common.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

public class XYStacker {

  public static List<BasedXYGraphics> stack(List<BasedXYGraphics> graphicsList) {
    return transformGraphicsList(graphicsList);
  }

  private static List<BasedXYGraphics> transformGraphicsList(List<BasedXYGraphics> graphicsList) {
    if (CollectionUtils.isEmpty(graphicsList) || graphicsList.size() == 1){
      return graphicsList;
    } else {
      List<BasedXYGraphics> stackedList = new ArrayList<BasedXYGraphics>(graphicsList.size());
      stackedList.add(graphicsList.get(0));
      int ysSize = graphicsList.get(0).getY().size();
      for (int gIndex = 1; gIndex < graphicsList.size(); gIndex++) {
        BasedXYGraphics current = graphicsList.get(gIndex);
        BasedXYGraphics previous = graphicsList.get(gIndex - 1);
        List<Number> currentYs = current.getY();
        List<Number> previousYs = previous.getY();

        if (ysSize != currentYs.size()) {
          throw new RuntimeException("Plot items that are added to XYStack should have the same length coordinates");
        }
        for (int yIndex = 0; yIndex < ysSize; yIndex++) {
          currentYs.set(yIndex, currentYs.get(yIndex).doubleValue() + previousYs.get(yIndex).doubleValue());
        }
        current.setBase(previousYs);
        stackedList.add(current);
      }
      return stackedList;
    }
  }

}
